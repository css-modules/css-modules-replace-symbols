const postcss = require("postcss");
const { createICSSRules } = require("../src");

const run = (imports, exports, asAtRule) => {
  return postcss
    .root()
    .append(createICSSRules(imports, exports, postcss, asAtRule))
    .toString();
};

test("create empty :import statement", () => {
  expect(
    run(
      {
        "path/file": {},
      },
      {}
    )
  ).toEqual(":import('path/file') {}");
});

test("create :import statement", () => {
  expect(
    run(
      {
        "path/file": {
          e: "f",
        },
      },
      {}
    )
  ).toEqual(":import('path/file') {\n  e: f\n}");
});

test("create :export statement", () => {
  expect(
    run(
      {},
      {
        a: "b",
        c: "d",
      }
    )
  ).toEqual(":export {\n  a: b;\n  c: d\n}");
});

test("create :import and :export", () => {
  expect(
    run(
      {
        colors: {
          a: "b",
        },
      },
      {
        c: "d",
      }
    )
  ).toEqual(":import('colors') {\n  a: b\n}\n:export {\n  c: d\n}");
});

test("create empty @icss-import statement", () => {
  expect(
    run(
      {
        "path/file": {},
      },
      {},
      true
    )
  ).toEqual("@icss-import 'path/file'");
});

test("create @icss-import statement", () => {
  expect(
    run(
      {
        "path/file": {
          e: "f",
        },
      },
      {},
      true
    )
  ).toEqual("@icss-import 'path/file' {\n  e: f\n}");
});

test("create @icss-export statement", () => {
  expect(
    run(
      {},
      {
        a: "b",
        c: "d",
      },
      true
    )
  ).toEqual("@icss-export {\n  a: b;\n  c: d\n}");
});

test("create @icss-import and @icss-export", () => {
  expect(
    run(
      {
        colors: {
          a: "b",
        },
      },
      {
        c: "d",
      },
      true
    )
  ).toEqual("@icss-import 'colors' {\n  a: b\n}\n@icss-export {\n  c: d\n}");
});
