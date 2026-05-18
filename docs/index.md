# docs一覧

## この文書の役割

この文書では、`docs/` 配下の文書への入口を示します。

- どの情報をどの文書で扱うかを素早く把握できるようにする
- 詳細を確認したい文書へ迷わず辿れるようにする
- 個別文書の役割が重ならないように導線を整理する

## 日常開発

- `docs/development-guide.md`: 日常開発で使う手順、環境、検証方針、完了条件
- `docs/testing-policy.md`: format / lint / test / type-checkの扱い
- `docs/agent-browser.md`: `agent-browser` でStorybookや実アプリを確認するときの前提と成果物運用
- `docs/agents/task-guides/documentation.md`: ドキュメントの書き方、置き分け方、一時メモの扱い

## 実装規約

- `docs/development/coding-guidelines.md`: リポジトリ全体の基本的なコード規約
- `@packages/web/docs/coding-guidelines.md`: Webパッケージ固有のルーティング、page、component、data fetching、stylingの方針
- `@packages/web/docs/stanza-integration.md`: Web側でStanzaを組み込むときの実装パターン
- `@packages/stanza/docs/development-guide.md`: Stanza本体の実装、MUI、metadata、確認方針

## 仕様・機能

- `docs/contents.md`: 公開サイトの画面、Stanza、APIの対応表

## 設計判断

- `docs/decisions/README.md`: 設計判断ログの役割、運用ルール、ひな形を示す入口
- `docs/decisions/2026-05-18-mise-source-of-truth.md`: Node.js / pnpmの基準を `mise.toml` に寄せる判断
- `docs/decisions/2026-05-18-type-check-non-gating.md`: 既存型エラーがあるため、`type-check` を当面non-gatingにする判断

## エージェント向け

- `AGENTS.md`: モノリポ全体の作業ルール
- `@packages/*/AGENTS.md`: 各パッケージ固有の作業ルール
- `docs/agents/task-guides/`: エージェント用のタスク別ガイド
