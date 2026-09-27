# 培地IDによる培地詳細

指定した培地の基本情報・成分表・コメントを取得する。公開SPARQListの3本のクエリとOutputをローカルで実行するための比較用定義。

## 出典

- 公開ページ: https://togomedium.org/sparqlist/gmdb_medium_by_gmid
- 定義の取得元: https://github.com/dbcls/togomedium-sparqlist/blob/main/repository/gmdb_medium_by_gmid.md
- 確認日: 2026-09-26。公開ページのバージョンは `2025-06-25T13:29:03.818Z`。

クエリは出典コメントの追加以外、原文を維持する。Outputは `json` 関数をexportするための外枠だけを変更する。

## ファイルと引数

| ファイル                                 | 取得内容                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| `gmdb_medium_by_gmid_metadata.rq`        | 培地URI、名称、元の培地ID、出典URL、pH                                       |
| `gmdb_medium_by_gmid_component_table.rq` | 段落番号、成分名、量・単位、濃度、GMO、性質、Role、参照培地ID                |
| `gmdb_medium_by_gmid_comment_list.rq`    | 段落番号とコメント                                                           |
| `api.json`                               | 3本のクエリとOutputの入力名の対応、引数の既定値・許容形式                    |
| `output.mjs`                             | `meta`・`components`・`comments` への整形                                    |
| `output.test.mjs`                        | 段落の集約、重複排除、数値変換、任意項目・空結果、生成Outputの単独動作の確認 |

`gm_id` は培地ID。`M1470` のようなIDと、`NBRC_M249` のような別名を検索する。3本とも `VALUES` 内の `"{{gm_id}}"` を残し、実行時に共通処理で文字列へ置き換える。固定値への書き換えは不要。既定値は元APIと同じ `M1470`。ローカルでは英数字・アンダースコア・ハイフンからなる空でない値を許可する。

## 実行方法

`@packages/sparql`で実行する。

```sh
# 3本を実行し、API形式のJSONまで作る
mise exec -- pnpm api queries/reference/gmdb-medium-by-gmid

# IDを指定する（別名でも検索できる）
mise exec -- pnpm api queries/reference/gmdb-medium-by-gmid --param gm_id=NBRC_M249

# 成分表だけを取得する
mise exec -- pnpm query queries/reference/gmdb-medium-by-gmid/gmdb_medium_by_gmid_component_table.rq --param gm_id=M1470
```

出力先は `queries/reference/gmdb-medium-by-gmid/results/`。各クエリ名に対応する生のJSONと、整形後の `output.json`、SPARQList用の `output.sparqlist.js` を保存する。ID別に保存先は分かれず、再実行すると更新される。

`pnpm api` に `--saved` を付けると保存済み結果だけで整形する。`--param` とは併用できない。IDを変更した後は通常実行で再取得する。

## 出力と注意点

`meta` は先頭の基本情報、`components` は段落別の成分配列、`comments` は段落番号付きコメント配列。空結果は `{ "meta": null, "components": [], "comments": [] }`。

元Outputは同一段落内の同じGMO IDをまとめ、性質・RoleをIDで重複排除する。GMO IDがない行は統合しない。同じGMO IDで量や成分名が異なる行があっても先頭行の値を採用するため、成分明細を常に完全に保持する処理とは限らない。この挙動は変更していない。

量などのdecimalと段落番号などのintegerは数値へ変換する。任意項目が取得できない場合、その項目は省略される。性質・Roleは空配列になる。

成分表・コメントにはVirtuoso固有の `DEFINE sql:select-option "order"` があり、コメントクエリは `rdf:` の宣言を省略した原文を維持している。今回のTogoMediumエンドポイントでは実行できたが、他のエンドポイントでの可搬性は未検証。成分表のソートは段落番号だけで、同一段落内の成分順は保証されない。

### エディタ上の診断

エディタの構文診断と、TogoMediumエンドポイントでの実行結果は区別する。

- `DEFINE sql:select-option "order"` の赤い波線は、標準SPARQLの解析器がVirtuoso固有の拡張構文に対応していない場合に出る。
- コメントクエリの `rdf:type` は `PREFIX rdf:` が未宣言なので、標準SPARQLとしては宣言不足を指摘される。宣言の追加、または `rdf:type` を省略記法の `a` に置き換えることで解消できるが、ここでは既存SPARQListの比較用原文を保つため変更しない。

2026-09-26の実行確認は、この原文のまま成功している。赤い波線が出ることだけで実行不能とは判断しない一方、実行成功を標準SPARQLへの準拠や他環境での動作保証とは扱わない。

## 検証記録

2026-09-26、既定の `https://togomedium.org/sparql` で `M1470` と `NBRC_M249` を実行した。

- 基本情報1行、成分表153行、コメント13行。各クエリの完全重複行は0行。
- 培地URIは `http://togomedium.org/medium/M1470`、元のIDは `NBRC_M249`、pHは文字列 `6.5`。
- 整形後は成分表7段落・56項目、コメント13件。GMO IDがない項目は4件、量がない項目は3件で、任意項目の欠損を保った。
- 2つのIDによる整形結果は配列順を除いて一致した。最終保存結果は `M1470`。
- 公開APIの `gm_id=M1470` 応答とも比較した。基本情報とコメントは一致したが、成分名に差があり、応答全体の一致とは扱わない。たとえばローカルでは `**VFA (see below)`、公開APIでは `VFA**`。同様にWolfe's modified mineral solution、Vitamin mixture、Celluloseの参照項目にも名称差があった。公開ページのクエリ・Outputと取得元の定義は同じ内容であり、データやキャッシュなど差異の原因は未確認。
- `mise exec -- pnpm check` と `mise exec -- pnpm test` が成功（追加3件を含む28テスト）。空結果は整形関数のテストで確認し、存在しないIDの実クエリは未検証。

公開先への登録・更新は行っていない。SPARQListへ移す場合はクエリ名を `metadata`、`component_table`、`comment_list` とし、`gm_id` のParameters定義とEndpointを設定する。共通手順はルートの `README.md` を参照する。
