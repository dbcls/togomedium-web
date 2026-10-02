# 培地一覧と総件数

## 出典と目的

既存公開API `list_media` の比較元。ユーザーが2026-09-28に貼り付けたSPARQList本文を `source.md` に保持した。元ファイル名は未提示（API名は `list_media`）、版・コミットは不明。原文は生成Markdownで置き換えない。

`http://togomedium.org/media` グラフから、ID・名称を持ち、`olo:length > 0` の培地を取得する。検索条件と返却形式の改良は行っていない。

## 構成と処理順

1. `count.rq`: 一意な培地URIの総件数と、入力したlimit・offsetを取得する。
2. `result.rq`: 培地ID、元ID、名称、出典URIを取得する。名称が空文字なら `(Unnamed medium)` に置き換える。
3. `output.mjs`: 両結果を元のOutputと同じJSONへ整形する。

2本のSELECTは同じEndpointを使い、相互のデータ依存はない。`api.json` のinputsは原文の順序と変数名を維持している。途中のJavaScriptや非同期処理はなく、現在のCLIで再現できる。

`.rq` はテンプレート変数も含めて原文と一致する。Outputは関数のexport化と整形のみ変更し、外部importに依存しない。`output.test.mjs` は原文のOutputとの比較と `checkStandalone` による単独実行を確認する。

## 引数と接続先

| 引数     | 既定値 | 意味と置換箇所                                      |
| -------- | ------ | --------------------------------------------------- |
| `limit`  | `20`   | 最大取得行数。resultのLIMITとcountの文字列BIND      |
| `offset` | `0`    | スキップする行数。resultのOFFSETとcountの文字列BIND |

固定値への置換はしていない。ローカルCLIでは非負の安全な整数を受け付け、空文字、負数、先頭ゼロなどは拒否する。元のParametersは許容値の制約を明記していないため、この検証はローカルCLIとの差であり、元APIの仕様とは断定しない。

原文の接続先は `{{SPARQLIST_TOGOMEDIUM_ENDPOINT}}`。公開環境での変数の実値は未確認。ローカルはパッケージ既定の `https://togomedium.org/sparql` を使用した（検証時に `.env` と `SPARQL_ENDPOINT` の設定なし）。同一接続先での公開APIとの比較は未実施。

## 実行と出力

以下はモノリポのルートから実行する。

```sh
mise exec -- pnpm --filter @packages/sparql api queries/reference/list-media
mise exec -- pnpm --filter @packages/sparql api queries/reference/list-media --param limit=20 --param offset=20
mise exec -- pnpm --filter @packages/sparql api queries/reference/list-media --param offset=1000000
mise exec -- pnpm --filter @packages/sparql api queries/reference/list-media --saved
mise exec -- node --test @packages/sparql/queries/reference/list-media/output.test.mjs
```

`results/count.json` と `results/result.json` に生の結果、`results/output.json` に整形結果、`results/output.sparqlist.js` に単独実行用Outputを保存する。resultsはGit管理外。`--saved` は最後の取得結果を使い、引数・鮮度を検証しない。`--param` とは併用できない。

返却キーは `total`、`offset`、`contents`、`columns`、`limit`。件数とページ情報は数値。各行は `label`、`original_media_id`、`media_id: { label, href }` を持ち、リンクは `/medium/<ID>`。元IDやOutput入力の名称が欠けた場合は空文字にする。空ページでもcolumnsとcount由来のページ情報を保持し、countに行がない場合は数値0へフォールバックする。

`@packages/api/src/listMedia/definitions.ts` に対応する型・スキーマ定義があるが、レスポンススキーマはexportされていない。今回の取り込みでは共有定義を変更せず、任意の `validate.mjs` は追加していない。

## 保持した注意点

- `ORDER BY` がないため、ページ間の順序の安定性は保証されない。
- countは培地URIの重複を除くが、resultはID・元ID・名称・出典URIの組をDISTINCTにする。複数の元IDや出典などで同じ培地が複数行になり、総件数と一覧の行数が一致しない可能性がある。
- `source_uri` はSELECT対象だがOutputでは返さない。出典だけが異なる行は整形後に同じ内容になり得るが、重複除去しない。
- 原文のresult見出しは成分情報の取得と書かれているが、クエリは培地を対象としている。source.mdでは原文を保持した。

## 検証記録

2026-09-28、ローカル既定のSPARQLエンドポイントで以下を観測した。件数は固定仕様ではない。

| limit |  offset | total | 取得行数 | 観測内容                                                 |
| ----: | ------: | ----: | -------: | -------------------------------------------------------- |
|    20 |       0 |  2925 |       20 | M1からM1027。20個の一意ID、名称・元ID・出典の欠損なし    |
|    20 |      20 |  2925 |       20 | M1029からM1056。20個の一意ID、名称・元ID・出典の欠損なし |
|    20 | 1000000 |  2925 |        0 | 空のcontents、総件数・limit・offset・columnsを保持       |

通常・欠損・空ページ・複数値・重複の整形テスト、原文とのクエリ一致、原文Outputとの等価性、移植用Outputの単独動作を確認した。保存済み結果からの再整形も成功した。全件の重複・欠損調査、公開APIとの比較、SPARQListへの再登録・公開は未実施。

品質確認はパッケージの `check` とルートの `check-all` が成功した（Vitest 198件、Nodeテスト51件）。原文由来の `!!` に対するlint警告4件は互換性優先で保持した。check-allの自動整形後、source.mdは受領原文へ戻し、対象テストを再実行した。既存ファイルへの整形差分は残していない。
