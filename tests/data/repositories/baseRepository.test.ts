import { BaseRepository } from '../../../data/repositories/baseReposity';
import { TestFunctions } from './testFunctions';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);


const baseRepository = new BaseRepository();

const testFunctions = new TestFunctions();

describe('addTwoNumbers()', function () {
  it('should add two numbers', function (done) {
    var x = 5;
    var y = 1;
    var sum1 = x + y;
    testFunctions.addTwoNumbers(x, y).then(function (result) {
      expect(result).to.be.equal(sum1);
      done();
    }).catch(function (err) {
      done(err);
    })
  });
})

describe('#test findAll()', function () {
  let stub;
  beforeEach(() => {
    stub = sinon.stub(baseRepository, 'findAll').resolves('all objects');
  });
  this.afterEach(() => {
    stub.restore();
  })
  it('should work', () => stub)
  it('should work and return data', () => {
    return baseRepository.findAll().should.eventually.equal('all objects');
  })
})

describe('#test findOne()', function () {
  let findOneStub;
  beforeEach(function () {
    findOneStub = sinon.stub(baseRepository, 'findOne').resolves('');
  });
  afterEach(function () {
    findOneStub.restore()
  });
  it('should work', () => findOneStub)
  it('findOne should resolve to a db object', function (done) {
    baseRepository.findOne(6).should.eventually.equal('').notify(done);
    expect(findOneStub).to.have.been.calledWith(6);
  })

})

describe('#test getCount()', function () {
  let stub;
  beforeEach(() => {
    stub = sinon.stub(baseRepository, 'getCount').resolves(7)
  })
  this.afterEach(() => {
    stub.restore()
  })
  it('should work', () => stub)
  it('should work and return count', () => {
    return baseRepository.getCount().should.eventually.deep.equal(7)
  })
})

describe('#test executequery()', function () {
  let stub;
  beforeEach(() => {
    stub = sinon.stub(baseRepository, 'executequery').resolves('');
  })
  afterEach(() => {
    stub.restore()
  })
  it('should work', () => stub)
  it('should work and let me run a query', function () {
    return baseRepository.executequery('select * from customers')
      .then((value) => {
        expect(stub).to.have.been.calledWith('select * from customers');
        expect(value).to.equal('');
      })
  })
})

