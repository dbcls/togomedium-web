# 成分検索facet API

## 採用・公開状態

- 採用状態: 成分一覧とは独立して条件連動件数を取得するAPI。
- 外部名: `gmdb_search_components_facets`、内部名: `searchComponentsFacets`。
- ローカルDockerへ登録・検証。人間レビュー済みで、ユーザーはSPARQListリポジトリへの登録を公開受入条件として承認し、OpenAPI登録を明示依頼したため`openAPI.ts`へ登録済み。productionへのpush・deploy・本番の実動作確認は行っていない。
- Zod正本: `@packages/api/src/searchComponentsFacets/definitions.ts`。既存応答のfacetsスキーマと検索条件を再利用する。
- 旧統合APIはWeb側の比較ソースを維持する。SPARQListリポジトリの比較用登録はユーザー指示で削除した。

## 入力・集計・応答

入力はname/role_id/property_idのみで、すべて空文字列が既定値。nameは全言語の標準名・別名への大小文字を区別しない部分一致、Roleは自身と下位Role、Propertyは直接付与。sort/order/limit/offsetはZod契約とapi.jsonに含めない。CLIとZodは未知の引数を拒否する。SPARQListの共通ラッパーは定義した引数だけを取り出すため、余分なHTTPクエリキーは集計へ影響しない。

Role別件数にはname/property_idを適用し、そのRole自身と下位Roleが付いた成分を重複排除する。Property別件数にはname/下位Role込みrole_idを適用する。それぞれ自身の選択条件を除外し、全選択肢と0件を保持する。母集団は一覧と同じ、GMO IDと標準名を持つComponentの下位クラス。

応答は`{ roles, properties }`で、統合APIのfacetsオブジェクトと同じ。項目はgmo_id/label_en/count、Roleはparentも持つ。親Roleルートはnull、異なる直接の親URIが複数ある場合は整形時にエラー。数値countは非負の安全な整数。ページ情報・総数・成分一覧は返さない。

api.jsonはRole・Property件数の2クエリだけを実行する。クエリ本文はsearch-components2と同一で、Outputも既存のfacet整形処理を抽出した単独関数。Zod保存前検証はローカルvalidate.mjsへ分離する。[一覧API](../search-components-list/README.md)と[共通集計仕様](../search-components/README.md)も参照する。

## 実行・登録

コマンドは`@packages/sparql`から実行する。

```sh
mise exec -- pnpm api queries/apis/search-components-facets
mise exec -- pnpm api queries/apis/search-components-facets --param name=DEXTROSE --param role_id=GMO_000042
mise exec -- pnpm api queries/apis/search-components-facets --saved
mise exec -- pnpm export queries/apis/search-components-facets
mise exec -- node queries/apis/search-components-list/verify-split.mjs
```

生の結果・output.json・output.sparqlist.jsはresults/、生成Markdownはdist/sparqlist.md。引数別には分離せず最後の実行で更新する。--savedは条件・鮮度を確認しない再整形で、--paramと併用できない。失敗時に旧結果が残るため終了結果を確認する。

登録先は`/Volumes/DATA/repositories/togomedium-sparqlist/repository/gmdb_search_components_facets.md`、ローカルURLは`http://localhost:3000/sparqlist/api/gmdb_search_components_facets`。DockerのSPARQL接続先は`https://dev.togomedium.org/sparql`。検証と逐次取得時間の記録は[一覧APIのREADME](../search-components-list/README.md)にまとめる。取得中の件数loadingや失敗時の一覧継続利用はApp側の責務で、今回実装していない。
