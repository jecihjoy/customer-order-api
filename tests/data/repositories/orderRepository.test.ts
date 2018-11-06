import { OrderRepository } from "../../../data/repositories/orderRepository";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const orderRepository = new OrderRepository();
describe('#createOrders()', function () {
  let saveStub;
  let data;
  beforeEach(() => {
    saveStub = sinon.stub(orderRepository, 'createOrders').resolves('saved successfully');
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
    orderRepository.createOrders(data).then((res) => {
      expect(saveStub).to.have.been.calledWith(data);
      expect(res).to.equal('saved successfully');
    })
  })
})


describe('#deleteOrder()', function () {
  let deleteStub;
  beforeEach(() => {
    deleteStub = sinon.stub(orderRepository, "deleteOrder").resolves('deleted')
  })
  afterEach(() => {
    deleteStub.restore()
  })
  it('should be called with one argument(2)', function () {
    orderRepository.deleteOrder(2);
    expect(deleteStub).to.have.been.calledWith(2);
  })
  it('should delete and return a success message', function () {
    orderRepository.deleteOrder(2)
      .then((res) => {
        expect(res).to.equal('deleted');
      })
  })
})