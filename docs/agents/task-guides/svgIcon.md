---
name: SVG ICON
description: SVGのアイコンコンポーネントを作るための指示
---

## 概要

FontAwesomeのSVGコードから、アイコン用のReactコンポーネントとStorybookの確認用ファイルを作成する。

Stanza用とWeb用では、作成先と使用技術が異なる。対象が曖昧な場合は、必ずどちらかをユーザーに確認する。

## 作業フォルダ

- Stanza用
  - `@packages/stanza/components/icons`
- Web用
  - `@packages/web/src/components/atoms/svg`

## 新規作成

アイコンの作成を依頼されたら、次の手順で進める。依頼の中に必要な情報がある場合は、確認を省いてその内容に従う。

1. 必要事項を確認する
   - 対象: StanzaまたはWeb
   - SVGコード
   - FontAwesomeのURL
   - アイコン名
2. コードを作成する
   - Reactコンポーネント
   - Storybookファイルを作成する

## 既存アイコンの置き換え

アイコンの置き換えを依頼されたら、次の手順で進める。

1. 必要事項を確認する
   - 置き換え対象のアイコンコンポーネント
   - FontAwesomeのURL
   - アイコン名
2. コードの置き換えをする
   - ReactコンポーネントのSVGコードと参照URLを置き換える

## 入力と出力の例

以下のSVGコードとURLを使う場合は、`ApiIcon.tsx` と `ApiIcon.stories.tsx` を作成する。

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc.--><path d="M400 80l0 352-352 0 0-352 352 0zM48 32l-48 0 0 448 448 0 0-448-400 0zM86.1 176l80 80c-49.7 49.7-76.4 76.4-80 80l33.9 33.9 17-17 80-80 17-17c-.8-.8-33.1-33.1-97-97l-17-17-33.9 33.9zM216 336l-24 0 0 48 160 0 0-48-136 0z"/></svg>
```

https://fontawesome.com/icons/square-terminal?f=sharp&s=regular
