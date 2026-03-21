# Coding Guidelines

## 目的

- このドキュメントは、このリポジトリでコードを変更する際の基本的な規約をまとめたものです。
- ルートの `AGENTS.md` には要約のみを残し、詳細な規約や例外はこのドキュメントで管理します。

## 言語方針

- JavaScript ではなく TypeScript を優先して使用してください。
- ユーザーが JavaScript の概念について質問している場合でも、コード例を示す際は TypeScript で型を付けたサンプルを優先してください。

## 関数定義

- 関数は `function` 宣言ではなく、アロー関数で定義してください。

```typescript
// NG
function foo() {}

// OK
const bar = () => {};
```

## 例外

- TanStack Router の Route ファイルでは、`function RouteComponent()` のような `function` 宣言を使用してください。

## React の import

- React Hooks は `React.useState` のような名前空間経由ではなく、`useState` のように named import して使用してください。

```typescript
// NG
import React from "react";

const [open, setOpen] = React.useState(false);

// OK
import React, { useState } from "react";

const [open, setOpen] = useState(false);
```

## 運用メモ

- パッケージごとに追加の規約や例外がある場合は、各ディレクトリの `AGENTS.md` に要約を書き、必要に応じてこのドキュメントへ追記してください。
