# TogoMedium Web

DBCLSが管理する培地データベースTogoMediumのWebフロントエンドと、関連するUI・API定義を管理するモノリポ。

WebサイトはReactとViteで構成し、培地詳細や検索などの機能をTogoStanzaベースのWebComponentとして組み込む。Stanzaは他のサイトでも再利用する前提で開発する。データは外部のSPARQList APIから取得する。

## 開発を始める

miseを利用できる環境で、リポジトリのルートから実行する。Node.jsとpnpmのバージョンは `mise.toml` に定義している。

```sh
mise install
mise exec -- pnpm install
mise exec -- pnpm web:serve
```

Web開発サーバーの設定ポートは5200。起動ログのURLをブラウザで開く。初回のmise設定の信頼確認や、ビルド・検証の手順は `docs/development-guide.md` を参照する。

Web側のReactコンポーネントを固定データで確認する場合は、別のターミナルで次を実行する。Storybookはポート6007で起動する。Story作成と初期状態の指定は `@packages/web/docs/storybook.md` を参照する。

```sh
mise exec -- pnpm web:storybook:serve
```

Webアプリの接続先を変更しなければ、APIはTogoMediumの公開SPARQList、Stanzaは配信済みのJavaScriptを利用する。Webアプリを起動するだけではローカルのStanza変更は反映されない。Stanzaの開発・確認は次のコマンドと `@packages/stanza/docs/development-guide.md` を入口にする。

```sh
mise exec -- pnpm stanza:storybook:serve
```

WebとStanzaの接続先設定は `docs/architecture.md` にまとめている。

## 構成と資料

| パッケージ         | 役割                                                                |
| ------------------ | ------------------------------------------------------------------- |
| `@packages/web`    | Webサイトの画面構成、ルーティング、Stanzaの組み込み、Web用Storybook |
| `@packages/stanza` | 再利用可能なStanzaと共通UI、Stanza用Storybook                       |
| `@packages/api`    | APIの型・スキーマ・OpenAPI定義                                      |
| `@packages/sparql` | SPARQLの比較・実験・採用予定APIの実行と検証                         |
| `@packages/core`   | 通信や文字列処理などの共有処理                                      |

文書全体の入口は `docs/index.md`。構成とデータの流れは `docs/architecture.md`、環境構築と日常操作は `docs/development-guide.md`、変更後の確認は `docs/testing-policy.md` を参照する。

エージェントによる作業では、ルートと対象パッケージの `AGENTS.md` も確認する。
