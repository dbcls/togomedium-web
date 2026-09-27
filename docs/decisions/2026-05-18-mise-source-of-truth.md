# Node.js / pnpmの基準をmise.tomlに集約する方針

## 現在の運用への案内（2026-09-27追記）

以下は2026-05-18の判断記録。本文中の固定バージョンは当時の値として残す。現在のバージョンは `mise.toml`、セットアップは `docs/development-guide.md`、検証は `docs/testing-policy.md` を参照する。

2026-09-27時点で、`mise.toml` はNode 24.5.0 / pnpm 11.8.0、`.github/workflows/publish.yml` はNode 22 / pnpm 9を指定している。この記録ではCIを対象外としており、ローカルとCIの環境は一致していない。今回の文書整理では設定を変更していない。

## 決定

- Node.js / pnpmの実行バージョンは、`mise.toml` を唯一の参照元とする
- Node.jsは `24.5.0`、pnpmは `10.28.2` に固定する
- `.nvmrc` は削除し、nvmとの並列運用は行わない
- ドキュメントやエージェント運用では、`mise exec -- ...` の実行形式を優先する

## 背景

- これまでは `.nvmrc` と文書上のNode v24系指定で実行環境を管理していた
- 一方で、作業環境によって素の `node` や `pnpm` のバージョンがずれる可能性があった
- DDBJ Searchでは、Node.js / pnpmの基準を `mise.toml` に集約する運用を採用している

## 採用した理由

- `mise.toml` を正本にすると、Node.jsとpnpmの両方を同じ場所で固定できる
- `mise exec -- pnpm ...` を使うことで、AIエージェントやクラウド環境でもシェル初期化に依存しにくい
- `.nvmrc` を残さないことで、Node.jsの参照元が複数ある状態を避けられる
- GitHub Actionsのpublish workflowは今回の対象外とし、公開ビルド経路への影響を避ける

## 影響範囲

- ローカル開発時のNode.js / pnpmの扱い
- AIエージェントやクラウド実行時のコマンド運用
- 開発ドキュメントに記載するセットアップ手順とコマンド例

## 補足

- GitHub Actionsの運用は現時点では変更しない
- 利用環境によっては、初回利用時に `mise trust` が必要になる
- 将来GitHub Actions側でも `mise` を採用するかどうかは、別途検討する

## 見直し条件

- `mise` 以外のバージョン管理手段を標準に戻す判断が行われた場合
- GitHub Actionsや他の実行環境で別のバージョン管理手段を参照元として使う必要が出た場合
- `mise.toml` だけを参照元にする運用で、継続的な不都合が発生した場合
