// import { it, expect, describe } from './test-runner/jest';
// import { it, expect, describe } from './test-runner/node.js';
// import { it, expect, describe } from './test-runner/bun';

// import Tester from './test-runner/bun';
// import Tester from './test-runner/node.js';
// import Tester from './test-runner/jest';
import Tester from './test-runner/ava.js';
import * as math from './add.js';
import * as multiply from './multiply.js';
const x = new Tester();
const { it, expect, describe, spyOn, mock } = x;

console.log(spyOn);

// spyOn(math, 'add', (a, b) => a - b);

// mock('./multiply', () => {
//   return {
//     multiply: (a, b) => a - b,
//   };
// })

// describe('jest', () => {
  // it('should work', () => {
  //   expect(true).toBe(true);
  // });

  it('should not add but substract', () => {
    console.log(expect);
    console.log(expect(math.add(3,2)).toBe);
    expect(math.add(3,2)).toBe(1);
  });

  // it('should not multiple but substract', () => {
  //   expect(multiply.multiply(3,2)).toBe(1);
  // });
// });
