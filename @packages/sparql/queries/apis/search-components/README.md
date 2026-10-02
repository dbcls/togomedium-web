# 成分検索と条件連動の分類件数

## 採用・公開状態

- 採用状態: 採用予定。BIO-324で旧仮称`listComponents2`から`searchComponents`へ整理した。
- 公開状態: ローカルDockerのSPARQListへ登録・検証済み。productionへの反映は未実施。正式API名は`gmdb_search_components`。
- Zod連携: `@packages/api/src/searchComponents/definitions.ts`が入出力契約の正本。OpenAPI用定義は作成済みだが、公開確認前のため`openAPI.ts`へ未登録。
- 移植元: `togomedium-sparql-playground`の`0c883d2`。既存公開APIの比較元`queries/reference/list-components/`は維持する。

## 検索・集計仕様

名前・Role・PropertyはAND条件。名前は全言語の標準名・別名への大小文字を区別しない部分一致。検索文字列をSPARQLリテラルとしてエスケープし、正規表現や追加のテンプレートとして解釈しない。

Roleは選択Role自身と下位Roleを含む。PropertyはComponent property（GMO_000039）の直接の子への直接付与で判定する。

総件数と一覧は全条件を適用する。Role別件数には名前・Property条件を適用し、自身と下位Roleが付いた成分を重複なく数える。Property別件数には名前・下位Role込みRole条件を適用する。自身の分類条件だけを除外し、ページング・ソートには依存しない。0件の選択肢も保持する。

一覧と各集計の母集団は、Componentの下位クラスで、GMO ID（GMO_と6桁の数字）と標準名を持つ成分。GMO IDで重複排除する。分類選択肢はIDと英語ラベルを持つ定義で、RoleはGMO_000037の全子孫、PropertyはGMO_000039の直接の子。Roleの直接の親は1つを前提とし、異なる親URIが複数あれば整形時にエラーとする。Roleルート・親なし・親IDなしはparent=null。

nameは英語を優先した標準名。候補が複数の場合は文字列・言語タグの昇順で1件を選ぶ。aliasesは全言語の別名を個別の配列要素で返し、カンマや引用符を含む名前も分割しない。matched_namesは今回の名前条件に一致した標準名・別名を重複なく返し、名前条件なしでは空配列とする。表示用標準名以外への一致を確認でき、標準名を別名へ混ぜない。各成分のRole・Propertyは検索で選んだ分類以外も返す。

medium_countはレシピへ直接記載された培地の重複を除いた数。`http://togomedium.org/media`の`olo:slot/olo:item`、`gmo:has_component`、`gmo:gmo_id`を通して取得する。参照先の培地・溶液を辿る間接使用は含めず、直接使用がない成分も0件で残す。

## ファイルと実行

`list-components-with-properties.rq`は名前・ID順でページを切ってから培地数を数える。`list-components-by-medium-count.rq`は全対象の培地数を数えてからページを切る。`api.json`のqueryVariantsがsortに応じて切り替える。どちらもページを確定した後、別名・Property・RoleをUNIONで展開する。

`count-components.rq`、`count-components-by-role.rq`、`count-components-by-property.rq`を合わせて実行し、`output.mjs`で単一応答へ整形する。Zod検証はローカル専用の`validate.mjs`で保存前に行い、単独実行するSPARQList用Outputへimportしない。

次のコマンドは`@packages/sparql`から実行する。

```sh
mise exec -- pnpm api queries/apis/search-components
mise exec -- pnpm api queries/apis/search-components --param name=Dextrose --param role_id=GMO_000042 --param limit=50
mise exec -- pnpm api queries/apis/search-components --param sort=name --param order=asc --param offset=20
mise exec -- pnpm api queries/apis/search-components --saved
mise exec -- pnpm export queries/apis/search-components
```

