export class MockData {

    mockCustomers() {

        let responseObject = {
            "statusCode": 200,
            "headers": {
                'content-type': 'application/json'
            }
        }


        let responseBody = {
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

        let mockCustomer = {}
        mockCustomer["responseObject"] = responseObject;
        mockCustomer["responseBody"] = responseBody;

        return mockCustomer;
    }

    mockOrders() {
        let responseObject = {
            "statusCode": 200,
            "headers": {
                'content-type': 'application/json'
            }
        }
        let responseBody = {
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
        let mockOrders = {}
        mockOrders["responseObject"] = responseObject;
        mockOrders["responseBody"] = responseBody;

        return mockOrders;
    }

    mockProducts() {
        let responseObject = {
            "statusCode": 200,
            "headers": {
                'content-type': 'application/json'
            }
        }


        let responseBody = {
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
        let mockProducts = {}
        mockProducts["responseObject"] = responseObject;
        mockProducts["responseBody"] = responseBody;

        return mockProducts;
        
    }
}

