# 開発ガイド

## この文書の役割

この文書では、TogoMediumの日常開発で使う環境、起動、ビルドの手順を扱う。

- `AGENTS.md` は作業開始時の入口として扱う
- 日常的な開発手順は、この文書を基準にする
- パッケージ別の実装判断は、各 `@packages/*/AGENTS.md` とパッケージ配下のドキュメントを参照する
- 検証の要否、確認コマンド、完了条件は `docs/testing-policy.md` を参照する

## 開発環境

Node.jsとpnpmのバージョンは `mise.toml` で管理する。パッケージ管理とnpmスクリプトの実行にはpnpmを使い、npmやyarnでは実行しない。

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

コマンドはリポジトリのルートから実行する。

### Webアプリ

- `pnpm web:serve`: Webアプリを起動する
- `pnpm web:build`: Webアプリをビルドする

APIドキュメントはWebの `/api` で確認できる。`@packages/api` のZod定義から生成したOpenAPIオブジェクトを直接表示する。詳しい関係は `docs/architecture.md` を参照する。

### Stanza

- `pnpm stanza:serve`: Stanza開発サーバーを起動する
- `pnpm stanza:build`: Stanza配布物をビルドする

### SPARQL

- `pnpm --filter @packages/sparql query <ファイル.rq>`: クエリを実行する
- `pnpm --filter @packages/sparql api <クエリフォルダ>`: 取得・整形・指定された出力検証を行う

引数のパスは `@packages/sparql` を基準にする。区分、接続設定、個別クエリのコマンドは `@packages/sparql/README.md` を参照する。

### Storybook

- `pnpm storybook:serve`: Storybookを起動する
- `pnpm --filter @packages/storybook build-storybook`: Storybookをビルドする

表示確認の補足は `docs/agent-browser.md` を参照する。

## 検証と完了報告

作業前の確認、変更種別ごとの検証、完了条件は `docs/testing-policy.md` に従う。画面確認の操作や一時成果物の扱いは `docs/agent-browser.md` を参照する。

## 用途別の参照先

- ドキュメントの書き方を確認したいとき: `docs/agents/task-guides/documentation.md`
- コード規約を確認したいとき: `docs/development/coding-guidelines.md`
- 検証方針と完了条件を確認したいとき: `docs/testing-policy.md`
- Web固有の実装方針を確認したいとき: `@packages/web/docs/coding-guidelines.md`
- WebでのStanza組み込みを確認したいとき: `@packages/web/docs/stanza-integration.md`
- Stanza本体の開発方針を確認したいとき: `@packages/stanza/docs/development-guide.md`
