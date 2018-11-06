import { MockData } from '../mockData';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as _ from 'underscore';
import * as request from 'request';
let chaiHttp = require('chai-http');

let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);
let mockValues = new MockData();

//post https://stackoverflow.com/questions/27756520/how-to-mock-hapi-js-reply-with-sinon-for-unit-testing
describe('test customers routes', () => {
    let getStub;
    let responseObject;
    let responseBody;
   let data =  mockValues.mockCustomers();

    beforeEach(() => {
        getStub = sinon.stub(request, 'get');

        // responseObject = mockValues.mockCustomers()[0].responseObject;

        responseObject = {
            "statusCode": 200,
            "headers": {
                'content-type': 'application/json'
            }
        }
        responseBody = {
            "status": 'success',
            "data": [
                {
                    "id": 5,
                    "customer_name": "value1",
                    "customer_phone": "valuephone"
                },
                {
                    "id": 6,
                    "customer_name": "value1",
                    "customer_phone": "valuephone"
                }
            ]
        }

    });

    afterEach(() => {
        getStub.restore();
    });
    it('should return a list of all customers', function (done) {
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.get('http://localhost:3000/customers', (function (err, res, body) {
            _.isObject(res).should.be.true;
            expect(res.statusCode).to.equal(200);
            res.headers['content-type'].should.contain('application/json');
            body = JSON.parse(body);
            body.status.should.equal('success');
            body.data.length.should.equal(2);
            body.data[0].should.include.keys(
                'id', 'customer_name', 'customer_phone'
            );
            done();
        }))
    })
    it('should return a customer', function (done) {
        let person = responseBody.data[0];
        getStub.yields(null, responseObject, JSON.stringify(person));
        request.get('http://localhost:3000/customer/4', (function (err, res, body) {
            _.isObject(res).should.be.true;
            expect(res.statusCode).to.equal(200);
            res.headers['content-type'].should.contain('application/json');
            body = JSON.parse(body);
            body.customer_name.should.equal('value1');
            body.should.include.keys(
                'id', 'customer_name', 'customer_phone'
            );
            done();
        }))
    })
    it('should add a customer to the list', function (done) {
        let customer = [{
            "id": 7,
            "customer_name": "testCustomer",
            "customer_phone": "0978906745"
        }]
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.post('http://localhost:3000/customers', customer, (function (err, res, body) {
            responseBody.data.push(customer[0]);
            // console.log(responseBody)
            done();
        }))
    })
    it('should update the specified customer', function (done) {
        let customer = {
            customer_name: "testCustomer",
            customer_phone: "0978906745"
        }
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.put('http://localhost:3000/customer/6', customer, (function (err, res, body) {
            responseBody.data[0].customer_name = customer.customer_name;
            responseBody.data[0].customer_phone = customer.customer_phone;
            done();
        }))
    })
    it('should delete the specified customer', function (done) {
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.put('http://localhost:3000/customer/6', (function (err, res, body) {
            for (var i = 0; i < responseBody.data.length - 1; i++) {
                if (responseBody.data[i].id === 6) {
                    responseBody.data.splice(i, 1);
                }
            }
            done();
        }))
    })
})


