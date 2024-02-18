import test from "ava";
import { strict as expect } from "node:assert";

export default class AvaTester {
  it = test;

  describe = (name, implementation) => {
    return test(name, implementation);
  };

  expect = (actual) => ({
    toBe: (expected) => {
      expect(actual).toBe(expected);
    },
  });

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
  };
}
