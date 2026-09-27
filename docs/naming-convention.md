# 命名規約

## この文書の役割

この文書では、TogoMedium Webリポジトリで今後の新規実装や変更対象コードに適用する命名規約を定める。

- 対象:
  - TypeScriptの型名、変数名、関数名、定数名、Reactコンポーネント名
  - ファイル名、ディレクトリ名
  - API定義、Zodスキーマ、Stanza関連の識別子
- 対象外:
  - コードスタイル全般。関数定義やimport方針は `docs/development/coding-guidelines.md` を参照する
  - format / lint / testの運用。検証方針は `docs/testing-policy.md` を参照する
  - ドメイン用語やIDの意味。用語説明は `docs/domain-terms.md` を参照する

この規約は、既存コード全体の即時リネーム計画ではない。既存コードには開発時期や担当者の違いによる揺れがあるため、今後触る範囲からこの文書の規約へ寄せる。

## 基本ルール

- 型名 / クラス名 / Reactコンポーネント名: `PascalCase`
  - 例: `MediumDetailResponse`, `TaxonomyType`, `MediumDetailPage`
- 変数名 / 関数名 / Reactフック: `camelCase`
  - 例: `gmId`, `taxId`, `fetchData`, `usePageTitle`
- 定数: 原則として `UPPER_SNAKE_CASE`
  - 例: `PATH_LIST_MEDIA`, `DEFAULT_FEEDBACK_AUTO_HIDE_DURATION`
- 外部APIや外部データのフィールド名: 外部仕様の表記を維持する
  - 例: APIレスポンスやリクエストの `gm_id`, `gmo_id`, `tax_id`, `strain_id`
- TypeScript内部の識別子: `camelCase` に変換する
  - 例: `gmId`, `gmoId`, `taxId`, `strainId`

略語やIDの意味は名前だけで判断しない。`GM ID` と `GMO ID` のように別の意味を持つ語は、`docs/domain-terms.md` を確認してから命名する。

### 用語とIDを名前に使うとき

- `media` は `medium` の複数形として使う。画面名やAPI名では既存の `media` 表記に合わせる。
- GMO IDを扱う名前は、成分・Role・Propertyなど、対象が分かる文脈で使う。既存APIの `gmo_id` など、公開済みの識別子は維持する。
- `organism`、`taxon`、`strain` が混ざる場合は、対象の粒度が分かる名前にする。
- 新規命名では、単一の分類群は `taxon`、分類体系や階層構造は `taxonomy` を優先する。
- phenotype検索では、UI上の選択条件、APIへの検索条件、検索結果のorganismを区別する。
- `GM ID` と `GMO ID` は別の識別子なので、短縮して `id` だけにしない。
- NCBI以外のtaxonomyを扱う場合は、`taxonomyType` や `gtdbTaxon...` のように区別できる名前にする。
- 通常の画面や新規StanzaでKEGG TIDを扱う場合は、他のIDとの混同を避けるためKEGG由来だと分かる名前にする。

## ファイルとディレクトリ

### Reactコンポーネント

Reactコンポーネント、ページ、ラッパー、Storybook用の表示コンポーネントは `PascalCase` にする。

- 例: `HomePage.tsx`
- 例: `MediumDetailStanza.tsx`
- 例: `GlobalNavigation.tsx`
- 例: `PageWrapper.tsx`

コンポーネントのStorybookファイルは、対象ファイル名に `.stories` を付ける。

- 例: `ImportDialog.stories.tsx`
- 例: `StanzaView.stories.tsx`

### ロジックと状態

ユーティリティ、フック、状態、セレクター、Thunk、スキーマ、マッパーなど、Reactコンポーネント以外の実装ファイルは `camelCase` にする。

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

`@packages/web/src/routes/` 配下はTanStack Routerのファイルベースルーティング規則に従う。

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

- Stanzaディレクトリ名: `gmdb-...` の `kebab-case`
  - 例: `gmdb-medium-builder`
  - 例: `gmdb-find-media-by-taxonomic-tree`
