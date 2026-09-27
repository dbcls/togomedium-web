---
name: Storybook React Component
description: Storybookに対応するReactコンポーネントを作るための指示
---

## 概要

Reactの関数コンポーネントと、それに対応するStorybookのStoryファイルを作成する。

## 作成手順

コンポーネントの作成を依頼されたら、次の手順で進める。依頼に説明が含まれている場合は、その内容を反映する。

1. 作成先フォルダとコンポーネント名をユーザーに確認する。ファイルが添付されている場合も、同じ階層への作成を想定してよいか確認する。
2. 以下のテンプレートを使い、コンポーネントとStoryの2ファイルを作成先へ保存する。名前はユーザーが指定したコンポーネント名に合わせる。

### Component.tsx

```typescript jsx
import type { FC } from "react";

type Props = {};

export const Component: FC<Props> = () => {
  return <div>Component name as text here</div>;
};
```

### Component.stories.tsx

```typescript jsx
import { Component } from "PathToComponent";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: Component,
  args: {},
  decorators: [],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
```
