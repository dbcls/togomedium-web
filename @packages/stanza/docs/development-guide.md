# Stanza Development Guide

## 目的

- このドキュメントは `@packages/stanza` で Stanza 自体を実装・更新する時の判断基準をまとめたものです。
- `@packages/stanza/AGENTS.md` では入口となる判断基準と参照先だけを扱い、このドキュメントでは Stanza 固有の実装ルールを扱います。

## このパッケージの前提

- `@packages/stanza` では TogoStanza を使った WebComponent の開発を行います。
- Stanza はもともと、hbs のテンプレートと JS / SCSS を WebComponent にバンドルするコンセプトから始まっています。
- UI 実装は React だけでなく MUI を前提にしており、Shadow DOM 内での描画やテーマ適用も含めて設計してください。
  - Tailwind CSS + React Aria も検討されましたが、WebComponent との相性の都合で採用していません。
- 本プロジェクトでは JS / TS 側で React を全面的に採用しているため、テンプレートや SCSS は Stanza のボイラープレートに近い位置づけで維持し、マークアップは JSX / TSX、スタイリングは主に MUI で実装しています。
- Web 側へ組み込まれることを前提にしていますが、Stanza 自体は再利用可能な WebComponent として保てる構成を優先してください。
- Stanza の実装は長期にわたって積み上がっており、開発時期や担当者の違いから各ディレクトリで構成が完全には揃っていません。
  - 各 stanza は基本的に WebComponent として閉じているため直ちに大きな問題ではありませんが、長期的には一部を除いて実装を揃えていく方針です。

## 最初期のプロトタイプ stanza

- `gmdb-gms-by-tid` `gmdb-roundtree`
  - これらは最初期の開発者がプロトタイプとして作成した stanza で、現在はコードベースとして残しているだけです。
  - 新規実装や設計判断の参考にはせず、今後も最低限のメンテナンス対象として扱ってください。
  - 現行の開発対象 stanza に適用する実装方針や命名規約を考える時は、これらを判断材料に含めなくて構いません。
  - Storybook やテストの整備対象外として扱ってください。

## ディレクトリの考え方

- `stanzas/` には stanza ごとの実装を置いてください。
- `components/` には複数 stanza から再利用する UI 部品や provider を置いてください。
- `utils/` には UI から切り離せる変換処理やデータ処理を置き、純粋関数としてテストしやすい形を優先してください。
- `styles/` には MUI theme や全体のスタイル基盤を置いてください。
- `dist/` は生成物として扱い、手動編集しないでください。

## 実装時の判断基準

- 新しい stanza を追加する時は `stanzas/<stanza-name>/` を作成し、既存 stanza と同じ構成を基準にしてください。
- 本プロジェクトではテンプレート中心ではなく React 中心で組み立てる前提のため、表示の中心は TSX 側へ置いてください。
- stanza 固有の業務知識や表示仕様が強いものは、無理に共通化せず `stanzas/<name>/` 配下に閉じ込めてください。
- 複数 stanza で再利用できる UI や描画基盤は `components/` `styles/` 側へ寄せてください。
- データ取得、表示、イベント送出が 1 コンポーネントへ集中し始めたら、hooks や関数へ分離できないかを先に検討してください。
- `style.scss` や `style.css` は stanza 固有の事情がある時だけ使い、共通化できるものは `components/` や `styles/` 側を優先してください。

## WebComponent と React の境界

- WebComponent としての入口は `index.tsx` 側に寄せ、画面ロジックをここへ詰め込みすぎないでください。
- stanza の公開パラメータは `this.params` から受け取り、React 側へ明示的に渡してください。
- `metadata.json` は stanza の公開インターフェースとして扱い、パラメータ追加や変更時は実装とセットで更新してください。
- stanza から外向きイベントを出す時は、イベント名と payload を利用側が追えるように明示してください。
  - 現行の開発対象 stanza では、外向きイベント名は現状 `STANZA_RUN_ACTION` を使う方針です。
  - ただし今後イベント種別が増えてきた場合は、命名規約を見直す可能性があります。
  - 最初期のプロトタイプ stanza のイベント名は、現行ルールの判断材料に含めなくて構いません。

