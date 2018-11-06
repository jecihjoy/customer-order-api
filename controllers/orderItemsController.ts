import { OrderItemService } from '../services/orderItemService';

let orderService = new OrderItemService();

export class OrderItemController{

    saveTransaction = (request, h) => {
        let order = request.payload;
        return orderService.saveTransaction(order)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
    }

    updateOrderProducts(request, h) {
        let orderId = request.params.orderId;
        let orderToBeUpdated = request.payload;
        return orderService.updateOrderProducts(orderToBeUpdated, orderId)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        })
    }

    getAllOrders = (request, h) => {
        return orderService.getAllOrders()
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
    }

    getOrderById = (request, h) => {
        let order_id = encodeURIComponent(request.params.orderId);
        return orderService.getByOrderId(order_id)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
    }

    deleteOrderProduct = (request, h) => {
        const urlparts = request.params.count.split('/');
        let orderId = encodeURIComponent(urlparts[0]);
        let productId = encodeURIComponent(urlparts[1]);
        return orderService.deleteOrderProduct(orderId, productId)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        })
    }

    getTopCustomerByTransaction = (request, h) => {
        return orderService.topCustomerByTransaction()
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
    }

    getCustomerTransactions = (request, h) => {
        let phone = request.params.phone;
        return orderService.customerTransactions(phone)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        })
    }
}
