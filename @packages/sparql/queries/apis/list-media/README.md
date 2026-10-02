# 培地一覧

## 採用・公開状態

- 採用状態: 採用予定。ページ情報と培地の値を返すAPIとして整備する。
- 公開状態: 未公開。公開API名は未決定。
- Zod連携: 未連携。既存の `@packages/api/src/listMedia/definitions.ts` はmeta list用のため変更していない。
- 出典: `queries/reference/list-media/`。2026-09-28受領のSPARQList本文と版不明の記録は同フォルダの `source.md` と `README.md` に保持する。

## 処理と返却形式

`count-media.rq` はreferenceの総件数クエリを保持する。`list-media.rq` はreferenceの一覧にstrain・species登録数とpHを追加したもの。培地ID・名称があり、`olo:length > 0` の培地を対象とする。2本は独立したSELECTで、count、resultの順に取得し、`output.mjs` でまとめる。

mediaとstrainグラフを参照し、`gmo:GMO_000114/gmo:strain_id` で関連するstrainのURIを培地ごとに `COUNT(DISTINCT ?strain)` で数える。分類階層やラベルの有無では絞り込まない。同じstrainへの複数の関連は1件とし、元ID・名称・出典の結合より先に集計する。関連がない培地もOPTIONALとCOALESCEで残し、0件とする。DB内の登録数であり、生物学的に培養可能な全strain数を表すものではない。

speciesは関連strainの `gmo:taxon` から、`http://togomedium.org/taxonomy/filtered_has_strain` グラフ内の `rdfs:subClassOf*` をたどり、`tax:rank tax:Species` を持つ分類のURIを重複除去して数える。亜種などSpeciesより下の分類も祖先Speciesへまとめ、同一speciesに複数strainがあっても1件とする。分類やSpecies祖先が取得できないstrainはspecies_countに含めず、strain_countには残す。species_countが0でも、strainが未登録とは限らない。

返却形式は `{ total, offset, limit, contents }`。ページ情報とstrain_count・species_countは数値、その他の行フィールドは文字列。

`species_count` は上記のspecies登録数で、取得できるspeciesがなければ0。`ph` は培地の `gmo:ph` の文字列をそのまま返す。範囲や注記を数値へ変換せず保持し、空文字・欠損は空文字として必ずフィールドを返す。pHがない培地も一覧に残す。複数のpHが登録された場合は値ごとに別行となり、strain数でソートする際は最後の比較キーにpHを加える。species数やpHでのソートは未対応。

| フィールド          | 内容                                                                               |
| ------------------- | ---------------------------------------------------------------------------------- |
| `media_id`          | 培地ID                                                                             |
| `original_media_id` | 元データの培地ID。欠損は空文字                                                     |
| `label`             | 培地名。クエリで空の名称を `(Unnamed medium)` に置換する。Output入力の欠損は空文字 |
| `source_uri`        | 出典URI。欠損は空文字                                                              |
| `strain_count`      | 関連する一意なstrainの登録数。関連なしは0                                          |
| `species_count`     | 関連strainから特定できる一意なspecies数。取得できなければ0                         |
| `ph`                | pHの元の文字列。範囲や注記を保持し、空文字・欠損は空文字                           |

meta list用の `columns` とリンクオブジェクトは返さない。`media_id` は文字列になり、従来のOutputが省略していた `source_uri` を返す。空ページでもページ情報を保持する。countが空の場合はtotal・offset・limitを0とする。

重複除去の条件は変更していない。countは培地URIを数えるが、一覧は元ID・名称・出典の複数値によって同一培地が複数行になり得る。これらはreferenceから引き継いだ制約。

`sort=strain_count` で登録株数の数値順に並べ替える。`order=asc` が既定値で、多い順は `order=desc`。同数の場合は培地ID、元ID、名称、出典URIの昇順にする。培地IDは文字列順（自然数順ではない）。全対象の集計と並べ替えの後にLIMIT・OFFSETを適用する。sort未指定または空文字の場合、ORDER BYの各キーを定数にし、従来どおり順序を指定しない。

