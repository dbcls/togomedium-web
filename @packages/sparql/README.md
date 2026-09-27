# TogoMedium SPARQL

TogoMediumのSPARQLクエリを実行・比較し、APIを設計するパッケージ。検索は外部のSPARQLエンドポイント、整形と保存はローカルで行う。型・スキーマの正本は `@packages/api` に置く。

## クエリの区分

| 配置                    | 役割                            | 変更時の扱い                                                 |
| ----------------------- | ------------------------------- | ------------------------------------------------------------ |
| `queries/reference/`    | 既存の公開SPARQList由来の比較元 | 出典と取得条件を保つ。新規実装の規範にはしない               |
| `queries/experimental/` | 学習・比較・採用を検討中の案    | 仕様変更を許容する。採用を前提にしない                       |
| `queries/apis/`         | 採用予定・採用済みの新規API     | 返却形式と検証を管理し、採用状態と公開状態をREADMEに記録する |

既存APIを改良するときはreferenceを残し、apisに新しい定義を作る。方法や採用自体を検討したい場合はexperimentalで試す。必ずexperimentalを経由する必要はない。referenceの更新では、出典の変更を記録して比較元の版を追えるようにする。

採用は「こちらで保守する方針を決めた状態」、公開は「SPARQListへの反映が完了した状態」を指す。apisに配置しただけで公開済みとは扱わない。移植時の分類と出典は `docs/migration.md` に記録している。

## 実行

実行環境はモノリポの `mise.toml` に従う。以下はモノリポのルートから実行する。

```sh
# 生のSPARQL結果を取得
mise exec -- pnpm --filter @packages/sparql query queries/experimental/components/list-components.rq

# 採用予定APIの取得・整形・検証
mise exec -- pnpm --filter @packages/sparql api queries/apis/list-components2 --param sort=medium_count --param order=desc --param limit=5

# 保存済みの生の結果を再整形（問い合わせなし）
mise exec -- pnpm --filter @packages/sparql api queries/apis/list-components2 --saved

# 構文確認とパッケージのテスト
mise exec -- pnpm --filter @packages/sparql check
mise exec -- pnpm --filter @packages/sparql test
```

引数のパスはパッケージを基準にする。各クエリREADMEの短い `pnpm api` / `pnpm query` コマンドは、`@packages/sparql` に移動して実行する。個別API用のpackage scriptsは増やさない。

`query` はクエリファイル、`api` はクエリフォルダの指定が必須。指定がない場合はUsageを表示して終了コード1で終了する。`--help` なら使い方を表示して正常終了する。

既定の接続先は `https://togomedium.org/sparql`。変更する場合は、このパッケージの `.env.example` を `.env` にコピーし、`SPARQL_ENDPOINT` を設定する。モノリポのルートにある `.env` とは別に読み込む。

実行結果は各クエリの `results/` に保存する。生の結果に加え、APIコマンドは `output.json` と `output.sparqlist.js` を生成する。通常結果と `.env` はGit管理外。`--output` による明示ファイルの上書きは拒否する。

問い合わせはGET、タイムアウトは30秒。失敗すると前回の結果が残る場合があるため、ファイルの存在だけで成功と判断しない。`--saved` は結果の鮮度や引数を確認せず、`--param` と併用できない。

## Zodとの連携

検証モジュールでは `%api/listComponents2/definitions` のように、Webと同じパスエイリアスでスキーマを参照する。対応先はこのパッケージの `tsconfig.json` に定義し、Viteの `resolve.tsconfigPaths` で解決する。`.mjs` のまま利用でき、TypeScriptへの変更は不要。

CLIは検証モジュールをVite経由で読み込み、検証後に実行環境を閉じる。HTTPサーバーやファイル監視は起動しない。検証モジュールをNodeで直接実行せず、上記の `pnpm api` / `pnpm test` を使う。クエリ実行とSPARQList用Outputの読み込みは引き続きNodeで行う。

`@packages/api/src/` にAPIの入出力スキーマを置き、このパッケージはそれを利用する。最初の連携対象は `list-components2`。`api.json` の `validation` が指定する `validate.mjs` を、整形後・出力保存前に実行する。検証エラー時には整形済み出力を更新しない。

`output.mjs` はSPARQListへ移すため、外部importに依存しない単独関数を維持する。Zodへの依存はローカルの検証モジュールに置く。入力引数は `api.json` の定義で置換前に検証し、list-components2ではZodの入力定義と一致することもテストする。他の採用予定APIのスキーマ連携は未実施で、各READMEに状態を記載する。

新しいスキーマを追加しても、公開状態を確認するまでは `@packages/api/src/openAPI.ts` に登録しない。Web・Stanzaはクエリ用パッケージを直接importせず、APIの型・スキーマを利用する。

## SPARQListへの公開

公開先は [dbcls/togomedium-sparqlist](https://github.com/dbcls/togomedium-sparqlist)。このCLIはAPI登録・公開を行わない。

```sh
# モノリポのルートから、対象APIのMarkdownを生成
mise exec -- pnpm --filter @packages/sparql export queries/apis/list-components2
```

出力は対象フォルダの `dist/sparqlist.md`。生成時にクエリを実行せず、保存済み結果も不要。同じファイルを再生成で上書きする。`dist/` はGit管理外で、編集元は `api.json`・`.rq`・`output.mjs` とする。API名はGUI上で指定し、生成ファイル名には持たせない。

1. `api.json` にタイトル・説明・各引数の説明と例を記入し、`pnpm export` で生成する。
2. SPARQListのGUIでAPI名を指定し、Markdownの内容を取り込む。
3. Endpointが参照する公開環境の `SPARQLIST_TOGOMEDIUM_ENDPOINT` を確認する。ローカルの `.env` は生成物へ取り込まない。
4. 公開先でも通常結果、空結果、引数、ページングを確認し、ローカル結果と比較する。
5. 対象READMEに公開先・反映日・版・検証結果を記録する。

生成物にはParameters、引数検証JS、クエリ切り替え、SPARQL、Outputが含まれる。`validate.mjs` とZodによる出力検証はローカル専用で、生成物には含めない。現在は `queries/apis/` の4つにメタ情報を用意している。ほかの定義を生成する場合も、先にメタ情報を追加する。項目と生成の仕組みは `docs/project-structure.md` を参照する。

ローカルでの採用・検証、API文書への登録、SPARQListでの公開は別の作業として扱う。

## 資料

このパッケージ内の参照は、特記しない限り `@packages/sparql` 基準のパス。

- `docs/project-structure.md`: ファイルの責務と実行フロー
- `docs/migration.md`: 移植元、分類、正本の移行
- `docs/gmo.md`: GMOの識別子、分類、関係
- `docs/sparql-learning-notes.md`: RDF・SPARQLの学習メモ
- `UBIQUITOUS_LANGUAGE.md`: クエリ検証用の用語
- 各クエリの `README.md`: 引数、出力、検証結果

モノリポ全体の文書の入口はルートの `docs/index.md`。通常の検証はルートの `docs/testing-policy.md` に従う。
