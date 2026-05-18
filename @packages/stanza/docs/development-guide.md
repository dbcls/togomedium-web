# Stanza Development Guide

## 目的

- このドキュメントでは、`@packages/stanza` でStanza自体を実装・更新するときの判断基準を扱う。
- `@packages/stanza/AGENTS.md` では入口となる判断基準と参照先だけを扱い、このドキュメントではStanza固有の実装ルールを扱う。

## このパッケージの前提

- `@packages/stanza` ではTogoStanzaを使ったWebComponentを開発する。
- Stanzaは、hbsテンプレートとJS/SCSSをWebComponentにバンドルするコンセプトから始まっている。
- UI実装はReactだけでなくMUIも前提にし、Shadow DOM内での描画やテーマ適用も含めて設計する。
  - Tailwind CSS + React Ariaも検討されたが、WebComponentとの相性の都合で採用していない。
- 本プロジェクトではJS/TS側でReactを全面的に採用している。そのため、テンプレートやSCSSはStanzaのボイラープレートに近い位置づけで維持し、マークアップはJSX/TSX、スタイリングは主にMUIで実装する。
- Web側へ組み込まれることを前提にしつつ、Stanza自体は再利用可能なWebComponentとして保てる構成を優先する。
- Stanzaの実装は長期にわたって積み上がっており、開発時期や担当者の違いから各ディレクトリで構成が完全には揃っていない。
  - 各stanzaは基本的にWebComponentとして閉じているため直ちに大きな問題ではないが、長期的には一部を除いて実装を揃えていく方針とする。

## 最初期のプロトタイプstanza

- `gmdb-gms-by-tid` `gmdb-roundtree`
  - これらは最初期の開発者がプロトタイプとして作成したstanzaで、現在はコードベースとして残している。
  - 新規実装や設計判断の参考にはせず、今後も最低限のメンテナンス対象として扱う。
  - 現行の開発対象stanzaに適用する実装方針や命名規約を考えるときは、判断材料に含めない。
  - Storybookやテストの整備対象外として扱う。

## ディレクトリの考え方

- `stanzas/` はstanzaごとの実装を担う。
- `components/` は複数stanzaから再利用するUI部品やproviderを担う。
- `utils/` はUIから切り離せる変換処理やデータ処理を担う。純粋関数としてテストしやすい形を優先する。
- `styles/` はMUI themeや全体のスタイル基盤を担う。
- `dist/` は生成物として扱い、手動編集しない。

## 実装時の判断基準

- 新しいstanzaを追加するときは `stanzas/<stanza-name>/` を作成し、既存stanzaと同じ構成を基準にする。
- 本プロジェクトではテンプレート中心ではなくReact中心で組み立てる前提のため、表示の中心はTSX側へ置く。
- stanza固有の業務知識や表示仕様が強いものは、無理に共通化せず `stanzas/<name>/` 配下に閉じ込める。
- 複数stanzaで再利用できるUIや描画基盤は `components/` `styles/` 側へ寄せる。
- データ取得、表示、イベント送出が1コンポーネントへ集中し始めたら、hooksや関数へ分離できないかを先に検討する。
- `style.scss` や `style.css` はstanza固有の事情があるときだけ使い、共通化できるものは `components/` や `styles/` 側を優先する。

## WebComponentとReactの境界

- WebComponentとしての入口は `index.tsx` 側に寄せ、画面ロジックをここへ詰め込みすぎない。
- stanzaの公開パラメータは `this.params` から受け取り、React側へ明示的に渡す。
- `metadata.json` はstanzaの公開インターフェースとして扱い、パラメータ追加や変更時は実装とセットで更新する。
- stanzaから外向きイベントを出すときは、イベント名とpayloadを利用側が追えるように明示する。
  - 現行の開発対象stanzaでは、外向きイベント名は `STANZA_RUN_ACTION` を使う。
  - 今後イベント種別が増えた場合は、命名規約を見直す可能性がある。
  - 最初期のプロトタイプstanzaのイベント名は、現行ルールの判断材料に含めない。

