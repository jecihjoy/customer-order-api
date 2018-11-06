import { OrderService } from "../../services/orderService";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const orderService = new OrderService();

describe('#service #createOrder()', function () {
    let saveStub;
    let data;
    beforeEach(() => {
        saveStub = sinon.stub(orderService, 'createOrder').resolves('saved successfully');
        data = {
            "OrderId": 1,
            "OrderDate": "2019-01-01",
            "CustomerId": 1,
            "CustomerName": "paul",
            "Products": [
                {
                    "ProductId": 1,
                    "ProductName": "maziwa",
                    "ProductQuantity": 4,
                    "ProductPrice": "45",
                    "TotalPrice": 90
                },
                {
                    "ProductId": 2,
                    "ProductName": "mkate",
                    "ProductQuantity": 4,
                    "ProductPrice": "50",
                    "TotalPrice": 150
                }
            ]
        }
    })
    afterEach(() => {
        saveStub.restore();
    })
    it('should work and return success message', function () {
        orderService.createOrder(data).then((res) => {
            expect(saveStub).to.have.been.calledWith(data);
            expect(res).to.equal('saved successfully');
        })
    })
})


describe('#service #getAllOrders()', function () {
    let stub;
    beforeEach(() => {
        stub = sinon.stub(orderService, 'getAllOrders').resolves('all data');
    })
    this.afterEach(() => {
        stub.restore();
    })
    it('should work', () => stub)
    it('should work and return data', () => {
        return orderService.getAllOrders()
            .then((result) => {
                _.isObject(result).should.be.false;
                expect(result).to.equal('all data');
            })
    })
})

describe('#service #getOrderById()', function () {
    let stub;
    beforeEach(() => {
        stub = sinon.stub(orderService, 'getOrderById').resolves('customer');
    })
    this.afterEach(() => {
        stub.restore();
    })
    it('should work', () => stub)
    it('should be called with an id, 6', function () {
        orderService.getOrderById(6);
        expect(stub).to.have.been.calledWith(6);
    })
    it('should work and return an order', () => {
        return orderService.getOrderById(6)
            .then((result) => {
                _.isObject(result).should.be.false;
                expect(result).to.equal('customer');
            })
    })
})

describe('#service #deleteOrder()', function () {
    let deleteStub;
    beforeEach(() => {
        deleteStub = sinon.stub(orderService, "deleteOrder").resolves('deleted')
    })
    afterEach(() => {
        deleteStub.restore()
    })
    it('should be called with one argument(2)', function () {
        orderService.deleteOrder(2);
        expect(deleteStub).to.have.been.calledWith(2);
    })
    it('should delete and return a success message', function () {
        orderService.deleteOrder(2)
            .then((res) => {
                expect(res).to.equal('deleted');
            })
    })
})

describe('#service #countOrders should return the number of orders',
    function () {
        let countStub;
        beforeEach(() => {
            countStub = sinon.stub(orderService, "countOrders").resolves(6);
        })
        afterEach(() => {
            countStub.restore();
        })
        it('should return number of orders, 6', function () {
            orderService.countOrders().then((count) => {
                expect(count).to.equal(6);
            })
        })
    })