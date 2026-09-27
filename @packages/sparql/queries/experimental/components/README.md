# 成分一覧の練習クエリ

## 目的と処理

`list-components.rq` は成分のIDと標準名を取得する最初の練習用クエリ。`GMO_000002` の下位クラスを階層全体から探し、ID順に10行返す。別名の集約やAPI用のJSON整形は行わない。

## 引数と変更箇所

テンプレート引数はない。件数は `list-components.rq` 末尾の `LIMIT 10` で変更する。標準名の言語は絞り込んでいないため、複数の標準名があれば同じ成分が複数行になる可能性がある。

## 実行と出力

コマンドは`@packages/sparql`で実行する。

```sh
mise exec -- pnpm query queries/experimental/components/list-components.rq
```

保存先は `queries/experimental/components/results/list-components.json`。`id` と `label` を含むSPARQL Results JSONを返す。

## 検証記録

2026-09-24、LIMIT 10で10行の取得を確認した。2026-09-26に専用フォルダへ移動した。件数は実行時点の条件に基づく観測値。

## API用の整形とSPARQListへの移植

`output.mjs` の `json` 関数でSPARQL Results JSONを整形する。

`[{ id, label }]`。クエリの各行をそのまま1要素にし、同じIDでもラベルが異なる行は残す。

```sh
mise exec -- pnpm api queries/experimental/components
```

クエリを実行し、`queries/experimental/components/results/output.json` と `queries/experimental/components/results/output.sparqlist.js` を保存する。保存済みのクエリ結果だけで整形をやり直す場合は `mise exec -- pnpm api queries/experimental/components --saved` を使う。保存済み結果の引数・鮮度は自動では確認しない。

移植時は `output.sparqlist.js` の全体をSPARQList定義のOutputのJavaScriptコードブロックへ貼り付ける。`output.mjs` はローカル用のexportを含むため、そのままは貼り付けない。

SPARQListではクエリ名を `result` にする。Outputは `json({ result })` で受け取る。

エンドポイントを設定し、引数があるクエリは本READMEの置き換え箇所をテンプレート変数へ戻す。移植の共通手順はルートの `README.md` を参照する。

### 整形処理の検証

2026-09-26、10行を10要素へ整形した。生成したSPARQList用Outputを独立したJavaScript環境で実行し、保存したJSONとの一致を確認した。SPARQList本体への登録・実行は未検証。

`api.json` にOutputの入力名と `.rq` ファイルの対応を定義する。整形仕様のテストは同じフォルダの `output.test.mjs` に置く。
