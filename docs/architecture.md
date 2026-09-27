# 全体設計

この文書は、リポジトリ内のパッケージの役割、データ取得から表示までの流れ、編集元と生成物を説明する。公開サイトの配置・稼働状態を示すものではない。起動手順は `docs/development-guide.md`、個別の実装規則は `docs/index.md` から辿る。

## パッケージの責務と関係

pnpmワークスペースとして `@packages/*` を管理する。WebサイトとStanzaの実装を分け、API定義と基礎処理を共有する。

| パッケージ            | 責務と利用関係                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `@packages/web`       | React・Viteによるサイト。TanStack RouterでURLと画面を結び、ページにStanzaを組み込む。API定義とcoreの処理も直接利用する     |
| `@packages/stanza`    | TogoStanzaによるWebComponent。現行のUIは主にReact・MUIで実装し、Shadow DOM内に描画する。API定義とcoreを利用する            |
| `@packages/api`       | リクエスト・レスポンスのZodスキーマ、TypeScript型、APIパス、OpenAPI定義。APIサーバーの実装ではない                         |
| `@packages/sparql`    | SPARQLクエリの比較・実験・採用予定APIの検証。CLIで問い合わせと整形を行い、APIスキーマを利用する。Webの実行時には依存しない |
| `@packages/core`      | URL組み立て、通信、文字列処理など、パッケージ間で使う基礎処理                                                              |
| `@packages/storybook` | Stanza配下のStoryを読み込む確認環境と補助コード。Stanzaの配布物とは別にコンポーネントを確認できる                          |

WebやStanzaからの `%api/`・`%core/` importは、各パッケージのTypeScriptソースを参照する。対応は `@packages/web/tsconfig.app.json`、`@packages/stanza/tsconfig.json` と `@packages/stanza/togostanza.config.ts` で確認できる。

Webに組み込むStanzaは、Reactコンポーネントとして直接importするのではなく、配信されたJavaScriptを読み込んでcustom elementとして使う。この境界により、StanzaをTogoMedium以外のサイトにも組み込める。

## SPARQListとAPI定義

データを返すのは外部のSPARQList API。このリポジトリは、そのAPIを呼ぶクライアントと型・スキーマ定義を持つ。SPARQList側のクエリや処理を変更する作業は、このリポジトリの型変更とは別に扱う。

`@packages/sparql` では、既存APIの比較元を `queries/reference/`、試案を `queries/experimental/`、採用予定・採用済みの定義を `queries/apis/` で管理する。既存定義を改良するときもreferenceは残す。採用状態とSPARQListへの公開状態は分け、公開・登録は `dbcls/togomedium-sparqlist` 側で行う。

入出力スキーマの正本は `@packages/api`。最初の連携対象の `listComponents2` は、ローカルの出力保存前にZodで検証する。SPARQList用の整形関数にはZodを持ち込まない。採用予定のスキーマは、公開状態を確認するまで下記のOpenAPI登録に含めない。実行方法と状態管理は `@packages/sparql/README.md` を参照する。

`@packages/api/src/` の各 `definitions.ts` はAPIパス、入力と出力の定義を持つ。`@packages/api/src/openAPI.ts` の `getDocs()` が登録済みの定義からOpenAPI文書を生成し、Webの `@packages/web/src/pages/ApiPage.tsx` がScalarへ渡して表示する。現在のAPI画面は、この生成結果を直接利用する。

型定義があることと、受信JSONを実行時に検証することは別になる。例えば `@packages/core/src/network/getData.ts` はJSONを読み込んで返すが、Zodによる検証は行っていない。

## データ取得から表示まで

培地詳細を例にすると、次のように責務を分担している。

1. Webの `@packages/web/src/routes/medium/$gmId.tsx` がURLの培地IDを受け取り、APIからページ見出しに使う情報を取得する。
2. `@packages/web/src/pages/MediumDetailPage.tsx` が画面を構成し、StanzaラッパーへIDを渡す。
3. `@packages/web/src/components/stanzas/MediumDetailStanza.tsx` がStanzaのJavaScriptを読み込み、`gm_id` 属性を持つcustom elementを配置する。
4. `@packages/stanza/stanzas/gmdb-medium-detail/index.tsx` が公開パラメータを読み、Reactの `App` へ渡す。
5. Stanza内のTanStack Queryと `utils/getMedia.ts` がAPIから詳細を取得し、表示用に変換してレシピなどを描画する。

Web側もStanza側もAPIへアクセスするため、すべてのデータがWebからStanzaへ渡るわけではない。取得・キャッシュの配置は機能ごとの実装を確認する。

Stanzaからの操作をWebへ伝える場合は、公開イベントを接続する。現行の開発対象では `STANZA_RUN_ACTION` を使い、属性とイベントがWebとStanzaの境界になる。具体的な接続方法は `@packages/web/docs/stanza-integration.md`、Stanza内部の構成は `@packages/stanza/docs/development-guide.md` を参照する。

## 開発時の接続先

| 接続          | 設定と既定値                                                                        |
| ------------- | ----------------------------------------------------------------------------------- |
| WebからAPI    | `VITE_URL_API`。未指定時は `https://togomedium.org/sparqlist/api`                   |
| WebからStanza | `VITE_URL_STANZA`。未指定時は `https://dbcls.github.io/togomedium-stanza`           |
| StanzaからAPI | Stanza側の `VITE_URL_API`。未指定時は共有のURL組み立て処理が公開SPARQList APIを使う |

Web側の設定は `@packages/web/src/consts/api.ts`、APIのURLを組み立てる共通処理は `@packages/core/src/network/makeApiUrl.ts` にある。Stanza側の環境変数読込みと旧設定との互換性は `@packages/stanza/togostanza.config.ts` とStanza開発ガイドで扱う。

WebとStanzaは別々にビルドする。Web側のAPI設定を変更しても、配信済みStanzaに埋め込まれたAPI設定は変わらない。ローカルのStanzaをWebへ組み込んで確認するときは、Webの `VITE_URL_STANZA` に対象のStanza配信先を指定する。

## 編集元・生成物・公開インターフェース

| 対象            | 編集元・定義                               | 生成物・利用先                                                    |
| --------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| Web画面         | `@packages/web/src/`                       | Webビルドの出力は `@packages/web/dist/`                           |
| Webルーティング | `@packages/web/src/routes/`                | TanStack Routerが `@packages/web/src/routeTree.gen.ts` を生成する |
| Stanza          | `@packages/stanza/stanzas/` と共通部品     | Stanzaビルドの出力は `@packages/stanza/dist/`                     |
| API文書         | `@packages/api/src/` の定義と `openAPI.ts` | `getDocs()` のOpenAPIオブジェクトをWebのAPI画面が表示する         |

生成物を手動で修正せず、編集元を変更する。Stanzaの公開パラメータは各 `metadata.json`、実際の受取りは `index.tsx`、Web側の属性型は `@packages/web/src/types/stanza.d.ts` で確認する。パラメータや外向きイベントの変更は利用側にも影響する。

Stanza配布のワークフローは `.github/workflows/publish.yml` にあり、Stanzaをビルドして `@packages/stanza/dist/` をGitHub Pagesへ公開する構成になっている。WebのビルドとStanzaの公開は別の処理であり、ローカルのビルドだけで公開環境が更新されることはない。
