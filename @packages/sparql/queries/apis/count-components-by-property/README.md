# Component propertyごとの成分数

## 採用・公開状態

- 採用状態: 採用予定。
- 公開状態: この定義のSPARQListへの反映は未実施。
- Zod連携: 未連携。クエリ・整形テストで検証する。
- 移植元: `togomedium-sparql-playground` の `0c883d2`。配置の対応は `docs/migration.md` を参照する。

## 目的と処理

Component property（GMO_000039）の直接の子ごとに、has property（GMO_000113）で直接関連する成分数を取得する。現状の1階層に合わせ、孫以下の探索・下位込み集計・親情報の出力は行わない。起点自身は対象外。

成分はComponent（GMO_000002）の下位クラスに限定し、URIで重複排除する。成分のID・名前の有無では絞り込まない。該当成分がなくてもOPTIONALでPropertyを残し、0件を返す。複数のPropertyを持つ成分はそれぞれで数えるため、件数の合計は成分総数と一致しない。

## ファイルと引数

| ファイル                          | 内容                                                |
| --------------------------------- | --------------------------------------------------- |
| `count-components-by-property.rq` | 直接の子と成分URIの件数を取得                       |
| `api.json`                        | クエリ結果を整形関数のresultへ渡す設定              |
| `output.mjs`                      | ID・ラベル・数値の件数へ変換                        |
| `output.test.mjs`                 | 0件、欠損、不正な件数、移植用コードの単独動作を確認 |

任意引数 `role_id` を受け取る。既定値は空文字列で全成分を対象とする。指定時はそのRoleがhas role（GMO_000112）で直接付いた成分だけを数え、下位Roleだけが付いた成分は含めない。Roleの対象はGMO_000037の下位クラス。0件のPropertyも残す。

`api.json` に既定値と形式を定義し、クエリの `"{{role_id}}"` を実行時に置換する。形式は `GMO_` と6桁の数字または空文字列。不正な形式は実行前にエラーとなり、形式が正しくても該当Roleがなければ全件0となる。

Propertyの起点はGMO_000039、成分の起点はGMO_000002、関連の述語はGMO_000113。ラベルは英語に限定する。

## 実行と出力

`@packages/sparql`で実行する。

```sh
# 生の結果だけを取得
mise exec -- pnpm query queries/apis/count-components-by-property/count-components-by-property.rq

# 取得からAPI用の整形まで実行
mise exec -- pnpm api queries/apis/count-components-by-property

# 保存済み結果を再整形
mise exec -- pnpm api queries/apis/count-components-by-property --saved

# このフォルダのテスト
mise exec -- node --test queries/apis/count-components-by-property/output.test.mjs
```

保存先はこのフォルダ内の `results/`。

- `count-components-by-property.json`: property（URI）、id、label、countを含む生のSPARQL Results JSON。
- `output.json`: `[{ id, label, count }]`。URIと親情報は含めない。
- `output.sparqlist.js`: SPARQListのOutputへ貼り付けるコード。

ID・ラベルの欠損はnull。countは非負の安全な整数へ変換し、欠損・不正値・範囲外はエラーにする。各集計行を1要素とするため、同じPropertyに複数のIDや英語ラベルがある場合は別要素になる。0行の結果は空配列。

## 検証記録

2026-09-26、8種類のPropertyを取得した。別クエリでPropertyごとの成分URI一覧を取得し、重複排除後の件数と全件一致した。エンドポイントに対するASKでも、直接の子の下に子孫がないことを確認した。

| Property            | count |
| ------------------- | ----: |
| Complex component   |   168 |
| Defined component   |   912 |
| Gas                 |    11 |
| Inorganic compound  |   302 |
| Organic compound    |   493 |
| Simple component    |   725 |
| Solution            |   177 |
| Undefined component |   326 |

件数と階層は検証時点の観測値。今後孫以下が追加された場合も、このクエリは直接の子と直接の紐づきだけを対象とする。その時点で集計範囲を見直す。

実データには0件のPropertyがなかったため、0件の整形はテスト用データで確認した。SPARQList本体での実行は未検証。

## SPARQListへの移植

次のコマンドで、引数検証・クエリ・Outputを含むMarkdownを生成する。

```sh
mise exec -- pnpm export queries/apis/count-components-by-property
```

保存先は `queries/apis/count-components-by-property/dist/sparqlist.md`。生成時に問い合わせは行わず、保存済み結果も不要。タイトル・説明・各引数の説明や例は `api.json` を編集する。API名はSPARQListのGUIで指定し、公開環境の `SPARQLIST_TOGOMEDIUM_ENDPOINT` を確認する。共通手順はパッケージの `README.md` を参照する。SPARQList本体への登録・実行は未確認。

## Roleで絞ったProperty別件数

```sh
# 引数なし: 全成分
mise exec -- pnpm api queries/apis/count-components-by-property

# Nutrient sourceが直接付いた成分のみ
mise exec -- pnpm api queries/apis/count-components-by-property --param role_id=GMO_000042

# 生の結果だけを取得
mise exec -- pnpm query queries/apis/count-components-by-property/count-components-by-property.rq --param role_id=GMO_000042
```

出力形式と保存先は同じで、最後の実行結果で上書きする。`--saved` は保存済み結果の再整形のみを行い、`--param` と併用できない。

2026-09-26、引数なしの結果が変更前と完全一致した。Nutrient source指定時も8分類を保持し、別クエリで列挙した成分URIから数えた件数と全件一致した。Complex componentは3件、Gasは0件だった。Complex componentの3件は、Propertyで絞ったRole別件数のNutrient sourceのdirect_countとも一致した。
