import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.test.env") });

const wslDir = process.env.WSL_WINDOWS_DIR;

if (typeof wslDir !== "string" || wslDir.trim() === "") {
  throw new Error('Environment variable "WSL_WINDOWS_DIR" not defined');
}
