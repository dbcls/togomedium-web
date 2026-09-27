# GMO IDによる成分詳細

## 出典と処理

参照元: https://togomedium.org/sparqlist/gmdb_component_by_gmoid

参照したAPI定義のバージョン: `2025-06-25T13:29:03.816Z`。

`result.rq` は公開定義のresultを保存した比較用クエリ。標準名・IDを必須として、日本語名、日英の別名、直接の上位・下位クラス、性質、役割、関連リンクをOPTIONALで取得する。

## 引数の置き換え

元の `{{gmo_id}}` を初期値 `GMO_001010`（D-Glucose）に置き換えている。対象を変える場合は `result.rq` の `VALUES ?gmo` にあるURI末尾のIDを変更する。CLIのID引数はない。

## 実行と出力

コマンドは`@packages/sparql`で実行する。

```sh
mise exec -- pnpm query queries/reference/gmdb-component-by-gmoid/result.rq
```

保存先は `queries/reference/gmdb-component-by-gmoid/results/result.json`。SELECTに列挙した19変数のうち、取得できた値が各行に入る。OPTIONALで取得できない項目のキーは省略される。

公開APIのOutputは、この結果から重複を除き、別名や関連クラスなどを配列へまとめる。`pnpm query` は生の結果だけを保存する。整形結果は後述の `pnpm api` で生成する。

## 検証記録と注意点

2026-09-25、GMO_001010で192行を確認した。別名・下位クラス・性質・リンクなどの全組み合わせが返るため、1成分でも多数の行になる。DISTINCTが除くのは全選択項目が同じ行だけ。

改良版は `queries/experimental/gmdb-component-by-gmoid/component-detail-union.rq`。比較時は対象IDをそろえる。

### 192行の内訳

2026-09-25、D-Glucose（GMO_001010）で確認した値の数。

| 項目         | 値の数 |
| ------------ | -----: |
| 英語の別名   |      2 |
| 日本語の別名 |      2 |
| 上位クラス   |      1 |
| 下位クラス   |      2 |
| 性質         |      3 |
| 役割         |      1 |
| 関連リンク   |      8 |

2 × 2 × 1 × 2 × 3 × 1 × 8 = 192行。各行には各項目から1つずつ取った組み合わせが入り、Outputが項目ごとの配列にまとめる。行数だけで性能上の問題があるとは判断できず、速度は別に計測する必要がある。

## API用の整形とSPARQListへの移植

`output.mjs` の `json` 関数でSPARQL Results JSONを整形する。

元APIと同じ詳細オブジェクト。別名・関連クラス・性質・Role・リンクを配列にまとめ、関連項目はGMO IDで重複排除する。0行なら空配列。日本語名は先頭行だけから取得する元の挙動を保つ。

```sh
mise exec -- pnpm api queries/reference/gmdb-component-by-gmoid
```

クエリを実行し、`queries/reference/gmdb-component-by-gmoid/results/output.json` と `queries/reference/gmdb-component-by-gmoid/results/output.sparqlist.js` を保存する。保存済みのクエリ結果だけで整形をやり直す場合は `mise exec -- pnpm api queries/reference/gmdb-component-by-gmoid --saved` を使う。保存済み結果の引数・鮮度は自動では確認しない。

移植時は `output.sparqlist.js` の全体をSPARQList定義のOutputのJavaScriptコードブロックへ貼り付ける。`output.mjs` はローカル用のexportを含むため、そのままは貼り付けない。

SPARQListではクエリ名を `result` にする。Outputは `json({ result })` で受け取る。

エンドポイントを設定し、引数があるクエリは本READMEの置き換え箇所をテンプレート変数へ戻す。移植の共通手順はルートの `README.md` を参照する。

Outputの出典: https://github.com/dbcls/togomedium-sparqlist/blob/main/repository/gmdb_component_by_gmoid.md （2026-09-26取得）。関数のモジュール化以外は原文を維持する。

### 整形処理の検証

2026-09-26、GMO_001010の192行を1つの詳細オブジェクトへ整形した。UNION版とスカラー値および配列の要素集合が一致した。生成したSPARQList用Outputを独立したJavaScript環境で実行し、保存したJSONとの一致を確認した。SPARQList本体への登録・実行は未検証。

`api.json` にOutputの入力名と `.rq` ファイルの対応を定義する。整形仕様のテストは同じフォルダの `output.test.mjs` に置く。
