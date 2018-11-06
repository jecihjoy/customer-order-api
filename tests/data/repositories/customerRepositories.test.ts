import { CustomerRepository } from "../../../data/repositories/customerRepository";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const customerRepository = new CustomerRepository();
describe('#createCustomers()', function () {
    let saveStub;
    let data;
    beforeEach(() => {
        saveStub = sinon.stub(customerRepository, 'createCustomers').resolves('saved successfully');
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
        customerRepository.createCustomers(data).then((res) => {
            expect(saveStub).to.have.been.calledWith(data);
            expect(res).to.equal('saved successfully');
        })
    })
})


describe('#updateCustomers()', function () {
    let deleteStub;
    let data;
    beforeEach(() => {
        deleteStub = sinon.stub(customerRepository, "updateCustomers").resolves('updated')
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
        customerRepository.updateCustomers(data);
        expect(deleteStub).to.have.been.calledWith(data);
        _.isObject(data).should.be.true;
    })
    it('should update and return a success message', function () {
        customerRepository.updateCustomers(data)
            .then((res) => {
                expect(res).to.equal('updated');
            })
    })
})

describe('#deleteCustomer()', function () {
    let deleteStub;
    beforeEach(() => {
        deleteStub = sinon.stub(customerRepository, "deleteCustomer").resolves('deleted')
    })
    afterEach(() => {
        deleteStub.restore()
    })
    it('should be called with one argument(2)', function () {
        customerRepository.deleteCustomer(2);
        expect(deleteStub).to.have.been.calledWith(2);
    })
    it('should delete and return a success message', function () {
        customerRepository.deleteCustomer(2)
            .then((res) => {
                expect(res).to.equal('deleted');
            })
    })
})