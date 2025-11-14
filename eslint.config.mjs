import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";

const compat = new FlatCompat({
  baseDirectory: path.resolve(process.cwd()),
});

export default compat.config({
  extends: ["next/core-web-vitals", "next/typescript"],
});