| 引数        | 既定値       | 意味                                                      |
| ----------- | ------------ | --------------------------------------------------------- |
| name        | 空文字列     | 標準名・別名の部分一致。空なら未指定                      |
| role_id     | 空文字列     | 下位Role込みのGMO ID。空なら未指定                        |
| property_id | 空文字列     | 直接付与されたPropertyのGMO ID。空なら未指定              |
| sort        | medium_count | name / id / medium_count                                  |
| order       | desc         | asc / desc                                                |
| limit       | 20           | 非負の安全な整数文字列。Webは20/50/100を使用。0は空ページ |
| offset      | 0            | 先頭から省略する成分数。非負の安全な整数文字列            |

同順位は方向に関係なくGMO ID昇順。別名はソートしない。負数・小数・先頭ゼロ・指数表記・安全な整数範囲外は問い合わせ前に拒否する。Virtuosoではlimit+offsetが10,000を超える指定が失敗した過去の観測があり、型の有効性はサーバー上限内での取得保証とは異なる。

## 出力と公開用成果物

`results/output.json`はcontents、文字列のtotal/limit/offset、facets.roles/propertiesを持つ。contentsの成分はid/name/aliases/matched_names/medium_count/properties/roles。分類項目はgmo_id/label_en、Roleはparentも持つ。facetには数値のcountも加わる。

生の結果と`output.sparqlist.js`も`results/`に保存する。引数ごとに分離せず、最後の実行で上書きする。`--saved`は最後に保存した結果の再整形で、条件・鮮度を確認せず、`--param`と併用できない。失敗時は前回のファイルが残るため、成功した終了結果を確認する。

公開用Markdownは`dist/sparqlist.md`。生成物はGit管理外で、編集元はapi.json・.rq・output.mjs。`/Volumes/DATA/repositories/togomedium-sparqlist/repository/gmdb_search_components.md`へ登録し、既存Dockerの`http://localhost:3000/sparqlist/api/gmdb_search_components`で動作を確認した。既存コンテナのEndpointは`https://dev.togomedium.org/sparql`であり、本番SPARQLを使うローカルCLIとの応答一致も確認した。

productionへのpush・deployは行っていない。公開OpenAPIのserversは`https://togomedium.org/sparqlist/api`を指すため、ローカル登録のみでは`openAPI.ts`へ登録しない。productionへの反映・確認とOpenAPI登録は承認後に別途行う。GUIを使う場合のAPI名は`gmdb_search_components`で、Endpointの`SPARQLIST_TOGOMEDIUM_ENDPOINT`を確認する。

## 検証（2026-10-02）

実エンドポイント`https://togomedium.org/sparql`の独立した全件集合（1539成分）と照合した。Roleは21選択肢、Propertyは8選択肢を保持した。件数は観測値で固定仕様ではない。

- 名前・GMO ID・利用培地数の昇順／降順について、先頭20件とoffset=20のID・順序・標準名・別名・培地数が独立集合と一致した。
- 20/50/100件、limit=0、offset=2000でも総数と全facetが一致した。
- DEXTROSEは5成分、Nutrient sourceの下位込みは395成分、Complex componentは168成分、併用は7成分。名前・分類のAND、未知Roleによる0件を確認した。
- 名前に引用符・バックスラッシュ・改行・テンプレート風文字列を含めても安全に0件を返した。実データのカンマを含む別名も1配列要素のまま検索できた。
- 全条件でRole/Propertyの各候補件数を、ページングに依存しない独立した成分集合から再集計し、全件一致した。親Role件数の単純な子件数合計は使っていない。
- 日本語標準名「リン酸鉄(III)」は1成分に一致し、nameはIron(III) phosphate、matched_namesは日本語標準名を返す。全条件でmatched_namesを独立した名称集合と照合した。名前条件なしでは空配列を返す。
- 登録したローカルSPARQListを26条件で呼び出し、ローカルCLIのZod検証済み応答と全項目が一致した。不正sort・limit・role_id・offsetはSPARQList上でも拒否された（現行SPARQListの例外応答はHTTP 500）。productionの新エンドポイントは未反映・未確認。
- 通常のcheck-allは成功（Vitest201件・Node70件）。単独Output、Zod不正入出力、OpenAPI用定義の生成をテストし、公開OpenAPIへ未登録であることも確認した。パッケージcheckとexportも成功。ローカルSPARQList本体の実行は確認済み、productionの新APIは未確認。