list-components2と同じ引数検証と条件付きORDER BYを使う。現在のlist-mediaはソート未指定でも全培地を集計するため、queryVariantsでのクエリ分割は行っていない。ID順でページを先に確定してから集計する最適化は未実施。

## 引数と実行

`limit` の既定値は20、`offset` は0。非負の安全な整数を指定する。共通CLIがresultのLIMIT・OFFSETとcountの文字列BINDを置換する。空文字・先頭ゼロ・負数は受け付けない。

以下はモノリポのルートから実行する。

```sh
mise exec -- pnpm --filter @packages/sparql api queries/apis/list-media
mise exec -- pnpm --filter @packages/sparql api queries/apis/list-media --param sort=strain_count --param order=desc
mise exec -- pnpm --filter @packages/sparql api queries/apis/list-media --param sort=strain_count --param order=asc
mise exec -- pnpm --filter @packages/sparql api queries/apis/list-media --param offset=20
mise exec -- pnpm --filter @packages/sparql api queries/apis/list-media --param offset=1000000
mise exec -- pnpm --filter @packages/sparql api queries/apis/list-media --saved
mise exec -- pnpm --filter @packages/sparql export queries/apis/list-media
```

既定の接続先は `https://togomedium.org/sparql`。`results/` に生のクエリ結果、整形JSON、単独実行用Outputを保存する。`--saved` は最後の取得結果を使い、引数とは併用できない。exportは `dist/sparqlist.md` を生成するだけで、公開は行わない。

## 検証

整形テストで通常結果、空ページ、欠損、重複、出典の複数値、単独実行、referenceとの総件数クエリ一致を確認する。strain_countは非負の安全な整数に変換し、欠損・不正値はエラーにする。公開環境のEndpoint変数の実値と、SPARQListでの登録・実行は未確認。

2026-09-28、既定の接続先でlimit=20・offset=0を実行し、total=2925・20行を確認した。全行の4フィールドが生のクエリ結果と一致し、M1のsource_uriを含むことを確認した。offset=1000000では空のcontentsとtotal=2925・limit=20・指定offsetを保持した。SPARQList用Markdownの生成も成功した。件数は検証時点の観測値。

### strain登録数の追加（2026-09-28）

limit=10000で取得した2925行（2925個の一意な培地ID）について、別クエリで培地とstrainの関連を列挙し、JavaScriptのSetで重複除去した件数と全件一致した。M1は585株、M10は8株、0株の培地は668件（例: M2122）だった。referenceから同時に取得した全件と、既存の4フィールドが行順を除いて一致した。元APIにはORDER BYがなく、今回も並び順を保証しない。

offset=1000000ではtotal=2925・limit=20・指定offsetを保ち、contentsが空になることを確認した。出典が複数ある行の保持、0件、件数の不正値は整形テストでも確認した。全件照合は既定の `https://togomedium.org/sparql` に対する観測で、公開APIの同等性検証ではない。既存の `gmdb_list_media_by_cultivable_strain_count` の定義は取得できず、登録済みの `queries/reference/gmdb-media-strains-alignment-by-gm-ids/` の関連パスと参照グラフを根拠とした。

offset=20の20行でも独立集計との一致を確認した。パッケージのcheck、export、ルートのcheck-allが成功した（Vitest 198件、Nodeテスト64件）。check-allはCLIテストのローカルlistenが必要なため、権限付きの通常コマンドで完了した。

### strain登録数でのソート（2026-09-28）

既定のエンドポイントに対し、limit=20で通常のAPIコマンドを `/usr/bin/time -p` で計測した。総件数取得・一覧取得・CLI起動・保存を含む実時間で、サーバー側の純粋なクエリ時間ではない。各条件1回、キャッシュ状態は未制御。

| sort         | order         | offset | 実時間 |
| ------------ | ------------- | -----: | -----: |
| strain_count | desc          |      0 | 1.29秒 |
| strain_count | desc          |     20 | 1.04秒 |
| strain_count | asc           |      0 | 1.27秒 |
| 未指定       | asc（既定値） |      0 | 1.09秒 |

