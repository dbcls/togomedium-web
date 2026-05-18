# 機能・Stanza・API対応表

この文書では、TogoMediumの主な画面、画面で使うStanza、参照するSPARQList APIの対応を示す。

画面仕様やStanzaの実装を確認するときは、まずこの対応表で影響範囲を把握する。開発手順や確認コマンドは `docs/development-guide.md`、品質確認の方針は `docs/testing-policy.md` を参照する。

## 表記

- 画面URLは、`https://togomedium.org` からのパスで示す。
- Stanzaは、`https://dbcls.github.io/togomedium-stanza/` 配下のHTMLファイル名で示す。
- APIは、`https://togomedium.org/sparqlist/` 配下のSPARQList名で示す。
- `$ID` は、各詳細画面で指定するIDを表す。

## トップページ

| 機能             | 画面URL | 表示内容                                                                                                                                                                                           | Stanza                                       | API                                                                                                                                                                                                        |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| データベース概要 | `/`     | 本データベースに登録されている各項目の一覧を表示する。                                                                                                                                             | なし。サイト内のJavaScriptから直接起動する。 | `list_media`<br>`list_organisms`<br>`list_components`                                                                                                                                                      |
| 検索機能         | `/`     | 検索用のキーワードやIDを入力すると、各種Stanzaが起動し検索結果を表示する。検索結果からは培地、成分、生物の各詳細へ遷移できる。原則として英語で検索するが、成分検索のみ日本語での検索も可能である。 | `gmdb-meta-list.html`                        | `gmdb_list_media_by_gmids`<br>`gmdb_list_media_by_keyword`<br>`gmdb_list_components_by_gmoids`<br>`gmdb_list_components_by_keyword`<br>`gmdb_list_organisms_by_taxids`<br>`gmdb_list_organisms_by_keyword` |

## 一覧・詳細画面

| 画面                         | 画面URL          | 表示内容                                                             | Stanza                                    | API                                      |
| ---------------------------- | ---------------- | -------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| 培地一覧                     | `/media/`        | 本データベースに登録されている培地の一覧を表示する。                 | `gmdb-meta-list.html`                     | `list_media`                             |
| 培地詳細: 培地詳細情報       | `/media/$ID`     | 培地のメタ情報、含まれる成分、コメントを表示する。                   | `gmdb-medium-by-gmid.html`                | `gmdb_medium_by_gmid`                    |
| 培地詳細: 類似培地一覧       | `/media/$ID`     | 培地詳細ページ内で、類似する培地の一覧を表示する。                   | `gmdb-meta-list.html`                     | `gmdb_list_similar_media_by_gmid`        |
| 培地詳細: 培養できる生物一覧 | `/media/$ID`     | 培地詳細ページ内で、その培地で培養できる生物種の一覧を表示する。     | `gmdb-media-strains-alignment-table.html` | `gmdb_media_strains_alignment_by_gm_ids` |
| 生物種一覧                   | `/organism/`     | 本データベースに登録されている生物種の一覧を表示する。               | `gmdb-meta-list.html`                     | `list_organisms`                         |
| 生物詳細: 表現型情報         | `/organism/$ID`  | 生物の詳細と表現型、その生物種を培養できる培地の一覧を表示する。     | `gmdb-meta-list.html`                     | `gmdb_phenotype_by_strainid`             |
| 生物詳細: 関連培地一覧       | `/organism/$ID`  | 生物詳細ページ内で、関連する培地の一覧を表示する。                   | `gmdb-meta-list.html`                     | `gmdb_media_by_taxid`                    |
| 成分一覧                     | `/component/`    | 本データベースに登録されている成分の一覧を表示する。                 | `gmdb-meta-list.html`                     | `list_components`                        |
| 成分詳細: 成分詳細           | `/component/$ID` | 成分の詳細と、その成分を使用している培地の一覧を表示する。           | `gmdb-component-by-gmoid.html`            | `gmdb_component_by_gmoid`                |
| 成分詳細: 関連培地一覧       | `/component/$ID` | 成分詳細ページ内で、関連する培地の一覧を表示する。                   | `gmdb-meta-list.html`                     | `gmdb_media_by_gmoid`                    |
| タクソン情報: タクソン情報   | `/taxon/$ID`     | タクソン情報と、関連する培地・生物種の一覧を表示する。               | `gmdb-taxon-by-taxid.html`                | `gmdb_taxonomic_rank_by_taxid`           |
| タクソン情報: 子階層一覧     | `/taxon/$ID`     | タクソン情報ページ内で、子階層の一覧を表示する。                     | `gmdb-meta-list.html`                     | `gmdb_taxonomy_children`                 |
| タクソン情報: ストレイン一覧 | `/taxon/$ID`     | タクソン情報ページ内で、ストレインの一覧を表示する。                 | `gmdb-meta-list.html`                     | `gmdb_strain_list_by_taxid`              |
| タクソン情報: 関連培地一覧   | `/taxon/$ID`     | タクソン情報ページ内で、関連する培地の一覧を表示する。               | `gmdb-meta-list.html`                     | `gmdb_media_by_taxid`                    |
| 統計                         | `/statistics/`   | Phylumに基づいて、データベースに登録された生物種数の一覧を表示する。 | `gmdb-meta-list.html`                     | `gmdb_stat_phylum_gm`                    |

## 検索・比較画面

| 画面                                       | 画面URL                             | 表示内容                                                                         | Stanza                                                                         | API                                                                          |
| ------------------------------------------ | ----------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| 成分から培地を検索                         | `/find-media-by-components/`        | 成分の一覧を表示し、選択した成分を使用している培地を検索する。                   | `gmdb-find-media-by-components.html`                                           | `gmdb_components_with_components`<br>`gmdb_media_by_attributes`              |
| 生物種から培地を検索                       | `/find-media-by-taxonomic-tree/`    | 生物の階層構造を表示し、選択した生物種を培養できる培地を検索する。               | `gmdb-find-media-by-taxonomic-tree.html`                                       | `gmdb_taxonomy_children`<br>`gmdb_media_by_taxid`                            |
| 表現型情報から培地を検索                   | `/find-media-by-organism-phenotype` | 表現型情報の一覧を表示し、選択した表現型を持つ生物種を培養できる培地を検索する。 | `gmdb-find-media-by-organism-phenotype.html`                                   | `gmdb_organisms_by_phenotypes`<br>`gmdb_media_by_taxon`                      |
| 培地のアライメント情報を表示               | `/compare-media/`                   | 複数の培地のアライメント情報を表示する。                                         | `gmdb-media-alignment-table.html`<br>`gmdb-media-strains-alignment-table.html` | `gmdb_media_alignment_by_gm_ids`<br>`gmdb_media_strains_alignment_by_gm_ids` |
| 生物を選択して培地のアライメント情報を表示 | `/compare-media-by-taxids`          | 複数の生物種を選択し、その生物種を培養できる培地のアライメント情報を表示する。   | `gmdb-media-alignment-table.html`<br>`gmdb-media-strains-alignment-table.html` | `gmdb_media_alignment_by_gm_ids`<br>`gmdb_media_strains_alignment_by_gm_ids` |
