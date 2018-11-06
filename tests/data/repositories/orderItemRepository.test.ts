import { OrderItemRepository } from "../../../data/repositories/orderItemRepository";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const orderItemRepository = new OrderItemRepository();

describe('#saveOrderDetails()', function () {
  let saveStub;
  let data;
  beforeEach(() => {
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
    saveStub = sinon.stub(orderItemRepository, 'saveOrderDetails').resolves('saved successfully');
  })
  afterEach(() => {
    saveStub.restore();
  })
  it('should be called with data to be saved', function () {
    orderItemRepository.saveOrderDetails(data);
    expect(saveStub).to.have.been.calledWith(data);
  })
  it('should work and return success message', function () {
    orderItemRepository.saveOrderDetails(data).then((res) => {
      expect(res).to.equal('saved successfully');
    })
  })
})

describe('#getAllOrders()', function () {
  let stub;
  beforeEach(() => {
    stub = sinon.stub(orderItemRepository, 'getAllOrders').resolves('all data');
  })
  this.afterEach(() => {
    stub.restore();
  })
  it('should work', () => stub)
  it('should work and return data', () => {
    return orderItemRepository.getAllOrders()
      .then((result) => {
        _.isObject(result).should.be.false;
        expect(result).to.equal('all data');
      })
  })
})

describe('#getOrderById()', function () {
  let stub;
  beforeEach(() => {
    stub = sinon.stub(orderItemRepository, 'getByOrderId').resolves('order');
  })
  this.afterEach(() => {
    stub.restore();
  })
  it('should work', () => stub)
  it('should be called with an id, 6', function () {
    orderItemRepository.getByOrderId(6);
    expect(stub).to.have.been.calledWith(6);
  })
  it('should work and return an order', () => {
    return orderItemRepository.getByOrderId(6)
      .then((result) => {
        _.isObject(result).should.be.false;
        expect(result).to.equal('order');
      })
  })
})

describe('#deleteOrderProduct()', function () {
  let deleteStub;
  beforeEach(() => {
    deleteStub = sinon.stub(orderItemRepository, "deleteOrderProduct").resolves('deleted')
  })
  afterEach(() => {
    deleteStub.restore()
  })
  it('should be called with two arguments, orderId(10) and ProductId(2)', function () {
    orderItemRepository.deleteOrderProduct(10, 2);
    expect(deleteStub).to.have.been.calledWith(10, 2);
  })
  it('should delete and return a success message', function () {
    orderItemRepository.deleteOrderProduct(10, 2)
      .then((res) => {
        expect(res).to.equal('deleted');
      })
  })
})

describe('#updateOrderProducts()', function () {
  let updateStub;
  let data;
  beforeEach(() => {
    updateStub = sinon.stub(orderItemRepository, "updateOrdeProducts").resolves('updated')
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
    updateStub.restore();
  })
  it('should be called with data', function () {
    orderItemRepository.updateOrdeProducts(data);
    expect(updateStub).to.have.been.calledWith(data);
  })
  it('should update and return update success', function () {
    orderItemRepository.updateOrdeProducts(data).then((res) => {
      expect(res).to.equal('updated');
    })
  })
})

describe('#test topCustomerByTransaction', function () {
  let stub;
  beforeEach(() => {
    stub = sinon.stub(orderItemRepository, 'topCustomerByTransaction').resolves('frequent customer');
  })
  this.afterEach(() => {
    stub.restore()
  })
  it('should work', () => stub)
  it('should work and return most frequent customer', () => {
    return orderItemRepository.topCustomerByTransaction()
      .then((result) => {
        expect(result).to.equal('frequent customer');
      })
  })
})

describe('#test customerTransactions', function () {
  let stub;
  let phone = '0708608486'
  beforeEach(() => {
    stub = sinon.stub(orderItemRepository, 'customerTransactions').resolves('customer orders');
  })
  this.afterEach(() => {
    stub.restore()
  })
  it('should work', () => stub)
  it('should work customer transactions', () => {
    return orderItemRepository.customerTransactions(phone)
      .then((result) => {
        expect(result).to.equal('customer orders');
      })
  })
})