# 命名規約

## この文書の役割

この文書では、TogoMedium Webリポジトリで今後の新規実装や変更対象コードに適用する命名規約を定める。

- 対象:
  - TypeScriptの型名、変数名、関数名、定数名、Reactコンポーネント名
  - ファイル名、ディレクトリ名
  - API定義、Zod schema、Stanza関連の識別子
- 対象外:
  - コードスタイル全般。関数定義やimport方針は `docs/development/coding-guidelines.md` を参照する
  - format / lint / testの運用。検証方針は `docs/testing-policy.md` を参照する
  - ドメイン用語やIDの意味。用語説明は `docs/domain-terms.md` を参照する

この規約は、既存コード全体の即時リネーム計画ではない。既存コードには開発時期や担当者の違いによる揺れがあるため、今後触る範囲からこの文書の規約へ寄せる。

## 基本ルール

- 型名 / クラス名 / Reactコンポーネント名: `PascalCase`
  - 例: `MediumDetailResponse`, `TaxonomyType`, `MediumDetailPage`
- 変数名 / 関数名 / React Hooks: `camelCase`
  - 例: `gmId`, `taxId`, `fetchData`, `usePageTitle`
- 定数: 原則として `UPPER_SNAKE_CASE`
  - 例: `PATH_LIST_MEDIA`, `DEFAULT_FEEDBACK_AUTO_HIDE_DURATION`
- 外部APIや外部データのフィールド名: 外部仕様の表記を維持する
  - 例: APIレスポンスやリクエストの `gm_id`, `gmo_id`, `tax_id`, `strain_id`
- TypeScript内部の識別子: `camelCase` に変換する
  - 例: `gmId`, `gmoId`, `taxId`, `strainId`

略語やIDの意味は名前だけで判断しない。`GM ID` と `GMO ID` のように別の意味を持つ語は、`docs/domain-terms.md` を確認してから命名する。

## ファイルとディレクトリ

### Reactコンポーネント

Reactコンポーネント、page、wrapper、Storybook用の表示コンポーネントは `PascalCase` にする。

- 例: `HomePage.tsx`
- 例: `MediumDetailStanza.tsx`
- 例: `GlobalNavigation.tsx`
- 例: `PageWrapper.tsx`

コンポーネントのStorybookファイルは、対象ファイル名に `.stories` を付ける。

- 例: `ImportDialog.stories.tsx`
- 例: `StanzaView.stories.tsx`

### ロジックと状態

utility、hook、state、selector、thunk、schema、mapperなど、Reactコンポーネント以外の実装ファイルは `camelCase` にする。

- 例: `fetch.ts`
- 例: `createCustomHistory.ts`
- 例: `appDataSchema.ts` ではなく、既存のまとまりに合わせる場合は `appData.ts`
- 例: `selectDocumentSolutions.ts`
- 例: `replaceImportedAppStateThunk.ts`

テストファイルは、対象ファイル名に `.spec` を付ける。

- 例: `makeLinkPath.spec.ts`
- 例: `draftImport.spec.ts`
- 例: `FeedbackSnackbar.spec.tsx`

### ルート定義

`@packages/web/src/routes/` 配下はTanStack Routerのfile-based routing規則に従う。

- URLパスに対応するファイルは `kebab-case` を使う
  - 例: `find-media-by-components.lazy.tsx`
  - 例: `compare-media-by-taxids.lazy.tsx`
- 動的パラメータは `$paramName` を使う
  - 例: `medium/$gmId.tsx`
  - 例: `component/$gmoId.tsx`
  - 例: `taxon/$taxId.tsx`
- TanStack Routerが要求する特別な名前はそのまま使う
  - 例: `__root.tsx`
  - 例: `index.lazy.tsx`
- 自動生成ファイルは手動で命名変更しない
  - 例: `routeTree.gen.ts`

### Stanza

Stanzaの外部から参照される識別子は、WebComponentとしての公開名を優先する。

- stanzaディレクトリ名: `gmdb-...` の `kebab-case`
  - 例: `gmdb-medium-builder`
  - 例: `gmdb-find-media-by-taxonomic-tree`
