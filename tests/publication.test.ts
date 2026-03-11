import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

interface PackageJson {
  name: string;
  main: string;
  types: string;
}

interface TsConfigBuild {
  compilerOptions?: {
    rootDir?: string;
  };
  include?: string[];
  exclude?: string[];
}

describe("publication contract", () => {
  it("keeps the published package metadata aligned with the build output", () => {
    const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as PackageJson;
    const buildConfig = JSON.parse(
      readFileSync(new URL("../tsconfig.build.json", import.meta.url), "utf8")
    ) as TsConfigBuild;

    expect(pkg.name).toBe("uspeaks-vocal-journaling-api");
    expect(pkg.main).toBe("./dist/index.js");
    expect(pkg.types).toBe("./dist/index.d.ts");
    expect(buildConfig.compilerOptions?.rootDir).toBe("src");
    expect(buildConfig.include).toEqual(["src/**/*.ts"]);
    expect(buildConfig.exclude).toEqual(["tests/**/*.ts"]);
  });

  it("keeps the README aligned with the live Zuplo portal URLs", () => {
    const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");

    expect(readme).toContain("https://journal-api-layer-main-22c4b17.zuplo.site/api");
    expect(readme).toContain("https://journal-api-layer-main-22c4b17.zuplo.site/signin");
    expect(readme).toContain("https://journal-api-layer-main-22c4b17.zuplo.app");
    expect(readme).toContain('import { createClient } from "uspeaks-vocal-journaling-api";');
  });
});
