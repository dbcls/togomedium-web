# ファイル構成と実行の流れ

このパッケージは、TogoMediumのSPARQLをローカルのファイルで試し、結果を比較しながらSPARQListへ移すAPIを準備する場所。データの検索はリモートのSPARQLエンドポイントで行い、結果の整形と保存はローカルで行う。

## 構成の考え方

クエリごとの取得条件・入力設定・整形処理・テスト・説明を、同じフォルダにまとめる。共通の実行処理は `scripts/` に置く。

新しいクエリの追加や出力形式の変更は、基本的に対象フォルダの中で完結する。共通スクリプトにはAPI名や個別の出力項目を登録しない。`package.json` にもクエリごとのコマンドを増やさず、実行時にファイルやフォルダを指定する。

```text
queries/
  reference/<機能名>/        既存公開APIの比較元
  experimental/<機能名>/     学習・比較・試案
  apis/<機能名>/             採用予定・採用済みAPI
    README.md                目的・状態・引数・出力・検証結果
    api.json                 入力とクエリ、任意の検証モジュール
    <取得内容>.rq            SPARQL
    output.mjs               API形式への整形（単独実行可能）
    validate.mjs             任意のローカル検証
    output.test.mjs          整形テスト
    results/                 生成物（Git管理外）
scripts/                     共通の実行・保存・コード生成
docs/                        構成・学習資料
```

区分の意味と採用・公開の違いはパッケージの `README.md` を参照する。referenceを改良するときは元を残し、apisまたはexperimentalに新しい定義を作る。referenceのファイル名は元APIに合わせ、それ以外は取得内容が分かる名前にする。整形関数の入力名とファイル名は `api.json` で対応させる。

## クエリフォルダのファイル

| ファイル          | 役割                                                             | 変更する場面                       |
| ----------------- | ---------------------------------------------------------------- | ---------------------------------- |
| `.rq`             | 検索条件、取得項目、集計、並び順を定義する                       | 取得するデータを変える             |
| `api.json`        | Outputの入力名と `.rq` のファイル名を対応させる                  | クエリを追加・改名する             |
| `output.mjs`      | 生のSPARQL結果をAPI形式のJSONへ変換する                          | 重複排除、配列化、返却項目を変える |
| `output.test.mjs` | 整形処理の期待する結果と境界条件を確認する                       | 整形仕様を追加・変更する           |
| `README.md`       | 目的、具体的なコマンド、引数の変更箇所、出力、検証結果を説明する | 利用方法や確認結果を記録する       |

単独の `.rq` を試すだけなら `pnpm query` で実行でき、`api.json` や整形関数は不要。API形式の結果まで作る場合に、それらを用意する。

### api.jsonがつなぐもの

たとえば、一覧と件数を別クエリで取得する設定は次の形になる。

```json
{
  "inputs": {
    "result": "list-components-with-properties.rq",
    "count": "count-components.rq"
  }
}
```

左側は整形関数が受け取る名前、右側は同じフォルダにあるファイル名。保存された `list-components-with-properties.json` と `count-components.json` の内容が、それぞれ `json({ result, count })` の引数になる。

入力名とファイル名は同じでなくてもよい。`queries/experimental/gmdb-component-by-gmoid/` のUNION版では、設定が `"result": "component-detail-union.rq"` なので、`component-detail-union.json` を読み込んで `result` として渡す。

設定はクエリ間のデータ受け渡しを表さない。各クエリは個別に実行され、すべて成功した後に結果をまとめて整形関数へ渡す。`api.json` の `parameters` に定義した文字列引数は `--param 名前=値` で渡せる。`scripts/parameters.mjs` が形式を検証し、クエリ内の `"{{名前}}"` を置換する。定義していないテンプレート引数はローカルで具体値に置き換える。

### 引数によるクエリの切り替え

`api.json` の任意の `queryVariants` で、入力引数に応じた実行ファイルの切り替えを指定できる。たとえば `list-components2` は `sort=medium_count` のとき、名前・ID順用のクエリから全対象を集計するクエリへ切り替える。

```json
{
  "queryVariants": {
    "list-components-with-properties.rq": {
      "parameter": "sort",
      "cases": {
        "medium_count": "list-components-by-medium-count.rq"
      }
    }
  }
}
```

