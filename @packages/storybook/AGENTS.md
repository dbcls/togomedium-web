# AGENTS.md

## このパッケージについて

- `@packages/storybook` はStorybook実行環境と、コンポーネント確認用の補助コードを置くパッケージ。
- コンポーネント本体は別パッケージにあることが多いので、このパッケージ単体で完結するとは限らない。

## 作業時の方針

- Storybookの設定を変更するときは、表示対象のコンポーネントへの影響を確認する。
- 新しいStorybook用コンポーネントやStoryを作るときは `docs/agents/task-guides/storybookComponent.md` を確認する。
- 設定は `.storybook/` と `vite.config.ts` の役割を確認して配置し、役割を混ぜない。

## 起動と検証

起動・ビルドは `docs/development-guide.md`、検証コマンドと完了条件は `docs/testing-policy.md` に従う。ブラウザ確認の操作と一時成果物は `docs/agent-browser.md` を参照する。

## よく触る場所

- `.storybook/`
- `src/`
- `vite.config.ts`
