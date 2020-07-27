/**
 * debugger, made simple
 */
const Debugger = require('./Debugger');
const { is, hasOwn } = require('../helpers/object');

const mainDebuggerName = 'debug';
const debuggers = {
  main: new Debugger(mainDebuggerName, 'yellow'),
};

const getDebugger = function getDebugger(name) {
  let debuggerInstance;

  if (hasOwn(debuggers, name)) {
    debuggerInstance = debuggers[name];
  } else if (is(String, name) && name.trim() !== mainDebuggerName) {
    debuggers[name] = new Debugger(name);
    debuggerInstance = debuggers[name];
  } else {
    debuggerInstance = debuggers.main;
  }

  return function debug(...args) {
    debuggerInstance.debug(...args);
  };
};

module.exports = getDebugger;

// for testing only
module.exports.mainDebuggerName = mainDebuggerName;
module.exports.debuggers = debuggers;
