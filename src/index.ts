import fs from "fs/promises";
import os from "os";
import path from "path";

type BatchRename = (path: string) => void;

const isWSL = async () => {
  if (os.platform() !== "linux") {
    return false;
  }

  try {
    const procVersion = (
      await fs.readFile("/proc/version", "utf-8")
    ).toLowerCase();
    return procVersion.includes("wsl") && procVersion.includes("microsoft");
  } catch (err) {
    return false;
  }
};

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
  console.log("pathString:", pathString);
  console.log("files:", files);
  // Prompt user if they want to proceed or cancel
  // Loop through files asynchronously and cancel operation if an error occurs

  // Option 1
  // Copy file names
  // Iterate and rename copied file names

  // Option 2
  // Iterate and rename file names
};

/* BRAINSTORMING
 * Renames files based on directory
 *
 * 1. Determine operating system
 *  Do I need to determine if OS is running in WSL?
 * 2. User selects a folder they want to rename files
 *  What if user selects files?
 */
export { batchRename, batchRenameCLI, openFileExplorer, isWSL };
