# Web Coding Guidelines

## 目的

- このドキュメントは `@packages/web` で実装する際の、Web パッケージ固有のコーディング指針をまとめたものです。
- ルートの `docs/development/coding-guidelines.md` はリポジトリ全体の方針を扱い、このドキュメントでは Web 側の構成や実装パターンに絞って補足します。
- `@packages/web/AGENTS.md` では入口となる判断基準と参照先だけを扱い、このドキュメントでは実装時の具体ルールを扱います。

## ルーティング

- ルーティング実装は TanStack Router の規約に従ってください。
- 新しい画面を追加する時は、まず `src/routes/` に Route を追加し、そこから表示する page を `src/pages/` に必要に応じて作成してください。
- `src/routes/` の Route ファイルでは、TanStack Router の要件に合わせて `function RouteComponent()` のような `function` 宣言を使ってください。
- `src/routeTree.gen.ts` は TanStack Router が生成する自動生成ファイルです。手動編集してはいけません。
- `src/routeTree.gen.ts` はリンターやフォーマッターの対象外として扱ってください。

## page と route の責務

- `src/routes/` には URL と画面遷移に結びつく責務を置いてください。
- `src/pages/` には画面全体の構成と、その画面に閉じた状態管理を置いてください。
- route に JSX や表示ロジックを増やしすぎず、表示の中心は page へ分離してください。
- page から router の都合を直接広げすぎず、URL パラメータや検索条件の解釈が必要な箇所だけを route と接続してください。

## コンポーネント配置

- `src/components/` では atoms / molecules / organisms / wrappers / stanzas の責務を意識して配置してください。
- 汎用的な UI 部品は `atoms` や `molecules` に寄せ、画面固有のまとまりは `organisms` で扱ってください。
- レイアウトやアプリ全体の枠組みに関わるものは `wrappers` に配置してください。
- Stanza を扱うコンポーネントは通常の React UI コンポーネントと分け、`src/components/stanzas/` に配置してください。
- Stanza の詳細な扱いは `@packages/web/docs/stanza-integration.md` を参照してください。

## データ取得

- データ取得やキャッシュの責務は、TanStack Router と React Query のどちらに置くべきかを意識して決めてください。
- URL、検索条件、画面遷移と密接に結びつく状態は route 側との関係を確認してください。
- 取得データの表示に専念する処理は、できるだけ page や route から分離して扱ってください。
- React Query を使う場合でも、query key や取得条件が URL と強く結びつくなら route 側の責務から考え始めてください。
- API 呼び出しそのものと UI 表示の分岐が同じコンポーネントに密集し始めたら、hooks や `src/utils/` への分離を検討してください。

## スタイリング

- スタイリングは Tailwind CSS 4 系統を前提にしてください。
- クラス名の組み立てや条件分岐には `clsx` を使用してください。
- 見た目の都合だけで責務の異なるコンポーネントをまとめず、まず構造と責務を整理したうえでスタイルを適用してください。
- Stanza を内包するラッパーでは、見た目の調整だけで Stanza 側の責務を React コンポーネントへ寄せすぎないでください。

## 実装の考え方

- page には画面構成と画面固有の状態管理を置き、再利用可能な表示は `components` 側へ分離してください。
- ひとつのコンポーネントに表示、データ取得、イベント連携を詰め込みすぎないようにしてください。
- Web 側は公開サイトとしての使いやすさを担い、重い機能単位は Stanza と連携して実現する前提を意識してください。
- Web 側だけで完結しない機能を追加する時は、「React 側で持つべき責務か」「Stanza 側へ寄せるべき責務か」を先に整理してから実装してください。
