import { OrderRepository } from '../data/repositories/orderRepository';

const orderRepo = new OrderRepository();

export class OrderService {

    async createOrder(order) {
        return await (orderRepo.createOrders(order))
    }

    async getAllOrders() {
        return await orderRepo.findAll();
    }

    async getOrderById(id) {
        return await orderRepo.findOne(id);
    }

    async deleteOrder(id) {
        return await orderRepo.deleteOrder(id);
    }

    async countOrders() {
        return await orderRepo.getCount();
    }
}

