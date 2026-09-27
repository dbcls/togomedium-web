import { exportMarkdown } from "./export-markdown.mjs";

const usage = "Usage: pnpm export <queries/path/to/feature>";
try {
  const args = process.argv.slice(2);
  if (args.length === 1 && ["--help", "-h"].includes(args[0])) {
    console.log(usage);
  } else {
    if (args.length !== 1 || args[0].startsWith("-")) throw new Error(usage);
    await exportMarkdown(args[0]);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
