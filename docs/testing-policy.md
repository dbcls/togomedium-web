# テスト・lint方針

## この文書の役割

この文書では、TogoMediumの開発で使う `format` / `lint` / `test` / `type-check` の扱いを定める。

- 日常開発の手順と完了条件は `docs/development-guide.md` を参照する
- 実装時のコード規約は `docs/development/coding-guidelines.md` を参照する
- package固有の例外や追加確認は、対象packageの `AGENTS.md` とdocsを参照する

## コマンド表記の前提

この文書では、簡潔さのためコマンド例を `pnpm ...` と表記する。

- AIエージェントやクラウド環境では、原則として `mise exec -- pnpm ...` に読み替える
- ターミナルで `mise activate` を済ませている場合は、`pnpm ...` のまま実行できる

## 基本方針

- 整形は `oxfmt` で行う
- lintは `oxlint.config.ts` を基準に `oxlint` で実行する
- 型チェックは `oxlint --type-aware --type-check` で実行する
- テストはVitestで書く
- テストファイル名は `*.spec.ts` または `*.spec.tsx` とする
- ロジックは、ユニットテストしやすい形へ分離する
- lintや型チェックのエラーをignore系コメントで覆い隠さない
- 実行した確認と、省略した確認の理由を完了報告に含める

## 作業種別ごとの確認

### ドキュメントのみの変更

- 原則として `format` / `lint` / `test` は必須にしない
- Markdownの整形やリンク修正など、機械的な確認が有効な場合は必要に応じて `pnpm format:check` を実行する
- 確認を省略した場合は、ドキュメントのみの変更であることを完了報告に含める

### コード変更を含む場合

最低限、次の確認を実行する。

```bash
pnpm check-all
```

- 変更が特定packageに閉じる場合でも、共有ロジックや型へ影響する可能性を確認する
- Stanza、Webアプリ、Storybookなど表示確認が必要な変更では、対象の開発サーバーを起動し、必要に応じて `agent-browser` などで表示確認を追加する
- 検証を省略する場合は、理由と残るリスクを完了報告に含める

### 設定・script変更を含む場合

- `package.json` のscriptを変更した場合は、変更したscriptを実行して挙動を確認する
- 品質確認の導線を変更した場合は、`docs/development-guide.md` とこの文書の整合を確認する
- `mise.toml` や実行環境に関わる変更では、`mise exec -- node -v` と `mise exec -- pnpm --version` を確認する

## format

- 通常の整形は `pnpm format` で行う
- 整形差分の確認だけを行う場合は `pnpm format:check` を使う
- 既存互換のため、`pnpm fmt` と `pnpm fmt:check` も同じ用途で残す

## lint

- 通常のlintは `pnpm lint` で実行する
- 詳細な出力を確認する場合は `pnpm lint:debug` を使う
- 自動修正できるものを直す場合は `pnpm lint:fix` を使う
- `pnpm lint` はquiet指定で実行するため、調査時は `pnpm lint:debug` を優先する

## test

- 通常のテストは `pnpm test` で実行する
- 監視実行が必要な場合は `pnpm test:watch` を使う
- package固有のテストscriptがある場合は、対象packageの `AGENTS.md` を確認する
- 新しいロジックを追加する場合は、pure functionとして切り出せる範囲を優先してテストする

## `__TEST__` exportの扱い

- production module間で使うものだけを通常の `export` とする
- テストからだけ参照する内部実装は、まずfile localに戻せないか検討する
- Reactコンポーネントなど、同じファイルに置く内部ロジックをユニットテストから参照する必要がある場合は、`__TEST__` で始まるオブジェクトにまとめて `export` する
- 通常利用向けの `export` とテスト補助用の `export` を分け、内部実装を必要以上に公開しない
- `react-refresh/only-export-components` などのlint例外が必要な場合は、`__TEST__` exportに限定し、理由を短くコメントで残す

## type-check

- `pnpm type-check` はTypeScriptの型チェック用scriptとして用意している
- 実行実体は `oxlint -c oxlint.config.ts . --type-aware --type-check`
- quiet指定は付けず、通常出力で診断情報を確認できるようにする
- 型エラーは `check-all` の失敗として扱う
- `tsc` によるpackage別scriptは標準導線としては用意しない

## check-all

- `pnpm check-all` は `format` / `lint` / `type-check` / `test` をまとめて実行する
- コード変更を含む作業では、原則として `pnpm check-all` を完了前確認に使う

## ignore系コメントの扱い

- 手で書くコードでは、ignore系コメントを前提にしない
- まず実装、型、テスト配置を見直し、コメントでの回避は最後の手段にする
- やむをえず例外を使う場合は、なぜ必要かを短く残す

## 関連ドキュメント

- `docs/development-guide.md`: 日常開発の手順と検証方針
- `docs/development/coding-guidelines.md`: 実装時のコード規約
- `docs/agent-browser.md`: `agent-browser` による画面確認と一時成果物の扱い
