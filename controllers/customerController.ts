import { CustomerService } from '../services/customerService';
import * as Boom from'boom';

let customerService = new CustomerService();

export class CustomerController {
    saved = {
        status: "Ok",
        message: 'Saved successfully'
    }

    updated = {
        status: 'Ok',
        message: 'Updated successfully'
    }

    deleted = {
        status: 'Ok',
        message: 'deleted successfully'
    }

    getAllCustomers = (request, h) => {
        const response = h.response();
        response.type('application/json');
        return customerService.getAllCustomers()
            .then((customers) => {
                return customers;
            })
            .catch((err) => {
                return err;
            })
    }

    getCustomerById = (request, h) => {
        let id = encodeURIComponent(request.params.id);
        return customerService.getCustomer(id)
            .then((cust) => {
                return cust;
            })
            .catch((err) => {
                return err;
            })
    }

    saveCustomers = (request, h) => {
        let customers = [];
        request.payload.forEach(customer => {
            customers.push(customer)
        });
        return customerService.createCustomers(customers)
            .then((success) => {
                if (success) {
                    return this.saved;
                }
            })
            .catch((err) => {
                console.log('save cust route error', err);
                return err;
            })
    }

    updateCustomers = (request, h) => {
        let customers = [];
        request.payload.forEach(customer => {
            customers.push(customer)
        });
        return customerService.updateCustomers(customers)
            .then((results) => {
                return results;
            })
            .catch((err) => {
                console.log('update customers route error', err);
                return Boom.badData(err);
            })
    }

    deleteCustomer = (request, h) => {
        let id = encodeURIComponent(request.params.id);
        return customerService.deleteCustomer(id)
            .then((success) => {
                return success;
            })
            .catch((err) => {
                return err;
            })
    }

    customerCount = (request, h) => {
        return customerService.countCustomers()
        .then((count) => {
            return count;
        })
        .catch((err) => {
            return err;
        })
    }
}
