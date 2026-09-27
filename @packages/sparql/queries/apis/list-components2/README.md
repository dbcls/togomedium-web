# Property・Role・培地数付き成分一覧

## 採用・公開状態

- 採用状態: 採用予定。
- 公開状態: この定義のSPARQListへの反映は未実施。
- Zod連携: `@packages/api/src/listComponents2/definitions.ts` と連携済み。
- `validate.mjs` はローカルの保存前検証に使う。SPARQList用Outputには含めない。
- 移植元: `togomedium-sparql-playground` の `0c883d2`。配置の対応は `docs/migration.md` を参照する。

## 目的とファイル

成分をRole・Propertyで絞り込み、名前・GMO ID・利用培地数で並べ替える。各成分のProperty・Roleと、レシピに直接記載された培地数も返す。比較元は `queries/reference/list-components/`。公開APIへの登録・変更は行っていない。

| ファイル                           | 役割                                                                                                 |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| list-components-with-properties.rq | 名前・ID順でページを確定してから、その成分の培地数を集計する                                         |
| list-components-by-medium-count.rq | 全対象の培地数を集計し、並べ替えてからページを確定する                                               |
| count-components.rq                | 同じ絞り込み条件で成分IDの総数を数える。ソート・ページ範囲には依存しない                             |
| api.json                           | 引数の許可値と、sortによる実行クエリの切り替えを定義する                                             |
| output.mjs                         | 成分IDごとにまとめ、properties・roles配列とmedium_countを返す                                        |
| output.test.mjs                    | 重複排除、欠損、空ページ、親、出力順、引数を確認する                                                 |
| validate.mjs                       | `%api/listComponents2/definitions` のZodスキーマで保存前に検証する。ローカル専用でVite経由で読み込む |

どちらの一覧クエリも、Property・Roleはページを確定した後、OPTIONAL内のUNIONで取得する。関連先の組み合わせで行数を増やさず、整形時に成分ごとの配列へまとめる。

## 実行

`@packages/sparql`で実行する。

```sh
# 既定値: 名前の昇順
mise exec -- pnpm api queries/apis/list-components2

# 利用培地数の多い順
mise exec -- pnpm api queries/apis/list-components2 --param sort=medium_count --param order=desc

# GMO IDの降順
mise exec -- pnpm api queries/apis/list-components2 --param sort=id --param order=desc

# Nutrient sourceかつComplex componentを培地数順に取得
mise exec -- pnpm api queries/apis/list-components2 --param role_id=GMO_000042 --param property_id=GMO_000050 --param sort=medium_count --param order=desc

# 一覧クエリだけを実行する場合も、自動で実行ファイルを切り替える
mise exec -- pnpm query queries/apis/list-components2/list-components-with-properties.rq --param sort=medium_count --param order=desc
```

個別クエリのコマンドは生の結果だけを更新する。API形式の結果まで更新するには `pnpm api` を使う。

## 引数

| 引数        | 許可値                             | 既定値                   |
| ----------- | ---------------------------------- | ------------------------ |
| role_id     | GMO_と6桁の数字、または空文字列    | 空文字列（絞り込みなし） |
| property_id | GMO_と6桁の数字、または空文字列    | 空文字列（絞り込みなし） |
| sort        | name / id / medium_count           | name                     |
| order       | asc / desc                         | asc                      |
| limit       | 非負整数（0は空ページ）            | 20                       |
| offset      | 非負整数（先頭から省略する成分数） | 0                        |

不正な値は問い合わせ前にエラーにする。`order` の既定値はsortに関係なくasc。利用培地数の多い順にする場合はdescを明示する。

### 絞り込み

- `role_id`: 指定Roleがhas roleで直接付いた成分。Role（GMO_000037）の下位クラスが対象。下位Roleだけへの付与は含めない。
- `property_id`: 指定Propertyがhas propertyで直接付いた成分。Component property（GMO_000039）の直接の子が対象。

両方指定するとAND条件。形式が正しくても該当分類がなければ空一覧とtotal 0を返す。一覧の2種類のクエリとcountに同じ条件を適用する。EXISTSで有無を調べるため、フィルターによって集約対象の行を増やさない。

絞り込みは成分を選ぶ条件。返却するroles・propertiesは指定値だけに限定しない。選ばれた成分の培地数は全培地を対象に数える。

### 並び順と名前

nameは表示用nameのうち標準名の部分で並べる。別名はソートに使わない。idはGMO ID、medium_countは数値で並べる。同値の場合はorderに関係なくID昇順で確定する。

標準名が複数ある成分は英語を優先する。候補が複数ある場合は文字列の昇順、さらに同じ文字列なら言語タグの昇順で1件を選ぶ。英語がなければ他の標準名から同じ規則で選ぶ。ページ確定前に標準名を1件にするため、同一成分が複数言語の名前でページ枠を消費しない。

`sort=medium_count` の場合だけ、`api.json` の `queryVariants` で全対象を集計するクエリに切り替える。名前・ID順ではページ内の成分だけを集計する。どちらも生の結果の保存先とOutputの入力名は共通。

### LIMIT・OFFSET

`limit`・`offset` は `--param` で指定する。2種類の一覧クエリのLIMIT・OFFSETと、countが返すページ情報に同じ引数を使う。ソート後の成分単位で適用し、Property・Roleの展開行数には適用しない。

```sh
# 培地数の多い順で、先頭40成分を省略して20成分を取得
mise exec -- pnpm api queries/apis/list-components2 --param sort=medium_count --param order=desc --param limit=20 --param offset=40
```

