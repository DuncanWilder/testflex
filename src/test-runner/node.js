import { it, describe, mock as nodeMock } from 'node:test';
import { strict as expect } from 'node:assert';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import quibble from 'quibble';

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
    proxyquire.noCallThru();
    return proxyquire(module, { [mockFn]: implementation });
    // return quibble(module, { [mockFn]: implementation });

    // return sinon.stub(module, mockFn).implementation(implementation);
    // return sinon.spy(module, mockFn, implementation);
    // return nodeMock.method(module, mockFn, implementation);
    // return nodeMock.method(module, mockFn).implementation(implementation);
  };

  // mock using proxyquire
  mock = (module, implementation) => {
    // return proxyquire(module, implementation);
    proxyquire.noCallThru();
    return proxyquire(module, { implementation });
    // return quibble.esm(module, implementation);
  };


}