describe('test products routes', () => {
    let getStub;
    let responseObject;
    let responseBody;

    beforeEach(() => {
        getStub = sinon.stub(request, 'get');

        responseObject = {
            "statusCode": 200,
            "headers": {
                'content-type': 'application/json'
            }
        }


        responseBody = {
            "status": 'success',
            "data": [
                {
                    "id": 1,
                    "product_name": "maziwa",
                    "product_price": "45"
                },
                {
                    "id": 2,
                    "product_name": "mkate",
                    "product_price": "50"
                }
            ]
        }

    });

    afterEach(() => {
        getStub.restore();
    });
    it('should return a list of all products', function (done) {
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.get('http://localhost:3000/products', (function (err, res, body) {
            _.isObject(res).should.be.true;
            expect(res.statusCode).to.equal(200);
            res.headers['content-type'].should.contain('application/json');
            body = JSON.parse(body);
            body.status.should.equal('success');
            body.data.length.should.equal(2);
            body.data[0].should.include.keys(
                'id', 'product_name', 'product_price'
            );
            done();
        }))
    })
    it('should return a product', function (done) {
        let person = responseBody.data[0];
        getStub.yields(null, responseObject, JSON.stringify(person));
        request.get('http://localhost:3000/customer/1', (function (err, res, body) {
            _.isObject(res).should.be.true;
            expect(res.statusCode).to.equal(200);
            res.headers['content-type'].should.contain('application/json');
            body = JSON.parse(body);
            body.product_name.should.equal('maziwa');
            body.should.include.keys(
                'id', 'product_name', 'product_price'
            );
            done();
        }))
    })
    it('should add a product to the list', function (done) {
        let product = [{
            id: 3,
            product_name: "testProduct",
            product_price: 900
        }]
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.post('http://localhost:3000/products', product, (function (err, res, body) {
            responseBody.data.push(product[0]);
            done();
        }))
    })
    it('should update the specified product', function (done) {
        let product = {
            product_name: "testProd",
            product_price: 980
        }
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.put('http://localhost:3000/product/1', product, (function (err, res, body) {
            responseBody.data[0].product_name = product.product_name;
            responseBody.data[0].product_price = product.product_price;
            // console.log(responseBody)
            done();
        }))
    })
    it('should delete the specified product', function (done) {
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.put('http://localhost:3000/product/3', (function (err, res, body) {
            for (var i = 0; i < responseBody.data.length - 1; i++) {
                if (responseBody.data[i].id === 6) {
                    responseBody.data.splice(i, 1);
                }
            }
            done();
        }))
    })
})
describe('test products routes', () => {
    let getStub;
    let responseObject;
    let responseBody;

    beforeEach(() => {
        getStub = sinon.stub(request, 'get');

        responseObject = {
            "statusCode": 200,
            "headers": {
                'content-type': 'application/json'
            }
        }
        responseBody = {
            "status": 'success',
            "data": [

                {
                    "OrderId": 2,
                    "OrderDate": "2019-10-10T12:37:36.000Z",
                    "CustomerId": 2,
                    "CustomerName": "kelvin",
                    "Products": [
                        {
                            "ProductId": 1,
                            "ProductName": "maziwa",
                            "ProductQuantity": 2,
                            "ProductPrice": "45",
                            "TotalPrice": 90
                        },
                        {
                            "ProductId": 2,
                            "ProductName": "mkate",
                            "ProductQuantity": 5,
                            "ProductPrice": "50",
                            "TotalPrice": 250
                        }
                    ]
                },
                {
                    "OrderId": 3,
                    "OrderDate": null,
                    "CustomerId": 2,
                    "CustomerName": "kelvin",
                    "Products": [
                        {
                            "ProductId": 1,
                            "ProductName": "maziwa",
                            "ProductQuantity": 2,
                            "ProductPrice": "45",
                            "TotalPrice": 90
                        }
                    ]
                }
            ]
        }

    });

    afterEach(() => {
        getStub.restore();
    });
    it('should return a list of all orders', function (done) {
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.get('http://localhost:3000/orders', (function (err, res, body) {
            _.isObject(res).should.be.true;
            expect(res.statusCode).to.equal(200);
            res.headers['content-type'].should.contain('application/json');
            body = JSON.parse(body);
            body.status.should.equal('success');
            body.data.length.should.equal(2);
            done();
        }))
    })
    it('should return an order with its products', function (done) {
        let order = responseBody.data[1];
        getStub.yields(null, responseObject, JSON.stringify(order));
        request.get('http://localhost:3000/order/1', (function (err, res, body) {
            _.isObject(res).should.be.true;
            expect(res.statusCode).to.equal(200);
            res.headers['content-type'].should.contain('application/json');
            body = JSON.parse(body);
            done();
        }))
    })
    it('should add an order to the list', function (done) {
        let order =  {
            "OrderId": 5,
            "OrderDate": null,
            "CustomerId": 2,
            "CustomerName": "kelvin",
            "Products": [
                {
                    "ProductId": 1,
                    "ProductName": "maziwa",
                    "ProductQuantity": 2,
                    "ProductPrice": "45",
                    "TotalPrice": 90
                }]
            }
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.post('http://localhost:3000/saveTransaction', order, (function (err, res, body) {
            responseBody.data.push(order);
            // console.log('orders', responseBody.data)
            done();
        }))
    })
    it('should update the specified order', function (done) {
        let order =  {
            OrderId: 3,
            OrderDate: '2019-01-01',
            CustomerId: 2,
            CustomerName: "kelvin",
            Products: [
                {
                    ProductId: 1,
                    ProductName: "maziwa",
                    ProductQuantity: 6,
                    ProductPrice: 500,
                    TotalPrice: 90
                }
            ]
        
        }
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.put('http://localhost:3000/order', order, (function (err, res, body) {
            responseBody.data[1].ProductQuantity = order.Products[0].ProductQuantity;
            // console.log(responseBody)
            done();
        }))
    })
    it('should delete the specified order', function (done) {
        getStub.yields(null, responseObject, JSON.stringify(responseBody));
        request.put('http://localhost:3000/order/3/2', (function (err, res, body) {
            done();
        }))
    })
})