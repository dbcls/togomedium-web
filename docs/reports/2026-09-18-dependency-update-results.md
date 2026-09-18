# 依存関係更新の結果（2026-09-18）

MUI・Emotionと関連するBabelのメジャー更新を保留し、その他を段階的に更新した。
更新前のTogoStanza v4 alpha.2移行は `85b789d` に記録している。

## コミット単位

| コミット  | 更新内容                                                                                                                                                                         |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `8a433f2` | Vite 8.3.0、Vitest 5.0.1、Storybook 10.6.0、React用Viteプラグイン、jsdom 30、Testing Library、Tailwind/PostCSS関連。古いesbuild固定を撤去                                        |
| `e351f35` | Oxlint 1.83.0、oxlint-tsgolint 7.0.2001、Oxfmt 0.68.0、lintプラグイン。Node型を24系へ統一。Vite標準のパス解決へ移行し、型宣言を修正                                              |
| `84aec5f` | React/React DOMと型定義を19.3.0へ統一。TanStack Router/Query、Redux Toolkit、React Redux、Zod、zod-to-openapi、HTML parser、colord、yohak-tools等を更新。OpenAPI生成テストを追加 |
| `c506633` | Jotai 3.0.0、Nano ID 6.0.1。Scalar内部のVueランタイムを3.5.40へ統一                                                                                                              |
| `ddf881f` | 旧APIドキュメントのTypeSpec 1.16.0 / rest・versioning 0.86.0、concurrently 10.0.5。serviceデコレーターの値構文を修正                                                             |

変更はローカルコミットのみで、push・公開は行っていない。
全体を更新前に戻す場合は、上記の更新コミットを新しいものから順にrevertする。
特に `84aec5f` のReact・依存グラフ変更と `c506633` のVue統一は関連するため、後者だけを戻すとAPI画面の不具合が再発しうる。

## 更新時に必要だった調整

- TypeScript 7を試した際、vite-tsconfig-paths配下のtsconfckがTypeScript 5を要求した。パス解決はVite 8の `resolve.tsconfigPaths` に移行してWebビルドと全テストで確認した。ただしScalar配下にもTypeScript 7を許容しない依存があり、TypeScript本体は5.9.3に戻した。
- 新しいOxcが不正なReact拡張宣言を検出したため、StanzaのJSX型宣言をモジュール拡張へ修正した。BooleanStringの参照も明示的な型importにした。StorybookにはViteのCSS型宣言を追加した。
- ルーター更新後、React 19.2と19.3の混在によるHooksエラーをブラウザで検出した。React・React DOM・型定義を19.3へ揃えて解消した。
- Scalar配下のvue-sonner 1.3.0はVueを実行時にimportするが、devDependenciesにしか宣言していない。pnpm-workspace.yamlのpackageExtensionsで依存宣言を補った。
- ScalarでVueの複数バージョンが混在すると `Cannot define property ref, object is not extensible` が発生し、警告が繰り返された。Vueを3.5.40に統一してAPI画面の表示・項目移動・ブラウザエラーなしを確認した。
- TypeSpecの `@service({ ... })` を `@service(#{ ... })` に修正した。依存指定の `latest` は検証したバージョンに固定した。
- 整形ツールによる既存レポートの表整形と、BuilderPageの空行整理も含む。文書の意味は変更していない。

## 検証結果

- `mise exec -- pnpm run check-all`: format / lint / 型チェック / 45ファイル・197テスト成功。
- Web、Stanza、Storybookの各本番ビルド成功。
- TypeSpecコンパイルと旧APIドキュメントのViteビルド成功。旧生成物をWebへコピーするbundle処理は実行していない。
- frozen-lockfileで再インストール後もWeb・Stanza・Storybookのビルド成功。`pnpm peers check` は問題なし。
- ブラウザでホームのデータ件数表示、APIドキュメント表示と項目移動、StorybookのMUI/Jotaiを使った培地選択解除を確認。
- 全画面・全Stanzaの手動回帰確認は実施していない。

新しいOxlintで、必須プロパティへの不要なデフォルト値に関する警告が3件出る。ビルドには大きなチャンク、mdast-util-to-hastのディレクティブ、Storybook設定の将来のnative loader対応などの警告が残る。いずれも今回の検証は成功している。

## 保留した更新

| 対象                               | 維持した版 | 更新候補 | 理由                                                                                                                             |
| ---------------------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| @mui/material、@mui/icons-material | 7.3.9      | 9.4.0    | UIへの影響を別途慎重に確認する方針                                                                                               |
| @babel/core                        | 7.29.0     | 8.0.5    | EmotionのBabel presetが7系を要求するため、Emotion関連と一緒に判断                                                                |
| TypeScript                         | 5.9.3      | 7.0.2    | Scalar配下のcva 1.0.0-beta.2が `<6`、neverpanic 0.0.5が5系を要求                                                                 |
| @scalar/api-reference-react        | 0.9.1      | 0.9.68   | 試行時、@scalar/schemas 0.10.0からの @scalar/types/api-reference 解決に失敗。元の依存グラフへ戻し、Vueの問題を補正して表示を確認 |

Emotionのバージョン自体は変更していない。pnpm outdatedによる直接依存の更新残りは上記5パッケージ。
Node 24.5.0・pnpm 11.8.0はmise.tomlの指定を維持した。CIのNode 22・pnpm 9指定は今回変更しておらず、mise.tomlとの統一は別途残っている。GitHub Actions上での実行は未確認。

## 参照

- [ViteのtsconfigPaths設定](https://vite.dev/config/shared-options#resolve-tsconfigpaths)
- [Jotai v3移行ガイド](https://github.com/pmndrs/jotai/blob/main/docs/guides/migrating-to-v3.mdx)
- [zod-to-openapiのリリース情報](https://github.com/asteasolutions/zod-to-openapi/releases)
- [TypeSpecの値構文](https://typespec.io/docs/language-basics/values/)
