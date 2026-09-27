# `agent-browser` 運用ガイド

## この文書の役割

この文書では、このリポジトリで `agent-browser` を使って画面確認するときの前提、確認対象、成果物の扱いを定める。

- 起動手順は `docs/development-guide.md` を参照する
- 画面確認の要否を含む検証方針は `docs/testing-policy.md` を参照する
- `agent-browser` で取得したスクリーンショットや確認ログの扱いは、この文書で判断する

## 前提

- `agent-browser` はリポジトリ依存のセットアップ対象ではない。使う利用者は、各自の個人環境で使える状態にしておく
- このリポジトリでは、`agent-browser` 本体のインストールや設定ファイルを管理しない
- `agent-browser` を使う場合も、対象アプリやStorybookの起動は通常の開発手順に従う

## 使う場面

- StanzaやWebアプリの見た目、表示崩れ、操作後の状態を確認する
- Storybook上のStoryを、ブラウザで実際に描画された状態として確認する
- 変更前後の比較用にスクリーンショットを残す

画面確認を追加するかどうかは `docs/testing-policy.md` の「コード変更を含む場合」に従う。

## Storybookでの見方

- Storybookは `docs/development-guide.md` の手順で起動する
- 対象Storyが明確な場合は、管理画面経由ではなく `iframe.html` を直接開く
- `iframe.html` を使うと、Storybookのサイドバーやツールバーの影響を受けずに描画対象を確認しやすい

確認用URLの例:

```text
http://127.0.0.1:6006/iframe.html?id=<story-id>
```

管理画面上でStoryを選んだ場合も、最終確認では同じStoryの `iframe.html` URLを使う。

## Webアプリでの見方

- WebアプリやStanzaの起動は `docs/development-guide.md` に従う。Stanza単体の確認環境は `@packages/stanza/docs/development-guide.md` の「確認の進め方」を参照する
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

- `docs/development-guide.md`: 環境構築・起動・ビルドの手順
- `docs/testing-policy.md`: テスト・lint・表示確認の扱い
- `docs/index.md`: ドキュメント全体の入口