## MUIとprovider

- MUIのThemeやEmotion cacheは `@packages/stanza/components/providers/StanzaReactProvider.tsx` を通して適用する。
  - Themeの調整はまず `@packages/stanza/styles/muiTheme.ts` で吸収できないかを検討し、個別コンポーネントに同種の上書きを散らしすぎない。
  - Shadow DOM内での描画を前提にしているため、通常のReactアプリと同じ感覚でグローバルCSSに頼りすぎない。
  - フォント読み込みやwrapperの表示制御はprovider側にまとまっているため、同じ処理をstanza個別に重複させない。

## UI実装の考え方

- フォーム部品、Tab、Buttonなど既存でMUIを使っている箇所は、まず同系統のMUIコンポーネントで揃えられないかを検討する。
- 見た目の差分だけのために素のDOM実装へ戻すより、Themeや `styled` を使って既存のUI言語へ合わせることを優先する。
- MUI依存を広げすぎてロジックと描画が密結合にならないよう、状態管理やデータ整形はhooksや `utils/` へ分離する。

## 共通基盤の扱い

- `@packages/stanza/togostanza-build.js` と `@packages/stanza/tsconfig.json` では `%stanza/` `%core/` `%api/` などのエイリアスを前提にしているため、importは既存パターンに揃える。
- provider、theme、共通utilityに寄せられる責務は、stanza個別実装へ重複させない。
- 逆に、ひとつのstanzaに強く依存する状態構造やドメイン知識は、共通基盤へ早い段階で持ち込まない。

## `metadata.json` の扱い

- `stanza:label` `stanza:definition` `stanza:parameter` `stanza:style` などは、利用者がstanzaの用途を理解できる内容にする。
- `stanza:menu-placement` やイベント定義はWeb側の組み込みにも影響するため、既存stanzaとの整合性を確認する。
- `stanza:updated` は、実質的な変更を加えたときに更新する運用を意識する。

## 状態管理とデータ処理

- データ取得と、その取得結果に紐づく状態管理は原則としてTanStack Queryに寄せる。
- 状態管理は過去にRecoilを使っていた時期があり、その後Jotaiへ移行している。
  - 今後はデバッグやテストのしやすさを重視して、状態管理をReduxに寄せていく方針とする。
  - ReduxはRecoil/Jotaiと比べてコード量が増えやすいが、その点はAIの補助によって吸収できる前提で判断する。
  - 既存stanzaでは移行途中の構成が混在しているため、変更時は既存実装との差分を確認しつつ、むやみに状態管理の種類を増やさない。
- APIレスポンスの整形や木構造処理など、UIに依存しない処理は `functions/` や `utils/` に分けてテスト可能にする。

## 確認の進め方

- Stanzaの起動は遅いため、日常的な動作確認はStorybookを優先する。
  - ただし、最初期のプロトタイプstanzaはStorybookやテストの整備対象外として扱う。
- stanzaの変更後は、少なくとも対象stanzaの `README.md` `App.stories.tsx` `metadata.json` にずれがないかを確認する。
  - 挙動確認には `pnpm --filter @packages/stanza stanza:server` も使えるが、まずはStorybook上で確認する前提で考える。
  - 配布物確認が必要なときは `pnpm --filter @packages/stanza stanza:build` を使う。
  - ユーティリティや変換関数を変更したときは、既存の `*.spec.ts` に合わせてテスト追加や更新も検討する。

## 参照先

- `@packages/stanza/components/providers/StanzaReactProvider.tsx`
- `@packages/stanza/styles/muiTheme.ts`
- `@packages/stanza/togostanza-build.js`
- `@packages/stanza/stanzas/gmdb-component-detail/index.tsx`
- `@packages/stanza/stanzas/gmdb-component-detail/metadata.json`
