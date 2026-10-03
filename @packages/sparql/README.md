# TogoMedium SPARQL

このパッケージでは、TogoMediumのSPARQLクエリを実行・比較し、APIを設計する。検索は外部のSPARQLエンドポイント、整形と保存はローカルで行う。型・スキーマは `@packages/api` で一元管理する。

## クエリの区分

| 配置                    | 役割                            | 変更時の扱い                                                 |
| ----------------------- | ------------------------------- | ------------------------------------------------------------ |
| `queries/reference/`    | 既存の公開SPARQList由来の比較元 | 出典と取得条件を保つ。新規実装の規範にはしない               |
| `queries/experimental/` | 学習・比較・採用を検討中の案    | 仕様変更を許容する。採用を前提にしない                       |
| `queries/apis/`         | 採用予定・採用済みの新規API     | 返却形式と検証を管理し、採用状態と公開状態をREADMEに記録する |

既存APIを改良するときはreferenceを残し、apisに新しい定義を作る。方法や採用自体を検討したい場合はexperimentalで試す。必ずexperimentalを経由する必要はない。referenceの更新では、出典の変更を記録して比較元の版を追えるようにする。

採用は「こちらで保守する方針を決めた状態」、公開は「SPARQListへの反映が完了した状態」を指す。apisに配置しただけで公開済みとは扱わない。移植時の分類と出典は `docs/migration.md` に記録している。

## クエリを実行する

環境の準備はモノリポの `docs/development-guide.md`、実行環境の定義は `mise.toml` に従う。まず対象クエリのREADMEで用途・引数・出力を確認する。以下はモノリポのルートから実行する。

```sh
# 生のSPARQL結果を取得
mise exec -- pnpm --filter @packages/sparql query queries/experimental/components/list-components.rq

# API形式の結果を取得・整形（検証設定がある場合は検証も行う）
mise exec -- pnpm --filter @packages/sparql api queries/apis/search-components --param sort=medium_count --param order=desc --param limit=5

# 保存済みの生の結果を再整形（問い合わせなし）
mise exec -- pnpm --filter @packages/sparql api queries/apis/search-components --saved
```

引数のパスはパッケージを基準にする。各クエリREADMEの短い `pnpm api` / `pnpm query` コマンドは、`@packages/sparql` に移動して実行する。

`query` には `.rq` ファイル、`api` にはクエリフォルダを指定する。使い方は各コマンドの `--help` で確認できる。

既定の接続先は `https://togomedium.org/sparql`。変更する場合は、このパッケージの `.env.example` を `.env` にコピーし、`SPARQL_ENDPOINT` を設定する。モノリポのルートにある `.env` とは別に読み込む。実行環境に同名の変数が設定済みなら、その値が優先される。

### 結果を確認する

結果は対象クエリフォルダの `results/` に保存する。

| ファイル              | 確認する内容                              |
| --------------------- | ----------------------------------------- |
| `<クエリ名>.json`     | エンドポイントから返された生のSPARQL結果  |
| `output.json`         | `api` コマンドで整形したAPI形式の結果     |
| `output.sparqlist.js` | `api` コマンドで生成したSPARQList用Output |

失敗時は前回の結果や途中まで更新された生の結果が残ることがある。ファイルの存在だけで成功と判断せず、コマンドの終了結果を確認する。

`--saved` は結果の鮮度や引数を確認せず、`--param` と併用できない。クエリや引数を変えた場合は再取得する。

クエリ変更時は実エンドポイントで結果を確認する。HTTP成功だけでなく、対象ID・取得項目・重複・欠損・件数・ページングを変更内容に応じて確認する。比較元と件数が同じでも情報が同一とは判断しない。観測件数は固定仕様と区別し、行数削減を実行速度の改善と同一視しない。

通常結果と `.env` はGit管理外。判断の根拠となる検証日・条件・比較結果・未確認事項は対象READMEへ記録する。

## クエリを追加・変更する

