# Web側のReactコンポーネントのStory

起動・ビルドは `docs/development-guide.md` に従う。設定は `.storybook/`、Storyは対象のReactコンポーネントの隣に `Component.stories.tsx` として置く。本番の `src/index.css` を読み込み、テーマや角丸をStory用に複製しない。StanzaのWeb Componentsや本番ページのルートは読み込まない。

## 表示環境

共通decoratorが各Storyに独立したQueryClientとmemory routerを与える。同じStoryの通常の再描画では保持し、別Storyへの切替や再マウントで初期化する。Docsで複数Storyを同時表示しても共有しない。

Storyの `parameters.web` に、次を指定できる。これらはマウント時の初期値として扱う。

```typescript
parameters: {
  web: {
    initialPath: "/medium",
    counts: { media: 2400, strains: 12500, components: 850 },
  },
}
```

内部リンクと検索送信はmemory router内で遷移し、コンポーネントはそのまま表示する。ブラウザ本体のURLと本番のページ・loaderは変更しない。外部リンクは元のコンポーネントどおりに動く。Storybookではコンポーネント自体の見た目を確認し、遷移先などの検証用UIは追加しない。ルーターの遷移と状態保持はテスト内のprobeで確認する。

## 固定データ

統計用3クエリは `.storybook/fixtures.ts` の件数をキャッシュに設定する。`counts` でStoryごとの件数を指定できる。新しい取得対象は明示的にfixtureを追加する。

Storybook専用Vite設定で `@/utils/fetch`（`.ts` 付きも対応）を `fixtureFetch.ts` に置き換える。未登録APIはエラーにし、実通信へのフォールバックはしない。本番Vite設定はこの置き換えを使わない。新しいStoryから直接 `fetch` を呼ばず、この通信境界を使う。Google Fontsは本番CSSの外部フォントを利用するため、API非接続と完全なオフライン対応は異なる。

## 確認

`docs/testing-policy.md` に従い、表示、操作、Story切替、API通信がないことを確認する。基盤の状態保持テストは `.storybook/StoryProvider.spec.tsx` に置く。Storybookは本番UIの不具合を隠すための環境ではないため、見つけた既存不具合はStory実装と切り分ける。
