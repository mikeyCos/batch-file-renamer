import { batchRename } from "../src/index";
import path from "path";
const dir = __dirname;
const filePath = __filename;

const parentDir = path.basename(dir);
const fileName = path.basename(filePath);

beforeAll(() => {
  console.log("dir:", dir);
  console.log("filePath:", filePath);
});

describe("index.ts", () => {
  test('Test directory is "tests"', () => {
    expect(parentDir).toBe("tests");
  });

  test('Test file name is "index.test.ts', () => {
    expect(fileName).toBe("index.test.ts");
  });
});

describe("getRoodDir", () => {});

describe("batchRename", () => {
  // About testing promise rejects with Jest
  // https://jestjs.io/docs/expect#rejects
  const absPathErr =
    "Provided path must be an absolute path to a directory or file";
  test(`Empty string throws error "${absPathErr}"`, async () => {
    await expect(batchRename("")).rejects.toThrow(absPathErr);
  });

  test(`String "076123" throws error "${absPathErr}"`, async () => {
    await expect(batchRename("076123")).rejects.toThrow(absPathErr);
  });

  test(`String "${parentDir}" throws error "${absPathErr}"`, async () => {
    await expect(batchRename(parentDir)).rejects.toThrow(absPathErr);
  });

  test(`String "${fileName}" throws error "${absPathErr}"`, async () => {
    await expect(batchRename(fileName)).rejects.toThrow(absPathErr);
  });

  test(`String "documents/file.txt" resolves`, async () => {
    await expect(batchRename("documents/file.txt")).rejects.toThrow(absPathErr);
  });

  test(`String "../documents/file.txt" resolves`, async () => {
    await expect(batchRename("../documents/file.txt")).rejects.toThrow(
      absPathErr
    );
  });

  // Do I still need to test if the pathString is valid and the asynchronous function has no return value?
  test(`String "/documents/file.txt" resolves`, async () => {
    await expect(batchRename("/documents/file.txt")).resolves.toBeUndefined();
  });
});
