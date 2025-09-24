import fs from "fs/promises";
import { isWSL } from "../src/index";

jest.mock("fs/promises", () => ({
  ...jest.requireActual("fs/promises"),
  readFile: jest.fn(),
}));

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
