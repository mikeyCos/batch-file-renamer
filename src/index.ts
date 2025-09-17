import fs from "fs/promises";
import os from "os";
import path from "path";

type BatchRename = (path: string) => void;

// Opens system file explorer
const openFileExplorer = () => {
  const isWsl = process.env.WSL_DISTRO_NAME !== undefined;
  console.log(isWsl);

  return isWsl;
};

const batchRename: BatchRename = async (pathString) => {
  console.log("pathString:", pathString);
};

const batchRenameCLI: BatchRename = async (pathString) => {
  const files = await fs.readdir(pathString);
  console.log("files:", files);
  const content = await fs.opendir(pathString);
  console.log("content:", content);
};

/* BRAINSTORMING
 * Renames files based on directory
 *
 * 1. Determine operating system
 *  Do I need to determine if OS is running in WSL?
 * 2. User selects a folder they want to rename files
 *  What if user selects files?
 */
export { batchRename, batchRenameCLI, openFileExplorer };
