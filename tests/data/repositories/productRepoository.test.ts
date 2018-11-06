import { ProductRepository } from "../../../data/repositories/productRepository";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const productRepository = new ProductRepository();
describe('#createProducts()', function () {
    let saveStub;
    let data;
    beforeEach(() => {
        saveStub = sinon.stub(productRepository, 'createProducts').resolves('saved successfully');
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
        productRepository.createProducts(data).then((res) => {
            expect(saveStub).to.have.been.calledWith(data);
            expect(res).to.equal('saved successfully');
        })
    })
})


describe('#updateProducts()', function () {
    let deleteStub;
    let data;
    beforeEach(() => {
        deleteStub = sinon.stub(productRepository, "updateProducts").resolves('updated')
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
        productRepository.updateProducts(data);
        expect(deleteStub).to.have.been.calledWith(data);
        _.isObject(data).should.be.true;
    })
    it('should update and return a success message', function () {
        productRepository.updateProducts(data)
            .then((res) => {
                expect(res).to.equal('updated');
            })
    })
})

describe('#deleteProduct()', function () {
    let deleteStub;
    beforeEach(() => {
        deleteStub = sinon.stub(productRepository, "deleteProduct").resolves('deleted')
    })
    afterEach(() => {
        deleteStub.restore()
    })
    it('should be called with one argument(4)', function () {
        productRepository.deleteProduct(4);
        expect(deleteStub).to.have.been.calledWith(4);
    })
    it('should delete and return a success message', function () {
        productRepository.deleteProduct(4)
            .then((res) => {
                expect(res).to.equal('deleted');
            })
    })
})