`parameter` は `parameters` に定義した引数名を参照する。値を検証してから `cases` の一致を調べ、一致しなければ元のクエリを使う。切り替え先は同じフォルダ内の `.rq` ファイルに限定し、再帰的には切り替えない。個別の条件は設定側に置き、共通スクリプトはsortなどの意味を持たない。

`pnpm query` と `pnpm api` の両方に適用する。保存先は指定された元のファイル名に基づくため、APIの入力名やOutputの引数は変わらない。`--saved` は最後に保存した結果を使い、引数による切り替えや並べ替えを行わない。

SPARQListにはこの設定は自動移植されない。公開先でも同じ条件でクエリを選択し、Outputには選択した結果を `result` として渡す。両クエリを常に実行すると、名前・ID順で集計対象を減らす効果が失われる。

### output.mjsと移植用コード

`output.mjs` は `json` 関数をexportする。重複排除や返却形式などの個別処理は、この関数に書く。

移植用コードは関数を文字列化して生成するため、`json` は外部importやモジュールの別変数に依存させない。補助関数や定数が必要なら `json` の内側に置く。各フォルダのテストでは、生成したコードをモジュール外で実行できることも確認する。

## 共通スクリプトの役割

| ファイル                         | 役割                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `scripts/query.mjs`              | `.rq` を読み、エンドポイントへ送信し、生の結果をJSONで保存する                                          |
| `scripts/parameters.mjs`         | CLI引数の解析と、各フォルダの設定に基づく文字列・整数引数の検証・置換を行う                             |
| `scripts/api.mjs`                | フォルダを受け取り、設定を読み、必要なクエリの実行と整形を順に進める                                    |
| `scripts/build-output.mjs`       | `api.json` の読み込み・検証、保存済み結果の読み込み、整形関数の呼び出し、JSONと移植用コードの保存を行う |
| `scripts/output.test.mjs`        | 共通のOutputコード生成をテストする                                                                      |
| `scripts/validation-runtime.mjs` | Viteで検証モジュールを読み込み、tsconfigのパスエイリアスを解決する                                      |
| `scripts/validation.test.mjs`    | 保存前検証と失敗時の出力保持をNodeで確認し、スキーマ連携テストをVite経由で実行する                      |
| `scripts/validation-cases.mjs`   | `%api/...` を使うスキーマ連携テスト。validation.test.mjsから読み込む                                    |
| `scripts/output-test-helper.mjs` | 各クエリのテストから使う、生成コードの単独動作を確認する共通ヘルパー                                    |

`build-output.mjs` は変換処理そのものを定義せず、対象フォルダの `output.mjs` を読み込んで呼び出す。共通ヘルパーにもRoleや成分などの個別仕様は置かない。

## コマンドと実行の流れ

コマンドは`@packages/sparql`で実行する。`package.json` のscriptsは4つ。

| コマンド                    | 用途                                                       |
| --------------------------- | ---------------------------------------------------------- |
| `pnpm query <ファイル.rq>`  | 1つのクエリを実行し、生の結果を保存する                    |
| `pnpm api <クエリフォルダ>` | 設定されたクエリを実行し、整形結果と移植用コードも保存する |
| `pnpm check`                | 実行スクリプトの構文を確認する                             |
| `pnpm test`                 | 各クエリの整形テストと共通処理のテストを実行する           |

たとえば、property付き一覧のAPI形式の結果を作る場合は次を実行する。

```sh
mise exec -- pnpm api queries/apis/list-components2
```

```text
api.mjs
  ├─ api.jsonを読む
  ├─ query.mjsでlist-components-with-properties.rq、count-components.rqを順に実行
  │    └─ エンドポイントの応答をlist-components-with-properties.json、count-components.jsonへ保存
  └─ build-output.mjs
       ├─ 保存済みJSONを読み込む
       ├─ output.mjsのjson({ result, count })を呼ぶ
       ├─ validationの指定があればZodなどで検証
       ├─ output.jsonを保存
       └─ output.sparqlist.jsを生成
```

`--saved` を付けるとクエリ実行を省き、保存済みの結果を使って整形する。整形処理だけを試す場合に使えるが、結果の鮮度や引数の一致は自動確認しない。クエリを変えた場合は通常の実行で再取得する。

