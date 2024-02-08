import { it, describe, mock as nodeMock } from 'node:test';
import { strict as expect } from 'node:assert';

const newExpect = (actual) => {
  return {
    ...expect,
    toBe: (expected) => {
      expect.deepEqual(actual, expected);
    },
  };
};

export { it, newExpect as expect, describe };

export default class NodeTester {
  it = it;

  describe = describe;

  expect = (actual) => {
    return {
      toBe: (expected) => {
        expect.deepEqual(actual, expected);
      },
    };
  }

  spyOn = (module, mockFn, implementation) => {
    // return nodeMock.method(module, mockFn, implementation);
    return nodeMock.method(module, mockFn).implementation(implementation);
  };
}
