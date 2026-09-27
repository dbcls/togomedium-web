# 成分一覧と総件数

## 出典とファイル

参照元: https://togomedium.org/sparqlist/list_components

参照したAPI定義のバージョン: `2025-06-25T13:29:03.821Z`。

- `result.rq`: 成分のID・URI・標準名と、英語の別名を取得する。別名を `GROUP_CONCAT` でまとめ、名前順でページングする。
- `count.rq`: 対象の成分IDを重複排除して数え、入力したページ情報も返す。

検索対象は `GMO_000002` の下位クラスで、IDと標準名を持つもの。2本のクエリは独立しており、countの結果をresultへ渡す構成ではない。公開APIでは最後にOutputのJavaScriptが両者をまとめる。`pnpm query` の実行には、この整形処理を含まない。定義ページの記載順はデータの依存関係を意味せず、公開APIでの逐次・並列実行は未確認。

一覧と総件数を分けると、ページングと集計を個別に記述できる。ただし、元の作者の設計意図は未確認。WHERE全体は同一ではないが、検索対象を決める条件は共通で、countにだけ返却用のページ情報を付けるBINDがある。検索条件を追加するときは、両方の対象がずれないようにする。

## 引数の置き換え

| 元の引数     | 意味               | ローカル値 | 変更箇所                    |
| ------------ | ------------------ | ---------- | --------------------------- |
| `{{limit}}`  | ページの取得件数   | `20`       | resultのLIMIT、countのBIND  |
| `{{offset}}` | 先頭から飛ばす行数 | `0`        | resultのOFFSET、countのBIND |

変更時は両ファイルの値をそろえる。countのBINDは引用符付きの文字列で、集計範囲を制限するものではない。

## 実行と出力

コマンドは`@packages/sparql`で実行する。

```sh
mise exec -- pnpm query queries/reference/list-components/result.rq
mise exec -- pnpm query queries/reference/list-components/count.rq
```

- `queries/reference/list-components/results/result.json`: `gmo_id`、`component`、`label`、`alt_labels`。
- `queries/reference/list-components/results/count.json`: `total`、`limit`、`offset`。

どちらもSPARQLの生の結果。公開APIはこの後に表示用JSONへまとめる。

## 検証記録と注意点

2026-09-24、limit 20・offset 0で一覧の実行成功と総件数1539を確認した。2026-09-25には公開APIのoffset 0で1503、offset 100・00と直接のcount実行で1539を観測した。キャッシュの影響が有力だが原因は未確定。原因の調査は保留中。

同名成分の並び順を決める第2キーはない。複数の標準名がある場合、一覧の行数と一意なIDの件数が一致しない可能性もある。改良は `queries/experimental/` に置く。

### offsetによるtotalの差

2026-09-25の観測値。いずれもlimitは20。

| 実行方法                        | offset | total |
| ------------------------------- | ------ | ----: |
| 公開API                         | 0      |  1503 |
| 公開API                         | 100    |  1539 |
| 公開API                         | 00     |  1539 |
| エンドポイントへcountを直接実行 | 0      |  1539 |

数値として同じ0と00で結果が変わったため、URLやクエリ文字列にひもづく古いキャッシュの可能性を考えた。countのoffsetは返却用のBINDであり、集計対象を変える条件ではない。キャッシュが原因であることも、発生している層も未確定。

## API用の整形とSPARQListへの移植

`output.mjs` の `json` 関数でSPARQL Results JSONを整形する。

元APIと同じ `contents`、`columns`、`total`、`limit`、`offset`。空ページでは元APIの挙動を保ち、columnsを返さずtotal・limit・offsetは数値0となる。通常ページのこれらの値は文字列。

```sh
mise exec -- pnpm api queries/reference/list-components
```

クエリを実行し、`queries/reference/list-components/results/output.json` と `queries/reference/list-components/results/output.sparqlist.js` を保存する。保存済みのクエリ結果だけで整形をやり直す場合は `mise exec -- pnpm api queries/reference/list-components --saved` を使う。保存済み結果の引数・鮮度は自動では確認しない。

移植時は `output.sparqlist.js` の全体をSPARQList定義のOutputのJavaScriptコードブロックへ貼り付ける。`output.mjs` はローカル用のexportを含むため、そのままは貼り付けない。

SPARQListではクエリ名を `result` と `count` にする。Outputは `json({ result, count })` で受け取る。

エンドポイントを設定し、引数があるクエリは本READMEの置き換え箇所をテンプレート変数へ戻す。移植の共通手順はルートの `README.md` を参照する。

Outputの出典: https://github.com/dbcls/togomedium-sparqlist/blob/main/repository/list_components.md （2026-09-26取得）。関数のモジュール化以外は原文を維持する。

### 整形処理の検証

2026-09-26、limit 20・offset 0で20成分へ整形し、property付き一覧の共通項目とtotalが一致した。生成したSPARQList用Outputを独立したJavaScript環境で実行し、保存したJSONとの一致を確認した。SPARQList本体への登録・実行は未検証。

`api.json` にOutputの入力名と `.rq` ファイルの対応を定義する。整形仕様のテストは同じフォルダの `output.test.mjs` に置く。
