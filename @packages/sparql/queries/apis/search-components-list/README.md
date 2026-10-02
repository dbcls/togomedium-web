# 成分検索一覧API

## 採用・公開状態

- 採用状態: 一覧を先に取得するため、検索とfacet集計を分離したAPI。
- 外部名: `gmdb_search_components_list`、内部名: `searchComponentsList`。
- ローカルDockerへ登録・検証。productionへのpush・deployと公開OpenAPI登録は未実施。
- Zod正本: `@packages/api/src/searchComponentsList/definitions.ts`。searchComponents2の入力既定値と応答の一覧部分を再利用し、sortだけ既存統合APIと同じ3候補へ拡張する。
- 比較元の`gmdb_search_components`と`gmdb_search_components2`は維持する。

## 仕様・構成

名前・下位Role込みのRole・直接付与PropertyをAND条件で検索し、標準名またはGMO IDでページを確定してから、ページ内成分だけの直接利用培地数を集計する。検索・名前選定・別名・matched_names・直接培地数の意味は[search-components2](../search-components2/README.md)と同じ。

人間の追加依頼によりmedium_countの昇順・降順も許可する。このソートだけは、検索結果全体の直接利用培地数を集計してからソート・ページ確定する。既定name/asc/20/0は維持する。name/idのページ後集計とは処理順が異なる。

api.jsonは一覧クエリと総数クエリの2入力だけを持ち、facetクエリを実行しない。list-components-with-properties.rqとcount-components.rqは比較元と同一。Outputは一覧とページ情報だけを返し、facet結果を引数に必要としない。SPARQListで単独実行できる関数に保ち、Zod検証はローカルvalidate.mjsへ分離する。

queryVariantsでsort=medium_countだけlist-components-by-medium-count.rqへ切り替える。このクエリは[既存統合API](../search-components/README.md)と本文が完全一致し、0利用成分もOPTIONALとCOUNTで保持する。name/idのクエリ本文とOutputは変更していない。

## 引数・応答

| 引数        | 既定値   | 意味                                                 |
| ----------- | -------- | ---------------------------------------------------- |
| name        | 空文字列 | 全言語の標準名・別名への大小文字を区別しない部分一致 |
| role_id     | 空文字列 | 選択Role自身と下位Role。空なら未指定                 |
| property_id | 空文字列 | 直接付与Property。空なら未指定                       |
| sort        | name     | name / id / medium_count                             |
| order       | asc      | asc / desc                                           |
| limit       | 20       | 非負の安全な整数文字列。20/50/100等を指定可能        |
| offset      | 0        | 先頭から省略する成分数                               |

api.jsonの定義に従い、文字列リテラルと数値プレースホルダーを安全に置換する。同順位はGMO ID昇順。応答はcontentsと文字列total/limit/offset。各成分はid/name/aliases/matched_names/medium_count/roles/propertiesを持つ。名前条件なしのmatched_namesは空配列。空ページでも総数とページ情報を残す。

## 実行・登録・検証

コマンドは`@packages/sparql`から実行する。

```sh
mise exec -- pnpm api queries/apis/search-components-list
mise exec -- pnpm api queries/apis/search-components-list --param role_id=GMO_000042 --param sort=id --param limit=50
mise exec -- pnpm api queries/apis/search-components-list --param sort=medium_count --param order=desc
mise exec -- pnpm api queries/apis/search-components-list --saved
mise exec -- pnpm export queries/apis/search-components-list
mise exec -- node queries/apis/search-components-list/verify-split.mjs
mise exec -- node queries/apis/search-components-list/verify-medium-sort.mjs
```

生の結果・output.json・output.sparqlist.jsはresults/、生成Markdownはdist/sparqlist.md。引数別には分離せず最後の実行で更新する。--savedは条件・鮮度を確認しない再整形で、--paramと併用できない。失敗時に旧結果が残るため終了結果を確認する。

登録先は`/Volumes/DATA/repositories/togomedium-sparqlist/repository/gmdb_search_components_list.md`、ローカルURLは`http://localhost:3000/sparqlist/api/gmdb_search_components_list`。DockerのSPARQL接続先は`https://dev.togomedium.org/sparql`。

verify-split.mjsは同じDockerのsearch2/list/facetsを17条件で比較する。page/sortだけの変更ではfacet結果を再利用し、検索条件が異なる5組だけfacetを取得する。旧API応答の一覧部分とfacet部分への全項目一致を確認し、既定値で各3回の逐次取得時間をresults/split-benchmark.jsonへ保存する。通常テストからは分離する。

