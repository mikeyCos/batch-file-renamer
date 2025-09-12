import fs from "fs/promises";
import os from "os";
import path from "path";

type GetRootDir = () => string;
type BatchRename = (path: string) => void;

const getRootDir: GetRootDir = () => {
  // return path.parse(process.cwd()).root;
  return os.homedir();
};

const batchRename: BatchRename = async (pathString) => {
  console.log("pathString:", pathString);
  const isAbsPath = path.isAbsolute(pathString);

  if (!isAbsPath) {
    throw new Error(
      "Provided path must be an absolute path to a directory or file"
    );
  }
};

/* BRAINSTORMING
 *
 * Process
 *  User calls batchRename(<path>, <characters to omit>, <file extensions>)
 *  Validate path parameter is not empty
 *  Validate the path exists
 *  If <characters to omit> and <file extensions> are empty, resort to default options
 *  Read path and loop through files
 *  For each item, rename the files
 *
 * Return
 *  Complete message
 *
 * Inputs
 *  Wait for user confirmation for all inputs
 *  Path [string][required]
 *  Characters to omit [string][optional]
 *    Default
 *      Omits invalid alpha and numeric characters
 *      Dashes and underscores allowed
 *      Exclude file extension
 *  File extension(s) [string][optional]
 *
 * Errors:
 *
 * Questions:
 *  What if user passes an empty string?
 */
export { batchRename, getRootDir };
