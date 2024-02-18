# TestFlex

> _This is a work in progress, so for now it's more of a concept than a library._

TestFlex is a dependency inversion layer for your unit test code. Write your code with TestFlex, then use any test runner you want.

## The idea

Running Jest but want to try Bun? Maybe the Node.js test runner? What happens when Jest falls out of favour and we need to move away from it? jQuery was the best way to build websites, then Angular, then React, then Vue, then Solid, then Vite, then _whatever else_. You get the idea - things change, so tying ourselves to a single implementation or tool is perhaps not the best idea.

There is irony in tying yourselves to TestFlex! But it's less about the tool and perhaps more about the design pattern. If we depend on an abstraction layer rather than a concrete implementation, we can keep ourselves more flexible to changes in the future.

## Test runners and some notes on them

| Test runner                                                                 | it  | describe                                               | global expect (not via `it`)               | mocking (e.g. spies/function mocks)        | ESM `import` mocking                                                                                                                                                              |
| --------------------------------------------------------------------------- | --- | ------------------------------------------------------ | ------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Jest](https://www.npmjs.com/package/jest)                                  | ✅  | ✅                                                     | ✅                                         | ✅                                         | ✅                                                                                                                                                                                |
| [Bun](https://bun.sh/docs/cli/test)                                         | ✅  | ✅                                                     | ✅                                         | ✅                                         | ✅                                                                                                                                                                                |
| [Node test runner](https://nodejs.org/api/test.html)                        | ✅  | ✅                                                     | ✅                                         | ✅                                         | ❌ Not supported, but something might be in the works.                                                                                                                            |
| [AVA](https://www.npmjs.com/package/ava)                                    | ✅  | ❌ Must be flat structure, no nesting of tests allowed | ❌ Must use one passed in via `it`         | ✅                                         | ❌                                                                                                                                                                                |
| [Vitest](https://vitest.dev)                                                | ✅  | ✅                                                     | ✅                                         | ✅                                         | ⚠️ Yes, with caveats                                                                                                                                                              |
| [Mocha](https://www.npmjs.com/package/mocha)                                | ✅  | ✅                                                     | ⚠️ Not built in, must use external library | ⚠️ Not built in, must use external library | ❌                                                                                                                                                                                |
| [Jasmine](https://www.npmjs.com/package/jasmine)                            | ✅  | ✅                                                     | ✅                                         | ✅                                         | ⚠️ [It might be possible](https://jasmine.github.io/tutorials/module_mocking#es-modules-in-node-using-testdoublejs) using [testdouble](https://www.npmjs.com/package/testdouble)? |
| [Supertape](https://www.npmjs.com/package/supertape)                        | ✅  | ❌ Must be flat structure, no nesting of tests allowed | ❌ Must use one passed in via `it`         | ⚠️ Not built in, must use external library | ⚠️ Yes, with [mock-import](https://www.npmjs.com/package/mock-import)                                                                                                             |
| [Modern Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) | ✅  | ✅                                                     | ⚠️ Not built in, must use external library | ⚠️ Not built in, must use external library | ❌ [Not supported](https://modern-web.dev/docs/test-runner/writing-tests/mocking/#mocking-es-modules)                                                                             |

[Karma is deprecated](https://github.com/karma-runner/karma#karma-is-deprecated-and-is-not-accepting-new-features-or-general-bug-fixes), so not being considered.

### Learnings from these investigations

#### `import` mocking is hard, particularly with ESM

When I say import mocking, I'm referring to something like this (contrived) example using Jest;

```ts
// Mock the whole file, not just the function
jest.mock('./math', () => ({
  add: jest.fn().mockImplementation((a, b) => {
    return a + b;
  })
})
```

It looks like you can mock `require` statements fairly easily with tools like [cjs-mock](https://www.npmjs.com/package/cjs-mock) or [proxyquire](https://www.npmjs.com/package/proxyquire), but `import` statements are harder. I think there is something in the ES specification that states that `import`s should be immutable, which makes mocking out the whole module "difficult".

[testdouble seems to think it's possible](https://www.npmjs.com/package/testdouble#module-replacement-with-nodejs), but it requires compiling down the CJS first.

> _I wonder if this is what Jest is doing under the hood before every test is run 🤔 (and why it's so slow comparatively)_

#### Is Dependency Injection the answer to module mocking?

So it seems that mocking out a whole file is handy, but not often the way to do things. Is Dependency Injection (DI) the answer? I spent about 30 minutes talking to ChatGPT on the topic, and from what I can tell DI can help get around this issue. It _does_ make code more testable. But the problem is that it comes with a lot of overheads. You have to establish and maintain "DI Containers" - but where are the boundaries to these containers? As a React developer, I know the pain of prop drilling. Do I now need to instantiate this container and "prop drill" it down from some top-level area to the place I need it to be consumed?

I'm torn on DI. It seems like it would make things easier, but it also feels very much a relic of Object Orientated languages that had no concept of functional programming, or how JS works. DI was a great way to overcome these limitations, but does that apply in a JS world?

I'm going to go away and ponder that fact. I might try and see how it looks/works on my jobs' codebase. No better acid test than seeing how it works in the "real world".
