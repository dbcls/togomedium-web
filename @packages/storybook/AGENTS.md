# AGENTS.md

## このパッケージについて

- `@packages/storybook` は Storybook 実行環境と、コンポーネント確認用の補助コードを置くパッケージです。
- コンポーネント本体は別パッケージにあることが多いので、このパッケージ単体で完結するとは限りません。

## 作業時の方針

- Storybook の設定変更は、表示対象のコンポーネント側に影響が出る前提で慎重に行ってください。
- 新しい Storybook 用コンポーネントや story を作る時は `docs/agents/task-guides/storybookComponent.md` を確認してください。
- 設定は `.storybook/` と `vite.config.ts` のどちらに置くべきかを意識し、役割を混ぜないでください。

## よく使うコマンド

- 起動: `pnpm --filter @packages/storybook storybook`
- ビルド: `pnpm --filter @packages/storybook build-storybook`
- 全体確認: ルートで `pnpm run fmt` `pnpm run lint` `pnpm run test`

## よく触る場所

- `.storybook/`
- `src/`
- `vite.config.ts`
