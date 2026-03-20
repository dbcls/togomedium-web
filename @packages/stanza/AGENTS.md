# AGENTS.md

## このパッケージについて

- `@packages/stanza` は TogoStanza ベースの WebComponent 群を扱うパッケージです。
- React アプリとは前提が少し異なるため、Web 側の実装をそのまま持ち込まないようにしてください。
- UI 実装には MUI を利用しており、React コンポーネントの構成だけでなく Theme や Shadow DOM 上での描画も前提になります。

## 作業時の方針

- Stanza の構成、MUI 利用、`metadata.json`、`index.tsx`、共通部品の切り分けなどの詳細は `@packages/stanza/docs/development-guide.md` を参照してください。
- 描画や配布形式に関わる変更では `dist/` ではなく元ソース側を編集してください。
- stanza 個別の実装と、`components/` `utils/` `styles/` に置く共通処理の境界を意識してください。
- SVG アイコン関連の作業では `docs/agents/task-guides/svgIcon.md` の指示も確認してください。
- `togostanza` 依存の都合で build や実行結果が変わりやすいため、変更後は対象 stanza の動作確認まで意識してください。

### 関連ガイド

- Stanza 固有の開発ガイドは `@packages/stanza/docs/development-guide.md` を確認してください。
- SVG アイコン関連の作業では `docs/agents/task-guides/svgIcon.md` を確認してください。

## よく使うコマンド

- 開発サーバー: `pnpm --filter @packages/stanza stanza:server`
- ビルド: `pnpm --filter @packages/stanza stanza:build`
- テスト: `pnpm --filter @packages/stanza test`
- 全体確認: ルートで `pnpm run fmt` `pnpm run lint` `pnpm run test`

## よく触る場所

- `stanzas/`
- `components/`
- `utils/`
- `styles/`
- `components/providers/`
- `stanzas/*/metadata.json`
- `stanzas/*/index.tsx`
- `togostanza-build.js`
