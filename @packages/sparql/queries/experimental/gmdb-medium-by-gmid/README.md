# 培地IDによる培地詳細（調整用）

`queries/reference/gmdb-medium-by-gmid/` をコピーし、クエリや出力を微調整するための作業用定義。2026-09-26のコピー時点では、クエリ・整形処理・テストの内容は比較元と同じ。クエリのファイル名と `api.json` の対応だけを変更している。

出典は https://togomedium.org/sparqlist/gmdb_medium_by_gmid 。公開ページの参照バージョンは `2025-06-25T13:29:03.818Z`。元の検証記録と公開API応答との差異は `queries/reference/gmdb-medium-by-gmid/README.md` を参照する。今後の調整はこのフォルダで行い、比較元を残す。

## ファイルと引数

| ファイル               | 内容                                                      |
| ---------------------- | --------------------------------------------------------- |
| `medium-metadata.rq`   | 培地URI、名称、元の培地ID、出典URL、pH                    |
| `medium-components.rq` | 段落別の成分、量・単位、濃度、GMO、性質、Role、参照培地ID |
| `medium-comments.rq`   | 段落番号とコメント                                        |
| `api.json`             | クエリとOutputの入力名の対応、引数定義                    |
| `output.mjs`           | `meta`・`components`・`comments` への整形                 |
| `output.test.mjs`      | 整形処理とSPARQList用Outputの単独動作のテスト             |

`gm_id` は培地IDまたは別名。既定値は `M1470` で、`NBRC_M249` なども指定できる。英数字・アンダースコア・ハイフンからなる空でない値を許可する。3本のクエリにある `"{{gm_id}}"` を共通処理が実行時に文字列へ置き換えるため、固定値への編集は不要。

## 実行方法

`@packages/sparql`で実行する。

```sh
mise exec -- pnpm api queries/experimental/gmdb-medium-by-gmid
mise exec -- pnpm api queries/experimental/gmdb-medium-by-gmid --param gm_id=NBRC_M249
mise exec -- pnpm query queries/experimental/gmdb-medium-by-gmid/medium-components.rq --param gm_id=M1470
```

出力先は `queries/experimental/gmdb-medium-by-gmid/results/`。各クエリ名に対応する生のJSON、整形後の `output.json`、移植用の `output.sparqlist.js` を保存する。IDごとには分かれず、再実行で更新される。

`pnpm api` に `--saved` を付けると保存済み結果だけで整形する。`--param` とは併用できない。クエリやIDを変更した後は通常実行で再取得する。

## 現時点の出力と注意点

公開版と同じく、`meta` に基本情報の先頭行、`components` に段落別の成分配列、`comments` にコメント配列を返す。空結果は `{ "meta": null, "components": [], "comments": [] }`。

同一段落内の同じGMO IDは統合し、性質・RoleをIDで重複排除する。量や成分名が異なっても先頭行の値を採用する。GMO IDがない行は統合しない。decimal・integerは数値へ変換し、取得できない任意項目は省略する。

コピー時点ではVirtuoso固有の `DEFINE sql:select-option "order"` と、コメントクエリの `rdf:` 宣言不足も残している。標準SPARQLを解析するエディタでは赤線が出る場合がある。成分表は段落番号だけでソートしており、段落内の成分順は保証されない。

## 検証記録

2026-09-26、`gm_id=M1470` で `pnpm api` を実行し、3本のクエリと整形処理が成功した。生成した `output.json` は比較元の保存済み `queries/reference/gmdb-medium-by-gmid/results/output.json` とファイル全体が一致した（基本情報、成分表7段落・56項目、コメント13件を含む）。比較元の再取得は行っていない。

`mise exec -- pnpm check` と `mise exec -- pnpm test` が成功（コピーした3件を含む33テスト）。

調整後は、対象ID・実行結果・比較元との差異をここへ記録する。公開先への登録・更新は行わない。
