import { makeConfig } from "./webpack/makeConfig";
import { join } from "path";
//
// 本ファイル内のパスの記述は原則マシン内の絶対パス基準で統一する
// そのため `process.cwd()` を最初に定義しておくと便利
const CWD = process.cwd();
const DIR_SRC = join(CWD, "src");
const DIR_PUBLIC = join(CWD, "public");
const DIR_ASSETS = join(DIR_PUBLIC, "assets");
//
export default makeConfig({
  output: DIR_PUBLIC,
  server: {
    root: DIR_PUBLIC,
    watch: `${DIR_SRC}/**/*.*`,
    browserSync: {
      middleware: (req, res, next) => {
        if (!req.url) return next();
        //
        switch (true) {
          case /^\/medium\/.+/.test(req.url):
            req.url = "/medium/detail.html";
            break;
          case /^\/organism\/.+/.test(req.url):
            req.url = "/organism/detail.html";
            break;
          case /^\/component\/.+/.test(req.url):
            req.url = "/component/detail.html";
            break;
          case /^\/taxon\/.+/.test(req.url):
            req.url = "/taxon/detail.html";
            break;
          case /^\/strain\/.+/.test(req.url):
            req.url = "/strain/detail.html";
            break;
        }
        return next();
      },
    },
  },
  pug: {
    src: join(DIR_SRC, "pug"),
    dest: join(DIR_PUBLIC),
    data: ["_include/settings.js", "_include/meta.js"],
    files: {
      "index.html": "home.pug",
      "medium/index.html": "medium-list.pug",
      "medium/detail.html": "medium-detail.pug",
      "component/index.html": "component-list.pug",
      "component/detail.html": "component-detail.pug",
      "strain/index.html": "strain-list.pug",
      "strain/detail.html": "strain-detail.pug",
      "find-media-by-components/index.html": "find-media-by-components.pug",
      "find-media-by-taxonomic-tree/index.html": "find-media-by-taxonomic-tree.pug",
      "find-media-by-organism-phenotype/index.html": "find-media-by-organism-phenotype.pug",
      "find-media-by-relevance/index.html": "find-media-by-relevance.pug",
      "compare-media/index.html": "compare-media.pug",
      "compare-media-by-taxids/index.html": "compare-media-by-taxids.pug",
      "compare-media-with-kegg-tree-alignment/index.html":
        "compare-media-with-kegg-tree-alignment.pug",
      "about/index.html": "about.pug",
      "statistics/index.html": "statistics.pug",
      "taxon/detail.html": "taxon-detail.pug",
    },
  },
  sass: {
    src: join(DIR_SRC, "sass"),
    dest: join(DIR_ASSETS, "css"),
    files: {
      "main.css": "main.scss",
    },
  },
  ts: {
    src: join(DIR_SRC, "ts"),
    dest: join(DIR_ASSETS, "js"),
    files: {
      "main.js": "main.ts",
    },
  },
  copy: [
    {
      from: join(DIR_SRC, "assets/libs"),
      to: join(DIR_ASSETS, "libs"),
    },
    {
      from: join(DIR_SRC, "assets/img"),
      to: join(DIR_ASSETS, "images"),
    },
  ],
});
