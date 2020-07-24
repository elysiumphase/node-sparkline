const { expect } = require('../Common');
const Debugger = require('../../lib/debug/Debugger');

describe('#debug Debugger', function() {
  context('when creating a new debugger', function() {
    it('should create a debugger with the specific name and color if provided', function() {
      const myDebugger = new Debugger('my-debugger', 'red');
      expect(myDebugger.name).to.be.a('string').and.to.equal('my-debugger');
      expect(myDebugger.color).to.be.a('string').and.to.equal('\u001b[31m');
    });

    it('should create a debugger with the specific name and a random color if not provided or unknown', function() {
      const myDebugger1 = new Debugger('my-debugger', 'purple');
      const myDebugger2 = new Debugger('my-debugger');
      expect(myDebugger1.name).to.be.a('string').and.to.equal('my-debugger');
      expect(myDebugger1.color).to.be.a('string');
      expect(myDebugger2.name).to.be.a('string').and.to.equal('my-debugger');
      expect(myDebugger2.color).to.be.a('string');
    });

    it('should throw an error when creating a debugger if the name is not a string', function() {
      expect(() => new Debugger(10)).to.throw;
      expect(() => new Debugger(true)).to.throw;
      expect(() => new Debugger([])).to.throw;
      expect(() => new Debugger(null)).to.throw;
      expect(() => new Debugger(undefined)).to.throw;
      expect(() => new Debugger(NaN)).to.throw;
    });
  });

  context('when setting name', function() {
    it('should set the specific name', function() {
      const myDebugger = new Debugger('my-debugger', 'red');
      myDebugger.setName('new-name');
      expect(myDebugger.name).to.be.a('string').and.to.equal('new-name');
    });

    it('should throw an error when setting non-string name', function() {
      const myDebugger = new Debugger('my-debugger', 'red');
      expect(() => myDebugger.setName(10)).to.throw;
      expect(() => myDebugger.setName(true)).to.throw;
      expect(() => myDebugger.setName([])).to.throw;
      expect(() => myDebugger.setName(null)).to.throw;
      expect(() => myDebugger.setName(undefined)).to.throw;
      expect(() => myDebugger.setName(NaN)).to.throw;
    });
  });

  context('when setting color', function() {
    it('should set the specific color', function() {
      const myDebugger = new Debugger('my-debugger', 'red');
      myDebugger.setColor('green');
      expect(myDebugger.color).to.be.a('string').and.to.equal('\x1b[32m');
    });

    it('should set a random color if color is missing or unknown', function() {
      const myDebugger = new Debugger('my-debugger', 'green');
      myDebugger.setColor('purple');
      expect(myDebugger.color).to.be.a('string').and.to.not.equal('\x1b[32m');
    });
  });

  context('when getting output text', function() {
    // atty only
    it('should return the specific output', function() {
      const myDebugger = new Debugger('my-debugger', 'red');
      expect(myDebugger.getOutput('hello')).to.be.a('string').and.to.equal('\u001b[1m\u001b[31mmy-debugger\u001b[0m \u001b[90mhello\u001b[0m \u001b[1m\u001b[31m+undefinedms\u001b[0m\n');
    });
  });

  const sleep = function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  context('when using updateTimeBetweenTwoDebugs', function() {
    it('should set the difference time in ms between two calls and update previous time', async function() {
      const myDebugger = new Debugger('my-debugger', 'red');
      const now = Date.now();
      myDebugger.updateTimeBetweenTwoDebugs();
      expect(myDebugger.previousTime).to.be.a('number').and.to.be.at.least(now).and.to.be.below(now + 15);
      expect(myDebugger.timeBetween).to.be.a('number').and.to.equal(0);

      await sleep(1500);

      myDebugger.updateTimeBetweenTwoDebugs();
      expect(myDebugger.previousTime).to.be.a('number').and.to.be.at.least(now + 1500).and.to.be.below(now + 1515);
      expect(myDebugger.timeBetween).to.be.a('number').and.to.at.least(1500).and.below(1515);
    });
  });

  context('when using toDebug', function() {
    it('should return true if DEBUG includes the debugger name', function() {
      const myDebugger = new Debugger('my-debugger', 'red');
      process.env.DEBUG = '*';

      expect(myDebugger.toDebug()).to.be.a('boolean').and.to.be.true;

      process.env.DEBUG = 'my-debugger';
      expect(myDebugger.toDebug()).to.be.a('boolean').and.to.be.true;

      process.env.DEBUG = 'my-debugger:*';
      expect(myDebugger.toDebug()).to.be.a('boolean').and.to.be.true;

      process.env.DEBUG = '*,my-debugger:*';
      expect(myDebugger.toDebug()).to.be.a('boolean').and.to.be.true;

      process.env.DEBUG = '*,my-debugger';
      expect(myDebugger.toDebug()).to.be.a('boolean').and.to.be.true;
    });

    it('should return false if DEBUG excludes the debugger name', function() {
      const myDebugger = new Debugger('my-debugger', 'red');

      process.env.DEBUG = '*,-my-debugger:*';
      expect(myDebugger.toDebug()).to.be.a('boolean').and.to.be.false;

      process.env.DEBUG = '-my-debugger:*';
      expect(myDebugger.toDebug()).to.be.a('boolean').and.to.be.false;

      process.env.DEBUG = '*,-my-debugger';
      expect(myDebugger.toDebug()).to.be.a('boolean').and.to.be.false;
    });
  });
});
