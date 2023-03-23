# TogoMedium Web

## About
本レポジトリは、togomedium.org におけるWebサイトのソースコードを管理するためのレポジトリです。

## 必要環境
* NodeJS及びyarnの最新安定版
* **本要件は開発・修正作業を行うPCに対する要件でありではありません**

## Install
```bash
yarn install
```

## Scripts
```bash
yarn webpack
```
`public` にファイルを書き出す


```bash
yarn serve
```
上記 `webpack` に加えてbrowserSyncサーバーを起動する。  
確認用URLは以下  
http://localhost:9000/


```bash
yarn build
```
上記 `webpack` と同等かつ圧縮・難読化を行う。デプロイ前に使用する。  
圧縮設定は `webpack.config.ts` から変更可能。


## Lint / Code format
本プロジェクトでは ESLint, StyleLint 及び prettier を採用している。以下の拡張子に対して保存時に自動で適用されるようにエディターの設定を行うこと。
* `ESLint` : `js,jsx,ts,tsx`
* `StyleLint` : `scss`
* `prettier` : `js,jsx,ts,tsx,json,yaml,pug,scss,css`



## Rewrite Rule
デプロイ時にはサーバーに応じて以下のリライトルールを設定してください。
### nginx
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
### Apache
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
