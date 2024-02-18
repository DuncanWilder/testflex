# TestFlex

> _This is a work in progress, so for now it's more of a concept than a library._

TestFlex is a dependency inversion layer for your unit test code. Write your code with TestFlex, then use any test runner you want.

## The idea

Running Jest but want to try Bun? Maybe the Node.js test runner? What happens when Jest falls out of favour and we need to move away from it? jQuery was the best way to build websites, then Angular, then React, then Vue, then Solid, then Vite, then _whatever else_. You get the idea - things change, so tying ourselves to a single implementation or tool is perhaps not the best idea.

There is irony in tying yourselves to TestFlex! But it's less about the tool and perhaps more about the design pattern.

## Test runners and some notes on them

| Test runner                                                                 | it  | describe                                               | global expect (not via `it`)               | mocking (e.g. spies/function mocks)        | `import` mocking                                                                                      |
| --------------------------------------------------------------------------- | --- | ------------------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| [Jest](https://www.npmjs.com/package/jest)                                  | ✅  | ✅                                                     | ✅                                         | ✅                                         | ✅                                                                                                    |
| [Bun](https://bun.sh/docs/cli/test)                                         | ✅  | ✅                                                     | ✅                                         | ✅                                         | ✅                                                                                                    |
| [Node test runner](https://nodejs.org/api/test.html)                        | ✅  | ✅                                                     | ✅                                         | ✅                                         | ❌ Not supported, but something might be in the works.                                                |
| [AVA](https://www.npmjs.com/package/ava)                                    | ✅  | ❌ Must be flat structure, no nesting of tests allowed | ❌ Must use one passed in via `it`         | ✅                                         | ❌                                                                                                    |
| [Vitest](https://vitest.dev)                                                | ✅  | ✅                                                     | ✅                                         | ✅                                         | ⚠️ Yes, with caveats                                                                                  |
| [Mocha](https://www.npmjs.com/package/mocha)                                | ❔  | ❔                                                     | ❔                                         | ❔                                         | ❔                                                                                                    |
| [Jasmine](https://www.npmjs.com/package/jasmine)                            | ✅  | ✅                                                     | ✅                                         | ✅                                         | ❔                                                                                                    |
| [Supertape](https://www.npmjs.com/package/supertape)                        | ❔  | ❔                                                     | ❔                                         | ❔                                         | ❔                                                                                                    |
| [Modern Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) | ❔  | ❔                                                     | ⚠️ Not built in, must use external library | ⚠️ Not built in, must use external library | ❌ [Not supported](https://modern-web.dev/docs/test-runner/writing-tests/mocking/#mocking-es-modules) |

[Karma is deprecated](https://github.com/karma-runner/karma#karma-is-deprecated-and-is-not-accepting-new-features-or-general-bug-fixes), so not being considered.

### Learnings from these investigations

#### `import` mocking is hard, is Dependency Injection the answer?

When I say import mocking, I'm referring to something like this (contrived) example using Jest;

```ts
jest.mock('./math', () => ({
  add: jest.fn().mockImplementation((a, b) => {
    return a + b;
  })
})
```

It looks like you can mock `require` statements fairly easily with tools like [cjs-mock](https://www.npmjs.com/package/cjs-mock) or [proxyquire](https://www.npmjs.com/package/proxyquire), but `import` statements are harder. I think there is something in the ES specification that states that `import`s should be immutable, which makes mocking out the whole module "difficult". I
