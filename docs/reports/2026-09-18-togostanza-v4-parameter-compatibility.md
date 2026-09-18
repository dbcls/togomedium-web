# TogoStanza V3 / V4 パラメーター互換性調査

- 調査日: 2026-09-18
- 対象読者: TogoStanza V4実装担当者
- 目的: `this.params` のドロップイン互換性について、確認できた差分と検証事項を共有する。

## 結論

**metadataに宣言されたパラメーターだけを `this.params` に取り込む点は、V3とV4で共通する。** この点をV4で導入された制約として扱う必要はない。

一方、未指定属性、空文字の型変換、パラメーターの生成タイミング、公開TypeScript型には差分がある。特に空文字のJSONがV4では例外になる点と、未指定値が `undefined` から `null` に変わる点は、既存stanzaの変更なしで動かす目標に対して検証・対応が必要である。

本レポートは実装の静的比較に基づく。ブラウザでV3とV4を並べた実行比較は未実施であり、互換性方針の変更や実装修正は行っていない。以下の修正方針は提案であり、採用済み仕様ではない。

## 比較対象と根拠

| 対象           | バージョン・コミット                                          | 確認箇所                                                   |
| -------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| V3             | `3.0.0-beta.57` / `2e5982d25bdebc604574908c6ebc72d0334cb000`  | `stanza.ts`、`src/stanza-element.mjs`                      |
| V4配布版       | `v4.0.0-alpha.1` / `cd256a31b17986f7ed1338813a978425ed530ded` | `src/runtime/stanza.ts`、配布済み `dist/runtime/stanza.js` |
| V4ローカル     | `9986b735388cb98cd479cfbe9d6d99da40e1a969`                    | `src/runtime/stanza.ts`、`src/runtime/stanza.spec.ts`      |
| 実プロジェクト | TogoMedium / `602765b`                                        | Stanzaの入口、共通React基盤、metadata                      |

V3はTogoMediumがV4への移行前に参照していたコミット。V4リポジトリの `references/togostanza` も同じコミットである。V4ローカルの上記2ファイルはalpha.1タグから変更されていない。

V4リポジトリ: `/Volumes/DATA/repositories/togostanza-remake`。以下のV4側のパスはこのルートを基準とする。

主な根拠:

- V3: `references/togostanza/stanza.ts:122` の `get params()`。
- V3: `references/togostanza/src/stanza-element.mjs` の属性変更処理。
- V4: `src/runtime/stanza.ts:56` の `params` フィールド。
- V4: `src/runtime/stanza.ts:208` 以降の接続・属性変更・再生成処理。
- V4: `src/runtime/stanza.ts:556` の `createStanzaParams()` と `parseParameterValue()`。
- V4: `src/runtime/stanza.spec.ts:27` の `missing: null` という期待値。
- 仕様: `docs/v4-migration/spec/index.md` の「パラメーター」。
- 比較検証: `workbench/cases/004-runtime-parameters/README.md`。

## 1. 宣言済みパラメーターだけを読む挙動は共通

V3は `metadata['stanza:parameter'].map(...)`、V4は `parameterDefinitions(metadata)` を使って対象キーを列挙する。HTML属性が存在しても、metadataに宣言がなければ `this.params` には入らない。

TogoMediumで確認した次の不整合は、V4固有の回帰ではなく既存の問題である。

- `gmdb-similar-media-node`: metadataは `strain_id` を宣言し、実装は `this.params.gm_id` を参照する。
- `gmdb-meta-list`: 実装は `web_font` を参照するが、metadataに宣言がない。

これらを根拠に「V4で未宣言属性が使えなくなった」と判断してはならない。先行調査でV4移行に伴う問題のように説明した点は、本比較によって訂正する。

## 2. 値変換の差分

以下は、対象キーがmetadataに宣言されている場合の比較である。

| 入力                          | V3               | V4 alpha.1       | 想定される影響                                      |
| ----------------------------- | ---------------- | ---------------- | --------------------------------------------------- |
| boolean以外の属性が存在しない | `undefined`      | `null`           | `=== undefined`、分割代入の既定値などの結果が変わる |
| number属性が `""`             | `undefined`      | `0`              | 未入力が数値0として処理される                       |
| json属性が `""`               | `undefined`      | `SyntaxError`    | パラメーター生成が中断する                          |
| date / datetime属性が `""`    | `undefined`      | `Invalid Date`   | 未入力が無効なDateオブジェクトになる                |
| string属性が `""`             | `""`             | `""`             | この条件で差分なし                                  |
| boolean属性なし / あり        | `false` / `true` | `false` / `true` | この条件で差分なし。`flag="false"` もtrueとして扱う |

V3では非boolean属性を `attributes.getNamedItem(key)?.value` で読み取るため、属性がなければ `undefined` になる。また、number / json / date / datetimeの変換前に値の真偽判定があり、空文字を `undefined` にする。

V4では `getAttribute()` の戻り値 `null` をそのまま格納し、空文字にも `Number()`、`JSON.parse()`、`new Date()` を適用する。

影響例:

```ts
const { limit = 20 } = this.params;
// limit属性がない場合、V3では20、V4ではnullになる。
```

`value ?? fallback` はnullとundefinedをどちらも補完するため、この書き方では未指定値の差分を吸収できる。ただし、それを理由に既存stanza全体へ書き換えを要求するかどうかは、互換性方針として判断する必要がある。

