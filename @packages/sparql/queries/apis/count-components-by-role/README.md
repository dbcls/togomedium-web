# Roleごとの成分数

## 採用・公開状態

- 採用状態: 採用予定。
- 公開状態: この定義のSPARQListへの反映は未実施。
- Zod連携: 未連携。クエリ・整形テストで検証する。
- 移植元: `togomedium-sparql-playground` の `0c883d2`。配置の対応は `docs/migration.md` を参照する。

## 目的と処理

`count-components-by-role.rq` はRoleごとの直接付与数と下位Roleを含む件数を取得する。GMO_000037の下位Roleを対象とし、起点のRole自体は一覧に含めない。生の結果では直接の親として返すが、整形後はparentをnullにする。成分はGMO_000002の下位クラスに限定し、名前やIDの有無では絞り込まない。

UNIONで直接付与と下位込みの行を分け、COUNT DISTINCTでそれぞれの成分URIを数える。該当成分がないRoleもOPTIONALで残し、0件を返す。Role階層内の直接の親URI・IDもOPTIONALで取得し、親ごとに集計する。COUNT DISTINCTにより、親情報の追加で成分を重複して数えない。

## 引数と変更箇所

任意の引数 `property_id` を受け取る。省略時は空文字列で、従来どおり全成分を対象とする。指定時はComponent property（GMO_000039）直下の該当Propertyをhas property（GMO_000113）で持つ成分だけを数える。直接・下位込みの両方へ同じ条件を適用し、0件のRoleも残す。

`api.json` に既定値と形式を定義し、`"{{property_id}}"` を共通CLIが置換する。指定できる形式は `GMO_` と6桁の数字。形式が不正なら実行前にエラーとなる。有効な形式でも、該当する直下Propertyがなければ全Roleの件数が0になる。

Roleの起点はGMO_000037、成分の起点はGMO_000002、付与関係はGMO_000112（has role）。Roleのラベルは英語に限定する。別の分類へ転用する場合は、両方のUNION分岐を含めて起点と述語を確認する。親の範囲を指定するGMO_000037も併せて確認する。

## 実行と出力

コマンドは`@packages/sparql`で実行する。

```sh
mise exec -- pnpm query queries/apis/count-components-by-role/count-components-by-role.rq
```

保存先は `queries/apis/count-components-by-role/results/count-components-by-role.json`。

- role / id / label: RoleのURI、ID、英語ラベル。
- parent / parent_id: Role階層内の直接の親URIとID。親が複数なら親ごとに行が増える。
- direct_count: そのRoleが直接付与された成分数。
- inclusive_count: そのRole自身とすべての下位Roleに付与された成分数。

## 検証記録と注意点

2026-09-25、21種類のRoleを取得し、全件でdirect_countがinclusive_count以下となることを確認した。Nutrient sourceは直接107件、下位込み395件。直接107件は別クエリの成分一覧でも照合した。Carbon sourceは両方176件だった。

同じ成分に複数の下位Roleが付いていても、inclusive_countでは1件。異なるURIは別成分として扱う。Role間で重複する成分があるため、件数の合計は成分総数とは一致しない。

direct_countは、そのRoleだけが付いた件数ではない。他のRoleや下位Roleも付いている成分を含み得る。親Roleの件数は、子Roleの件数の単純な合計では求められない。

## 階層と付与関係の違い

Role同士の `rdfs:subClassOf` と、成分からRoleへのhas roleは別の関係。Growth factorに下位Roleがあっても、Growth factorが付いた成分にVitaminやMineral sourceも必ず付いているとは、この階層だけからは判断できない。

下位Roleの件数を足すだけでは、複数のRoleに付いた成分を重複して数え、親Roleにだけ付いた成分を取りこぼす可能性がある。inclusive_countは親Role自身も対象に含め、成分URIを重複排除して数える。

## API用の整形とSPARQListへの移植

`output.mjs` の `json` 関数でSPARQL Results JSONを整形する。

