const { expect } = require('../Common');
const { math: { minmax } } = require('../../lib/helpers');

describe('#helpers math', function() {
  context('when using minmax', function() {
    it('should return an object with min and max values', function() {
      expect(minmax([1, 5, 2, 9, -1])).to.be.an('object').and.to.have.property('min', -1);
      expect(minmax([1, 5, 2, 9, -1])).to.be.an('object').and.to.have.property('max', 9);
      expect(minmax([-1, 0, 2, 52, -1125])).to.be.an('object').and.to.have.property('min', -1125);
      expect(minmax([-1, 0, 2, 52, -1125])).to.be.an('object').and.to.have.property('max', 52);
      expect(minmax([0, 65, 2, 52, 125])).to.be.an('object').and.to.have.property('min', 0);
      expect(minmax([0, 65, 2, 52, 125])).to.be.an('object').and.to.have.property('max', 125);
      expect(minmax(['a', 'b', 'c'])).to.be.an('object').and.to.have.property('min', 'a');
      expect(minmax(['a', 'b', 'c'])).to.be.an('object').and.to.have.property('max', 'c');
      expect(minmax(['z', 'a', 'd'])).to.be.an('object').and.to.have.property('min', 'a');
      expect(minmax(['z', 'a', 'd'])).to.be.an('object').and.to.have.property('max', 'z');
    });

    it('should return an object with min and max values at undefined if the parameter is not an array', function() {
      expect(minmax(null)).to.be.an('object').and.to.have.property('min', undefined);
      expect(minmax(null)).to.be.an('object').and.to.have.property('max', undefined);
      expect(minmax(undefined)).to.be.an('object').and.to.have.property('min', undefined);
      expect(minmax(undefined)).to.be.an('object').and.to.have.property('max', undefined);
      expect(minmax(NaN)).to.be.an('object').and.to.have.property('min', undefined);
      expect(minmax(NaN)).to.be.an('object').and.to.have.property('max', undefined);
      expect(minmax('1, 2, 8, -1')).to.be.an('object').and.to.have.property('min', undefined);
      expect(minmax('1, 2, 8, -1')).to.be.an('object').and.to.have.property('max', undefined);
      expect(minmax(true)).to.be.an('object').and.to.have.property('min', undefined);
      expect(minmax(true)).to.be.an('object').and.to.have.property('max', undefined);
      expect(minmax(155)).to.be.an('object').and.to.have.property('min', undefined);
      expect(minmax(155)).to.be.an('object').and.to.have.property('max', undefined);
    });
  });
});
