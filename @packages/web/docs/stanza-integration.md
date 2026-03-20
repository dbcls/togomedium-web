# Web Stanza Integration

## 目的

- このドキュメントは `@packages/web` で Stanza を組み込む時の実装パターンをまとめたものです。
- Web 側では Stanza を React コンポーネントとして直接扱うのではなく、`src/components/stanzas/` に置くラッパーコンポーネント経由で利用します。

## 前提

- Stanza は Web Component として配信されます。
- そのため、React の JSX だけでは custom element を型安全に扱えません。
- Stanza を追加・変更する時は、表示用コンポーネントだけでなく型定義もあわせて更新してください。

## 基本ルール

- page や通常の UI コンポーネントから直接 Stanza タグを書かず、`src/components/stanzas/` に専用ラッパーを作ってください。
- `stanzaName` と `togostanza-${stanzaName}` の対応は崩さず、変数化して明示してください。
- script の読み込みには `URL_STANZA` を使い、`<script src={\`${URL_STANZA}/${stanzaName}.js\`} type="module" async></script>` の形を基本にしてください。
- Stanza の属性は custom element 側の名前に合わせて指定してください。React 向けの props 名に勝手に読み替えないでください。
- `togostanza-menu-placement="none"` は共通指定として維持してください。

## 型定義

- React で custom element を使うため、`src/types/stanza.d.ts` に `JSX.IntrinsicElements` の定義を追加してください。
- 追加するタグ名は `togostanza-${stanzaName}` と一致させてください。
- 各 Stanza が受け取る属性も、この型定義に追加してください。
- 真偽値を文字列で受け取る属性があるため、必要に応じて `"true" | "false"` のような型を使ってください。

## 実装パターン

- まず `src/components/stanzas/` にラッパーコンポーネントを作成します。
- コンポーネント内で `stanzaName` と `StanzaTag` を定義します。
- `URL_STANZA` を使って対象 script を読み込みます。
- Stanza に渡す props は、custom element が受け取る属性名に変換して設定します。
- page 側ではこのラッパーコンポーネントだけを import して利用します。

## 実装上の注意

- 配列や boolean をそのまま渡せない場合があるため、Stanza 側が期待する文字列形式へ変換してください。
- Stanza が document event を使う場合は、`useEffect` でイベント登録と解除を対にして実装してください。
- Stanza 関連の DOM 構造や読み込み方法は通常の React コンポーネントと前提が異なるため、既存の `src/components/stanzas/` 配下の実装に合わせてください。

## 参照先

- `src/components/stanzas/ComponentAlignmentStanza.tsx`
- `src/components/stanzas/ListStanza.tsx`
- `src/components/stanzas/FindMediaByTaxonomicTreeStanza.tsx`
- `src/types/stanza.d.ts`
