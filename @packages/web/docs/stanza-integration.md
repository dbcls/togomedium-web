# WebへのStanza組み込み

## 目的

この文書では、`@packages/web` にStanzaを組み込むときの実装パターンを示す。Web側では、`src/components/stanzas/` に置くラッパーコンポーネント経由でStanzaを利用する。

## 前提

- StanzaはWebComponentとして配信される。
- そのため、ReactのJSXだけではcustom elementを型安全に扱えない。
- Stanzaを追加・変更するときは、表示用コンポーネントだけでなく型定義もあわせて更新する。

## 基本ルール

- ページや通常のUIコンポーネントから直接Stanzaタグを書かず、`src/components/stanzas/` に専用ラッパーを作る。
- `stanzaName` と `togostanza-${stanzaName}` の対応は崩さず、変数化して明示する。
- スクリプトの読み込みには `URL_STANZA` を使い、`<script src={\`${URL_STANZA}/${stanzaName}.js\`} type="module" async></script>` の形を基本にする。
- Stanzaの属性はcustom element側の名前に合わせて指定する。React向けのprops名に勝手に読み替えない。
- `togostanza-menu-placement="none"` は共通指定として維持する。

## 型定義

- Reactでcustom elementを使うため、`src/types/stanza.d.ts` に `JSX.IntrinsicElements` の定義を追加する。
- 追加するタグ名は `togostanza-${stanzaName}` と一致させる。
- 各Stanzaが受け取る属性も、この型定義に追加する。
- 真偽値を文字列で受け取る属性があるため、必要に応じて `"true" | "false"` のような型を使う。

## 実装手順

1. `src/components/stanzas/` にラッパーコンポーネントを作成する。
2. コンポーネント内で `stanzaName` と `StanzaTag` を定義する。
3. `URL_STANZA` を使って対象スクリプトを読み込む。
4. Stanzaに渡すpropsを、custom elementが受け取る属性名に変換して設定する。
5. ページ側では、このラッパーコンポーネントだけをimportして利用する。

## 実装上の注意

- 配列やbooleanをそのまま渡せない場合があるため、Stanza側が期待する文字列形式へ変換する。
- Stanzaがdocument eventを使う場合は、`useEffect` でイベント登録と解除を対にして実装する。
- Stanza関連のDOM構造や読み込み方法は通常のReactコンポーネントと前提が異なるため、既存の `src/components/stanzas/` 配下の実装に合わせる。

## 参照先

- `src/components/stanzas/ComponentAlignmentStanza.tsx`
- `src/components/stanzas/ListStanza.tsx`
- `src/components/stanzas/FindMediaByTaxonomicTreeStanza.tsx`
- `src/types/stanza.d.ts`