- `metadata.json` や配布名など、外部から参照される名前は既存のStanza名に合わせる。

一方で、Stanza内部の実装では、文脈上明らかな接頭辞を重ねない。

- 各Stanzaディレクトリ配下では、内部コンポーネントや関数に原則として `Gmdb` / `GMDB` やStanza名由来の接頭辞を付けない。
- 例: `@packages/stanza/stanzas/gmdb-medium-builder` 配下では、内部名に `MediumBuilder` 接頭辞を付けない。
- 例: `ImportDialog`, `FeedbackSnackbar`, `draftImport`, `draftExport`
- 外部公開API、Stanza登録名、metadata、ディレクトリ名では接頭辞を維持する。

## API関連

`@packages/api` では、既存の命名に合わせてエンドポイント単位の名前を基準にする。

### エンドポイントディレクトリ

APIエンドポイントごとのディレクトリは `camelCase` にする。

- 例: `listMedia`
- 例: `componentDetail`
- 例: `gtdbTaxonChildren`

非推奨APIや旧構成には `PascalCase` ディレクトリなどの揺れが残っているが、新規実装の参考にはしない。

### 型とスキーマ

- APIレスポンス型: `XxxResponse`
  - 例: `ListMediaResponse`
  - 例: `MediumDetailResponse`
- APIパラメータ型: `XxxParams`
  - 例: `ListMediaParams`
  - 例: `ComponentDetailParams`
- Zodスキーマ: `xxxSchema`
  - 例: `mediumDetailResponseSchema`
  - 例: `listMediaParamsSchema`
- 共通スキーマ生成関数: `createXxxSchema`
  - 例: `createListApiResponseSchema`
  - 例: `createListApiParamsSchema`

このリポジトリでは、API入力型の接尾辞は `RequestParams` ではなく、既存の `Params` を標準にする。

### APIパス定数

APIパスを表す定数は `PATH_...` の `UPPER_SNAKE_CASE` にする。

- 例: `PATH_LIST_MEDIA`
- 例: `PATH_COMPONENTS_WITH_COMPONENTS`
- 例: `PATH_GTDB_TAXON_CHILDREN`

値としてのAPIパスは、外部API名に合わせて `snake_case` を維持する。

- 例: `"/gmdb_list_media_by_gmids"`
- 例: `"/gmdb_taxonomy_children"`

`PATH_...` はOpenAPIのpathとして扱うため、値は `/` で始める。
APIのURLが必要な利用側では、`definitions.ts` で完成済みURL定数をexportせず、`makeApiUrl(PATH_...)` で生成する。

## Propsとexport

Reactコンポーネントのprops型は、利用範囲に応じて名前を分ける。

- 同一ファイル内だけで使うprops型: `Props`
  - 例: `type Props = { id: string }`
- 外部へ公開するprops型: `ComponentNameProps`
  - 例: `ImportDialogProps`
  - 例: `AppProps`

通常の `export` とテスト補助用の公開範囲は、`docs/testing-policy.md` の `__TEST__` export方針に従う。

## 例外と既存の揺れ

次のものは、この文書の標準ルールをそのまま適用しない。

- 自動生成ファイル
  - 例: `@packages/web/src/routeTree.gen.ts`
- フレームワークやツールが要求する名前
  - 例: TanStack Routerの `__root.tsx`, `$param.tsx`
- 初期プロトタイプStanza
  - `@packages/stanza/docs/development-guide.md` で示されている `gmdb-gms-by-tid` と `gmdb-roundtree` は、現行の実装方針や命名規約の判断材料に含めない。
- 古い命名、誤字、表記が混在した既存名
  - 既存コードに残っていても、新規コードでは再利用しない。

例外が必要な場合は、名前の近くに理由を短く残す。ただし、外部API仕様、生成物、フレームワーク規約のように理由が明らかな場合は不要とする。
