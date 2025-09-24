import { validatePath } from "../src";

const wslDir = process.env.WSL_WINDOWS_DIR;
const windowsDir = process.env.WINDOWS_DIR;

describe("validatePath", () => {
  // How can I make sure path is using win32 version?
  beforeEach(() => {
    console.log("beforeEach windows/linux");
  });

  describe("windows", () => {
    test("validatePath('C:\\Windows\\System32') returns truthy", async () => {
      expect(validatePath("C:\\Windows\\System32")).toBe(true);
    });

    test.skip("validatePath() returns truthy", async () => {});

    test.skip("validatePath() returns truthy", async () => {});
  });

  describe("linux", () => {
    test("validatePath('   ') returns falsy", async () => {
      expect(validatePath("   ")).toBe(false);
    });

    test("validatePath('/13827sd823 / 23232') returns falsy", async () => {
      expect(validatePath("/13827sd823 / 23232")).toBe(false);
    });

    test("validatePath('../documents/') returns falsy", async () => {
      expect(validatePath("../documents/")).toBe(false);
    });

    test("validatePath('/documents/pictures/../portrait') returns falsy", async () => {
      expect(validatePath("/documents/pictures/../portrait")).toBe(false);
    });

    test("validatePath('documents/') returns falsy", async () => {
      expect(validatePath("documents/")).toBe(false);
    });

    test("validatePath('abcdef') returns falsy", async () => {
      expect(validatePath("abcdef")).toBe(false);
    });
  });
});
