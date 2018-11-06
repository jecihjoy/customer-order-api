import { OrderService } from '../services/orderService';

let orderService = new OrderService();

export class OrderController {
    
    createOrders = (request, h) => {
        return orderService.createOrder(request.payload)
        .then((success) => {
            return success;
        })
        .catch((err) => {
            return err;
        })
    }

    getOrders = (request, h) => {
        return orderService.getAllOrders()
            .then((data) => {
                return data;
            })
            .catch((err) => {
                return err;
            })
    }

    getOrderByID = (request, h) => {
        let order_id = encodeURIComponent(request.params.orderId);
        return orderService.getOrderById(order_id)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                return err;
            })
    }

    deleteOrder = (request, h) => {
        let id = encodeURIComponent(request.params.id);
        return orderService.deleteOrder(id)
            .then((success) => {
                return success;
            })
            .catch((err) => {
                return err;
            })
    }

    countOrders = (request, h) => {
        return orderService.countOrders()
            .then((count) => {
                return count;
            })
            .catch((err) => {
                return err;
            })
    }
    
}