空白だけの文字列は空文字とは別条件である。例えばV3でも `" "` は真値なので、numberなら `Number(" ")` により0になる。互換性修正で安易に `trim()` を追加すると別の挙動変更になる。

## 3. 生成タイミングと例外発生箇所の差分

V3の `params` はgetterであり、参照のたびにHTML属性から新しいオブジェクトを生成する。V4は初期値 `{}` のフィールドであり、`connectedCallback()` と観測対象の `attributeChangedCallback()` でオブジェクトを置き換える。

実装から確認できる差分:

- 連続参照したオブジェクトの同一性が変わる。V3では毎回別オブジェクト、V4では次の再生成まで同じオブジェクトになる。
- `this.params.key` を直接書き換えた場合、V3では次回の参照に残らないが、V4では次の再生成まで残る。
- V4のstanzaコンストラクタ内では、接続・属性変更による再生成前の `{}` を参照する。V3のgetterはその時点の実際のHTML属性を読む。既存DOMのアップグレードと新規要素作成を分けて検証する必要がある。
- V3ではJSONの変換エラーが `this.params` の参照時に生じる。V4では接続・属性変更に伴う再生成時に生じ、stanzaが `params` を読まなくても発生し得る。
- V4の `#refreshParams()` は描画用の `#renderStanzaWithReport()` のtry/catch外にある。JSON変換に失敗した場合、描画エラーと同じ経路では捕捉されない。

これらは実装上の差分であり、すべてが既存プロジェクトで実害を起こすと確認されたわけではない。特にコンストラクタとDOMライフサイクルに関わる挙動はブラウザ比較が必要である。

## 4. TypeScriptのソース互換性

V3の型は `Record<string, any>`、V4の型は `Record<string, unknown>` である。これは実行時の値変換とは別の差分である。

TogoMediumではalpha.1導入後のlint・型チェックで、パラメーターを文字列の引数やReact propsへ渡す箇所に11件のエラーが確認されている。alpha.0も同じ型定義なので、alpha.0からalpha.1への回帰ではない。

`unknown` の採用は検証を促す一方、既存TypeScript stanzaを変更なしで型チェックする互換性は失われる。型安全性を優先するAPI設計と、既存ソース互換をどの範囲まで約束するかを明示的に判断する必要がある。単に利用側へ型アサーションを追加することを既定の解決策にはしない。

## 5. 追加を提案する比較検証

同じmetadataとHTML入力をV3・V4に与え、次を比較する。

| 検証群         | 入力・操作                                            | 確認事項                                         |
| -------------- | ----------------------------------------------------- | ------------------------------------------------ |
| 宣言範囲       | 宣言済み属性と未宣言属性を同時に指定                  | 未宣言キーを含めない点が共通であること           |
| 未指定値       | string / number / json / date / datetime属性を省略    | キーの存在、値、`typeof`、undefined / nullの区別 |
| 空文字         | 各型の属性に `""` を指定                              | 値、例外、Dateの有効性                           |
| 対照条件       | `"0"`、`" "`、正常JSON、非空の不正JSON                | 修正によって既存変換を変えないこと               |
| boolean        | 属性なし、空属性、`"false"`                           | 属性の存在で判定する挙動の維持                   |
| 参照と変更     | 連続参照、paramsの書き換え、HTML属性の変更・削除      | オブジェクト同一性、更新の反映時点               |
| ライフサイクル | 既存DOMのアップグレード、要素生成、接続前後の属性変更 | コンストラクタと初回renderで見える値             |
| 例外経路       | 不正JSONを指定し、renderではparamsを参照しない        | エラー発生時点、捕捉経路、後続処理への影響       |
| 型互換         | 同じ最小TypeScript stanzaを両バージョンで型チェック   | 型エラーが生じる範囲                             |

`JSON.stringify()` だけで観測すると、undefinedのプロパティ省略や無効な値の変換によって差分を見落とす。`Object.hasOwn()`、`typeof`、値の直接比較、`Number.isNaN(date.getTime())`、例外の捕捉を組み合わせる。

既存の `src/runtime/stanza.spec.ts` は未指定値を `null` として期待しているため、実装だけを変更するとテストと衝突する。単体テストに加え、`workbench/cases/004-runtime-parameters/` のV3比較ケースで期待値の根拠を残すことを提案する。

## 6. 実装担当者への提案と判断事項

1. 未宣言属性の除外はV3と同じ挙動として維持する。
2. ドロップイン互換を優先する場合、未指定値と空文字の変換をV3に揃える方向で検討する。
3. getterから保持フィールドへの変更について、値だけでなく参照・更新・例外発生時点まで比較し、互換性を守る実装を検討する。
4. TypeScriptの型互換は実行時互換と分けて判断し、採用する方針を記録する。
5. 修正時は実装・単体テスト・比較検証ケースを揃える。仕様の意味を変更する必要がある場合は、事前に合意する。

現行のV4仕様は非boolean属性の欠落を「未指定値」と表現し、詳細を固定していない。一方、検証ケース004はboolean以外の変換について現行版と同等の動作を目標としている。単に現行V4テストが通ることではなく、V3の観測結果と採用方針の両方に照らして完了判定する必要がある。

本レポートはパラメーター周辺に範囲を限定する。旧ビルド設定、メニュー、その他のランタイムAPIを含むV3 / V4全体の互換性監査ではない。
