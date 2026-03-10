# AGENTS.md

## 開発環境

- 本プロジェクトはTypeScriptベースでReactのアプリを作っています
- パッケージ管理は pnpm です。
  - npm script を実行する時は pnpm から実行してください。
- 本プロジェクトは node v24 系統での実行を想定しており、開発者の環境は .nvm で管理をしています。
  - あなたの環境でも node -v を実行してノードのバージョンを確認してください
  - あなたがローカルエージェントの場合、 `source ~/.nvm/nvm.sh && nvm use >/dev/null && {実際のコマンド}` とすることで .nvmの環境を利用できることがあるようです。
  - 仮に `nvm use` が使用不可能かつ、node のバージョンが v24 でない場合は、直ちに作業を止めてユーザーの判断を仰いでください

## Stanzaについて

- 本プロジェクトでは Stanza (TogoStanza) というWebComponentの仕組みを利用しています
  - Stanzaについては今後追記していきますが「Stanza」という仕組みがあるということをまずは覚えておいてください

## コミニュケーション

- 不明な箇所・判断が必要な箇所があったら作業を止めてユーザーに確認してください

## コード規約

- JavaScriptではなくTypeScriptを優先的に使用します。
  - ユーザーがJavaScriptの概念を質問するときには「JavaScriptで質問です」と聞くかもしれませんが、回答内容のサンプルはTypeScriptのコードで型をつけた状態で回答してください。
- 関数の定義は function ではなく アロー関数を使ってください。

  ```typescript
  //NG
  function foo() {}
  //OK
  const bar = () => {};
  ```

  - 例外がいくつかあります
    - TanStackRouterのRouteファイルは、`function RouteComponent()` のように function 宣言を使ってください,

## テスト・リンター

- 作業完了後には必ず、lint と format を実行してください
  - pnpm run lint
  - pnpm run fmt

## Skills

- `docs/agents/skills` フォルダ以下に詳細な指示をまとめています
  - 指示のキーワードが含まれているので必ず先に読むようにしてください
