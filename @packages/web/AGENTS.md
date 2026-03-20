# AGENTS.md

## このパッケージについて

- `@packages/web` は TogoMedium の公開用 Web サイトを構成するパッケージです。
- Vite ベースの React フロントエンドで、TanStack Router、React Query、Tailwind CSS 4 系統を使って構成されています。
- 複雑な機能は、あらかじめ Stanza として実装された WebComponent を Web 側に組み込む形で実現しています。

## 作業時の方針

- ルーティング、画面構成、コンポーネント配置、データ取得、スタイリングの詳細な指針は `@packages/web/docs/coding-guidelines.md` を参照してください。
- Web で Stanza を組み込む時は `@packages/web/docs/stanza-integration.md` を参照してください。
- ルート追加や画面改修では、まず `src/routes/` と `src/pages/` のどちらが責務の中心かを切り分けてから編集してください。
- Stanza 連携の変更では、page 側で直接 custom element を触らず、既存の `src/components/stanzas/` を起点に影響範囲を確認してください。
- `src/routeTree.gen.ts` は TanStack Router の自動生成ファイルです。手動編集せず、必要な変更は `src/routes/` 側で行ってください。

### 関連ガイド

- Web 固有のコード規約は `@packages/web/docs/coding-guidelines.md` を確認してください。
- Web での Stanza 組み込み手順は `@packages/web/docs/stanza-integration.md` を確認してください。
- SVG アイコン関連の作業では `docs/agents/task-guides/svgIcon.md` を確認してください。

## よく使うコマンド

- 開発サーバー: `pnpm --filter @packages/web start`
- ビルド: `pnpm --filter @packages/web build`
- テスト: `pnpm --filter @packages/web test`
- 全体確認: ルートで `pnpm run fmt` `pnpm run lint` `pnpm run test`

## よく触る場所

- `src/routes/`
- `src/pages/`
- `src/components/`
- `src/components/stanzas/`
- `src/types/stanza.d.ts`
- `src/hooks/`
- `src/utils/`
- `src/consts/`
- `src/app.tsx`
- `src/main.tsx`
- `vite.config.ts`
