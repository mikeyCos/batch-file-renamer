# Changelog
---
### 18 SEP 2025
- Defined `mockFsPromises` variable with the value `fs as jest.Mocked<typeof fs>`, which allows `readFile.mockResolvedValue` to be called.
- Mocked the `fs/promises` module.
---
### 17 SEP 2025
- Created `isWSL` function; returns a boolean depending if the user is running the process from WSL.
---
### 16 SEP 2025
- The `setupEnv` module will run once per test and checks if `process.env.WSL_WINDOWS_DIR` is defined.
- Created `.test.env` and `setupEnv` modules in `tests` subdirectory.
- Installed `dotenv` package.
---
### 11 SEP 2025
- Defined `originalIsAbsolute` to store `path.isAbsolute` value when `beforeAll` runs.
- Separated unit tests for Windows and Linux operating systems.
---
### 10 SEP 2025
- Created multiple tests when `batchRename` throws the error `Provided path must be an absolute path to a directory or file`.
---
### 09 SEP 2025
- Created `tests` and `mock-files` subdirectories.
- Installed `ts-jest` and `@types/jest` packages to `devDependencies`.
---
### 08 SEP 2025
- Created `docs` and `src` subdirectories.
- Installed `typescript`, `ts-node`, and `@types/node` packages to `devDependencies`.
- Initialized project with `npm init` command.
---
