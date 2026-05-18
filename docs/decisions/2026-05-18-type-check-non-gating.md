# type-checkを当面non-gatingにする方針

## 決定

- `type-check` scriptは追加する
- ただし、当面は `check-all` に含めない
- `check-all` はformat / lint / testまでを対象にする

## 背景

- DDBJ Searchと同様に、品質確認scriptとして `type-check` を用意する方針にした
- 事前確認では、`@packages/api` のZod / OpenAPI定義まわりで既存型エラーが出ていた
- `@packages/stanza` や `@packages/core` の型チェックも、`@packages/api` への参照を通じて同種のエラーに影響される

## 採用した理由

- scriptを用意しておくことで、既存型エラーの状態を明示的に確認できる
- 既存型エラーの修正を今回のdocs / mise整備に含めると、作業範囲が大きく変わる
- `check-all` に含めると、現時点では既存エラーによって通常の確認導線が失敗する

## 影響範囲

- `package.json` の品質確認script
- `docs/development-guide.md` と `docs/testing-policy.md` の検証方針
- AIエージェントや開発者が完了時に実行する確認コマンド

## 補足

- `@packages/web` の型チェックは事前確認時点で通っていた
- `type-check` の失敗は既存状態として扱い、今回の実装範囲では修正しない

## 見直し条件

- `@packages/api` のZod / OpenAPI定義まわりの型エラーが解消された場合
- `type-check` をCIや `check-all` に含める運用へ移行する場合
- package別の型チェック範囲を再定義する場合
