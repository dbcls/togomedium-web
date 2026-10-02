# Playgroundからの移植

2026-09-27、独立した `togomedium-sparql-playground` のコミット `0c883d2a320309564d4384297f9df9c729ce89a4` から移植した。元の作業ディレクトリは `/Volumes/DATA/repositories/togomedium-sparql-playground`。

クエリ・整形処理・検証・学習資料の今後の変更は `togomedium-web/@packages/sparql` で管理する。元リポジトリは移植時点の比較元として残し、この作業では削除・書き換え・公開リポジトリのアーカイブを行っていない。Git履歴自体は取り込んでいないため、移植前の経緯は元リポジトリの上記コミットまでを参照する。

## 配置の対応

| 移植元                                        | 移植先                                         | 理由                                 |
| --------------------------------------------- | ---------------------------------------------- | ------------------------------------ |
| `queries/sparqlist/*`                         | `queries/reference/*`                          | 既存公開APIの比較元を保持            |
| `queries/custom/list-components2`             | `queries/apis/list-components2`                | 改良版の成分一覧を採用予定として管理 |
| `queries/custom/list-component-roles`         | `queries/apis/list-component-roles`            | Role一覧を採用予定として管理         |
| `queries/custom/count-components-by-role`     | `queries/apis/count-components-by-role`        | Role別件数を採用予定として管理       |
| `queries/custom/count-components-by-property` | `queries/apis/count-components-by-property`    | Property別件数を採用予定として管理   |
| `queries/custom/components`                   | `queries/experimental/components`              | 基礎的な学習クエリ                   |
| `queries/custom/gmdb-component-by-gmoid`      | `queries/experimental/gmdb-component-by-gmoid` | 成分詳細のUNION版を比較する案        |
| `queries/custom/gmdb-medium-by-gmid`          | `queries/experimental/gmdb-medium-by-gmid`     | 培地詳細を分割取得する改良案         |

移植時点ではapisの4件を採用予定とし、公開反映は未実施。採用済みへの変更はAPIの用途・契約・検証を確認して決め、公開完了とは別に記録する。

## 移植したもの・引き継がないもの

Git管理されたクエリ、API設定、整形、テスト、README、用語集、学習メモを取り込んだ。既存の検証記録は当時の観測として保持し、参照パスと実行場所を更新した。クエリの検索条件・整形仕様は変えていない。

`.env`、results、Git履歴、ローカルキャッシュはコピーしない。実行環境と依存管理はモノリポのmise・pnpmに統合する。元のmise設定とlockfileをパッケージ内に重複させない。

`list-components2`にはローカル出力検証を追加した。Zodの正本は `@packages/api/src/listComponents2/definitions.ts`。既存公開APIの `listComponents` は変更せず、新定義を公開OpenAPIへ自動登録しない。残りの採用予定APIはスキーマ未連携。

## 移植時の確認

2026-09-27、次を確認した。件数は観測値で、固定仕様ではない。

- 17本のSPARQLについて、参照パスを書いたコメントを除く本文が移植元と一致した。
- ルートのformat・lint・type-check・testと、パッケージの構文確認を実行した。既存Vitest 198件、Nodeテスト42件が成功した。型チェックは成功し、変更していないWeb・Stanzaの既存警告3件が残る。
- 移植した38件のテストに、3区分のファイル解決、Zod出力契約、CLI入力定義との一致、検証失敗時の出力保持を確認する4件を加えた。
- 実エンドポイントでreferenceの成分一覧、experimentalの練習一覧、apisのlist-components2を実行し、保存と整形を確認した。
- list-components2は培地数降順・limit 5で5成分、total 1539を返し、Zod検証を通過した。培地数は2469・1384・1136・1084・1072で、IDの重複はなかった。
- 名前順・limit 0ではcontentsが空、totalは1539、limitとoffsetは文字列の0となり、Zod検証を通過した。保存済み結果の再整形も確認した。
- resultsと.envがGit管理外であることを確認した。元リポジトリは変更していない。

すべてのクエリの再問い合わせやSPARQListへの登録・公開は行っていない。各クエリの以前の検証記録は、移植時に再検証した結果とは区別する。

## 成分検索APIへの名称整理（2026-10-02）

旧`queries/apis/list-components2`は`queries/apis/search-components`へ移動した。入出力スキーマの現行参照先は`@packages/api/src/searchComponents/definitions.ts`。上記の移植時の名称・観測記録は当時の履歴として保持する。検索・集計仕様と現行検証は新しいフォルダのREADMEを参照する。