`[{ id, label, direct_count, inclusive_count, parent: string | null }]`。ID・ラベルの欠損はnull。件数は非負の安全な整数へ変換し、欠損・不正値・安全な整数の範囲外はエラーにする。同じRoleのURI・ID・ラベルを持つ行をまとめ、直接の親のGMO IDを文字列としてparentに格納する。Role自身と親のURIは整形後の出力に含めず、内部の集計・検証に使う。親がない場合と親IDの欠損はnull。同じ親URIの繰り返しはまとめ、異なる親URIが複数あればエラーにする。親ごとに繰り返される件数は加算せず、不一致ならエラーにする。同じRoleに複数のIDやラベルがある場合は別要素として残す。

```sh
mise exec -- pnpm api queries/apis/count-components-by-role
```

クエリを実行し、`queries/apis/count-components-by-role/results/output.json` と `queries/apis/count-components-by-role/results/output.sparqlist.js` を保存する。保存済みのクエリ結果だけで整形をやり直す場合は `mise exec -- pnpm api queries/apis/count-components-by-role --saved` を使う。保存済み結果の引数・鮮度は自動では確認しない。

移植時は `output.sparqlist.js` の全体をSPARQList定義のOutputのJavaScriptコードブロックへ貼り付ける。`output.mjs` はローカル用のexportを含むため、そのままは貼り付けない。

SPARQListではクエリ名を `result` にし、Parametersに `property_id` を既定値が空文字列の任意引数として定義する。形式検証はローカルの `api.json` では移植されないため、公開先でも `GMO_` と6桁の数字または空文字列に制限する。Outputは `json({ result })` で受け取る。

エンドポイントを設定し、引数があるクエリは本READMEの置き換え箇所をテンプレート変数へ戻す。移植の共通手順はルートの `README.md` を参照する。

### 整形処理の検証

2026-09-26、21行を21要素へ整形し、全件でdirect_countがinclusive_count以下となることを確認した。0件・不正値はテスト用データでも確認した。生成したSPARQList用Outputを独立したJavaScript環境で実行し、保存したJSONとの一致を確認した。SPARQList本体への登録・実行は未検証。

`api.json` にOutputの入力名と `.rq` ファイルの対応を定義する。整形仕様のテストは同じフォルダの `output.test.mjs` に置く。

### 親子関係の確認

2026-09-26、親情報の追加後も21種類すべてのdirect_count・inclusive_countが変更前と一致した。親情報は同時に取得したRole一覧と全件で一致した。複数親のエラー・親の重複・親ID欠損はテスト用データで確認した。

子の `parent` と親の `id` を照合して、親の要素を探せる。親IDを取得できない場合もparentはnullになる。起点のRole（GMO_000037）が直接の親の場合は、整形後のparentをnullにし、一覧の最上位として扱う。判定には親URIを使う。複数親の検証はこの変換より先に行う。このプロジェクトではRole階層を木構造として扱う。返却形式は入れ子ではなく、各要素が単一の親を参照する平らな一覧とする。

親情報はRoleのURI単位で検証する。同じRoleに異なるラベルの行があっても、複数親の検出対象となる。

## Propertyで絞ったRole別件数

```sh
# 引数なし: 全成分のRole別件数
mise exec -- pnpm api queries/apis/count-components-by-role

# Complex componentを持つ成分のみ
mise exec -- pnpm api queries/apis/count-components-by-role --param property_id=GMO_000050

# 生の結果だけを取得する場合も指定可能
mise exec -- pnpm query queries/apis/count-components-by-role/count-components-by-role.rq --param property_id=GMO_000050
```

出力形式・保存先は引数なしの場合と同じ。最後の実行結果で上書きされるため、全件と絞り込み結果を比較するときは別途保存する。`--saved` は最後に保存した結果を再整形するだけで、`--param` との併用はエラーとなる。

2026-09-26、引数なしの出力JSONが変更前と完全一致した。Complex component指定時も21種類のRoleを保持し、うち11種類はinclusive_countが0だった。別クエリで成分URIと付与Roleを列挙し、全Roleのdirect_count・inclusive_countと一致した。Nutrient sourceは直接3件、下位込み7件だった。件数は検証時点の観測値。
