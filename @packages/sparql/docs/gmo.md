# GMOをクエリで参照する

GMO（Growth Medium Ontology）は、TogoMediumのクエリでComponentやRoleなどを参照するときに使うオントロジー。この文書では、識別子・分類・関係をクエリでどう指定するかをまとめる。学問上の定義や分類の妥当性は扱わない。

## 参照する場所

| 参照先                                                                       | 用途                                                |
| ---------------------------------------------------------------------------- | --------------------------------------------------- |
| [BioPortalのGMO](https://bioportal.bioontology.org/ontologies/GMO?p=classes) | クラスの名前、URI、階層、プロパティを画面で確認する |
| `https://togomedium.org/sparql`                                              | このパッケージのクエリを実行するエンドポイント      |
| `http://togomedium.org/gmo`                                                  | 現在のクエリがFROMで指定するRDFグラフ               |

エンドポイントは問い合わせの送信先、グラフは問い合わせ対象のデータのまとまりを指定する名前。BioPortalの画面はクラスを調べるために使い、ローカルのクエリはTogoMediumのエンドポイントへ送信する。

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

## Role階層の扱い

このプロジェクトでは、確認したデータに合わせてRole階層を木構造として扱い、各Roleの直接の親を1つとする。GMO全体やRDF一般に対する制約ではなく、現在のRole関連機能の前提となる。

Role一覧とRole別件数は、親を参照する平らな配列を返す。同じ親URIの繰り返しはまとめ、異なる親URIが複数あれば整形時にエラーにする。

起点のRole（GMO_000037）自体は一覧・件数の対象外だが、生のクエリ結果では直接の親として現れる。整形後の扱いは次のように分かれる。

| 出力       | 親の表現                        | 親が起点のRoleの場合                 |
| ---------- | ------------------------------- | ------------------------------------ |
| Role一覧   | URIとIDを持つparentオブジェクト | 一覧外の起点への参照を残す           |
| Role別件数 | parentに親のGMO IDを格納        | parentをnullにして一覧の最上位とする |

Role別件数には、指定Roleが直接付いた成分の `direct_count` と、そのRole自身または下位Roleが付いた成分の `inclusive_count` がある。どちらも成分URIで重複排除し、0件のRoleも残す。

任意の `property_id` を指定すると、そのPropertyが直接付いた成分に絞り、両方の件数を取得できる。指定できる対象はComponent property（GMO_000039）の直接の子。省略時は全成分を対象とする。

詳細な出力形式、欠損値の扱い、実行方法は `queries/apis/list-component-roles/README.md` と `queries/apis/count-components-by-role/README.md` に記録する。

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

現在のカウント機能は、この1階層の構造に合わせて、直下の分類ごとに直接関連する成分を数える。成分URIで重複排除し、該当成分がない分類も0件として残す。分類をまたぐ重複は除かないため、件数の合計は成分総数とは限らない。

任意の `role_id` を指定すると、そのRoleが直接付いた成分に絞ってProperty別件数を取得できる。下位Roleへの付与は含めず、省略時は全成分を対象とする。

出力は `[{ id, label, count }]`。起点自身は含めず、親情報や下位込み件数は出力しない。今後孫以下が追加された場合も自動で集計対象にはならないため、その時点で取得範囲を見直す。

具体的な件数、検証結果、実行方法は `queries/apis/count-components-by-property/README.md` に記録する。

## 関連するクエリと資料

- `queries/apis/count-components-by-property/README.md`: Component property直下の分類ごとの直接成分数。
- `queries/apis/list-component-roles/README.md`: Role一覧と直接の親。
- `queries/apis/count-components-by-role/README.md`: Role別の直接・下位込み成分数と親情報。
- `queries/reference/gmdb-component-by-gmoid/README.md`: 元APIの成分詳細、Role・Propertyなどの取得。
- `queries/apis/list-components2/README.md`: Property付き成分一覧。
- `UBIQUITOUS_LANGUAGE.md`: クエリ検証で使う用語の短い説明。
- `docs/sparql-learning-notes.md`: RDF・トリプル・SPARQLの基礎。
