import fs from "fs/promises";
import { batchRename, batchRenameCLI, isWSL } from "../src/index";
import path from "path";

const wslDir = process.env.WSL_WINDOWS_DIR;
const dir = __dirname;
const filePath = __filename;

const parentDir = path.basename(dir);
const fileName = path.basename(filePath);

jest.mock("fs/promises", () => ({
  ...jest.requireActual("fs/promises"),
  readFile: jest.fn(),
}));

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
  });

  describe("isWSL", () => {
    const mockFsPromises = fs as jest.Mocked<typeof fs>;
    test("isWSL() returns falsy", async () => {
      const procVersionLinux =
        "Linux version 5.15.90.1-eggplant-standard-WSL2 (oe-user@oe-host) (x86_64-msft-linux-gcc (GCC) 9.3.0, GNU ld (GNU Binutils) 2.34.0.20200220) #1 SMP Fri Jan 27 02:56:13 UTC 2023";
      mockFsPromises.readFile.mockResolvedValue(procVersionLinux);
      await expect(isWSL()).resolves.toBeFalsy();
    });

    test("isWSL() returns truthy", async () => {
      const procVersionLinux =
        "Linux version 5.10.16.3-microsoft-standard-WSL2 (oe-user@oe-host) (x86_64-msft-linux-gcc-8.2.0-b3b3) #1 SMP Sun Nov 14 02:02:11 UTC 2021";
      mockFsPromises.readFile.mockResolvedValue(procVersionLinux);
      await expect(isWSL()).resolves.toBeTruthy();
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
