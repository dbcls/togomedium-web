# `agent-browser` 運用ガイド

## この文書の役割

この文書では、このリポジトリで `agent-browser` を使って画面確認するときの前提、確認対象、成果物の扱いを定める。

- 日常開発の手順と検証方針は `docs/development-guide.md` を参照する
- テスト・lint方針は `docs/testing-policy.md` を参照する
- `agent-browser` で取得したスクリーンショットや確認ログの扱いは、この文書で判断する

## 前提

- `agent-browser` はリポジトリ依存のセットアップ対象ではない。使う利用者は、各自の個人環境で使える状態にしておく
- このリポジトリでは、`agent-browser` 本体のインストールや設定ファイルを管理しない
- `agent-browser` を使う場合も、対象アプリやStorybookの起動は通常の開発手順に従う

コマンド例では `pnpm ...` と表記する。AIエージェントやクラウド環境では、原則として `mise exec -- pnpm ...` に読み替える。

## 使う場面

- StanzaやWebアプリの見た目、表示崩れ、操作後の状態を確認する
- Storybook上のstoryを、ブラウザで実際に描画された状態として確認する
- 変更前後の比較用にスクリーンショットを残す

単体テストやlintで確認できる変更だけなら、`agent-browser` による画面確認は必須にしない。

## Storybookでの見方

- Storybookを確認するときは、必要に応じて `pnpm storybook:serve` を起動する
- 対象storyが明確な場合は、manager UI経由ではなく `iframe.html` を直接開く
- `iframe.html` を使うと、Storybookのサイドバーやツールバーの影響を受けずに描画対象を確認しやすい

確認用URLの例:

```text
http://127.0.0.1:6006/iframe.html?id=<story-id>
```

manager UI上でstoryを選んだ場合も、最終確認では同じstoryの `iframe.html` URLを使う。

## Webアプリでの見方

- Webアプリを確認するときは、必要に応じて `pnpm web:serve` を起動する
- Stanza単体の挙動を確認するときは、対象に応じて `pnpm stanza:serve` またはStorybookを使う
- 操作を伴う確認では、最初の表示状態、操作内容、操作後の状態が分かるように記録する

## スクリーンショット運用

- スクリーンショット、HTMLスナップショット、確認ログなどの一時成果物は `.agent-browser/` に保存する
- `.agent-browser/` はGit管理に含めない
- 一時成果物はコミット対象にしない
- 完了報告で画像やログに触れる場合は、何を確認した成果物かを短く説明する

ファイル名は、確認対象と状態が分かる名前にする。

```text
.agent-browser/storybook-medium-list-before.png
.agent-browser/storybook-medium-list-after.png
.agent-browser/web-search-result-mobile.png
```

一時成果物を長期的な記録として残したい場合は、この文書ではなく、目的に合うドキュメントやissueで扱う。

## 関連文書

- `docs/development-guide.md`: 日常開発の手順と検証方針
- `docs/testing-policy.md`: テスト・lint・表示確認の扱い
- `docs/index.md`: docs全体の入口
