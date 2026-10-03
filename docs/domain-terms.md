# TogoMedium用語集

## この文書の役割

TogoMedium・Stanza・RDF/SPARQLに初めて触れる開発者向けに、リポジトリを読むための共通用語を説明する。各用語の意味、本リポジトリでの役割、混同しやすい語との違いを扱う。

ここでの説明は開発時の作業用語集であり、DBCLSやTogoMediumの公式な学術定義として扱わない。厳密な仕様や公開説明が必要な場合は、公式資料や対象APIの仕様を確認する。

この文書内のパスはリポジトリのルート基準。目的に応じて次の文書へ進む。

| 確認したいこと                                 | 参照先                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| 識別子・ファイル・API・Stanzaの命名規定        | `docs/naming-convention.md`                                               |
| パッケージの責務とデータ取得から表示までの流れ | `docs/architecture.md`                                                    |
| 用語とクエリ上の変数・述語の対応               | `@packages/sparql/UBIQUITOUS_LANGUAGE.md`、`@packages/sparql/docs/gmo.md` |
| RDF/SPARQLの書き方と結果の読み方               | `@packages/sparql/docs/sparql-learning-notes.md`                          |

## プロダクトと表示の仕組み

### TogoMedium / GMDB

TogoMediumは、培地、成分、生物種、タクソン、表現型などの情報を扱うデータベースおよびWebサイト。本リポジトリでは、Webサイトを `@packages/web`、再利用する表示機能を `@packages/stanza`、API定義を `@packages/api` で扱う。

GMDBはGrowth Medium Databaseの文脈を表す略語として使う。`gmdb-medium-builder` などのStanza公開名やAPI名にも現れる。表示・外部識別子は `GMDB`、TypeScript識別子では `Gmdb` または外部名のまま `GMDB` という表記がある。接頭辞の使い分けは `docs/naming-convention.md` の「Stanza」を参照する。

### Stanza / TogoStanza

