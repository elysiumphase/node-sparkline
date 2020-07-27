const { expect } = require('../Common');
const debug = require('../../lib/debug');
const Debugger = require('../../lib/debug/Debugger');

// NOTE: to test debug index, uncomment debug/index.js exports
const { mainDebuggerName, debuggers } = debug;

describe('#debug index', function() {
  context('when requiring the debug module', function() {
    it('should be a function called getDebugger', function() {
      expect(debug).to.be.a('function');
      expect(debug.name).to.equal('getDebugger');
    });
  });

  context('when using getDebugger function', function() {
    const debuggerName = 'myDebugger';
    const debugFunctionWithDebuggerName = debug(debuggerName);
    const debugFunctionNoDebuggerName = debug();

    it('should return a debug function if a debugger name is provided', function() {
      expect(debugFunctionWithDebuggerName).to.be.a('function');
      expect(debugFunctionWithDebuggerName.name).to.equal('debug');
    });

    it('should return a debug function if no name is provided', function() {
      const debugFunction = debug('myDebugger');
      expect(debugFunctionNoDebuggerName).to.be.a('function');
      expect(debugFunctionNoDebuggerName.name).to.equal('debug');
    });

    it('should have a main debugger', function() {
      expect(debuggers.main).to.exist;
      expect(debuggers.main.constructor).to.equal(Debugger);
      expect(debuggers.main.name).to.equal(mainDebuggerName);
    });

    it('should add a debugger with the specific name when calling getDebugger', function() {
      expect(debuggers.myDebugger).to.exist;
      expect(debuggers.myDebugger.constructor).to.equal(Debugger);
      expect(debuggers.myDebugger.name).to.equal(debuggerName);
    });
  });
});
