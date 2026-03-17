# AGENTS.md

## このパッケージについて

- `@packages/api-doc` は TypeSpec と Vite を使って API ドキュメント用アセットを作るパッケージです。
- このパッケージは今後廃止予定です。
- 以前は TypeSpec で API 定義を書き、ここから生成物を書き出していましたが、現在は `@packages/api` で zod から OpenAPI を書き出す現行構成を採用しています。
- そのため、このパッケージは主に `@packages/api` 開発時の参照用として残しています。
- `package.json` に deprecated とある通り、このパッケージは段階的に縮小・置き換えされる前提があります。

## 作業時の方針

- 新規開発は原則として行わず、参照や最小限の保守にとどめてください。大きな機能追加は避け、必要ならユーザーに確認してください。
- API 定義まわりの変更では、まず `@packages/api` 側で対応できないかを確認してください。
- TypeSpec 関連の作業では `src/main.tsp` を起点に見てください。
- `scripts/` 配下は生成やコピー処理に関わるため、変更時は出力先への影響を確認してください。

## よく使うコマンド

- 開発: `pnpm --filter @packages/doc dev`
- ビルド: `pnpm --filter @packages/doc bundle`
- 整形・検証: ルートで `pnpm run fmt` `pnpm run lint` `pnpm run test`

## よく触る場所

- `src/`
- `public/`
- `scripts/`
- `vite.config.ts`
