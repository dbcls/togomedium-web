# TogoMedium 説明書
## 趣旨
本システムはDBCLS(データサイエンス共同利用基盤施設ライフサイエンス統合データベースセンター)の整備した微生物培地情報のRDF情報を検索・閲覧するためのデータベースサービスである。

## 納品データについて
納品データはgithub上にて共有されており、今後の保証期間における修正対応については、原則としてこのgithubを通じてデータのやりとりを行う。

## 修正及びデプロイについて
### 必要環境
* NodeJS及びyarnの最新安定版
  **本要件は開発・修正作業を行うPCに対する要件であり、サーバーに対する要件ではない。**

### セットアップ
ソースファイル配置フォルダで `yarn install` を実行する。

### ビルド
ソースファイルを編集後にデプロイ用のファイルを生成するために以下のコマンドを実行する必要がある。
* `yarn build` htmlなどをコンパイルし成果ファイルをデプロイ用の`public` に集約する。

### デプロイ
* `public` フォルダ内のファイルをサーバーに配置する。
* サーバーに応じて以下のリライトルールを設定する必要がある。

#### nginx
```
location / {
  rewrite ^/medium/$ /medium/index.html break;
  rewrite ^/medium/.*$ /medium/detail.html break;
  rewrite ^/organism/$ /organism/index.html break;
  rewrite ^/organism/.*$ /organism/detail.html break;
  rewrite ^/component/$ /component/index.html break;
  rewrite ^/component/.*$ /component/detail.html break;
  rewrite ^/taxon/$ /taxon/index.html break;
  rewrite ^/taxon/.*$ /taxon/detail.html break;
}
```
#### Apache
```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^taxon/$ /taxon/index.html [END]
RewriteRule ^taxon/.+$ /taxon/detail.html [END]
RewriteRule ^medium/$ /medium/index.html [END]
RewriteRule ^medium/.+$ /medium/detail.html [END]
RewriteRule ^organism/$ /organism/index.html [END]
RewriteRule ^organism/.+$ /organism/detail.html [END]
RewriteRule ^component/$ /component/index.html [END]
RewriteRule ^component/.+$ /component/detail.html [END]

```