## MUI と provider

- MUI の Theme や Emotion cache は `components/providers/StanzaReactProvider.tsx` を通して適用されています。
  - Theme の調整はまず `styles/muiTheme.ts` で吸収できないかを検討し、個別コンポーネントに同種の上書きを散らしすぎないでください。
  - Shadow DOM 内での描画を前提にしているため、通常の React アプリと同じ感覚でグローバル CSS に頼りすぎないでください。
  - フォント読み込みや wrapper の表示制御は provider 側にまとまっているため、同じ処理を stanza 個別に重複させないでください。

## UI 実装の考え方

- フォーム部品、Tab、Button など既存で MUI を使っている箇所は、まず同系統の MUI コンポーネントで揃えられないかを検討してください。
- 見た目の差分だけのために素の DOM 実装へ戻すより、Theme や `styled` を使って既存の UI 言語へ合わせることを優先してください。
- MUI 依存を広げすぎてロジックと描画が密結合にならないよう、状態管理やデータ整形は hooks や `utils/` へ分離してください。

## 共通基盤の扱い

- `togostanza-build.js` と `tsconfig.json` で `%stanza/` `%core/` `%api/` などのエイリアスを前提にしているため、import は既存パターンに揃えてください。
- provider、theme、共通 utility に寄せられる責務は、stanza 個別実装へ重複させないでください。
- 逆に、ひとつの stanza に強く依存する状態構造やドメイン知識は、共通基盤へ早い段階で持ち込まないでください。

## `metadata.json` の扱い

- `stanza:label` `stanza:definition` `stanza:parameter` `stanza:style` などは、利用者が stanza の用途を理解できる内容にしてください。
- `stanza:menu-placement` やイベント定義は Web 側の組み込みにも影響するため、既存 stanza との整合性を確認してください。
- `stanza:updated` は、実質的な変更を加えた時に更新する運用を意識してください。

## 状態管理とデータ処理

- データ取得と、その取得結果に紐づく状態管理は原則として TanStack Query に寄せてください。
- 状態管理は過去に Recoil を使っていた時期があり、その後 Jotai へ移行しています。
  - 今後はデバッグやテストのしやすさを重視して、状態管理を Redux に寄せていく方針です。
  - Redux は Recoil / Jotai と比べてコード量が増えやすいという懸念がありますが、その点は AI の補助によって吸収できる前提で判断しています。
  - 既存 stanza では移行途中の構成が混在しているため、変更時は既存実装との差分を確認しつつ、むやみに状態管理の種類を増やさないでください。
- API レスポンスの整形や木構造処理など、UI に依存しない処理は `functions/` や `utils/` に分けてテスト可能にしてください。

## 確認の進め方

- Stanza の起動は遅いため、日常的な動作確認は Storybook を優先してください。
  - ただし、最初期のプロトタイプ stanza は Storybook やテストの整備対象外として扱ってください。
- stanza の変更後は、少なくとも対象 stanza の `README.md` `App.stories.tsx` `metadata.json` にずれがないかを確認してください。
  - 挙動確認には `pnpm --filter @packages/stanza stanza:server` も使えますが、まずは Storybook 上で確認する前提で考えてください。
  - 配布物確認が必要な時は `pnpm --filter @packages/stanza stanza:build` を使ってください。
  - ユーティリティや変換関数を変更した時は、既存の `*.spec.ts` に合わせてテスト追加や更新も検討してください。

## 参照先

- `components/providers/StanzaReactProvider.tsx`
- `styles/muiTheme.ts`
- `togostanza-build.js`
- `stanzas/gmdb-component-detail/index.tsx`
- `stanzas/gmdb-component-detail/metadata.json`
