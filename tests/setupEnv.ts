import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.test.env") });

const wslDir = process.env.WSL_WINDOWS_DIR;

// How can I dynamically get the user's home root directory
// Linux: /home/<username>
// Windows: <drive letter>:\Users\<username>
// Windows from WSL: /mnt/c/Users/<username>

if (typeof wslDir !== "string" || wslDir.trim() === "") {
  throw new Error('Environment variable "WSL_WINDOWS_DIR" not defined');
}