いずれもtotal=2925、20行。降順の上位はM1406:6614、M23:4750、M1431:2969、M18:2567、M1603:2028。昇順の先頭20件は0株で、同数時の培地ID昇順も確認した。降順の先頭2ページで件数順とページ境界の整合、40個のIDに重複がないことを確認した。この試行では大きな遅延は観測しなかったが、コールドキャッシュや負荷時の性能は未確認。

Virtuosoで無効側のORDER BYを数値0にすると列番号の解釈でエラーになったため、list-components2と同じ空文字列を使う。ソート引数の許可値・不正値をテストし、パッケージのcheck・exportとルートのcheck-allが成功した（Vitest 198件、Nodeテスト65件）。公開は未実施。

### species数・pHの追加（2026-09-28）

limit=10000・strain数降順で全2925行（2925個の一意な培地ID）を取得した。別クエリで列挙した培地・strain・speciesをJavaScriptのSetで集計し、strain_count・species_countが全件一致した。別に取得したpHとも全件一致し、referenceの既存4フィールドも行順を除き一致した。pHの複数値は観測しなかったが、空文字は1293件あった。species_countが0の培地は690件で、そのうち22件はstrain登録があるもののSpecies階級を取得できなかった。

| 培地ID | strain_count | species_count | ph      |
| ------ | -----------: | ------------: | ------- |
| M1     |          585 |           262 | 6.0-6.5 |
| M10    |            8 |             4 | 7.0-7.2 |
| M1406  |         6614 |          1936 | 5.6     |
| M2122  |            0 |             0 | 空文字  |

strain数降順のoffset=20・limit=20は全件結果の該当範囲と一致し、offset=2925はtotalとページ情報を維持した空ページになった。CLI全体の実時間は全件取得3.85秒、2ページ目1.79秒（各1回、キャッシュ状態未制御）。pHの範囲・注記・欠損・複数行とspecies数の不正値を整形テストで確認した。check・export・check-allが成功した（Vitest 198件、Nodeテスト67件）。

ソート付きでoffset=1000000を指定すると、VirtuosoがLIMIT+OFFSETのソート上限10000を超えたとしてHTTP 500を返した。実際の最終ページ直後では問題ないが、極端なoffsetの制約として残る。先行するソート未指定での大きなoffsetの検証と区別する。

## 性能に関する判断と今後の検討（2026-09-28）

現在の2925培地では、ランダムなoffsetでの20件取得が2秒弱だったことから、現状の都度集計を許容して進める。現時点ではクエリの高速化やデータ取り込みバッチの変更は行わない。この判断は以下の観測に基づくもので、応答時間の保証や性能目標ではない。

species数・pH追加後、strain数降順・limit=20で、各回の間に5秒待機して3回ずつ実行した。

| 条件                   | offset（実行順） | 実時間（実行順）       |   平均 |
| ---------------------- | ---------------- | ---------------------- | -----: |
| 同一クエリの反復       | 20、20、20       | 1.12秒、0.83秒、1.30秒 | 1.08秒 |
| offsetをランダムに変更 | 2279、1425、2112 | 1.64秒、1.66秒、1.87秒 | 1.72秒 |

時間は総件数取得・一覧取得・CLI起動・通信・整形・保存を含む。キャッシュ状態は制御しておらず、DB単体の処理時間や通信の寄与は切り分けていない。同一クエリの反復が速い結果はキャッシュの効果と整合するが、offsetの深さも異なるため、原因は断定しない。

現在は表示件数にかかわらず全対象のstrain数・species数を集計する。培地数、strainとの関連数、分類関係が増えると処理負荷も増える可能性がある。将来の高速化策として、データ取り込みバッチで各培地のstrain_count・species_countを事前集計し、DBへ保存する方法を検討する。一覧取得では保存済みの件数を参照して並べ替え、毎回の関連探索と集計を省く。成分の利用培地数にも同じ方式を適用できるか、併せて検討する。

事前集計は未採用・未実装。検討時には件数の定義と保存先、データ取り込み・分類更新に伴う再集計、元データと集計値の整合性を保つ更新方法を決める。登録データの増加や応答時間の悪化が見られた段階で再評価する。
