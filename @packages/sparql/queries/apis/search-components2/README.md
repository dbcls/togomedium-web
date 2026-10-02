# ページ確定後に利用培地数を集計する成分検索

## 採用・公開状態

- 採用状態: 比較用の新規API。既存`gmdb_search_components`を維持する。
- 外部API名: `gmdb_search_components2`。内部名: `searchComponents2`。
- 公開状態: ローカルDockerへ登録。productionへのpush・deployと公開OpenAPI登録は未実施。
- Zod契約: `@packages/api/src/searchComponents2/definitions.ts`。応答は既存契約を再利用し、入力はname/idソートだけに制限する。

## 変更する処理

標準名・GMO IDで検索結果を並べ、LIMIT/OFFSETでページを確定してから、そのページ内成分だけの直接利用培地数を集計する。medium_countソートは入力段階で拒否し、全候補の利用培地数を集計するクエリとqueryVariantsを持たない。

既存APIもname/id指定では同じページ後集計を行う。新APIはこの経路に固定し、既定をname/ascへ変更する。既存の同条件より速くなることを前提にしない。

`list-components-with-properties.rq`は既存のページ後集計クエリを基に、許可されないmedium_countソート分岐を除いたもの。総数・Role・Propertyクエリと単独Outputは既存と同内容で保持する。Zod定義は複製せず既存応答契約を使う。

名前検索、標準名選定、全言語aliases、matched_names、下位Role込み検索、直接Property、自己条件を除外したfacet集計、0件の全選択肢保持、直接記載によるmedium_countの意味は[既存APIのREADME](../search-components/README.md)と同じ。

## 引数と出力

| 引数        | 既定値   | 意味                                       |
| ----------- | -------- | ------------------------------------------ |
| name        | 空文字列 | 標準名・別名の大小文字を区別しない部分一致 |
| role_id     | 空文字列 | 選択Role自身と下位Role。空なら未指定       |
| property_id | 空文字列 | 直接付与されたProperty。空なら未指定       |
| sort        | name     | name / idのみ。medium_countは拒否          |
| order       | asc      | asc / desc                                 |
| limit       | 20       | 非負の安全な整数文字列。Web候補は20/50/100 |
| offset      | 0        | 先頭から省略する成分数                     |

引数はapi.jsonに定義し、引用符付き文字列と数値プレースホルダーを安全に置換する。応答形式は既存と同じcontents、文字列total/limit/offset、facets.roles/properties。medium_countは表示項目として残し、ソートには使わない。検索条件なしではmatched_namesは空配列。

## 実行・検証・登録

以下は`@packages/sparql`から実行する。

```sh
mise exec -- pnpm api queries/apis/search-components2
mise exec -- pnpm api queries/apis/search-components2 --param sort=id --param order=desc --param limit=100
mise exec -- pnpm api queries/apis/search-components2 --saved
mise exec -- pnpm export queries/apis/search-components2
mise exec -- node queries/apis/search-components2/verify-independent.mjs
mise exec -- node queries/apis/search-components2/verify-benchmark.mjs
```

生のクエリ結果、output.json、output.sparqlist.jsはresults/、公開用Markdownはdist/sparqlist.mdに保存する。結果は引数ごとに分離せず最後の実行で更新され、--savedは保存済みの鮮度や条件を確認しない。失敗時には旧結果が残るため終了結果を確認する。

生成Markdownを`/Volumes/DATA/repositories/togomedium-sparqlist/repository/gmdb_search_components2.md`へ登録した。ローカルURLは`http://localhost:3000/sparqlist/api/gmdb_search_components2`。Dockerの接続先は`https://dev.togomedium.org/sparql`。Outputは外部importなしで単独実行し、Zod保存前検証はローカル専用validate.mjsに分離する。

独立検証は既存APIのverification-corpus/associations/mediaの全件生データを使う。必要なら既存READMEの3つのqueryコマンドで更新し、新APIの既定値でpnpm apiを実行してからverify-independent.mjsを実行する。通常テストとは分離している。

verify-benchmark.mjsは新旧APIのname/id各方向とページング・複合検索・0件を全項目で比較し、同条件name/ascと異なる既定同士を各3回交互に計測する。直接SPARQLの一覧・総数・Role・Property処理も別に3回測り、results/benchmark.jsonへ生の観測値と中央値を保存する。HTTP通信・応答読取りを含み、DB内部実行時間ではない。比較前の検証でウォームアップ済みで、キャッシュや環境負荷を制御していない。

## 検証・計測（2026-10-02）

ローカルDockerの新旧APIを17条件で比較し、全項目が一致した。name/idの全方向、offset=20、20/50/100件、limit=0、offset=2000、日本語標準名、名前とRoleの併用、RoleとPropertyの併用、未知Roleの0件を含む。medium_countソートは新API上でも拒否された（現行SPARQListの例外応答はHTTP 500）。既存APIの応答・登録は維持した。

既存の独立した全件RDF行（1539成分）から、新APIの既定ページ20成分のID・順序・標準名・別名・直接使用培地数・matched_namesと、全Role/Property件数を照合した。総数・facetクエリとOutputが既存と同一であることも確認した。観測件数は固定仕様ではない。

通常check-allはVitest202件・Node73件で成功した。全体format:check、パッケージcheck/export、単独Outputの実行と既存Outputへの一致を確認した。生成Markdownとローカル登録ファイルは完全一致する。

### API全体の時間

同じDocker・同じSPARQL接続先で、比較によるウォームアップ後に各条件3回を交互に実行した。名前・分類条件なし、limit=20、offset=0。単位はms、小数は丸めた。JSONの受信までを測る。

| 条件                         | 1回目 | 2回目 | 3回目 | 中央値 |
| ---------------------------- | ----: | ----: | ----: | -----: |
| 旧API、name/asc指定          |  3877 |  3927 |  3703 |   3877 |
| 新API、name/asc指定          |  4213 |  3676 |  3656 |   3676 |
| 旧API、既定medium_count/desc |  4131 |  4043 |  3720 |   4043 |
| 新API、既定name/asc          |  3947 |  3966 |  3742 |   3947 |

同条件の既存name/id検索はすでにページ後集計であり、新APIへの固定だけによる大きな短縮は確認できない。既定同士の比較は並び順・取得成分も異なり、同条件の比較とは分ける。観測値の範囲が重なり、3回の中央値差から一律の改善や因果関係を断定しない。

### クエリ別の時間

APIの呼び出しとは別に、同じ接続先`https://dev.togomedium.org/sparql`で各SPARQLを3回、HTTP受信まで計測した。単位はms。測定時刻が異なるため、この表の値の合計を上のAPI時間と厳密に対応させない。

| クエリ                                  | 1回目 | 2回目 | 3回目 | 中央値 |
| --------------------------------------- | ----: | ----: | ----: | -----: |
| 旧一覧、medium_count/desc（全候補集計） |   453 |   334 |   284 |    334 |
| 旧一覧、name/asc（ページ後集計）        |   129 |    75 |   159 |    129 |
| 新一覧、name/asc（ページ後集計）        |   154 |    82 |    92 |     92 |
| 総件数                                  |    39 |    30 |    35 |     35 |
| Role別件数                              |  1128 |  1113 |  1109 |   1113 |
| Property別件数                          |  2306 |  2300 |  1993 |   2300 |

今回の条件では一覧の全候補培地数集計より、Role・Propertyのfacet集計が時間の多くを占めた。medium_countソートを外すだけではAPI全体の待ち時間を大きく減らせないことを示唆する。facetの最適化は今回行っていない。コールドキャッシュ、同時アクセス、別の検索条件・表示件数、productionの新APIは未検証。