1. 上記の区分から配置先を選び、`queries/<区分>/<機能名>/` に `.rq` とREADMEを置く。既存SPARQListの取り込みは `docs/import-sparqlist.md` に従う。
2. API形式への整形が必要なら、同じフォルダに `api.json`、`output.mjs`、`output.test.mjs` を用意する。設定・引数・整形・スキーマ連携は `docs/project-structure.md` を参照する。
3. READMEに目的、コピーして実行できる具体的なコマンド、引数の意味と置換方法、出力・保存先を記す。引数がなければその旨を示す。apisでは採用状態・公開状態・スキーマ連携の有無も記録する。
4. 実エンドポイントで結果を確認し、整形と共通処理のテスト、構文確認を行う。検証日・条件・結果・未確認事項をREADMEへ記録する。

```sh
mise exec -- pnpm --filter @packages/sparql check
mise exec -- pnpm --filter @packages/sparql test
```

上記のコマンドでパッケージを確認する。コード変更を含む作業の完了前確認は、モノリポの `docs/testing-policy.md` に従う。SPARQLのネットワーク検証は通常のテストから分離する。

個別クエリの追加では `scripts/` と `package.json` を変更しない。共通スクリプトに個別API固有の処理を持たせず、個別API用のパッケージスクリプトも追加しない。

入出力スキーマは `@packages/api` で一元管理し、独立して同じZod定義を作らない。実装時の制約と例外は `docs/project-structure.md` を参照する。

個別クエリのREADMEは日本語で書く。公開用メタ情報との使い分けは、モノリポの `docs/agents/task-guides/documentation.md` の「使用言語」に従う。

## SPARQListへの公開

公開先は [dbcls/togomedium-sparqlist](https://github.com/dbcls/togomedium-sparqlist)。このCLIはAPI登録・公開を行わない。

```sh
# モノリポのルートから、対象APIのMarkdownを生成
mise exec -- pnpm --filter @packages/sparql export queries/apis/search-components
```

出力は対象フォルダの `dist/sparqlist.md`。生成時にクエリを実行せず、保存済み結果も不要。同じファイルを再生成で上書きする。`dist/` はGit管理外で、編集元は `api.json`・`.rq`・`output.mjs` とする。API名はGUI上で指定し、生成ファイル名には持たせない。

1. `api.json` にタイトル・説明・各引数の説明と例を記入し、`pnpm export` で生成する。
2. SPARQListのGUIでAPI名を指定し、Markdownの内容を取り込む。
3. Endpointが参照する公開環境の `SPARQLIST_TOGOMEDIUM_ENDPOINT` を確認する。ローカルの `.env` は生成物へ取り込まない。
4. 公開先でも通常結果、空結果、引数、ページングを確認し、ローカル結果と比較する。
5. 対象READMEに公開先・反映日・版・検証結果を記録する。

生成前に対象の `api.json` に必要なメタ情報があることを確認する。`validate.mjs` とZodによる出力検証はローカル専用で、生成物には含めない。項目と生成の仕組みは `docs/project-structure.md` を参照する。

ローカルでの採用・検証、API文書への登録、SPARQListでの公開は別の作業として扱う。

## 資料

このパッケージ内の参照は、特記しない限り `@packages/sparql` 基準のパス。

- `docs/project-structure.md`: 設定項目、引数制約、検証と生成の仕組み
- `docs/import-sparqlist.md`: 既存SPARQList Markdownの取り込み手順と、別セッションでの依頼例
- `docs/migration.md`: 移植元、分類、管理元の移行
- `docs/gmo.md`: GMOの識別子、分類、関係
- `docs/sparql-learning-notes.md`: RDF・SPARQLの学習メモ
- `UBIQUITOUS_LANGUAGE.md`: クエリ検証用の用語
- 各クエリの `README.md`: 引数、出力、検証結果

モノリポ全体の文書の入口はルートの `docs/index.md`。通常の検証はルートの `docs/testing-policy.md` に従う。
