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
      // the key is the output file without '.html' extension
      index: "home.pug",
      "medium/index": "medium-list.pug",
      "medium/detail": "medium-detail.pug",
      "component/index": "component-list.pug",
      "component/detail": "component-detail.pug",
      "strain/index": "strain-list.pug",
      "strain/detail": "strain-detail.pug",
      "find-media-by-components/index": "find-media-by-components.pug",
      "find-media-by-taxonomic-tree/index": "find-media-by-taxonomic-tree.pug",
      "find-media-by-organism-phenotype/index": "find-media-by-organism-phenotype.pug",
      "find-media-by-relevance/index": "find-media-by-relevance.pug",
      "compare-media/index": "compare-media.pug",
      "compare-media-by-taxids/index": "compare-media-by-taxids.pug",
      "compare-media-with-kegg-tree-alignment/index": "compare-media-with-kegg-tree-alignment.pug",
      "about/index": "about.pug",
      "statistics/index": "statistics.pug",
      "taxon/detail": "taxon-detail.pug",
    },
  },

  // All source style/script files must be specified directly in pug template.
  sass: {
    src: join(DIR_SRC, "sass"),
    dest: join(DIR_ASSETS, "css"),
    files: {},
  },
  ts: {
    src: join(DIR_SRC, "ts"),
    dest: join(DIR_ASSETS, "js"),
    files: {},
  },

  // pug-plugin automatically handeln all source assets (scripts, styles, images, fonts)
  // and copy output assets into destination directory
  // no need to use copy-webpack-plugin
  copy: [],
});
