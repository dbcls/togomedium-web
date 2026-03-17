# AGENTS.md

## このパッケージについて

- `@packages/web` は Vite ベースの React フロントエンドです。
- TanStack Router を使っており、Route ファイルでは `function RouteComponent()` を使う例外ルールがあります。

## 作業時の方針

- 画面実装では `src/pages/` と `src/routes/` の責務を分け、ページ本体とルーティング設定を混ぜないでください。
- 自動生成物の可能性がある `src/routeTree.gen.ts` は手編集する前に生成フローを確認してください。
- SVG アイコン関連の作業では `docs/agents/task-guides/svgIcon.md` を確認してください。
- Stanza と Web で似た UI があっても、依存や配置ルールが違う可能性があるためそのまま流用しないでください。

## よく使うコマンド

- 開発サーバー: `pnpm --filter @packages/web start`
- ビルド: `pnpm --filter @packages/web build`
- テスト: `pnpm --filter @packages/web test`
- 全体確認: ルートで `pnpm run fmt` `pnpm run lint` `pnpm run test`

## よく触る場所

- `src/routes/`
- `src/pages/`
- `src/components/`
- `src/hooks/`
- `vite.config.ts`
