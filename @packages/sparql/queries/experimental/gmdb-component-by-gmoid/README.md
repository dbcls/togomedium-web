# 成分詳細のUNION版

## 目的と処理

比較元は `queries/reference/gmdb-component-by-gmoid/result.rq`。

`component-detail-union.rq` は各項目を独立したUNIONの分岐で取得し、別名・性質・リンクなどの全組み合わせを作らない。標準名・IDは共通の必須条件とし、追加情報のない成分も残すためbase行を含める。元の変数名、言語フィルタ、関連クラスのID・ラベルの条件を維持する。

## 引数と変更箇所

元APIの `{{gmo_id}}` に相当する値は `GMO_001010`。`component-detail-union.rq` の `VALUES ?gmo` を変更する。CLIのID引数はない。比較元も同じIDにそろえる。

## 実行と出力

コマンドは`@packages/sparql`で実行する。

```sh
mise exec -- pnpm query queries/experimental/gmdb-component-by-gmoid/component-detail-union.rq
```

保存先は `queries/experimental/gmdb-component-by-gmoid/results/component-detail-union.json`。kindで行の種類を示し、その項目に対応する変数が入る。kindはbase、label_ja、alt_label_en、alt_label_ja、super_class、sub_class、property、role、link。

`pnpm query` は生の結果だけを保存する。標準名・IDが複数ある場合には、その組み合わせは残る。

## 検証記録と未確認事項

2026-09-25、GMO_001010で元の192行から21行へ減った。標準名・ID、日英の別名、日本語名、関連クラス・性質・役割のURIとIDとラベルの組、リンクの一致を確認した。

比較はJSON全体や行数の一致ではなく、項目ごとの値の集合で行う。速度改善と他の成分での効果は未検証。公開APIは変更していない。

## UNIONを使う理由

このAPIでは、別名・性質・リンクを項目ごとに集めて1成分のJSONへまとめるため、独立した項目同士の組み合わせは不要となる。UNIONで分けると、それらの値が増えても項目間の掛け算を避けられる。項目同士の組み合わせそのものを調べる用途では、結合する書き方を選ぶ。

元の変数名を残しているため、整形処理はkindで分岐する方法のほか、各キーの有無を確認して値を拾う方法も使える。

## API用の整形とSPARQListへの移植

`output.mjs` の `json` 関数でSPARQL Results JSONを整形する。

元APIと同じ詳細オブジェクト。UNIONの疎な行から値を集め、関連項目はGMO IDで重複排除する。日本語名は全行から最初に見つかった値を採用する。0行なら空配列。標準名・IDは先頭行を採用する。

```sh
mise exec -- pnpm api queries/experimental/gmdb-component-by-gmoid
```

クエリを実行し、`queries/experimental/gmdb-component-by-gmoid/results/output.json` と `queries/experimental/gmdb-component-by-gmoid/results/output.sparqlist.js` を保存する。保存済みのクエリ結果だけで整形をやり直す場合は `mise exec -- pnpm api queries/experimental/gmdb-component-by-gmoid --saved` を使う。保存済み結果の引数・鮮度は自動では確認しない。

移植時は `output.sparqlist.js` の全体をSPARQList定義のOutputのJavaScriptコードブロックへ貼り付ける。`output.mjs` はローカル用のexportを含むため、そのままは貼り付けない。

SPARQListでは `component-detail-union.rq` を `result` という名前のクエリとして登録する。Outputは `json({ result })` で受け取る。

エンドポイントを設定し、引数があるクエリは本READMEの置き換え箇所をテンプレート変数へ戻す。移植の共通手順はルートの `README.md` を参照する。

### 整形処理の検証

2026-09-26、GMO_001010の21行を1つの詳細オブジェクトへ整形した。元API版とスカラー値および配列の要素集合が一致した。配列の順序は比較対象に含めない。生成したSPARQList用Outputを独立したJavaScript環境で実行し、保存したJSONとの一致を確認した。SPARQList本体への登録・実行は未検証。

`api.json` にOutputの入力名と `.rq` ファイルの対応を定義する。整形仕様のテストは同じフォルダの `output.test.mjs` に置く。
