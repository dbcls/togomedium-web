# RDF・SPARQL・SPARQList 学習メモ

更新日: 2026-09-28

TogoMediumのクエリを理解・改善するために、データの表し方から結果の整形までを整理する。個別クエリの取得条件や検証結果は各クエリのREADMEに記録する。DB上の名前や識別子の対応は `UBIQUITOUS_LANGUAGE.md` を参照する。

## RDFは関係をトリプルで表す

RDFでは「主語・述語・目的語」の3つの組をトリプルと呼ぶ。主語は説明する対象、述語は関係や属性、目的語はその相手や値を表す。

たとえば、次はラベルを表す説明用の例。

```turtle
<https://example.org/component/1>
    <http://www.w3.org/2000/01/rdf-schema#label>
    "成分A"@ja .
```

主語は成分のURI、述語はラベルを表すURI、目的語は日本語の文字列となる。末尾の `@ja` は言語を表す。

対象や関係の識別にはURI（SPARQLでは国際化したIRIも使用できる）を使う。文字列や数値などの値はリテラルと呼ぶ。目的語にはURIもリテラルも置けるため、別の対象との関係も、対象の名前も同じ形式で記述できる。RDFには名前を付けない対象を表す空白ノードもある。

トリプルを集めたものがRDFグラフ。1つの主語に同じ述語のトリプルが複数あってもよく、別名や関連先が複数あるデータを表せる。

## SPARQLはトリプルのパターンを検索する

SPARQLはRDFを問い合わせる言語。WHEREに書いたパターンへ当てはまる値を探し、SELECTで指定した変数を結果として返す。

```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?item ?label
WHERE {
  ?item rdfs:label ?label .
}
LIMIT 10
```

`?item` や `?label` は変数。上の例では、ラベルを持つ対象とその値の組を最大10行取得する。`PREFIX` は長いURIを短く書くための宣言で、`rdfs:label` はその省略表記となる。

同じ変数を複数のパターンで使うと、その値が一致する組み合わせを探す。必須のパターンが一致しない対象は結果に入らない。`OPTIONAL` は、その部分が一致しなくても他の条件に一致した結果を残すために使う。

## SPARQListと実行環境

SPARQListは、SPARQLによる問い合わせやJavaScriptによる整形を組み合わせてAPIを定義する仕組み。SPARQL自体とは役割が異なる。

### Virtuosoはクエリを実行するデータベース

VirtuosoはOpenLink Softwareが開発するデータベース製品。RDFの保存とSPARQLによる検索に対応しており、TogoMediumのSPARQLエンドポイントではVirtuosoがクエリを処理する。

| 名前      | 役割                                                                   |
| --------- | ---------------------------------------------------------------------- |
| RDF       | データと関係を表す形式                                                 |
| SPARQL    | RDFを検索・集計する言語                                                |
| Virtuoso  | データを保存し、SPARQLクエリを実行するデータベース                     |
| SPARQList | クエリとJavaScriptの整形処理を組み合わせ、HTTP APIとして提供する仕組み |

SPARQLエンドポイントは、HTTPでクエリを受け付ける窓口。Virtuosoはその窓口の背後で検索や集計を実行する。SPARQLはVirtuoso専用の言語ではなく、ほかの対応データベースでも利用できる。

公開APIを利用するときの処理は、次のように流れる。

```text
Webページ・Stanza
  → SPARQListへAPIリクエスト
  → SPARQListがSPARQLエンドポイントへクエリを送信
  → Virtuosoが検索・集計・並べ替えを実行し、生の結果を返す
  → SPARQListのOutputがJavaScriptでAPI用JSONに整形
  → Webページ・Stanzaが結果を表示
```

たとえば培地ごとのstrain数を数えるCOUNTや、その数で並べ替えるORDER BYはVirtuoso側で実行する。`output.mjs` は取得済みの結果から数値や文字列を取り出し、API用の返却形式に整える。

「Virtuosoでクエリエラーになった」とは、送信したSPARQLをデータベース側で解釈・実行できなかったという意味。SPARQListの整形処理や画面表示のエラーとは区別する。標準仕様とデータベース実装の対応には差があり得るため、実際に使うエンドポイントで確認する。

### ローカル実行と公開APIの違い

このパッケージでは、ローカルの `.rq` ファイルを読み、`https://togomedium.org/sparql` へ送信する。検索処理はリモートで行われ、ローカルには結果を保存する。SPARQListの起動やAPI登録は不要。実行コマンドと保存先はパッケージの `README.md` に記載する。

公開APIのOutputには、生のクエリ結果を表示用のJSONへまとめる処理がある。ローカルで `.rq` を実行しただけでは、この処理まで実行したことにはならない。

## 結果の1行は1つの対象とは限らない

SELECTの結果は、選択した変数に入った値の組み合わせとなる。独立した複数値の関係を同じ対象で結合すると、組み合わせの分だけ行が増える。

