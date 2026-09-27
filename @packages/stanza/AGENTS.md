# AGENTS.md

## このパッケージについて

- `@packages/stanza` はTogoStanzaベースのWebComponent群を扱うパッケージ。
- WebComponentとして配布し、Shadow DOM内で描画するため、Web側の実装をそのまま持ち込まないようにする。
- UI実装にはMUIを利用しており、Reactコンポーネントの構成だけでなくテーマやShadow DOM上での描画も前提になる。

## 作業時の方針

- Stanzaの構成、MUI利用、`metadata.json`、`index.tsx`、共通部品の切り分けなどの詳細は `@packages/stanza/docs/development-guide.md` を参照する。
- 描画や配布形式に関わる変更では `dist/` ではなく元ソース側を編集する。
- Stanza固有の実装か、`components/` `utils/` `styles/` に置く共通処理かを区別する。
- SVGアイコン関連の作業では `docs/agents/task-guides/svgIcon.md` の指示も確認する。
- `togostanza` のバージョンによってビルドや実行結果が変わりやすいため、変更後は対象Stanzaの動作への影響も確認対象として考える。

## 起動と検証

起動・ビルドは `docs/development-guide.md`、検証コマンドと完了条件は `docs/testing-policy.md` に従う。Stanza固有の確認対象は `@packages/stanza/docs/development-guide.md` の「確認の進め方」を参照する。

## よく触る場所

- `stanzas/`
- `components/`
- `utils/`
- `styles/`
- `components/providers/`
- `stanzas/*/metadata.json`
- `stanzas/*/index.tsx`
- `togostanza.config.ts`
