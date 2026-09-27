# AGENTS.md

## このパッケージについて

- `@packages/web` はTogoMediumの公開用Webサイトを構成するパッケージ。
- ViteベースのReactフロントエンドで、TanStack Router、TanStack Query、Tailwind CSS 4系統を使って構成されている。
- 複雑な機能は、あらかじめStanzaとして実装されたWebComponentをWeb側に組み込む形で実現している。

## 作業時の方針

- ルーティング、画面構成、コンポーネント配置、データ取得、スタイリングの詳細な指針は `@packages/web/docs/coding-guidelines.md` を参照する。
- WebでStanzaを組み込むときは `@packages/web/docs/stanza-integration.md` を参照する。
- ルート追加や画面改修では、まず `src/routes/` と `src/pages/` のどちらが責務の中心かを切り分けてから編集する。
- Stanza連携の変更では、ページ側で直接custom elementを触らず、既存の `src/components/stanzas/` を起点に影響範囲を確認する。
- `src/routeTree.gen.ts` はTanStack Routerの自動生成ファイル。手動編集せず、必要な変更は `src/routes/` 側で行う。
- SVGアイコン関連の作業では `docs/agents/task-guides/svgIcon.md` を確認する。

## 起動と検証

起動・ビルドは `docs/development-guide.md`、検証コマンドと完了条件は `docs/testing-policy.md` に従う。

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
