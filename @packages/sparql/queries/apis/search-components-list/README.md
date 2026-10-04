# 成分検索一覧API

## 採用・公開状態

- 採用状態: 一覧を先に取得するため、検索とfacet集計を分離したAPI。
- 外部名: `gmdb_search_components_list`、内部名: `searchComponentsList`。
- ローカルDockerへ登録・検証。人間レビュー済みで、ユーザーはSPARQListリポジトリへの登録を公開受入条件として承認し、OpenAPI登録を明示依頼したため`openAPI.ts`へ登録済み。productionへのpush・deploy・本番の実動作確認は行っていない。
- Zod正本: `@packages/api/src/searchComponentsList/definitions.ts`。searchComponents2の入力と応答の一覧部分を再利用し、sort/orderは既存統合APIと同じ候補・既定値を使う。
- 比較元の`gmdb_search_components`と`gmdb_search_components2`はWeb側のソースを維持する。ユーザーの整理指示によりSPARQListリポジトリの比較用登録2件は削除した。

## 仕様・構成

名前・下位Role込みのRole・直接付与PropertyをAND条件で検索し、標準名またはGMO IDでページを確定してから、ページ内成分だけの直接利用培地数を集計する。検索・名前選定・別名・matched_names・直接培地数の意味は[search-components2](../search-components2/README.md)と同じ。

人間の追加依頼によりmedium_countの昇順・降順も許可する。このソートだけは、検索結果全体の直接利用培地数を集計してからソート・ページ確定する。APIの既定はmedium_count/desc/20/0。name/idのページ後集計とは処理順が異なる。

api.jsonは一覧クエリと総数クエリの2入力だけを持ち、facetクエリを実行しない。list-components-with-properties.rqとcount-components.rqは比較元と同一。Outputは一覧とページ情報だけを返し、facet結果を引数に必要としない。SPARQListで単独実行できる関数に保ち、Zod検証はローカルvalidate.mjsへ分離する。

queryVariantsでsort=medium_countだけlist-components-by-medium-count.rqへ切り替える。このクエリは[既存統合API](../search-components/README.md)と本文が完全一致し、0利用成分もOPTIONALとCOUNTで保持する。name/idのクエリ本文とOutputは変更していない。

## 引数・応答

| 引数        | 既定値       | 意味                                                 |
| ----------- | ------------ | ---------------------------------------------------- |
| name        | 空文字列     | 全言語の標準名・別名への大小文字を区別しない部分一致 |
| role_id     | 空文字列     | 選択Role自身と下位Role。空なら未指定                 |
| property_id | 空文字列     | 直接付与Property。空なら未指定                       |
| sort        | medium_count | name / id / medium_count                             |
| order       | desc         | asc / desc                                           |
| limit       | 20           | 非負の安全な整数文字列。20/50/100等を指定可能        |
| offset      | 0            | 先頭から省略する成分数                               |

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

verify-split.mjsは同じDockerのsearch2/list/facetsを17条件で比較する。listには比較元と同じname/ascを明示する。page/sortだけの変更ではfacet結果を再利用し、検索条件が異なる5組だけfacetを取得する。旧API応答の一覧部分とfacet部分への全項目一致を確認し、name/ascで各3回の逐次取得時間をresults/split-benchmark.jsonへ保存する。通常テストからは分離する。

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

## API既定値の変更（2026-10-02、人間指示）

sort=medium_count、order=descをAPI既定値とした。limit=20、offset=0は維持する。Zod・api.json・登録Markdownを揃え、引数なしのDocker応答が明示medium_count/descと完全一致した（検証時点で総数1539、20件、先頭GMO_001001）。明示name/ascとid/desc・offset=20はsearchComponents2の一覧部分と全項目一致した。check-allはVitest204件・Node78件成功。性能は再測定しておらず、上記計測は記載した明示ソート条件の観測として扱う。

他APIの既定値は変更しない。verify-split.mjsは比較元のname/ascをlistへ明示して比較する。productionへの反映は未実施。

## 受入・OpenAPI登録と比較登録の整理（2026-10-02）

ユーザーが人間レビューとSPARQListリポジトリ登録を受け入れ、OpenAPI登録を明示依頼した。従来の本番実動作確認後に登録する保留条件を、この依頼に従って変更し、採用list/facetsのDocだけを登録した。これは本番の実動作を確認したという記録ではない。

今回作成した比較登録gmdb_search_components.mdとgmdb_search_components2.mdはSPARQListリポジトリから削除した。検証スクリプトは比較用APIの登録がある環境を前提とするため、現在の整理後のDockerではそのまま再実行できない。過去の照合・性能記録とWeb側比較ソースは保持し、再登録は必要時に承認を得て判断する。

## レビュー後のAPI調整（BIO-342、2026-10-04）

`name`は全言語の標準名・別名またはGMO IDへの大小文字を区別しない部分一致とした。`GMO_001009`と`001009`のいずれも同じ成分に一致する。Role/Propertyとは引き続きAND。表示用`aliases`は詳細の`alt_labels_en`と同じ英語のみとし、両APIの英語別名を文字列の辞書順に安定化した。詳細側の変更は別名の並び順だけで、全言語検索と`matched_names`は維持する。

分類入力は従来の空文字列（Any）・GMO IDに`none`を追加した。`none`はRoleの`gmo:GMO_000112`、Propertyの`gmo:GMO_000113`という実述語の付与がない成分を指す。分類名や英語ラベルの欠損とは区別する。両方の未付与もANDで指定できる。共有定数・型は`@packages/api/src/searchComponentsList/classification.ts`。

独立コーパス照合は次で実行する。比較用SPARQListの登録は不要。採用APIはローカルDocker、独立コーパスはDockerと同じdev SPARQLを参照し、集計をJavaScriptで照合する。

```sh
mise exec -- node queries/apis/search-components-list/verify-adjustments.mjs
```

この検証は名前/日本語別名/ID全体・部分・大小文字、Any/未付与/両方未付与/分類AND/0件の15条件、全候補facetと未付与件数の自己条件除外、英語別名の詳細との一致、6ソート・方向のページ対応・利用培地数・空ページを確認する。観測総数1539、Role未付与513、Property未付与257、両方未付与87。これらは検証時の観測で、固定仕様ではない。保存先は`results/adjustments-verification.json`。本番push/deployは未実施。

大offsetの追加確認では`offset=9999`がdev SPARQL側の500で失敗した（name/idとmedium_countの両系統）。既存確認と同じ`offset=2000`の範囲外ページは正常に空配列を返す。エンドポイント側の上限制約候補であり、原因確定や対応はこのIssueでは行っていない。
