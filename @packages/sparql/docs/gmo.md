# GMOをクエリで参照する

この文書では、GMOの識別子・分類・関係をクエリで指定する方法を示す。GMOなどの共通用語はモノリポの `docs/domain-terms.md`、RDF/SPARQLの構文は `docs/sparql-learning-notes.md` を参照する。学問上の定義や分類の妥当性は扱わない。

以下のパスは、特記しない限り `@packages/sparql` 基準。

## 参照する場所

| 参照先                                                                       | 用途                                                |
| ---------------------------------------------------------------------------- | --------------------------------------------------- |
| [BioPortalのGMO](https://bioportal.bioontology.org/ontologies/GMO?p=classes) | クラスの名前、URI、階層、プロパティを画面で確認する |
| `https://togomedium.org/sparql`                                              | このパッケージのクエリを実行するエンドポイント      |
| `http://togomedium.org/gmo`                                                  | 現在のクエリがFROMで指定するRDFグラフ               |

BioPortalの画面はクラスを調べるために使い、ローカルのクエリはTogoMediumのエンドポイントへ送信する。エンドポイントとRDFグラフの違いはモノリポの `docs/domain-terms.md` を参照する。

2026-09-26に確認したBioPortalの画面では、最終アップロード日は2024-08-28だった。BioPortalとTogoMediumのデータが同じ版であることは確認していないため、クエリの取得結果はTogoMedium側で検証する。

## ID・URI・名前の対応

同じ対象でも、クエリでの指定と画面表示では使う値が異なる。

| 種類               | 例                                     | 用途                                |
| ------------------ | -------------------------------------- | ----------------------------------- |
| GMO ID             | `GMO_001010`                           | APIへの入力や返却値として扱う識別子 |
| URI                | `http://purl.jp/bio/10/gmo/GMO_001010` | RDF上の対象を指定する               |
| PREFIXを使った表記 | `gmo:GMO_001010`                       | クエリ内でURIを短く書く             |
| ラベル             | `D-Glucose`                            | 対象の名前を表示する                |

`gmo:` は次の宣言に基づく省略表記。

```sparql
PREFIX gmo: <http://purl.jp/bio/10/gmo/>
```

URIを指定する `gmo:GMO_001010` と、リテラルの `"GMO_001010"` は別の値。現在のクエリではIDを `dcterms:identifier`、代表名を `skos:prefLabel`、ラベルを `rdfs:label`、別名を `skos:altLabel` で取得する。使用する述語と言語条件は各クエリで確認する。

## 主なクラスと関係

| 名前               | URIの省略表記    | このパッケージでの使い方               |
| ------------------ | ---------------- | -------------------------------------- |
| Component          | `gmo:GMO_000002` | 成分一覧の探索起点                     |
| Role               | `gmo:GMO_000037` | Role一覧・Role別件数の探索起点         |
| Component property | `gmo:GMO_000039` | Property別件数の探索起点               |
| has role           | `gmo:GMO_000112` | 成分から関連するRoleを取得する述語     |
| has property       | `gmo:GMO_000113` | 成分から関連するPropertyを取得する述語 |

上の3つは分類を表すクラス、下の2つは関係を表す述語。GMO IDは成分だけに使われるものではない。

以下の3つは、それぞれ独立したWHERE内のパターン例。用途に応じて使い、すべてを同時に指定する前提ではない。`gmo:` と `rdfs:` のPREFIX宣言は省略している。

```sparql
# Componentの下位にある対象を探す
?component rdfs:subClassOf+ gmo:GMO_000002 .

# 成分に関連するRoleを取得する
?component gmo:GMO_000112 ?role .

# 成分に関連するPropertyを取得する
?component gmo:GMO_000113 ?property .
```

`rdfs:subClassOf` は分類の上下関係で、has roleやhas propertyは成分から関連先への関係。Roleの階層をたどることと、成分にどのRoleが付いているかを取得することは別の処理となる。

APIやクエリ中の `property` は、has propertyの関連先を指す変数名にも使われる。RDF一般の「property（述語）」と読み分ける。

## BioPortalで確認する

1. GMOのClassesタブを開く。
2. 左側のComponent・Role・Component propertyなどから階層をたどる。
3. 対象を選び、DetailsでId・Preferred Name・各プロパティを確認する。
4. 必要なURIをローカルのクエリと照合する。

階層表示は全体を把握するために使い、関係を正確に確認するときは `subClassOf` などのプロパティも見る。BioPortalの表示名だけから、TogoMedium側のID・ラベルの有無や件数を判断しない。

## Role階層とAPIごとの扱い

Role同士の階層は `rdfs:subClassOf`、成分への付与はhas role（GMO_000112）で取得する。RDF一般では直接の親が1つとは限らない。木構造として扱う前提や、複数の親が見つかったときの処理は、Role一覧・Role別件数の各READMEで確認する。

| 確認する仕様                                    | 参照先                                                                                 |
| ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| Role一覧、直接の親、欠損値、整形後のJSON        | `queries/apis/list-component-roles/README.md` の「API用の整形とSPARQListへの移植」     |
| Role別の直接・下位込み件数、重複排除、0件の保持 | `queries/apis/count-components-by-role/README.md` の「目的と処理」「検証記録と注意点」 |
| Role別件数の親情報と起点Roleの扱い              | 同READMEの「親子関係の確認」                                                           |
| Property指定による絞り込み                      | 同READMEの「引数と変更箇所」「Propertyで絞ったRole別件数」                             |

起点のRole（GMO_000037）が直接の親の場合、Role一覧の整形後JSONでは一覧外の起点への参照を残す。一方、Role別件数では `parent` をnullにする。両APIの親の表現を同一とはみなさない。

## Component propertyの構造と集計

Component property（GMO_000039）の直下には、2026-09-26のTogoMediumエンドポイントでの確認時点で次の8分類があった。孫以下の分類がないことも問い合わせて確認した。

| 分類                | GMO ID       |
| ------------------- | ------------ |
| Complex component   | `GMO_000050` |
| Defined component   | `GMO_000046` |
| Gas                 | `GMO_000077` |
| Inorganic compound  | `GMO_000040` |
| Organic compound    | `GMO_000041` |
| Simple component    | `GMO_000049` |
| Solution            | `GMO_000051` |
| Undefined component | `GMO_000047` |

成分から各Propertyへの関連はhas property（GMO_000113）で取得する。1つの成分が複数のPropertyを持つことがあるため、これらは成分を重複なく分割する分類としては扱わない。

Property別集計の対象範囲、`role_id` による絞り込み、出力JSONは `queries/apis/count-components-by-property/README.md` を参照する。同READMEの「検証記録」では、具体的な件数と、孫以下が追加された場合の扱いも確認できる。

## 関連するクエリと資料

- `queries/apis/count-components-by-property/README.md`: Component property直下の分類ごとの直接成分数。
- `queries/apis/list-component-roles/README.md`: Role一覧と直接の親。
- `queries/apis/count-components-by-role/README.md`: Role別の直接・下位込み成分数と親情報。
- `queries/reference/gmdb-component-by-gmoid/README.md`: 元APIの成分詳細、Role・Propertyなどの取得。
- `queries/apis/search-components/README.md`: 成分検索と条件に連動するRole・Property件数。
- `UBIQUITOUS_LANGUAGE.md`: クエリ検証で使う用語の短い説明。
- `docs/sparql-learning-notes.md`: RDF・トリプル・SPARQLの基礎。