- `metadata.json` や配布名など、外部から参照される名前は既存のStanza名に合わせる。

一方で、stanza内部の実装では、文脈上明らかなprefixを重ねない。

- 各stanzaディレクトリ配下では、内部コンポーネントや関数に原則として `Gmdb` / `GMDB` やstanza名由来のprefixを付けない。
- 例: `@packages/stanza/stanzas/gmdb-medium-builder` 配下では、内部名に `MediumBuilder` prefixを付けない。
- 例: `ImportDialog`, `FeedbackSnackbar`, `draftImport`, `draftExport`
- 外部公開API、Stanza登録名、metadata、ディレクトリ名ではprefixを維持する。

## API関連

`@packages/api` では、既存の命名に合わせてendpoint単位の名前を基準にする。

### endpointディレクトリ

API endpointごとのディレクトリは `camelCase` にする。

- 例: `listMedia`
- 例: `componentDetail`
- 例: `gtdbTaxonChildren`

deprecated APIや旧構成には `PascalCase` ディレクトリなどの揺れが残っているが、新規実装の参考にはしない。

### 型とschema

- APIレスポンス型: `XxxResponse`
  - 例: `ListMediaResponse`
  - 例: `MediumDetailResponse`
- APIパラメータ型: `XxxParams`
  - 例: `ListMediaParams`
  - 例: `ComponentDetailParams`
- Zod schema: `xxxSchema`
  - 例: `mediumDetailResponseSchema`
  - 例: `listMediaParamsSchema`
- 共通schema生成関数: `createXxxSchema`
  - 例: `createListApiResponseSchema`
  - 例: `createListApiParamsSchema`

このリポジトリでは、API入力型の接尾辞は `RequestParams` ではなく、既存の `Params` を標準にする。

### API path定数

API pathを表す定数は `PATH_...` の `UPPER_SNAKE_CASE` にする。

- 例: `PATH_LIST_MEDIA`
- 例: `PATH_COMPONENTS_WITH_COMPONENTS`
- 例: `PATH_GTDB_TAXON_CHILDREN`

値としてのAPI pathは、外部API名に合わせて `snake_case` を維持する。

- 例: `"/gmdb_list_media_by_gmids"`
- 例: `"/gmdb_taxonomy_children"`

`PATH_...` は OpenAPI の path として扱うため、値は `/` で始める。
API URL が必要な利用側では、`definitions.ts` で完成済み URL 定数を export せず、`makeApiUrl(PATH_...)` で生成する。

## Propsとexport

Reactコンポーネントのprops型は、利用範囲に応じて名前を分ける。

- 同一ファイル内だけで使うprops型: `Props`
  - 例: `type Props = { id: string }`
- 外部へ公開するprops型: `ComponentNameProps`
  - 例: `ImportDialogProps`
  - 例: `AppProps`

通常の `export` はproductionコード間で使うものに限定する。テストからだけ参照する内部実装は、まず同一ファイル内に閉じられないか確認する。

テストから内部実装を直接参照する必要がある場合は、`docs/testing-policy.md` の `__TEST__` export 方針に従う。

## 例外と既存の揺れ

次のものは、この文書の標準ルールをそのまま適用しない。

- deprecatedな `@packages/api-doc`
  - 旧TypeSpec構成の参照用として残っているため、新規命名の標準例にはしない。
- 自動生成ファイル
  - 例: `@packages/web/src/routeTree.gen.ts`
- frameworkやtoolが要求する名前
  - 例: TanStack Routerの `__root.tsx`, `$param.tsx`
- 初期プロトタイプstanza
  - `@packages/stanza/docs/development-guide.md` で示されている `gmdb-gms-by-tid` と `gmdb-roundtree` は、現行の実装方針や命名規約の判断材料に含めない。
- legacy、typo、mixed styleの既存名
  - 既存コードに残っていても、新規コードでは再利用しない。

例外が必要な場合は、名前の近くに理由を短く残す。ただし、外部API仕様、生成物、framework規約のように理由が明らかな場合は不要とする。
