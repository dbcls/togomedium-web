---
name: SVG ICON
description: SVGのアイコンコンポーネントを作るための指示
---

## 概要

FontAwesomeのSVGコードから、アイコン用のReactコンポーネントとStorybookの確認用ファイルを作成する。この文書内のパスはリポジトリのルート基準。

Stanza用とWeb用では、作成先と使用技術が異なる。対象が曖昧な場合は、必ずどちらかをユーザーに確認する。

## 作成先と既存実装

| 対象   | 作成先                                    | 参照するコンポーネントとStory                               |
| ------ | ----------------------------------------- | ----------------------------------------------------------- |
| Web    | `@packages/web/src/components/atoms/svg/` | 同ディレクトリの `ApiIcon.tsx`、`ApiIcon.stories.tsx`       |
| Stanza | `@packages/stanza/components/icons/`      | 同ディレクトリの `FilterIcon.tsx`、`FilterIcon.stories.tsx` |

Webの例では、SVGに渡す `className`、`currentColor` による色の指定、Storyでのサイズ・色の切り替えを確認する。Stanzaの例では、MUIの `styled("svg")` と `sx`、Storyの表示用ラッパーを確認する。

既存例のSVG形状やProvider指定を、そのまま新しいアイコンへコピーするための一覧ではない。Storyの環境と必要なProviderは `docs/agents/task-guides/storybookComponent.md` と対象パッケージのガイドに従う。

## 新規作成

依頼の中に必要な情報がある場合は、確認を省いてその内容に従う。

1. 対象（StanzaまたはWeb）、SVGコード、FontAwesomeのURL、アイコン名を確認する。
2. 対象側の既存コンポーネントとStoryを読み、Propsとスタイルの渡し方を確認する。
3. 指定された名前でReactコンポーネントとStoryを作成する。SVGの `viewBox` と形状を反映し、サイズや色の指定は対象側の実装に合わせる。
4. 後述の方法で表示と利用箇所を確認する。

既存のWeb用 `ApiIcon` では、`@packages/web/src/components/atoms/svg/ApiIcon.tsx` と、隣接する `ApiIcon.stories.tsx` がコンポーネントと確認用ファイルに対応する。新規作成では、この組み合わせを参考に指定された名前の2ファイルを用意する。

## 既存アイコンの置き換え

1. 置き換え対象のコンポーネント、FontAwesomeのURL、アイコン名を確認する。
2. 現在のProps、利用箇所、Storyを確認してから、コンポーネントのSVGコードと参照URLを置き換える。`viewBox` も元SVGと照合する。
3. 既存Storyと利用箇所で、置き換え後の形状・サイズ・色を確認する。

## 確認

対象パッケージのStorybookを `docs/development-guide.md` の手順で起動する。ブラウザでの確認方法と一時成果物は `docs/agent-browser.md`、変更後の検証は `docs/testing-policy.md` に従う。

- 指定したSVGの形状が表示され、切れや縦横比の崩れがないか。
- Webでは `className`、Stanzaでは対象アイコンの `sx` などを通して、利用側のサイズ・色が反映されるか。
- 置き換えでは、既存の呼び出し方で表示できるか。

確認したStoryや利用箇所と、未確認事項を完了時に報告する。
