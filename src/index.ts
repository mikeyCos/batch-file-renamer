import fs from "fs/promises";

type BatchRename = (path: string) => void;

const foo = () => {
  console.group("foo running...");
  console.groupEnd();
  return "foo";
};

const bar = () => {
  console.group("bar running...");
  console.groupEnd();
  return "bar";
};

const batchRename: BatchRename = async (path) => {
  // Do I need to perform a runtime check for path?
  if (!path)
    throw new Error(
      "TypeError: batchRename requires 1 argument, but 0 arguments were passed"
    );

  const pathStats = await fs.stat(path);
  console.log("pathStats:", pathStats);
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
 */
export { batchRename, foo, bar };