たとえば、ある対象に性質A・Bとリンク1・2がある場合、それらを同時に取得すると次の4行になる。

| 対象     | 性質 | リンク |
| -------- | ---- | ------ |
| 同じ対象 | A    | 1      |
| 同じ対象 | A    | 2      |
| 同じ対象 | B    | 1      |
| 同じ対象 | B    | 2      |

各行に全要素の配列が入るのではない。複数値の組み合わせが行を増やし、API側でそれを項目ごとの配列へまとめることがある。

`SELECT DISTINCT` が除くのは、選択したすべての変数の値が同じ行。上の4行は異なるため、DISTINCTでも1行にはならない。

この結果はSPARQLの仕様に沿うが、常にこの書き方を選ぶ必要はない。項目同士の組み合わせが必要なのか、項目ごとの値だけが必要なのかによってクエリを選ぶ。SQLで複数の一対多の関係を結合した場合にも同様の行の増加が起こる。

## 結合・UNION・集約の使い分け

- **結合**: 共通の変数でパターンをつなぎ、条件に一致する組み合わせを取得する。
- **UNION**: 複数のパターンの結果を合わせる。独立した項目を分岐ごとに取得すれば、項目間の全組み合わせを避けられる。
- **集約**: GROUP BYで行をまとめ、COUNTで数えたり、GROUP_CONCATで文字列を連結したりする。

GROUP_CONCATの結果は文字列で、JSON配列ではない。API用のオブジェクトや配列が必要な場合は、JavaScriptなどで整形する方法もある。

UNIONは常に高速という意味ではない。行数の削減、取得情報の一致、実行速度はそれぞれ別に確認する。

## 生のJSONと整形後のJSON

SPARQL Results JSONでは、SELECTの各行が `results.bindings` に入る。各変数の値には `value` のほか、URIやリテラルを区別する `type`、言語を表す `xml:lang`、データ型を表す `datatype` などが付く。

OPTIONALで値が得られなかった変数は、その行のキー自体が省略される。SELECTに列挙した変数が、全行に必ず存在するわけではない。

API向けの整形では、複数行を対象のIDやURIごとにまとめ、別名や関連先の重複を除いて配列にできる。このとき、何を同じ対象とみなすか、値がない項目を空配列にするかなどを決める必要がある。

## 件数とページング

行数と対象の件数は区別する。`COUNT(*)` は集計対象の行を数え、`COUNT(DISTINCT ?item)` は値が得られた `?item` の重複を除いて数える。URIを数えるかIDを数えるかでも、結果が同じとは限らない。

LIMIT・OFFSETは結果の行を区切る。関連情報の展開で1対象が複数行になる場合、展開後にLIMITを適用しても、指定した数の対象を取得できるとは限らない。対象のページを先に確定し、その後に関連情報を取得する方法がある。

一覧と総件数を別クエリにする場合は、検索対象を決める条件をそろえる。総件数にはページの範囲を適用しない。

## 階層をたどることと関連を取得すること

`rdfs:subClassOf` は下位の分類から上位の分類への関係を表す。`rdfs:subClassOf+` は1段以上、`rdfs:subClassOf*` は0段以上をたどる。0段を含む指定では、対象自身も一致する。

階層をたどっても、結果が自動で入れ子のJSONになるわけではない。直接の親が必要なら、親を取得するパターンと変数を加える。RDFでは同じ対象から複数の親への関係を記述できるため、木構造かどうかはデータと仕様を確認する。

分類同士の階層と、成分からRoleなどへの関連は別の関係。階層を検索するだけで、成分にどの関連が記録されているかを決めつけない。

## 個別クエリの説明と検証記録

| 内容                                                  | 参照先                                                   |
| ----------------------------------------------------- | -------------------------------------------------------- |
| 最初の成分一覧クエリ                                  | `queries/experimental/components/README.md`              |
| 一覧とcountの関係、WHEREの違い、offsetによるtotalの差 | `queries/reference/list-components/README.md`            |
| 成分詳細の192行の内訳、19変数とOutputの整形           | `queries/reference/gmdb-component-by-gmoid/README.md`    |
| UNION版の取得情報・行数の比較と未検証事項             | `queries/experimental/gmdb-component-by-gmoid/README.md` |
| propertyの取得とページング、JSON配列への整形          | `queries/apis/list-components2/README.md`                |
| Role一覧、親ID、観測した階層と複数親の扱い            | `queries/apis/list-component-roles/README.md`            |
| Roleごとの直接・下位込み件数、集計時の重複排除        | `queries/apis/count-components-by-role/README.md`        |

## 仕様の参照先

- RDF 1.1 Primer: https://www.w3.org/TR/rdf11-primer/
- SPARQL 1.1 Query Language: https://www.w3.org/TR/sparql11-query/
- SPARQL Results JSON: https://www.w3.org/TR/sparql11-results-json/
- SPARQList: https://github.com/dbcls/sparqlist
- Virtuoso: https://virtuoso.openlinksw.com/
