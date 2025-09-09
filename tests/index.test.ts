import { batchRename, foo } from "../src/index";
import path from "path";
const dir = __dirname;
const filePath = __filename;

describe("index.ts", () => {
  test('Test directory is "tests"', () => {
    expect(path.basename(dir)).toBe("tests");
  });

  test('Test file name is "index.test.ts', () => {
    expect(path.basename(filePath)).toBe("index.test.ts");
  });

  test('foo function returns "foo"', () => {
    expect(foo()).toBe("foo");
  });
});
