# 共通コーディング指針

## 目的

この文書では、リポジトリ共通のコード規約と例外を定める。ルートの `AGENTS.md` には要約と参照先を置く。

## 言語方針

- JavaScriptではなくTypeScriptを優先して使用する。
- ユーザーがJavaScriptの概念について質問している場合でも、コード例を示す際はTypeScriptで型を付けたサンプルを優先する。

## 責務と副作用

- 読みやすさとメンテナンスしやすさを重視する。
- ひとつの関数やモジュールに責務を詰め込みすぎず、役割ごとに分割する。
- できるだけ純粋関数を優先し、副作用を持つ処理は境界を意識して分離する。
- 純粋関数にできる処理はテストしやすい形で実装し、必要に応じてテストも追加する。検証の詳細は `docs/testing-policy.md` を参照する。
- 命名は `docs/naming-convention.md` に従う。

## 関数定義

- 関数は `function` 宣言ではなく、アロー関数で定義する。

```typescript
// NG
function foo() {}

// OK
const bar = () => {};
```

### TanStack Routerの例外

- TanStack RouterのRouteファイルでは、`function RouteComponent()` のような `function` 宣言を使用する。

## Reactのimport

- Reactフックは `React.useState` のような名前空間経由ではなく、`useState` のように名前付きimportして使用する。

```typescript
// NG
import React from "react";

const [open, setOpen] = React.useState(false);

// OK
import React, { useState } from "react";

const [open, setOpen] = useState(false);
```

## 運用メモ

- パッケージごとに追加の規約や例外がある場合は、各ディレクトリの `AGENTS.md` に要約を書き、必要に応じてこのドキュメントへ追記する。
