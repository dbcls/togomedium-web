# 開発ガイド

## この文書の役割

この文書では、TogoMediumの日常開発で使う環境、コマンド、検証方針、完了条件を定める。

- `AGENTS.md` は作業開始時の入口として扱う
- 日常的な開発手順と検証判断は、この文書を基準にする
- package別の実装判断は、各 `@packages/*/AGENTS.md` とpackage配下のdocsを参照する
- 品質確認の詳細は `docs/testing-policy.md` を参照する

## 開発環境

Node.jsとpnpmのバージョンは `mise.toml` で管理する。

初回セットアップ:

```bash
mise install
mise exec -- node -v
mise exec -- pnpm --version
mise exec -- pnpm install
```

初回利用時に `mise.toml` のtrustを求められた場合は、`[tools]` に期待するNode.js / pnpmのバージョン指定があることを確認してから `mise trust` を実行する。

## コマンド表記

この文書では、簡潔さのためコマンド例を `pnpm ...` と表記する。

- AIエージェントやクラウド環境では、原則として `mise exec -- pnpm ...` に読み替える
- ターミナルで `mise activate` を済ませている場合は、`pnpm ...` のまま実行できる

## 日常的に使うコマンド

### Webアプリ

- `pnpm web:serve`: Webアプリを起動する
- `pnpm web:build`: Webアプリをビルドする

### Stanza

- `pnpm stanza:serve`: Stanza開発サーバーを起動する
- `pnpm stanza:build`: Stanza配布物をビルドする

### Storybook

- `pnpm storybook:serve`: Storybookを起動する

表示確認の補足は `docs/agent-browser.md` を参照する。

### APIドキュメント関連

- `pnpm doc:serve`: APIドキュメント関連の旧パッケージを起動する
- `pnpm doc:build`: APIドキュメント関連の旧パッケージをビルドする

## 品質ツール

このリポジトリでは、Oxc系ツールとVitestを標準の確認手段として使う。

- `pnpm format`: コードやドキュメントを整形する
- `pnpm format:check`: 整形差分がないか確認する
- `pnpm lint`: lintを実行する
- `pnpm lint:debug`: quiet指定なしでlintを実行する
- `pnpm test`: ユニットテストを実行する
- `pnpm type-check`: Oxlintのtype-aware / type-checkでTypeScriptの型チェックを実行する
- `pnpm check-all`: format / lint / type-check / testをまとめて実行する

`type-check` は `tsc --noEmit` ではなく、`oxlint.config.ts` を基準に `oxlint --type-aware --type-check` で実行する。詳細は `docs/testing-policy.md` を参照する。

## 作業開始時の確認

コードや設定に影響する変更を始める前は、必要に応じて現状を確認する。

基本の確認コマンド:

```bash
pnpm lint
pnpm type-check
pnpm test
```

- 変更前から壊れている箇所がないかを把握する
- 作業後の失敗と既存不具合を切り分ける

## 検証方針

### 原則

- 変更内容に応じて、必要な検証だけを実行する
- 実行した検証と、あえて省略した検証の理由を共有する
- ドキュメントのみの変更では、原則としてformat / lint / testは必須にしない

### ドキュメントのみの変更

- 原則としてformat / lint / testは必須にしない
- Markdownの整形やリンク修正など、機械的な確認が有効な場合は `pnpm format:check` を実行する
- 確認を省略した場合は、ドキュメントのみの変更であることを完了報告に含める

### コード変更を含む場合

最低限、次の確認を実行する。

```bash
pnpm check-all
```

必要に応じて追加する確認:

- `pnpm web:build`: Webアプリの本番ビルドへの影響を確認する
- `pnpm stanza:build`: Stanza配布物への影響を確認する
- `pnpm storybook:serve`: Storybook上の表示確認が必要な場合に起動する

画面確認が必要な場合は、対象の開発サーバーを起動し、必要に応じて `agent-browser` などで表示を確認する。

### 設定・script変更を含む場合

- `package.json` のscriptを変更した場合は、変更したscriptを実行して挙動を確認する
- `mise.toml` や実行環境に関わる変更では、`mise exec -- node -v` と `mise exec -- pnpm --version` を確認する
- 品質確認の導線を変更した場合は、`docs/testing-policy.md` とこの文書の整合を確認する

## 完了条件

タスク完了時には、少なくとも次を満たす。

- 依頼された変更が反映されている
- 変更内容に見合った検証が完了している
- 検証を省略した場合は理由が説明できる
- 必要なら整形が実施されている
- 関連ドキュメントの更新が必要な場合は反映されている

## 用途別の参照先

- ドキュメントの書き方を確認したいとき: `docs/agents/task-guides/documentation.md`
- コード規約を確認したいとき: `docs/development/coding-guidelines.md`
- テスト・lint方針を確認したいとき: `docs/testing-policy.md`
- Web固有の実装方針を確認したいとき: `@packages/web/docs/coding-guidelines.md`
- WebでのStanza組み込みを確認したいとき: `@packages/web/docs/stanza-integration.md`
- Stanza本体の開発方針を確認したいとき: `@packages/stanza/docs/development-guide.md`