## 検証（2026-10-02）

name/idの全方向・offset=20・20/50/100件・limit=0・範囲外ページ、日本語標準名、名前とRole・RoleとPropertyの併用、未知Roleの0件を含む17条件で、listはsearch2のcontents/total/limit/offsetと一致した。facetsもsearch2.facetsと一致し、下位Role込み・自己条件除外・0件選択肢保持の意味を維持した。

通常check-allはVitest204件・Node78件で成功。単独Output、Zod契約とCLI定義の一致、list設定にfacetクエリがないこと、facets契約にページ・ソート引数がないことを確認した。生成Markdownと登録ファイルは完全一致する。Appのカード描画・loading・失敗処理・stale response処理はここでは実装していない。

## ローカル応答時間（2026-10-02）

同じDocker・接続先・名前/Role/Property未指定・name/asc・limit=20・offset=0で測定した。17条件の照合後、比較元search2を取得し、続いてlist→facetsを逐次取得する順序を3回繰り返した。単位はms、HTTP応答JSONの受信完了までの時間。list利用可能時間と両応答完了時間はlist開始時点から計測する。

| 計測対象                | 1回目 | 2回目 | 3回目 | 中央値 |
| ----------------------- | ----: | ----: | ----: | -----: |
| 比較元search2の一体応答 |  3398 |  3515 |  3417 |   3417 |
| list応答                |   281 |   243 |   619 |    281 |
| facets応答              |  3255 |  3402 |  3423 |   3402 |
| 一覧データ利用可能      |   281 |   244 |   619 |    281 |
| listとfacetsの両方完了  |  3535 |  3645 |  4043 |   3645 |

一覧データは中央値約0.28秒で利用可能になった。一方、条件連動件数まで揃う時刻は約3.65秒で、一体応答約3.42秒より早くはなっていない。分離の効果は一覧データを先に利用できることにあり、facet集計そのものの改善ではない。実際のカード描画時刻はApp未実装のため未測定。

個々の観測値と端数を含む時間はresults/split-benchmark.jsonに保存する。事前照合後の3回だけの観測で、キャッシュ・負荷・通信の揺れを制御していないため、すべての条件やproductionでの性能を保証しない。

## medium_countソート追加の検証（2026-10-02）

verify-medium-sort.mjsで同じDockerの既存統合APIと22条件を比較し、contents/total/limit/offsetの全項目が一致した。medium_count両方向、20/50/100件、offset=20、範囲外ページ、limit=0、日本語標準名、名前・Role・Propertyの併用、未知Roleを含む。name/id両方向のoffset=20も非回帰を確認した。観測した0利用の行は延べ190行、同じ利用数でID昇順を確認した隣接組は延べ198組で、いずれも異なる成分の総数とは区別する。

さらに同じDockerでname=water・role_id=GMO_000044・property_id=GMO_000040をmedium_count両方向へ指定し、9成分を返す非空の複合条件でも既存統合APIと全項目一致した（合計24条件）。応答はresults/complex-{asc,desc}-{list,combined}.jsonへ保存した。通常CLIのmedium_count/ascと同じ複合条件も実SPARQL取得・Zod検証に成功。check-allはVitest204件・Node78件成功。既存統合API・searchComponents2・facetsは変更していない。

### ソート別のローカル応答時間

22条件の照合後、同じDocker・接続先・名前/Role/Property未指定・limit=20・offset=0で、name/asc→medium_count/descの順に各3回計測した。単位はms、HTTP応答JSONの受信完了まで。異なる並べ替え条件の比較であり、同じページ内容の性能比較ではない。

| ソート            | 1回目 | 2回目 | 3回目 | 中央値 |
| ----------------- | ----: | ----: | ----: | -----: |
| name/asc          |   398 |   191 |   163 |    191 |
| medium_count/desc |   464 |   390 |   365 |    390 |

この条件ではmedium_countソートの中央値は約0.39秒、nameソートは約0.19秒だった。medium_countは検索結果全体の集計が必要になるが、この3回だけから原因や一般的な速度差を断定しない。キャッシュ・負荷・通信を制御しておらず、コールドキャッシュ・同時アクセス・production・実描画時間は未検証。端数を含む観測値はresults/medium-sort-verification.jsonに保存した。今回もfacetクエリは実行しない。
