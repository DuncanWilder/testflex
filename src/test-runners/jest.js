import { it, expect, describe, jest } from '@jest/globals';

export default class JestTester {
  it = it;

  describe = describe;

  expect = (actual) => {
    return {
      toBe: (expected) => {
        expect(actual).toBe(expected);
      },
    };
  }

  spyOn = (module, mockFn, implementation) => {
    return jest.spyOn(module, mockFn).mockImplementation(implementation);
  };

  mock = (module, implementation) => {
    const split = __dirname.split('/');
    split.pop();
    const path = split.join('/') + module.replace('.', '/');
    return jest.mock(path, implementation);
  };
}
