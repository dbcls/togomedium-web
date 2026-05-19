# Medium Builder schema alignment policy

## 決定

- Medium Builder draft schema は、既存 Medium をテンプレートとして取り込んで編集するための schema として扱う。
- Medium Detail API response の wire shape は、Builder draft schema の正本にしない。
- `schemaVersion` は既存の `2026-05-18` を維持する。
- 出典情報は `provenance.importSourceGmId`、`provenance.originalMediaId`、`provenance.sourceUrl` の3項目だけを保持する。
- `referenceMediaId`、`originalComponentName`、`originalLabel` は draft schema / state に永続保持しない。
- Medium Detail の comments / preparation notes は、該当する solution の `description` として扱う。
- component row は `concentrationValue` と `concentrationUnit` を編集可能 field として持つ。
- `volume` と `concentrationValue` は `number | null` 相当で扱い、空欄と `0` を区別する。
- `unit` と `concentrationUnit` は自由入力を正とし、UI では候補補助を付ける。

## 背景

既存 Medium import v1 では、現行 schema への取り込みを優先していた。一方で、既存 Medium を新しい Medium 作成のテンプレートとして使うには、Medium Detail 由来の濃度、調製メモ、空欄値、最小限の出典情報を Builder 上で編集しやすく保持する必要がある。

Medium Detail API response は SPARQL 由来データを表示用に整形した wire shape であり、Builder の保存形式へそのまま持ち込むと編集用途の schema と表示用途の response が密結合になる。そのため、Builder 側は編集に必要な field を中心にした draft schema を正本とする。

## 採用した理由

- 既存 Medium をテンプレートとして使う編集体験では、濃度と solution note が first-class field として必要になる。
- 空欄値と `0` は入力上の意味が異なるため、数値 field は `null` を許容する必要がある。
- unit は既存データの揺れを受け止める必要があるため、固定 enum ではなく自由入力を維持する。
- 出典情報を3項目に限定することで、元データを追跡しつつ、raw response や参照展開用の一時情報を draft に固定しない。
- `2026-05-18` schema の実利用 draft がまだ限定的なため、この変更では `schemaVersion` を更新せず、旧 draft migration も追加しない。

## 実装上の対応

- draft schema は `@packages/stanza/stanzas/gmdb-medium-builder/schema/appData.ts` で定義する。
- AppState と draft JSON の変換は `@packages/stanza/stanzas/gmdb-medium-builder/schema/appDataMapper.ts` で行う。
- Medium Detail import は `@packages/stanza/stanzas/gmdb-medium-builder/utils/mediumDetailImportMapper.ts` で Builder state へ写像する。
- 参照 Medium の table 展開は `@packages/stanza/stanzas/gmdb-medium-builder/utils/mediumDetailReferenceExpansion.ts` で行い、`reference_media_id` は参照展開にだけ使う。
- component row UI は `@packages/stanza/stanzas/gmdb-medium-builder/components/ComponentRow.tsx` で、濃度 field と unit の自由入力 + 候補補助を提供する。

## 影響範囲

- Medium Builder の draft JSON import / export
- Medium Detail からの initial import
- Medium Detail の参照 Medium table 展開
- component row と solution note の編集 UI
- `gmdb-medium-builder` の Storybook 表示と関連 component tests

## 補足

- Medium Detail comments は、直前の component table に属する comment として solution note に取り込む。
- 参照 Medium の comments を取り込む場合は、main medium 側の paragraph index と衝突しないよう reindex してから import mapper に渡す。
- draft JSON import では schema 上の nullable string を state の空文字へ正規化し、必要に応じて warning を返す。
- GMO ID の候補リストが渡された場合は、未知の GMO ID を空文字へ正規化し、GMO ID と component name が食い違う場合は候補リスト側の component name を優先する。

## 見直し条件

- `2026-05-18` schema の実利用 draft が増え、後方互換 migration が必要になった場合。
- Medium Detail API response の責務や wire shape が変更され、Builder 側で保持すべき出典情報が増えた場合。
- unit / concentration unit を controlled vocabulary として厳密に扱う要件が出た場合。
- `referenceMediaId` や元 label を編集画面で追跡・表示する明確な要件が出た場合。
