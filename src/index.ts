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

const validatePath = (pathString: string) => {
  const windowsPathPattern =
    '(?:^[A-Za-z]:\\\\(?:[^<>:"/\\\\|?*]+\\\\)*[^<>:"/\\\\|?*]*$)';
  const linuxPathPattern = "(?:^(?:\\/[a-zA-Z0-9_.-]+)*\\/?$)";
  const regex = new RegExp(`${windowsPathPattern}|${linuxPathPattern}`);
  return regex.test(pathString);
  // What if path starts with C:\\?
  // What if path has back-slashes?
  // What if path has .. or .?
  // What if path has back-slashes and forward-slashes? Throw error
  // What if path has a substring with a space followed by no character? Throw error
  // What if path has no slashes but has spaces Throw error
};

const sanitizePath = () => {};

const batchRename: BatchRename = async (pathString) => {
  console.log("pathString:", pathString);
};

const batchRenameCLI: BatchRename = async (pathString) => {
  const files = await fs.readdir(pathString);
  console.log("pathString:", pathString);
  console.log("files:", files);
  // Prompt user if they want to proceed or cancel
  // Loop through files asynchronously and cancel operation if an error occurs
};

/* BRAINSTORMING
 * Renames files based on directory
 *
 *
 * Option 1
 * Copy file names
 * Iterate and rename copied file na*
 *
 * Option 2
 * Iterate and rename file names
 *
 * 1. Validate path
 * 1a. Determine operating system
 *    If os is win32 and
 * 3. User selects a folder they want to rename files
 *  What if user selects files?
 *
 * How to dynamically get mount
 */
export { batchRename, batchRenameCLI, openFileExplorer, validatePath, isWSL };
