# Webコーディング指針

## 目的

この文書では、`@packages/web` 固有の構成と実装ルールを定める。共通のコード規約は `docs/development/coding-guidelines.md`、作業開始時の注意点は `@packages/web/AGENTS.md` を参照する。

## ルーティング

- ルーティング実装はTanStack Routerの規約に従う。
- 新しい画面を追加するときは、まず `src/routes/` にRouteを追加し、そこから表示するページを `src/pages/` に必要に応じて作成する。
- `src/routes/` のRouteファイルでは、TanStack Routerの要件に合わせて `function RouteComponent()` のような `function` 宣言を使う。
- `src/routeTree.gen.ts` はTanStack Routerが生成する自動生成ファイル。手動編集してはいけない。
- `src/routeTree.gen.ts` はリンターやフォーマッターの対象外として扱う。

## ページとルートの責務

- `src/routes/` にはURLと画面遷移に結びつく責務を置く。
- `src/pages/` には画面全体の構成と、その画面に閉じた状態管理を置く。
- ルートにJSXや表示ロジックを増やしすぎず、表示の中心はページへ分離する。
- ページとルーターの結びつきは、URLパラメータや検索条件の解釈が必要な箇所に限定する。

## コンポーネント配置

- `src/components/` では、次の責務に応じて `atoms` / `molecules` / `organisms` / `wrappers` / `stanzas` に配置する。
- 汎用的なUI部品は `atoms` や `molecules` に寄せ、画面固有のまとまりは `organisms` で扱う。
- レイアウトやアプリ全体の枠組みに関わるものは `wrappers` に配置する。
- Stanzaを扱うコンポーネントは通常のReact UIコンポーネントと分け、`src/components/stanzas/` に配置する。
- Stanzaの詳細な扱いは `@packages/web/docs/stanza-integration.md` を参照する。

## データ取得

- データ取得やキャッシュの配置は、URLや画面遷移との関係を確認し、TanStack RouterとTanStack Queryのどちらが担うかを決める。
- URL、検索条件、画面遷移と密接に結びつく状態はルート側との関係を確認する。
- 取得データの表示に専念する処理は、できるだけページやルートから分離して扱う。
- TanStack Queryを使う場合でも、クエリキーや取得条件がURLと強く結びつくならルート側の責務から考え始める。
- API呼び出しそのものとUI表示の分岐が同じコンポーネントに密集し始めたら、フックや `src/utils/` への分離を検討する。

## スタイリング

- スタイリングはTailwind CSS 4系統を前提にする。
- クラス名の組み立てや条件分岐には `clsx` を使用する。
- 見た目の都合だけで責務の異なるコンポーネントをまとめず、まず構造と責務を整理したうえでスタイルを適用する。
- Stanzaを内包するラッパーでは、見た目の調整だけでStanza側の責務をReactコンポーネントへ寄せすぎない。

## 実装の考え方

- ページには画面構成と画面固有の状態管理を置き、再利用可能な表示は `components` 側へ分離する。
- ひとつのコンポーネントに表示、データ取得、イベント連携を詰め込みすぎないようにする。
- Web側は公開サイトとしての使いやすさを担い、重い機能単位はStanzaと連携して実現する前提を意識する。
- Web側だけで完結しない機能を追加するときは、「React側で持つべき責務か」「Stanza側へ寄せるべき責務か」を先に整理してから実装する。
