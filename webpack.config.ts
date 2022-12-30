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
      "organism/index.html": "organism-list.pug",
      "organism/detail.html": "organism-detail.pug",
      "find-media-by-components.html": "find-media-by-components.pug",
      "find-media-by-taxonomic-tree.html": "find-media-by-taxonomic-tree.pug",
      "find-media-by-organism-phenotype.html": "find-media-by-organism-phenotype.pug",
      "find-media-by-relavance.html": "find-media-by-relavance.pug",
      "compare-media.html": "compare-media.pug",
      "compare-media-of-organisms.html": "compare-media-of-organisms.pug",
      "compare-media-width-kegg-tree-alignment.html": "compare-media-width-kegg-tree-alignment.pug",
      "about.html": "about.pug",
      "statistics.html": "statistics.pug",
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
