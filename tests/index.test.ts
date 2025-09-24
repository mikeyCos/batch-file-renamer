import { batchRename, batchRenameCLI } from "../src/index";
import path from "path";

const wslDir = process.env.WSL_WINDOWS_DIR;
const windowsDir = process.env.WINDOWS_DIR;
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

describe("linux", () => {
  describe.skip("openFilesExplorer", () => {});

  describe.skip("batchRename", () => {
    // About testing promise rejects with Jest
    // https://jestjs.io/docs/expect#rejects
  });

  describe("batchRenameCLI", () => {
    const invalidFileDirErr = "ENOENT: no such file or directory, scandir";
    test(`batchRenameCLI("foo") throws error`, async () => {
      await expect(batchRenameCLI("foo")).rejects.toThrow(
        `${invalidFileDirErr} 'foo'`
      );
    });

    test(`batchRenameCLI("/foo") throws error`, async () => {
      await expect(batchRenameCLI("/foo")).rejects.toThrow(
        `${invalidFileDirErr} '/foo'`
      );
    });

    test(`batchRenameCLI("/mock-files") throws error`, async () => {
      await expect(batchRenameCLI("/mock-files")).rejects.toThrow(
        `${invalidFileDirErr} '/mock-files'`
      );
    });

    test(`batchRenameCLI(${parentDir}) resolves to be undefined`, async () => {
      await expect(batchRenameCLI(parentDir)).resolves.toBeUndefined();
    });

    test(`batchRenameCLI("${parentDir}/mock-files") resolves to be undefined`, async () => {
      await expect(
        batchRenameCLI(`${parentDir}/mock-files`)
      ).resolves.toBeUndefined();
    });

    test.skip(`batchRenameCLI("${windowsDir}") resolves to be undefined`, async () => {
      await expect(batchRenameCLI(windowsDir)).resolves.toBeUndefined();
    });
  });
});

describe("windows", () => {
  test(`batchRenameCLI("${wslDir}") resolves to be undefined`, async () => {
    await expect(batchRenameCLI(wslDir)).resolves.toBeUndefined();
  });

  test(`batchRenameCLI("${wslDir}/Desktop") resolves to be undefined`, async () => {
    await expect(batchRenameCLI(`${wslDir}/Desktop`)).resolves.toBeUndefined();
  });
});
