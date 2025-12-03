import * as fs from "fs";
import * as path from "path";

export const fileContents = (filePath: string) =>
  fs.readFileSync(path.join(process.cwd(), "src", filePath), "utf8");
