# Role一覧と直接の親

## 採用・公開状態

- 採用状態: 採用予定。
- 公開状態: この定義のSPARQListへの反映は未実施。
- Zod連携: 未連携。クエリ・整形テストで検証する。
- 移植元: `togomedium-sparql-playground` の `0c883d2`。配置の対応は `docs/migration.md` を参照する。

## 目的と処理

`list-component-roles.rq` はRole（GMO_000037）の下位クラスを `rdfs:subClassOf+` で取得する。成分への付与の有無に関係なく、定義されたRoleを対象とする。各RoleのID、英語ラベル、Role階層内の直接の親も取得する。

## 引数と変更箇所

テンプレート引数はない。起点は `GMO_000037`、ラベルの言語は `"en"` に固定している。別の階層へ転用する場合は、Role自身の探索と親の範囲を指定する両方の起点を変更する。

## 実行と出力

コマンドは`@packages/sparql`で実行する。

```sh
mise exec -- pnpm query queries/apis/list-component-roles/list-component-roles.rq
```

保存先は `queries/apis/list-component-roles/results/list-component-roles.json`。

| 変数               | 内容                      |
| ------------------ | ------------------------- |
| role / id / label  | RoleのURI、ID、英語ラベル |
| parent / parent_id | 直接の親のURIとID         |

取得できない任意項目のキーは省略される。Role自体は一覧に含めないが、直接の親としては現れる。親が複数なら親ごとに行が増える。

## 検証記録と未確認事項

2026-09-25、21件すべてで親IDを取得できた。Carbon sourceの親はGMO_000042（Nutrient source）、Trace metalの親はGMO_000078（Mineral source）だった。

現時点のデータに合わせ、このプロジェクトではRole階層を木構造として扱う。直接の親は1つとし、異なる親URIが複数見つかった場合は整形時にエラーにする。

### 観測した階層の例

2026-09-25に取得した階層の一部。

```text
Role
├─ Nutrient source
│  ├─ Carbon source
│  └─ Nitrogen source
├─ Growth factor
│  ├─ Vitamin
│  └─ Mineral source
│     └─ Trace metal
└─ Redox indicator
   ├─ pH dependent redox indicator
   └─ pH independent redox indicator
```

`rdfs:subClassOf+` は1段以上の関係をたどる指定で、結果自体を入れ子にするものではない。階層の関係がわかるよう、直接の親を別の変数として取得している。

## API用の整形とSPARQListへの移植

`output.mjs` の `json` 関数でSPARQL Results JSONを整形する。

`[{ uri, id, labels, parent: { uri, id } | null }]`。RoleをURIでまとめ、ラベルは重複を除いた配列にする。欠損IDはnull、ラベルがなければ空配列、親がなければnull。1つのURIに1つのIDを前提とし、異なるIDが複数あれば最後の値を採用する。

```sh
mise exec -- pnpm api queries/apis/list-component-roles
```

クエリを実行し、`queries/apis/list-component-roles/results/output.json` と `queries/apis/list-component-roles/results/output.sparqlist.js` を保存する。保存済みのクエリ結果だけで整形をやり直す場合は `mise exec -- pnpm api queries/apis/list-component-roles --saved` を使う。保存済み結果の引数・鮮度は自動では確認しない。

移植時は `output.sparqlist.js` の全体をSPARQList定義のOutputのJavaScriptコードブロックへ貼り付ける。`output.mjs` はローカル用のexportを含むため、そのままは貼り付けない。

SPARQListではクエリ名を `result` にする。Outputは `json({ result })` で受け取る。

エンドポイントを設定し、引数があるクエリは本READMEの置き換え箇所をテンプレート変数へ戻す。移植の共通手順はルートの `README.md` を参照する。

### 整形処理の検証

2026-09-26、21行を21要素へ整形した。件数クエリのRole集合とも一致した。複数親のエラーと任意項目の欠損はテスト用データで確認した。生成したSPARQList用Outputを独立したJavaScript環境で実行し、保存したJSONとの一致を確認した。SPARQList本体への登録・実行は未検証。

`api.json` にOutputの入力名と `.rq` ファイルの対応を定義する。整形仕様のテストは同じフォルダの `output.test.mjs` に置く。

親情報はRoleのURI単位で検証する。同じRoleに異なるラベルの行があっても、複数親の検出対象となる。
