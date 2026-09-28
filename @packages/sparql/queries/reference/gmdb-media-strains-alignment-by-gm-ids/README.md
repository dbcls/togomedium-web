# gmdb_media_strains_alignment_by_gm_ids

## 出典と状態

既存公開APIの比較元。ユーザーが2026-09-28に貼り付けたSPARQList本文をsource.mdに保持した。元ファイル名は未提示、版・コミットは不明。原文を囲む4連バッククォートは保存内容に含めない。

2026-09-28に共通CLIの文字列リスト対応を使って取り込んだ。クエリ、api.json、Output、整形テストを配置し、実エンドポイントで検証した。コミットと公開先への反映は未実施。

## 目的と処理順

複数の培地IDから培地と、それに紐づくStrainの分類階層を取得する。

1. gm_idsをカンマで分割し、各値をtrimして二重引用符で囲み、空白で結合してmedia_valuesを作る。
2. resultのSPARQLでmedia_valuesをVALUES句へ挿入し、培地、Strain、分類階層を取得する。
3. Outputがresultを培地IDとStrain IDでまとめる。各培地はgm_id、label、original_media_id、organismsを持ち、各organismはdomainからstrainまでの分類を持つ。未取得の分類はnull、original_media_idの欠損は空文字列、空結果は空配列となる。

## 引数と接続先

gm_idsはカンマ区切りの培地ID。既定値はM2794,M941、例はSY4047,JCM_M900。検索対象はdcterms:identifierまたはskos:altLabel。原文の前処理は空文字列を除去せず、引用符のエスケープも行わない。未指定時の既定値適用はSPARQList側に依存する。

元のEndpointは{{SPARQLIST_TOGOMEDIUM_ENDPOINT}}。実値は未確認。ローカルではhttps://togomedium.org/sparqlへ問い合わせた（環境変数未設定、パッケージの.envなし）。指定したローカル接続先で動作確認済みだが、元環境との同等性は未確認。

## ファイルと実行

gmdb_media_strains_alignment_by_gm_ids.rqは原文のSPARQLと一致し、api.jsonのinputs.resultへ対応する。output.mjsは原文のOutputを単独実行可能なjson関数としてexportする。文字列リスト設定でgm_idsからmedia_valuesへ変換する。共有Zodスキーマは外部へexportされていないためvalidate.mjsは追加せず、既存のAPI定義は変更していない。

以下はモノリポのルートから実行する。results/とdist/はGit管理外。api.jsonのdescriptionは取り込み時に補足した英語説明で、受領原文とは区別する。

```sh
mise exec -- pnpm --filter @packages/sparql api queries/reference/gmdb-media-strains-alignment-by-gm-ids
mise exec -- pnpm --filter @packages/sparql api queries/reference/gmdb-media-strains-alignment-by-gm-ids --param gm_ids=SY4047,JCM_M900
mise exec -- pnpm --filter @packages/sparql api queries/reference/gmdb-media-strains-alignment-by-gm-ids --saved
mise exec -- node --test @packages/sparql/queries/reference/gmdb-media-strains-alignment-by-gm-ids/output.test.mjs
mise exec -- pnpm --filter @packages/sparql export queries/reference/gmdb-media-strains-alignment-by-gm-ids
```

## 取り込み時の検証（2026-09-28）

| gm_ids | 生の行数 | 出力 |
| --- | --- | --- |
| M2794,M941（既定値） | 49 | M941は6株、M2794は1株 |
| SY4047,JCM_M900 | 42 | M941は6株。original_media_idはJCM_M900。SY4047は結果に含まれない |
| 空文字列 | 0 | 空配列 |

件数は検証時点の観測値。全ケースで同じ生データを元のOutputと分割後のOutputに渡し、値・型・キー・配列順が一致した。培地IDと各培地内のStrain IDに重複はなく、取得した株のID・名称とdomainからspeciesまでの分類に欠損はなかった。M2794のoriginal_media_idは空文字列だった。SY4047が結果に含まれない原因は未調査。元のクエリはStrain、taxon、指定した分類階層との結合が必須のため、結果にないことだけで培地の不存在とは判断しない。ページングはない。

整形テスト3件で分類の結合、複数培地・複数株、重複、別名の先勝ち、欠損分類のnull、空結果、原文との一致、Output単独実行を確認した。引数は通常値、別名、前後空白、空入力、空要素、重複で元の前処理と一致する。特殊文字はCLIでエスケープするため原文との変更点となる。原文の検索条件やOutputの挙動は改良していない。

--savedによる再整形、exportによるMarkdown生成、パッケージのcheckが成功した。公開先への登録・実行は未実施。原文はoxfmt.config.tsで整形対象から除外し、整形後もSHA-256が6b809b84b12b77ebb10cef899ca846b19bd6b31da98fe959d53567133a9ffac1で一致した。

ルートのcheck-allは成功した（Vitest 198件、Nodeテスト63件）。最初の実行では模擬HTTPサーバーのlistenがサンドボックスに拒否されたため、同じコマンドを権限付きで再実行した。lint:debugも成功し、このAPIの追加ファイルに警告はない。既存のlist-media由来の警告4件と、Web・Stanzaの既存の型関連警告3件は変更していない。画面や配布物の変更はないため、ブラウザ確認と本番ビルドは実施していない。
