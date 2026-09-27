# AGENTS.md

## このパッケージについて

- `@packages/api` はAPIの型・スキーマ定義を置くためのパッケージ。
- `src/openAPI.ts` の `getDocs()` がZodからOpenAPIオブジェクトを生成し、WebのAPI画面へ渡す。ファイルへの書き出しを前提にしない。全体の関係は `docs/architecture.md` を参照する。
- 検証は `docs/testing-policy.md` に従う。

## 作業時の方針

- ZodとOpenAPIまわりの型定義を壊さないよう、ランタイム実装よりも型の整合性を優先する。
- 型・スキーマ定義を中心に保つため、共通ロジックを増やす前に `@packages/core` に置くべきかを確認する。
- 新しい公開インターフェースを増やすときは、利用側がどのパッケージかを確認してから命名する。

## よく触る場所

- `src/`
- `package.json`
