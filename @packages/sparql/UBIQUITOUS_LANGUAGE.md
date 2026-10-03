# クエリ検証のための用語集

元メモの更新日: 2026-09-26

この文書では、TogoMediumのクエリで使う識別子・述語・結果の呼び方を対応づける。共通用語の意味はモノリポの `docs/domain-terms.md`、命名規定は `docs/naming-convention.md` を参照する。学問上の定義は扱わない。

以下のパスは、特記しない限り `@packages/sparql` 基準。

## 識別子と名称

| 用語   | 意味・使われ方                                                                 | 例                                                         |
| ------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| GMO ID | ComponentやRoleなどのIDを `dcterms:identifier` で取得する。                    | `GMO_001010`。APIでは `gmo_id` などのキーで返す。          |
| URI    | DB上の対象や関係を識別する文字列。GMO IDとは表記が異なる。                     | `http://purl.jp/bio/10/gmo/GMO_001010`                     |
| ラベル | 表示用の名称。取得するクエリに応じて `rdfs:label` や `skos:prefLabel` を使う。 | 同じ対象でも、取得する言語によって名称が変わることがある。 |
| 別名   | `skos:altLabel` で取得する名称。                                               | APIの `alt_label`、`alt_labels` など。                     |

GMO ID文字列・URI・PREFIX表記の対応例は `docs/gmo.md` の「ID・URI・名前の対応」を参照する。

## GMOの名前

Component（成分）、Role（ロール）、Component propertyは、クエリで参照する分類の名前。has roleとhas propertyは、成分からそれらの関連先を取得する述語の名前となる。

各URI、クエリのパターン、BioPortalでの確認方法は `docs/gmo.md` を参照する。親情報や集計条件など、APIごとの扱いは各クエリのREADMEで確認する。

## 結果を読むときの呼び方

| 用語         | 意味・使われ方                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| 行数         | SPARQLの検索結果に含まれる行の数。同じ対象が複数行に現れることがある。                                          |
| 件数         | クエリで数えた対象の数。比較するときは、URIかIDか、何を重複排除して数えたかも確認する。                         |
| 直接の親     | `rdfs:subClassOf` で1段上にある対象。たとえば `?role rdfs:subClassOf ?parent` の `?parent`。                    |
| 整形後のJSON | SPARQLの結果をJavaScriptなどでまとめた出力。クエリ結果の複数行を、1つのオブジェクトや配列にまとめる場合がある。 |

`direct_count`、`inclusive_count`、`total` など、出力項目ごとの集計条件は対象クエリのREADMEを参照する。

## 関連資料

- `docs/gmo.md`: GMOの参照先とクエリ上の対応。
- `README.md`: 実行方法と各クエリの案内。
- `docs/sparql-learning-notes.md`: RDF/SPARQLの構文例と結果の読み方。
- 各クエリフォルダの `README.md`: 取得条件、引数、出力項目、検証結果。
