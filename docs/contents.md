# 機能一覧・ Stanza 及び API一覧
## トップページ

https://togomedium.org/

### データベース概要

本データベースに登録されている各項目の一覧を表示する
* 使用API
  * https://togomedium.org/sparqlist/list_media
  * https://togomedium.org/sparqlist/list_organisms
  * https://togomedium.org/sparqlist/list_components

※Stanzaを用いずにサイト内のJavaScriptから直接起動している

### 検索機能
検索用のキーワードやIDを入力すると、各種Stanzaが起動し検索結果を表示する。検索結果からは培地/成分/生物の各詳細へ遷移できる。原則として英語での検索となるが成分検索のみ日本語での検索も可能である。

* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_list_media_by_gmids
  * https://togomedium.org/sparqlist/gmdb_list_media_by_keyword
  * https://togomedium.org/sparqlist/gmdb_list_components_by_gmoids
  * https://togomedium.org/sparqlist/gmdb_list_components_by_keyword
  * https://togomedium.org/sparqlist/gmdb_list_organisms_by_taxids
  * https://togomedium.org/sparqlist/gmdb_list_organisms_by_keyword


## 培地一覧ページ

https://togomedium.org/media/

本データベースに登録されている培地の一覧を表示する
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/list_media

## 培地詳細ページ
https://togomedium.org/media/$ID

培地の詳細及び含まれる成分、類似する培地、その培地で培養できる生物種の一覧を表示する

### 培地詳細情報
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-medium-by-gmid.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_medium_by_gmid

### 表現型情報
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_list_similar_media_by_gmid

### 培養できる生物一覧
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-media-strains-alignment-table.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_media_strains_alignment_by_gm_ids


## 生物種一覧ページ
https://togomedium.org/organism/

本データベースに登録されている生物種の一覧を表示する

* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/list_organisms

## 生物詳細ページ

生物の詳細と表現型、その生物種を培養できる培地の一覧を表示する

https://togomedium.org/organism/$ID

### 表現型情報
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_phenotype_by_strainid

### 関連培地一覧
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_media_by_taxid

## 成分一覧ページ

https://togomedium.org/component/

本データベースに登録されている成分の一覧を表示する
* 
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/list_components

## 成分詳細ページ

https://togomedium.org/component/$ID

成分の詳細とその成分を使用している培地の一覧を表示する

### 成分詳細
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-component-by-gmoid.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_component_by_gmoid

### 関連培地一覧
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_media_by_gmoid

## タクソン情報ページ

https://togomedium.org/taxon/$ID

タクソン情報と、関連する培地・生物種の一覧を表示する


### タクソン情報
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-taxon-by-taxid.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_taxonomic_rank_by_taxid
### 子階層一覧
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_taxonomy_children
### ストレイン一覧
* 使用Stanza
    * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
    * https://togomedium.org/sparqlist/gmdb_strain_list_by_taxid
### 関連培地一覧
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_media_by_taxid



## 統計ページ
https://togomedium.org/statistics/

Phylumに基づいてデータベースに登録された生物種数の一覧を表示する
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-meta-list.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_stat_phylum_gm


## 成分から培地を検索するページ
https://togomedium.org/find-media-by-components/

成分の一覧を表示し、選択した成分を使用している培地を検索する。

* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-find-media-by-components.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_components_with_components
  * https://togomedium.org/sparqlist/gmdb_media_by_attributes

## 生物種から培地を検索するページ
https://togomedium.org/find-media-by-taxonomic-tree/

生物の階層構造を表示し、選択した生物種を培養できる培地を検索する。
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-find-media-by-taxonomic-tree.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_taxonomy_children
  * https://togomedium.org/sparqlist/gmdb_media_by_taxid
  

## 表現型情報から培地を検索するページ
https://togomedium.org/find-media-by-phenotype/

表現型情報の一覧を表示し、選択した表現型を持つ生物種を培養できる培地を検索する。
* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-find-media-by-organism-phenotype.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_organisms_by_phenotypes
  * https://togomedium.org/sparqlist/gmdb_media_by_taxon

## 培地のアライメント情報を表示するページ
https://togomedium.org/compare-media/

複数の培地のアライメント情報を表示する。

* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-media-alignment-table.html
  * https://dbcls.github.io/togomedium-stanza/gmdb-media-strains-alignment-table.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_media_alignment_by_gm_ids
  * https://togomedium.org/sparqlist/gmdb_media_strains_alignment_by_gm_ids

## 生物を選択して培地のアライメント情報を表示するページ
https://togomedium.org/compare-media-by-taxids/s

複数の生物種を選択し、その生物種を培養できる培地のアライメント情報を表示する。

* 使用Stanza
  * https://dbcls.github.io/togomedium-stanza/gmdb-media-alignment-table.html
  * https://dbcls.github.io/togomedium-stanza/gmdb-media-strains-alignment-table.html
* 使用API
  * https://togomedium.org/sparqlist/gmdb_media_alignment_by_gm_ids
  * https://togomedium.org/sparqlist/gmdb_media_strains_alignment_by_gm_ids