Stanzaは、検索・詳細表示・比較などの機能を他のWebページにも埋め込めるUI単位。TogoStanzaは、そのStanzaを作成・ビルドするための基盤を指す。生成・ビルド・開発サーバーの機能は [TogoStanzaの公式リポジトリ](https://github.com/togostanza/togostanza)で確認できる。

本リポジトリのStanzaは、TogoMedium以外でも再利用するWebComponentとして配布する。内部の表示には主にReact・MUIを使うが、Web側では配信されたJavaScriptを読み込み、custom elementとして組み込む。Reactコンポーネントを直接importする場合とは接続方法が異なる。

Web側の `MediumDetailStanza` や `FindMediaByComponentsStanza` は、Stanzaを読み込み、属性やイベントを接続するラッパーコンポーネント。組み込み手順は `@packages/web/docs/stanza-integration.md`、Stanza内部の構成は `@packages/stanza/docs/development-guide.md` を参照する。

### Web Components / custom element / Shadow DOM

Web Componentsは、再利用可能な独自要素をWeb標準の仕組みで作るための技術群。リポジトリ内の「WebComponent」は、その仕組みを使った部品を指す。

| 用語           | 意味とStanzaでの役割                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| custom element | 独自の動作を定義したDOM要素。Web側は `togostanza-...` というタグを配置し、属性でStanzaへ値を渡す                      |
| Shadow DOM     | ホスト要素に接続した別のDOMツリー。Stanza内部の描画先として使い、Webページ側とはDOMやスタイルの適用範囲を分けて考える |

custom elementは要素の定義、Shadow DOMは内部のDOM構造を扱う。標準上の説明は [HTML StandardのCustom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements)と [DOM StandardのShadow tree](https://dom.spec.whatwg.org/#shadow-trees)を参照する。

### Storybook

UIをアプリ全体から切り離し、状態ごとに表示・確認する開発ツール。表示条件を保存したものをstoryと呼ぶ。[Storybook公式ドキュメント](https://storybook.js.org/docs/get-started/why-storybook)

本リポジトリではWeb用とStanza用を別の環境として使う。内部のReactコンポーネントを確認することと、配布されたStanzaをWebへ組み込んで確認することは異なる。対象と起動方法は `docs/architecture.md`、`docs/development-guide.md` を参照する。

## データ取得とAPIの仕組み

### RDF / SPARQL / GMO

| 用語   | 意味                                                                                           | TogoMediumでの役割                                                         |
| ------ | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| RDF    | 対象・関係・値を「主語・述語・目的語」の組で表すデータモデル。この組をトリプルと呼ぶ           | 培地や成分などのデータと関係を表す                                         |
| SPARQL | RDFを問い合わせる言語                                                                          | 必要なデータを検索・集計する。クエリは `@packages/sparql` で実行・比較する |
| GMO    | Growth Medium Ontology。成分やRole、Component property、それらの関係などを定義するオントロジー | クエリで分類や関係を識別・参照する                                         |

RDFはデータの表し方、SPARQLは問い合わせの言語、GMOは対象と関係を表す語彙を定める。RDFとSPARQLの基礎は [RDF 1.1 Primer](https://www.w3.org/TR/rdf11-primer/)と [SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/)に対応する。GMOの具体的なURIとクエリ例は `@packages/sparql/docs/gmo.md` を参照する。

### SPARQLエンドポイント / RDFグラフ / Virtuoso

SPARQLエンドポイントは、HTTPでクエリを受け付ける送信先。RDFグラフはトリプルの集合で、クエリが対象とするデータのまとまりを表す。問い合わせ先のURLと、グラフを指定するURIは別の役割を持つ。

Virtuosoは、RDFの保存やSPARQLによる検索に対応したOpenLink Softwareのデータベース製品。SPARQLはVirtuoso専用の言語ではない。製品の機能は [Virtuoso公式サイト](https://virtuoso.openlinksw.com/)を参照する。

TogoMediumのクエリ実行と結果整形の流れは `@packages/sparql/docs/sparql-learning-notes.md`、接続先の設定は `@packages/sparql/README.md` を参照する。

### SPARQList / SPARQList API

SPARQListは、SPARQLの問い合わせとJavaScriptによる結果整形を組み合わせ、HTTP APIとして提供する仕組み。引数、接続先、クエリ、整形処理をMarkdownで定義する。SPARQL自体は問い合わせの言語で、APIを公開するサーバーではない。[SPARQList公式リポジトリ](https://github.com/dbcls/sparqlist)

TogoMediumのWeb画面やStanzaは、SPARQListで公開されたAPIを呼ぶ。たとえば `gmdb_list_media_by_gmids` や `gmdb_media_by_taxid` が外部API名で、TypeScript側では `listMediaByIds` や `listMediaOfTaxon` という名前の定義を使う。

`@packages/api` はAPIを利用するための型・スキーマ・パスを管理するパッケージであり、SPARQListサーバーではない。クエリをローカルで検証する作業と、SPARQListへ公開する作業も分かれる。両者の関係は `docs/architecture.md` と `@packages/sparql/README.md` を参照する。

### スキーマ / OpenAPI

スキーマは、データの項目・型・制約を定義するもの。本リポジトリでは `@packages/api` のZodスキーマでAPIの入出力を定義する。TypeScriptの型があることと、受信したJSONを実行時に検証することは同じではない。

OpenAPIはHTTP APIのパス・引数・応答などを記述する仕様。APIサーバーの実装とは別に、利用者へインターフェースを伝える。[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)

本リポジトリではAPI定義からOpenAPI文書を生成してWebのAPI画面へ表示する。生成・登録の流れは `docs/architecture.md` を参照する。

## ドメイン用語

次の語は、データが何を表すかを区別するために使う。IDやAPIフィールドとの対応は後述する。

| 用語                   | 意味と使い分け                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| medium / growth medium | 微生物などを培養するための培地。`media` は `medium` の複数形                                                       |
| component              | 培地に含まれる成分。識別にはGMO IDを使うが、GMO IDは成分専用ではない                                               |
| organism               | 培地で培養できる生物、または検索対象となる生物。分類群を扱う `taxon`、生物株を扱う `strain` と対象の粒度を区別する |
| strain                 | 生物株。APIや詳細画面では `strain_id` で識別する                                                                   |
| taxon / taxonomy       | `taxon` は分類群、`taxonomy` は分類体系。既存コードには `taxons` という表記もある                                  |
| phenotype              | 生物の表現型情報。`find-media-by-organism-phenotype` などで検索条件に使う。APIでは表現型条件を表す文字列キーを扱う |

コードでは `medium` / `media`、`component` / `components`、`organism` / `organisms`、`strain` / `strains`、`phenotype` / `phenotypes` が使われている。ここで示す既存表記は命名規定ではない。新規命名での語の選択や、表現型の選択条件・API検索条件・結果の区別は `docs/naming-convention.md` の「用語とIDを名前に使うとき」に従う。

## IDとAPIフィールドの対応

`GM ID` と `GMO ID` は別の識別子。値を扱う際は、何を識別するIDかを確認する。

| ID        | 識別する対象                        | 表示上の表記                      | APIフィールド                  | TypeScript内部での表記例 |
| --------- | ----------------------------------- | --------------------------------- | ------------------------------ | ------------------------ |
| GM ID     | 培地（growth medium）               | `GM ID`、`GMID`                   | `gm_id`                        | `gmId`、`gmIds`          |
| GMO ID    | GMOに定義されたクラスや関係など     | `GMO ID`                          | 成分を扱う既存APIでは `gmo_id` | `gmoId`、`gmoIds`        |
| tax ID    | 分類群や生物種検索で使うtaxonomy ID | `tax ID`、`Tax ID`、`Taxonomy ID` | `tax_id`                       | `taxId`、`taxIds`        |
| strain ID | 生物株                              | `strain ID`                       | `strain_id`                    | `strainId`、`strainIds`  |

GMO IDは `GMO_` で始まり、成分だけでなくRoleやComponent propertyなどにも使われる。例は `GMO_001010`（D-Glucose）、`GMO_000037`（Role）。`http://purl.jp/bio/10/gmo/GMO_001010` のようなURIとの対応は `@packages/sparql/docs/gmo.md` を参照する。

特に注釈がない場合、TogoMediumのtax IDは原則としてNCBI TaxIdを指す。organismを扱うAPIでも、対象に応じて `tax_id` または `strain_id` が現れる。APIパスには `gmdb_list_media_by_gmids`、`gmdb_media_by_taxid`、`gmdb_media_by_strainid` などがあり、IDの種類を区別している。

## 外部語彙と既存の略語

| 用語     | このリポジトリでの意味と用例                                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NCBI     | NCBI taxonomyの文脈で使う。表示やTypeScript値では `NCBI`                                                                                                                        |
| GTDB     | Genome Taxonomy Databaseの文脈で使う。値は `"GTDB"`、既存識別子には `gtdbTaxonChildren`、`GtdbTaxonChildrenResponse`、関連ルートには `find-media-by-gtdb-taxonomic-tree` がある |
| GMS      | 既存APIや初期Stanza名に現れる略語。APIには `gms_kegg_code_tid`、`gms_by_kegg_tids_3`、Stanzaには `gmdb-gms-by-tid` がある                                                       |
| KEGG TID | KEGG organism identifierの文脈で使うID。API `gms_kegg_code_tid` などで扱う                                                                                                      |

`gmdb-gms-by-tid` は初期プロトタイプStanzaで、新規命名の標準例にはしない。外部由来のIDやtaxonomyを名前で区別する規則は `docs/naming-convention.md` を参照する。
