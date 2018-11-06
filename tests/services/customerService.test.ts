import { CustomerService } from "../../services/customerService";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const customerService = new CustomerService();
describe('#service #createCustomers()', function () {
    let saveStub;
    let data;
    beforeEach(() => {
        saveStub = sinon.stub(customerService, 'createCustomers').resolves('saved successfully');
        data = [
            {
                "customer_name": "michaels33",
                "customer_phone": "07897869810"
            },
            {
                "customer_name": "michaels33",
                "customer_phone": "07897869810"
            }
        ]
    })
    afterEach(() => {
        saveStub.restore();
    })
    it('should work and return success message', function () {
        _.isObject(data).should.be.true;
        customerService.createCustomers(data).then((res) => {
            expect(saveStub).to.have.been.calledWith(data);
            expect(res).to.equal('saved successfully');
        })
    })
})


describe('#service #updateCustomers()', function () {
    let deleteStub;
    let data;
    beforeEach(() => {
        deleteStub = sinon.stub(customerService, "updateCustomers").resolves('updated')
        data = [
            {
                "id": 1,
                "customer_name": "paul33",
                "customer_phone": "0712345678"
            },
            {
                "id": 2,
                "customer_name": "kelvin33",
                "customer_phone": "0722222222"
            }
        ]
    })
    afterEach(() => {
        deleteStub.restore()
    })
    it('should be called with one argument(data)', function () {
        customerService.updateCustomers(data);
        expect(deleteStub).to.have.been.calledWith(data);
        _.isObject(data).should.be.true;
    })
    it('should update and return a success message', function () {
        customerService.updateCustomers(data)
            .then((res) => {
                expect(res).to.equal('updated');
            })
    })
})

describe('#service #getAllCustomers()', function () {
    let stub;
    beforeEach(() => {
      stub = sinon.stub(customerService, 'getAllCustomers').resolves('all data');
    })
    this.afterEach(() => {
      stub.restore();
    })
    it('should work', () => stub)
    it('should work and return data', () => {
      return customerService.getAllCustomers()
        .then((result) => {
          _.isObject(result).should.be.false;
          expect(result).to.equal('all data');
        })
    })
  })
  
  describe('#service #getCustomer()', function () {
    let stub;
    beforeEach(() => {
      stub = sinon.stub(customerService, 'getCustomer').resolves('customer');
    })
    this.afterEach(() => {
      stub.restore();
    })
    it('should work', () => stub)
    it('should be called with an id, 6', function () {
      customerService.getCustomer(6);
      expect(stub).to.have.been.calledWith(6);
    })
    it('should work and return an order', () => {
      return customerService.getCustomer(6)
        .then((result) => {
          _.isObject(result).should.be.false;
          expect(result).to.equal('customer');
        })
    })
  })
describe('#service #deleteCustomer()', function () {
    let deleteStub;
    beforeEach(() => {
        deleteStub = sinon.stub(customerService, "deleteCustomer").resolves('deleted')
    })
    afterEach(() => {
        deleteStub.restore()
    })
    it('should be called with one argument(2)', function () {
        customerService.deleteCustomer(2);
        expect(deleteStub).to.have.been.calledWith(2);
    })
    it('should delete and return a success message', function () {
        customerService.deleteCustomer(2)
            .then((res) => {
                expect(res).to.equal('deleted');
            })
    })
})

describe('#service #countCustomers should return the number of orders',
function() {
    let countStub;
    beforeEach(() => {
        countStub = sinon.stub(customerService, "countCustomers").resolves(6);
    })
    afterEach(() => {
        countStub.restore();
    })
    it('should return number of orders, 6', function(){
        customerService.countCustomers().then((count) => {
            expect(count).to.equal(6);
        })
    })
})