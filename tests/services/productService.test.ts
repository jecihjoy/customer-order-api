import { ProductService } from "../../services/productService";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const productService = new ProductService();
describe('#service #createProducts()', function () {
    let saveStub;
    let data;
    beforeEach(() => {
        saveStub = sinon.stub(productService, 'createProducts').resolves('saved successfully');
        data = [
            {
                "product_name": "maziwa33",
                "product_price": "45"
            },
            {
                "product_name": "mkate33",
                "product_price": "50"
            }
        ]
    })
    afterEach(() => {
        saveStub.restore();
    })
    it('should work and return success message', function () {
        _.isObject(data).should.be.true;
        productService.createProducts(data).then((res) => {
            expect(saveStub).to.have.been.calledWith(data);
            expect(res).to.equal('saved successfully');
        })
    })
})

describe('#service #getAllProducts()', function () {
    let stub;
    beforeEach(() => {
        stub = sinon.stub(productService, 'getAllProducts').resolves('all data');
    })
    this.afterEach(() => {
        stub.restore();
    })
    it('should work', () => stub)
    it('should work and return data', () => {
        return productService.getAllProducts()
            .then((result) => {
                _.isObject(result).should.be.false;
                expect(result).to.equal('all data');
            })
    })
})

describe('#service #getProduct()', function () {
    let stub;
    beforeEach(() => {
        stub = sinon.stub(productService, 'getProduct').resolves('customer');
    })
    this.afterEach(() => {
        stub.restore();
    })
    it('should work', () => stub)
    it('should be called with an id, 6', function () {
        productService.getProduct(6);
        expect(stub).to.have.been.calledWith(6);
    })
    it('should work and return an order', () => {
        return productService.getProduct(6)
            .then((result) => {
                _.isObject(result).should.be.false;
                expect(result).to.equal('customer');
            })
    })
})

describe('#service #updateProducts()', function () {
    let deleteStub;
    let data;
    beforeEach(() => {
        deleteStub = sinon.stub(productService, "updateProducts").resolves('updated')
        data = [
            {
                "id": 5,
                "product_name": "mkate33",
                "product_price": "100"
            }
        ]
    })
    afterEach(() => {
        deleteStub.restore()
    })
    it('should be called with one argument(data)', function () {
        productService.updateProducts(data);
        expect(deleteStub).to.have.been.calledWith(data);
        _.isObject(data).should.be.true;
    })
    it('should update and return a success message', function () {
        productService.updateProducts(data)
            .then((res) => {
                expect(res).to.equal('updated');
            })
    })
})

describe('#service #deleteProduct()', function () {
    let deleteStub;
    beforeEach(() => {
        deleteStub = sinon.stub(productService, "deleteProduct").resolves('deleted')
    })
    afterEach(() => {
        deleteStub.restore()
    })
    it('should be called with one argument(4)', function () {
        productService.deleteProduct(4);
        expect(deleteStub).to.have.been.calledWith(4);
    })
    it('should delete and return a success message', function () {
        productService.deleteProduct(4)
            .then((res) => {
                expect(res).to.equal('deleted');
            })
    })
})

describe('#service #countProducts should return the number of orders',
    function () {
        let countStub;
        beforeEach(() => {
            countStub = sinon.stub(productService, "countProducts").resolves(6);
        })
        afterEach(() => {
            countStub.restore();
        })
        it('should return number of orders, 6', function () {
            productService.countProducts().then((count) => {
                expect(count).to.equal(6);
            })
        })
    })