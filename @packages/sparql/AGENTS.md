# AGENTS.md

## 作業入口

TogoMediumのクエリ実行・比較・API設計を扱う。作業前にパッケージの `README.md` と対象クエリのREADMEを読む。環境・共通検証・文書規約はルートのAGENTSとガイドに従う。使用言語はモノリポの `docs/agents/task-guides/documentation.md` で確認する。このパッケージ内の相対パスはパッケージ基準とする。

| 作業                                           | 参照先                      |
| ---------------------------------------------- | --------------------------- |
| クエリの実行・追加、結果の確認、公開           | `README.md`                 |
| 設定・引数・整形・スキーマ連携・生成処理の変更 | `docs/project-structure.md` |
| 既存SPARQList Markdownの取り込み               | `docs/import-sparqlist.md`  |

## 判断上の注意

- referenceは既存公開APIの比較元として保ち、ロジックの改良はapisまたはexperimentalで行う。分類と採用・公開の定義は `README.md` に従う。
- 入出力スキーマは `@packages/api` で一元管理する。試案で既存公開APIのスキーマを置き換えない。
- 共通スクリプトに個別API固有の処理を持たせず、個別API用のパッケージスクリプトは追加しない。
- 移植元の `.mjs` とNode標準テストを維持する。`output.mjs` の `json` の単独実行要件、名前付きfunction宣言の例外、Zod検証の分離は `docs/project-structure.md` に従う。
- 取り込みでは、分割前に処理の順序と依存関係を確認する。原文保持・対応外処理・互換性・lint警告の扱いは `docs/import-sparqlist.md` に従い、対応外処理を省略したまま完了としない。
- クエリ変更時は実エンドポイントで結果を確認する。結果の確認項目と記録先は `README.md`、共通の完了前確認はルートの `docs/testing-policy.md` に従う。移植だけの場合はクエリ本文の一致も確認する。
- 公開は `dbcls/togomedium-sparqlist` 側で行う。ローカルでの検証やMarkdown生成を公開済みとは扱わない。
