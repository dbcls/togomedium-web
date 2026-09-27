# ドキュメント案内

目的に応じて、共通文書とパッケージ固有の文書を探すための入口。以下のパスはリポジトリのルートを基準にする。

## 全体を理解する

- `README.md`: プロジェクト概要と最短の起動手順
- `docs/architecture.md`: パッケージの責務、データ取得から表示まで、公開インターフェースと生成物
- `docs/domain-terms.md`: 実装を読むための用語、ID、略語
- `docs/contents.md`: 公開サイトを対象とする画面・Stanza・APIの対応表。リポジトリの構成を知るときは全体設計を参照する

## 開発・検証する

- `@packages/sparql/README.md`: SPARQLクエリの区分、実行、API設計とZod検証
- `@packages/sparql/docs/migration.md`: Playgroundからの移植元と配置の対応

- `docs/development-guide.md`: 環境構築、起動、ビルド、日常操作
- `docs/testing-policy.md`: 変更内容に応じた検証、確認コマンド、完了条件
- `docs/agent-browser.md`: ブラウザで表示確認するときの前提と一時成果物の扱い

## 実装の判断基準を確認する

| 対象                                          | 参照先                                       |
| --------------------------------------------- | -------------------------------------------- |
| 共通のコード規約                              | `docs/development/coding-guidelines.md`      |
| 型・変数・ファイル・API・Stanzaの命名         | `docs/naming-convention.md`                  |
| Webのルーティング・画面・データ取得・スタイル | `@packages/web/docs/coding-guidelines.md`    |
| WebへのStanzaの組み込み                       | `@packages/web/docs/stanza-integration.md`   |
| Stanza内部の構成・公開パラメータ・接続設定    | `@packages/stanza/docs/development-guide.md` |

各パッケージで作業する際の注意点は `@packages/*/AGENTS.md` にある。個別Stanzaの資料は `@packages/stanza/stanzas/` 配下に置く。

## 文書・エージェントの作業手順を確認する

- `docs/agents/task-guides/documentation.md`: 文書の役割、配置、編集時の判断基準
- `AGENTS.md`: エージェントの共通作業ルールと参照先
- `docs/agents/task-guides/storybookComponent.md`: コンポーネントとStoryの作成手順
- `docs/agents/task-guides/svgIcon.md`: SVGアイコンの作成・置換時の制約

## 判断の背景・過去の調査を読む

判断ログとレポートは、記録時点の理由・事実・未確認事項を扱う。現在の環境や手順は上記の開発文書と設定を確認する。

- `docs/decisions/README.md`: 設計判断ログの運用とひな形
- `docs/decisions/2026-05-18-mise-source-of-truth.md`: Node.js・pnpmの基準をmiseへ集約した理由
- `docs/decisions/2026-05-19-medium-builder-schema-alignment.md`: Medium Builderのスキーマに関する判断
- `docs/reports/2026-09-18-dependency-update-candidates.md`: 依存更新の候補と調査
- `docs/reports/2026-09-18-dependency-update-results.md`: 依存更新と検証の結果
- `docs/reports/2026-09-18-togostanza-v4-parameter-compatibility.md`: TogoStanza V4のパラメータ互換性調査

## ドキュメント改善の計画・進捗

[Linearのドキュメント改善プロジェクト](https://linear.app/yohak/project/ドキュメント改善-fc75a43650f3/overview)で管理する。改善計画とIssueはLinearを正本とし、計画本文をローカルに重複して置かない。
