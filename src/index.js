// import BunTester from './bun.js';
// import NodeTester from './node.js';
// import JestTester from './jest.js';
// import AvaTester from './ava.js';

const commandBeingRun = process.env._;
// console.log({commandBeingRun});
// e.g. /Users/duncanogle/code/testflex/node_modules/.bin/ava

let ClassToInitialise;

if (/\bava\b/.test(commandBeingRun)) {
  ClassToInitialise = (await import('./test-runners/ava.js')).default;
}
if (/\bbun\b/.test(commandBeingRun)) {
  ClassToInitialise = (await import('./test-runners/bun.js')).default;
}
if (/\bjest\b/.test(commandBeingRun)) {
  ClassToInitialise = (await import('./test-runners/jest.js')).default;
}
if (/\bnode\b/.test(commandBeingRun)) {
  ClassToInitialise = (await import('./test-runners/node.js')).default;
}

if (!ClassToInitialise) {
  console.error('No test runner found in ', commandBeingRun);
  process.exit(1);
}

// console.log({ClassToInitialise});

const x = new ClassToInitialise();

export default x;
