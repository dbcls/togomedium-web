# AGENTS.md

## このパッケージについて

- `@packages/stanza` は TogoStanza ベースの WebComponent 群を扱うパッケージです。
- React アプリとは前提が少し異なるため、Web 側の実装をそのまま持ち込まないようにしてください。

## 作業時の方針

- Stanza 固有の制約があるため、描画や配布形式に関わる変更では `dist/` ではなく元ソース側を編集してください。
- `stanzas/` `components/` `utils/` `styles/` のどこに責務を置くかを意識して、UI とデータ処理をなるべく分離してください。
- SVG アイコン関連の作業では `docs/agents/task-guides/svgIcon.md` の指示も確認してください。
- `togostanza` 依存の都合で build や実行結果が変わりやすいため、変更後は対象 stanza の動作確認まで意識してください。

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
- `togostanza-build.js`