独立照合は通常テストから分離する。次をパッケージ内で実行すると、集合と分類関連・直接培地使用を取得し、APIを通常CLIで条件別に実行して照合する。結果は`results/verification-summary.json`。

```sh
mise exec -- pnpm query queries/apis/search-components/verification-corpus.rq
mise exec -- pnpm query queries/apis/search-components/verification-associations.rq
mise exec -- pnpm query queries/apis/search-components/verification-media.rq
mise exec -- node queries/apis/search-components/verify.mjs
# 登録済みローカルSPARQListの実応答も同じ26条件で比較する
mise exec -- node queries/apis/search-components/verify.mjs http://localhost:3000/sparqlist/api/gmdb_search_components
```

## API名称修正時の確認（2026-10-02）

2026-10-02、外部API名を他のAPIに合わせて`gmdb_search_components`へ修正した。内部名`searchComponents`と検索・集計ロジックは維持した。新しいローカルエンドポイントを通常・日本語検索・分類併用・0件・50/100件の6条件で再照合し、不正4条件の拒否も確認した。check-all（Vitest201件・Node70件）と生成Markdown一致を確認した。

## 旧仮称APIの検証履歴

以下は旧listComponents2の2026-09-26時点の観測。現行の下位Role込み検索・条件連動facet導入前の結果であり、現行仕様と区別する。

## 検証記録

2026-09-26のデータで検証した。件数・時間は観測値で、固定仕様ではない。

- ソート導入前の既定ページは20成分・total 1539。medium_count追加前の既存項目を維持し、培地数は別クエリで列挙した培地IDの重複排除数と全件一致した。
- 名前・ID・培地数の昇順／降順の6通りについて、独立した全件集計から計算した上位20成分のID・順位・培地数が一致した。既定の名前昇順は変更前のJSONと一致した。
- OFFSET 20の2ページ目も全6通りで独立集計と一致した。Role GMO_000042とProperty GMO_000050の併用は3成分で、培地数は昇順0・1・2、降順2・1・0となった。該当しないRoleでは空一覧とtotal 0を確認した。
- APIコマンド全体の所要時間は初回検証で約0.87〜1.04秒、最終再検証で約0.75〜1.53秒。CLI起動、通信、一覧とcountの問い合わせ、整形・保存を含む。DB内部の実行時間ではなく、キャッシュや同時アクセスの影響は未確認。
- ID降順で標準名の複数言語により20行が19成分になるケースを観測し、名前を選んでからページを切る形へ修正した。
- 初期の培地数順の試験では、一覧クエリ単独が初回0.94秒、続く3回が0.50〜0.53秒だった。同じ条件の名前順は0.51〜0.97秒だった。現行API全体の計測とは測定範囲が異なる。

```sh
mise exec -- node --test queries/apis/search-components/output.test.mjs
mise exec -- pnpm test
mise exec -- pnpm check
```

### ページ引数の検証

2026-09-26、名前昇順・ID降順・培地数降順のそれぞれで、limit 5・offset 5の結果がlimit 20・offset 0の6〜10件目と全項目で一致した。totalは変わらず、limit・offsetは指定した文字列で返った。

名前順と培地数順でlimit 0、およびlimit 5・offset 2000の空ページを確認した。Role GMO_000042・Property GMO_000050・培地数降順・limit 1・offset 1ではApple juiceの1成分とtotal 3を返した。負数・小数・先頭ゼロ・整数範囲外などの拒否は共通処理のテストで確認した。
