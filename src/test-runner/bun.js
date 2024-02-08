import { it, expect, describe, spyOn, mock } from 'bun:test';

export { it, expect, describe };

export default class BunTester {
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
    return spyOn(module, mockFn).mockImplementation(implementation);
  };

  /**
   * @param {string} module 
   * @param {Function} mockFn 
   * @returns 
   */
  mock = (module, implementation) => {
    return mock(module, implementation);
  }
}