クエリが失敗した場合は整形へ進まない。ただし、前回の結果や、途中まで更新された生の結果が残ることがある。ファイルの存在だけで成功と判断せず、コマンドの終了結果を確認する。

## 生成物と正本

`queries/apis/list-components2/` の実行結果は、対応する `queries/apis/list-components2/results/` に保存される。

| 生成物                                                              | 内容                                              |
| ------------------------------------------------------------------- | ------------------------------------------------- |
| `list-components-with-properties.json`、`count-components.json`など | エンドポイントから返された生のSPARQL Results JSON |
| `output.json`                                                       | `output.mjs` で整形したAPI形式のJSON              |
| `output.sparqlist.js`                                               | SPARQListのOutputへ貼り付けるJavaScript           |

生成物は再実行で更新されるため、編集は `.rq` や `output.mjs` に加える。各クエリフォルダの `results/` はGit管理外とし、判断に必要な検証結果は各READMEへ残す。

公開先は別リポジトリの `dbcls/togomedium-sparqlist`。クエリとOutputを移し、引数・エンドポイントを設定して公開先の環境でも確認する。このパッケージの `pnpm api` はHTTPサーバーの起動やAPI登録を行わない。移植手順はパッケージの `README.md` を参照する。

## 新しいクエリを追加するとき

1. 採用予定なら `queries/apis/<機能名>/`、試案なら `queries/experimental/<機能名>/` を作り、`.rq` とREADMEを置く。
2. API形式への整形が必要なら、`api.json`、`output.mjs`、`output.test.mjs` を同じフォルダに置く。
3. READMEに、`@packages/sparql` からコピーして実行できる具体的なコマンド、引数、保存先を書く。
4. クエリを実行して結果を確認し、整形テストを実行する。比較元がある場合は取得情報の違いも確認する。
5. 検証日・条件・結果・未確認事項をREADMEへ記録する。

個別クエリの追加では `scripts/` と `package.json` を変更しない。現在の `pnpm test` は `queries/*/*/output.test.mjs` を対象とするため、上記のフォルダ階層に配置する。

## 関連資料

- `README.md`: セットアップ、実行方法、SPARQListへの移植手順。
- `AGENTS.md`: 変更・検証・記録の運用ルール。
- `UBIQUITOUS_LANGUAGE.md`: クエリ検証で使う用語とDB上の対応。
- `docs/sparql-learning-notes.md`: RDF・SPARQLの基礎と共通する考え方。

## 整数引数

`parameters` の定義に `"type": "integer"` を指定すると、引用符なしの `{{limit}}` などを使用できる。defaultとCLIの値は文字列で渡し、patternに加えて非負の安全な整数であることを検証する。0以外の先頭ゼロや指数表記は受け付けない。

```json
{
  "limit": { "type": "integer", "default": "20", "pattern": "^(?:0|[1-9][0-9]*)$" }
}
```

`LIMIT {{limit}}` は数値トークンへ、`("{{limit}}" AS ?limit)` は文字列リテラルへ置換する。typeを省略した引数は従来どおり文字列で、完全な引用符付きプレースホルダーだけを許可する。任意のSPARQL構文を引数として挿入する機能ではない。

## ローカル出力検証

`api.json` の任意の `validation` に、同じフォルダの `validate.mjs` を指定する。共通処理は整形関数の結果を `validate(output)` に渡し、成功したときだけJSONとSPARQList用Outputを保存する。検証関数は不正な出力で例外を投げる。戻り値による出力の置換は行わない。失敗時に前回の出力が残る点はクエリ失敗時と同じ。

Zod定義は `%api/...` で `@packages/api` から参照する。パスの対応はパッケージの `tsconfig.json`、解決はWebと同じViteの `resolve.tsconfigPaths` を使う。`validation-runtime.mjs` はHTTP待ち受けと監視を無効にし、検証の成功・失敗にかかわらず終了する。検証モジュールはローカル用で、SPARQList用Outputには含めない。

`output.mjs` はNodeで直接読み込む。移植用コードは関数を文字列化するため、Viteの変換処理を通さない。スキーマ連携テストはCLIと同じViteの実行設定を使い、整形関数の単独動作とファイル保存のテストはNodeで行う。
