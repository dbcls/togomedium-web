# TogoMedium用語集

## この文書の役割

この文書では、TogoMedium Webリポジトリで命名や実装判断に関わる用語を整理する。

ここでの説明は、開発時の作業用語集であり、DBCLSやTogoMediumの公式な学術定義として扱うものではない。厳密な仕様や公開説明が必要な場合は、関連する公式資料やAPI仕様を別途確認する。

命名規約そのものは `docs/naming-convention.md` を参照する。

## プロダクトと仕組み

### TogoMedium

培地、成分、生物種、タクソン、表現型などの情報を扱うデータベースおよびWebサイト。

- 表示名: `TogoMedium`
- リポジトリ内の主な対象: `@packages/web`, `@packages/stanza`, `@packages/api`

### GMDB

TogoMediumで扱うGrowth Medium Databaseの文脈を表す略語として使う。

- 表示・外部識別子: `GMDB`
- TypeScript識別子で語の一部として使う場合: 文脈に応じて `Gmdb` または外部名のまま `GMDB`
- stanza公開名では `gmdb-...` を使う
  - 例: `gmdb-medium-builder`
  - 例: `gmdb-find-media-by-components`

`GMDB` / `Gmdb` prefixは、外部から識別する必要がある名前に使う。stanza内部のコンポーネントや関数では、文脈上明らかな場合は省略する。

### Stanza / TogoStanza

TogoStanzaは、WebComponentとして配布できるUI単位を作る仕組み。TogoMediumでは、小さな部品というより、検索・詳細表示・比較などの比較的大きな機能単位としてStanzaを使う。

- 一般名: `Stanza`
- 仕組みや基盤: `TogoStanza`
- stanzaディレクトリ: `gmdb-...` の `kebab-case`
- Web側のラッパーコンポーネント: `XxxStanza`
  - 例: `MediumDetailStanza`
  - 例: `FindMediaByComponentsStanza`

### SPARQList API

TogoMediumの各画面やStanzaが参照するAPI群を指す。リポジトリでは `@packages/api` がAPIの型・schema・OpenAPI出力を扱う。

- API path: 外部仕様に合わせて `snake_case`
  - 例: `gmdb_list_media_by_gmids`
  - 例: `gmdb_media_by_taxid`
- TypeScriptのendpoint名: `camelCase`
  - 例: `listMediaByIds`
  - 例: `listMediaOfTaxon`

## ドメイン用語

### medium / growth medium

培地を表す。TogoMediumでは、微生物などを培養するための培地情報として扱う。

- 表示語: `medium`, `growth medium`
- TypeScript識別子: `medium`, `media`
- ID: `GM ID`
- API field: `gm_id`
- 内部変数: `gmId`, `gmIds`

`media` は `medium` の複数形として使う。画面名やAPI名では既存の `media` 表記に合わせる。

### component

培地に含まれる成分を表す。

- 表示語: `component`
- TypeScript識別子: `component`, `components`
- ID: `GMO ID`
- API field: `gmo_id`
- 内部変数: `gmoId`, `gmoIds`

`GMO ID` は成分IDの文脈で使われている。organismを意味する `GMO` と誤読しないよう、命名時は `component` の文脈を明示する。

### organism

培地で培養できる生物、または検索対象となる生物を表す。

- 表示語: `organism`
- TypeScript識別子: `organism`, `organisms`
- 関連ID: `tax ID`, `strain ID`
- API fieldの例: `tax_id`, `strain_id`
- 内部変数の例: `taxId`, `strainId`

画面やStanzaで「organism」と「taxon」や「strain」が混ざる場合は、どの粒度の対象を扱っているかが分かる名前にする。

### strain

生物株を表す。APIや詳細画面では `strain_id` を使う。

- 表示語: `strain`
- TypeScript識別子: `strain`, `strains`
- ID: `strain ID`
- API field: `strain_id`
- 内部変数: `strainId`, `strainIds`

### taxon / taxonomy

分類群や分類体系を表す。

- 表示語: `taxon`, `taxonomy`
- TypeScript識別子: `taxon`, `taxons`, `taxonomy`
- ID: `tax ID`
- API field: `tax_id`
- 内部変数: `taxId`, `taxIds`

既存コードには `taxons` のような表記もある。新規命名では、単一の分類群は `taxon`、分類体系や階層構造は `taxonomy` を優先する。

### phenotype

生物の表現型情報を表す。

- 表示語: `phenotype`
- TypeScript識別子: `phenotype`, `phenotypes`
- 関連API fieldの例: phenotype条件を表す文字列キー
- 関連画面: `find-media-by-organism-phenotype`

phenotype検索では、UI上の選択条件、APIへの検索条件、検索結果のorganismを区別して命名する。

## IDと識別子

### GM ID

培地を識別するID。

- 意味: growth mediumのID
- 表示語: `GM ID`, `GMID`
- API field: `gm_id`
- TypeScript内部: `gmId`, `gmIds`
- API pathの例: `gmdb_list_media_by_gmids`

`GM ID` と `GMO ID` は別の識別子なので、短縮して `id` だけにしない。

### GMO ID

成分を識別するID。

- 意味: componentのID
- 表示語: `GMO ID`
- API field: `gmo_id`
- TypeScript内部: `gmoId`, `gmoIds`
- API pathの例: `gmdb_list_components_by_gmoids`

TogoMediumの既存文脈では成分IDとして使われている。organismのIDではない点に注意する。

### tax ID

分類群や生物種検索で使うtaxonomy ID。

- 表示語: `tax ID`, `Tax ID`, `Taxonomy ID`
- API field: `tax_id`
- TypeScript内部: `taxId`, `taxIds`
- API pathの例: `gmdb_media_by_taxid`

特に注釈がない場合、TogoMediumの `tax ID` は原則としてNCBI TaxIdを指す。GTDBなどNCBI以外のtaxonomyを扱う場合は、`taxonomyType` や `gtdbTaxon...` のように区別できる名前にする。

### strain ID

生物株を識別するID。

- 表示語: `strain ID`
- API field: `strain_id`
- TypeScript内部: `strainId`, `strainIds`
- API pathの例: `gmdb_media_by_strainid`

## 外部語彙

### NCBI

NCBI taxonomyの文脈で使う外部語彙。

- 表示語: `NCBI`
- TypeScript値の例: `"NCBI"`
- 関連語: `tax ID`, `taxonomy`

### GTDB

Genome Taxonomy Databaseの文脈で使う外部語彙。

- 表示語: `GTDB`
- TypeScript値の例: `"GTDB"`
- TypeScript識別子の例: `gtdbTaxonChildren`, `GtdbTaxonChildrenResponse`
- 関連routeの例: `find-media-by-gtdb-taxonomic-tree`

### GMS

既存APIや初期stanza名で使われている略語。

- 表示語: `GMS`
- API pathの例: `gms_kegg_code_tid`, `gms_by_kegg_tids_3`
- 関連stanzaの例: `gmdb-gms-by-tid`

`gmdb-gms-by-tid` は初期プロトタイプstanzaとして扱われており、新規命名の標準例にはしない。

### KEGG TID

KEGG organism identifierの文脈で使われるID。

- 表示語: `KEGG TID`
- API pathの例: `gms_kegg_code_tid`
- 関連語: `GMS`

通常のTogoMedium画面や新規Stanzaでは、GM ID、GMO ID、tax ID、strain IDとの混同を避けるため、KEGG由来であることが分かる名前にする。