0または先頭が0ではない数字列を受け付ける。負数、小数、符号、指数表記、空文字、先頭ゼロ、JavaScriptの安全な整数範囲を超える値は実行前に拒否する。接続先の実行上限内では、`limit=0` や総件数以上のoffsetでcontentsが空になり、totalと指定したページ情報は残る。limit・offsetは従来どおりJSONでは文字列として返す。

接続先のVirtuosoでは、2026-09-26時点で `limit + offset` が10,000を超える指定はエラーになった。このサーバー側の制限はローカルの整数検証とは別で、数値として有効でも取得を保証しない。

## 出力

- `results/list-components-with-properties.json`: 選択された一覧クエリの生の結果。培地数順でも保存名は同じ。
- `results/count-components.json`: 総件数とページ情報。
- `results/output.json`: API形式の整形結果。
- `results/output.sparqlist.js`: SPARQList用Output。

トップレベルは `contents`、`total`、`limit`、`offset`。ページ情報は元API同様に文字列。各成分は次の形で返す。

```json
{
  "id": "GMO_002412",
  "name": "Apple juice",
  "medium_count": 1,
  "properties": [{ "gmo_id": "GMO_000050", "label_en": "Complex component" }],
  "roles": [{ "gmo_id": "GMO_000042", "label_en": "Nutrient source", "parent": null }]
}
```

nameには選択した標準名と英語の別名を連結する。properties・rolesはIDと英語ラベルを持つ関連先が対象で、その組で重複排除する。該当値がなければ空配列。空ページでもtotalなどのページ情報は残す。

Roleのparentは直接の親のGMO ID。親がRoleルート（GMO_000037）、親なし、親ID欠損ならnull。異なる親URIが複数あれば整形時にエラーにする。

URI、表示用href、columnsは返さない。`gmdb-meta-list` 向けの共通リストスキーマを前提にせず、リンクや列定義は利用側で用意する。

保存先は引数ごとに分かれず、最後の実行結果へ更新する。失敗時には以前のファイルが残ることがある。`--saved` は保存済み結果を整形するだけで、ソートや絞り込みは変更しない。`--param` と併用できず、引数や鮮度も自動確認しない。

## 培地数の定義

medium_countは、レシピ内にその成分が直接記載された培地の数。数値で返し、同じ培地の複数箇所に出現しても1件、該当なしは0とする。使用されていない成分も一覧に残る。

`http://togomedium.org/media` グラフの `olo:slot/olo:item` でComponent表、`gmo:has_component` で各記載、`gmo:gmo_id` でGMOの成分へ結ぶ。対応するGMOがない記載は集計できない。`gmo:reference` による別培地・溶液への参照は辿らない。

OPTIONALでレシピを結び、`COUNT(DISTINCT ?medium)` を計算する。Property・Roleの展開は集計後なので、それらの関連数で培地数は増えない。

## SPARQListへの移植

次のコマンドで、引数検証・クエリ・Outputを含むMarkdownを生成する。

```sh
mise exec -- pnpm export queries/apis/list-components2
```

保存先は `queries/apis/list-components2/dist/sparqlist.md`。生成時に問い合わせは行わず、保存済み結果も不要。タイトル・説明・各引数の説明や例は `api.json` を編集する。API名はSPARQListのGUIで指定し、公開環境の `SPARQLIST_TOGOMEDIUM_ENDPOINT` を確認する。共通手順はパッケージの `README.md` を参照する。SPARQList本体への登録・実行は未確認。

`sort=medium_count` の場合だけ集計用クエリを選択する処理も含まれる。limit・offsetは非負の安全な整数として検証し、一覧の数値指定とcountの文字列値に同じ引数を使う。`validate.mjs` とZodによる出力検証はローカル専用で、Markdownには含めない。

## 検証記録

2026-09-26のデータで検証した。件数・時間は観測値で、固定仕様ではない。

- ソート導入前の既定ページは20成分・total 1539。medium_count追加前の既存項目を維持し、培地数は別クエリで列挙した培地IDの重複排除数と全件一致した。
- 名前・ID・培地数の昇順／降順の6通りについて、独立した全件集計から計算した上位20成分のID・順位・培地数が一致した。既定の名前昇順は変更前のJSONと一致した。
- OFFSET 20の2ページ目も全6通りで独立集計と一致した。Role GMO_000042とProperty GMO_000050の併用は3成分で、培地数は昇順0・1・2、降順2・1・0となった。該当しないRoleでは空一覧とtotal 0を確認した。
- APIコマンド全体の所要時間は初回検証で約0.87〜1.04秒、最終再検証で約0.75〜1.53秒。CLI起動、通信、一覧とcountの問い合わせ、整形・保存を含む。DB内部の実行時間ではなく、キャッシュや同時アクセスの影響は未確認。
- ID降順で標準名の複数言語により20行が19成分になるケースを観測し、名前を選んでからページを切る形へ修正した。
- 初期の培地数順の試験では、一覧クエリ単独が初回0.94秒、続く3回が0.50〜0.53秒だった。同じ条件の名前順は0.51〜0.97秒だった。現行API全体の計測とは測定範囲が異なる。

```sh
mise exec -- node --test queries/apis/list-components2/output.test.mjs
mise exec -- pnpm test
mise exec -- pnpm check
```

### ページ引数の検証

2026-09-26、名前昇順・ID降順・培地数降順のそれぞれで、limit 5・offset 5の結果がlimit 20・offset 0の6〜10件目と全項目で一致した。totalは変わらず、limit・offsetは指定した文字列で返った。

名前順と培地数順でlimit 0、およびlimit 5・offset 2000の空ページを確認した。Role GMO_000042・Property GMO_000050・培地数降順・limit 1・offset 1ではApple juiceの1成分とtotal 3を返した。負数・小数・先頭ゼロ・整数範囲外などの拒否は共通処理のテストで確認した。
