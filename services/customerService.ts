import { CustomerRepository } from "../data/repositories/customerRepository";

const customerRepository = new CustomerRepository();

export class CustomerService {

    async createCustomers(customers) {
        return await customerRepository.createCustomers(customers)
    }

    async updateCustomers(customers) {
        let res = await (customerRepository.updateCustomers(customers));
        return res;
    }

    async getAllCustomers() {
        return await customerRepository.findAll();
    }

    async getCustomer(id) {
        return await customerRepository.findOne(id)
    }

    async deleteCustomer(id) {
        return await customerRepository.deleteCustomer(id)
    }

    async countCustomers() {
        return await customerRepository.getCount()
    }

}
