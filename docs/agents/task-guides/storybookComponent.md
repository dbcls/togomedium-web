---
name: Storybook React Component
description: Storybookに対応するReactコンポーネントを作るための指示
---

## 概要

Reactの関数コンポーネントと、それに対応するStorybookのStoryファイルを作成する。この文書内のパスはリポジトリのルート基準。

## 対象環境を選ぶ

| 作成するもの                    | 使用する環境      | 配置・データ・Providerの参照先                                  |
| ------------------------------- | ----------------- | --------------------------------------------------------------- |
| Web側のReactコンポーネント      | Web用Storybook    | `@packages/web/docs/storybook.md`                               |
| Stanza内部のReactコンポーネント | Stanza用Storybook | `@packages/stanza/docs/development-guide.md` の「確認の進め方」 |

Web用は固定データと共通decoratorを使う。個別のStoryへProviderを重複して追加しない。Stanza用は実API接続を使い、対象の依存に応じて `StoryProvider` を指定する。両環境の設定を混ぜない。

Web ComponentsはStanzaの配布・組み込みに使う技術を指す。ここで作るReactコンポーネントのStoryとは区別する。

## 作成手順

依頼に説明が含まれている場合は、その内容を反映する。

1. 作成先フォルダとコンポーネント名をユーザーに確認する。ファイルが添付されている場合も、同じ階層への作成を想定してよいか確認する。
2. 対象パッケージのガイドと、用途が近い既存コンポーネント・Storyを読む。Storyの検出範囲、スタイル、データ取得、Providerの指定を確認する。
3. 関数コンポーネントと、隣接する `Component.stories.tsx` を作成する。名前はユーザーの指定に合わせる。Propsと表示状態を定め、Storyの `component`、`args`、必要な表示条件を設定する。
4. 対象パッケージのStorybookを起動し、追加したStoryが検出されること、Propsや操作に応じた表示を確認する。起動は `docs/development-guide.md`、ブラウザ確認は `docs/agent-browser.md` に従う。
5. 変更に応じた検証を `docs/testing-policy.md` に沿って行い、確認したStory・表示状態・未確認事項を報告する。

## 既存実装で確認すること

| 参照先                                                                           | 確認する内容                                                           |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `@packages/web/src/components/atoms/svg/ApiIcon.stories.tsx`                     | `Meta`・`StoryObj` の型指定、`args` による表示の切り替え               |
| `@packages/web/src/components/organisms/GlobalNavigation.stories.tsx`            | memory routerの初期位置を指定する `parameters.web.initialPath`         |
| `@packages/web/src/components/organisms/home/StatsSection.stories.tsx`           | 固定件数を指定する `parameters.web.counts`                             |
| `@packages/stanza/stanzas/gmdb-component-detail/App.stories.tsx`                 | 実APIを使うコンポーネントの引数と `StoryProvider` の `reactQuery` 指定 |
| `@packages/stanza/stanzas/gmdb-find-media-by-organism-phenotype/App.stories.tsx` | `reactQuery` と `mui` を組み合わせたProvider指定                       |

これらは表の用途を確認するための例であり、ファイル全体を共通テンプレートとして扱わない。対象のコンポーネントが必要とする条件を、パッケージ別ガイドと実装から判断する。
