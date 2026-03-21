# gmdb-medium-builder

## この stanza について

- `gmdb-medium-builder` は、培地の構成を組み立てるための stanza です。
- Stanza 全体の共通方針は `@packages/stanza/docs/development-guide.md` を参照してください。
- この README では、`gmdb-medium-builder` を触る時に迷いやすい、この stanza 固有の前提だけを補足します。

## 実装方針

- 状態管理は `Redux` を前提にしてください。
  - `index.tsx` で `appStore` を `reduxStore` として渡す構成を基準にしています。
  - 新しい状態や更新処理を追加する時も、まずは既存の Redux の構成へ寄せてください。
- UI とスタイリングは `MUI` を前提にしてください。
  - レイアウトや見た目の実装は `@mui/material` と `@mui/material/styles` の `styled` を基準にしてください。
  - Stanza 全体の共通 theme と整合するように、既存の MUI ベースの実装へ寄せてください。
- 日常的な動作確認は `Storybook` を前提にしてください。
  - `App.stories.tsx` や各 component の stories を更新しながら確認する前提で進めてください。

## 関連する主なファイル

- `index.tsx`
- `App.tsx`
- `state/appStore.ts`
- `components/`
- `App.stories.tsx`
