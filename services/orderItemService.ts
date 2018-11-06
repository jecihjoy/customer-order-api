import { OrderItemRepository } from '../data/repositories/orderItemRepository';

const orderItemRepository = new OrderItemRepository();

export class OrderItemService {

    async saveTransaction(order) {
        return await orderItemRepository.saveOrderDetails(order);
    }

    getAllOrders() {
        return new Promise((resolve, reject) => {
            orderItemRepository.getAllOrders()
                .then((data) => {
                    let values = JSON.parse(JSON.stringify(data))
                    let orderObj = this.getOrderObject(values);
                    let finalObject = this.getOrderProductObject(values, orderObj)
                    resolve(finalObject);
                })
                .catch((err) => {
                    console.log('order service line 97 error', err);
                    reject(err);
                })
        })
    }


    getByOrderId(orderId) {
        return new Promise((resolve, reject) => {
            orderItemRepository.getByOrderId(orderId)
                .then((data) => {
                    let values = JSON.parse(JSON.stringify(data))
                    let orderObj = this.getOrderObjectXX(values);
                    console.log('orderObjevt', orderObj);
                    let finalObject = this.getOrderProductObject(values, orderObj)
                    resolve(finalObject);
                })
                .catch((err) => {
                    console.log('order service line 97 error', err);
                    reject(err);
                })
        })
    }

    async deleteOrderProduct(orderId, productId) {
        return await orderItemRepository.deleteOrderProduct(orderId, productId);
    }

    async updateOrderProducts(order, orderId) {
        return await orderItemRepository.updateOrdeProducts(order, orderId);
    }

    async topCustomerByTransaction() {
        return await orderItemRepository.topCustomerByTransaction();
    }

    customerTransactions(phoneNumber) {
        return new Promise((resolve, reject) => {
            orderItemRepository.customerTransactions(phoneNumber)
                .then((data) => {
                    let values = JSON.parse(JSON.stringify(data))
                    let orderObj = this.getOrderObjectXX(values);
                    let finalObject = this.getOrderProductObject(values, orderObj)
                    resolve(finalObject);
                })
                .catch((err) => {
                    console.log('order service line 108 error', err);
                    reject(err);
                })
        })
    }

    getOrderObject(orders) {
        let orderObject = []
        orders.forEach((element, index) => {
            let ordersWithSameId = orders.filter(order => order.OrderId === index);
            let order = {}
            if (ordersWithSameId.length > 0) {
                order['OrderId'] = ordersWithSameId[0].OrderId
                order['OrderDate'] = ordersWithSameId[0].OrderDate
                order['CustomerId'] = ordersWithSameId[0].CustomerId
                order['CustomerName'] = ordersWithSameId[0].CustomerName
                order['CustomerPhone'] = ordersWithSameId[0].CustomerPhone
                order['Products'] = [];
                orderObject.push(order);
            }
        });
        return orderObject;
    }

    getOrderObjectXX(orders) {
        let orderObject = []
        orders.forEach((element) => {
            let order = {}
            order['OrderId'] = element.OrderId
            order['OrderDate'] = element.OrderDate
            order['CustomerId'] = element.CustomerId
            order['CustomerName'] = element.CustomerName
            order['CustomerPhone'] = element.CustomerPhone
            order['Products'] = [];
            orderObject.push(order);
        });
        return orderObject;
    }


    getOrderProductObject(orders, orderObject) {
        for (var order of orderObject) {
            for (var element of orders) {
                let products = {}
                products['ProductId'] = element.ProductId
                products['ProductName'] = element.ProductName
                products['ProductQuantity'] = element.ItemQuantity
                products['ProductPrice'] = element.ProductPrice
                products['TotalPrice'] = element.ProductPrice * element.ItemQuantity;

                if (order.OrderId == element.OrderId) {
                    order.Products.push(products);
                }
            }
        }
        return orderObject;
    }

}