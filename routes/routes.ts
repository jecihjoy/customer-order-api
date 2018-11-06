import { CustomerController } from '../controllers/customerController';
import { ProductController } from '../controllers/productController';
import { OrderController } from '../controllers/orderController';
import { OrderItemController } from '../controllers/orderItemsController';
import * as joi from 'joi';

const customerController = new CustomerController();
const orderController = new OrderController();
const orderItemController = new OrderItemController();
const productController = new ProductController();

const success = joi.object({
    success: joi.boolean().truthy().required(),
});

const error = joi.object({
    statusCode: joi.number().required(),
    error: joi.string(),
    message: joi.string(),
});

const validationError = error.keys({
    validation: joi.object().optional(),
});

export const Routes = function () {

    var routes = [
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Hello, world!';
            }
        },
        /* ============================================================================================*
                                CUSTOMERS ROUTES
        ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
        {
            method: 'GET',
            path: '/customers',
            handler: customerController.getAllCustomers,
            options: {
                description: 'Returns list customers',
                notes: 'Prints all the customers that have an account',
                tags: ['api']
            }
        },
        {
            method: 'POST',
            path: '/customers',
            handler: customerController.saveCustomers,
            options: {
                description: 'Saves customers in the database',
                notes: 'Saves customers in the database',
                tags: ['api']
            }
        },
        {
            method: 'PUT',
            path: '/customers',
            handler: customerController.updateCustomers,
            options: {
                description: 'updates customers in the database',
                notes: 'updates customers in the database',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/customer/{id}',
            handler: customerController.getCustomerById,
            options: {
                validate: {
                    params: {
                        id: joi.number().max(100).positive().min(1).integer().required()
                    }
                },
                description: 'Returns a customer',
                notes: 'Specify customer id',
                tags: ['api']
            }
        },
        {
            method: 'DELETE',
            path: '/deleteCustomer/{id}',
            handler: customerController.deleteCustomer,
            options: {
                validate: {
                    params: {
                        id: joi.number().max(100).positive().min(1).integer().required()
                    }
                },
                description: 'Deletes a customer',
                notes: 'Specify customer id',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/customerCount',
            handler: customerController.customerCount,
            options: {
                description: 'Returns number of customers',
                notes: 'Counts cutomer number',
                tags: ['api']
            }
        },
        /* ============================================================================================*
                                        ORDER ROUTES
        ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

        {
            method: 'GET',
            path: '/allOrders',
            handler: orderItemController.getAllOrders,
            options: {
                description: 'Returns number of products',
                notes: 'Prints number of products',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/order/{orderId}',
            handler: orderItemController.getOrderById,
            options: {
                description: 'Returns number of products',
                notes: 'Prints number of products',
                tags: ['api']
            }
        },
        {
            method: 'PUT',
            path: '/order/{orderId}',
            handler: orderItemController.updateOrderProducts,
            options: {
                description: 'update orders in the database',
                notes: 'update orders in the database',
                tags: ['api']
            }
        },
        {
            method: 'POST',
            path: '/saveTransaction',
            handler: orderItemController.saveTransaction,
            options: {
                description: 'Saves an order with its items details',
                notes: 'Saves orders details',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/topCustomer',
            handler: orderItemController.getTopCustomerByTransaction,
            options: {
                description: 'Returns number of products',
                notes: 'Prints number of products',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/customerTransactions/{phone}',
            handler: orderItemController.getCustomerTransactions,
            options: {
                description: 'Returns number of products',
                notes: 'Prints number of products',
                tags: ['api']
            }
        },

        {
            method: 'DELETE',
            path: '/deleteOrderProduct/{count*2}',
            handler: orderItemController.deleteOrderProduct,
            options: {
                description: 'Deletes an order',
                notes: 'Specify which order to be deleted in the param',
                tags: ['api']
            }

        },

                /* ============================================================================================*
                                        ORDERS ROUTES
        ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

        {
            method: 'GET',
            path: '/orders',
            handler: orderController.getOrders,
            options: {
                description: 'Returns number of products',
                notes: 'Prints number of products',
                tags: ['api']
            }
        },
        {
            method: 'DELETE',
            path: '/order/{id}',
            handler: orderController.deleteOrder,
            options: {
                validate: {
                    params: {
                        id: joi.number().max(100).positive().min(1).integer().required()
                    }
                },
                description: 'Deletes an order with it items',
                notes: 'Specify which order to be deleted in the param',
                tags: ['api']
            }

        },

        {
            method: 'GET',
            path: '/orderCount',
            handler: orderController.countOrders,
            options: {
                description: 'Returns number of orders',
                notes: 'Prints nuber of orders',
                tags: ['api']
            }
        },


        /* ============================================================================================*
                                        PRODUCTS ROUTES
        ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
        {
            method: 'POST',
            path: '/products',
            handler: productController.saveProducts,
            options: {
                description: 'Save orders in the database',
                notes: 'Save orders in the database',
                tags: ['api']
            }
        },
        {
            method: 'PUT',
            path: '/products',
            handler: productController.updateProducts,
            options: {
                description: 'Save orders in the database',
                notes: 'Save orders in the database',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/products',
            handler: productController.getAllProducts,
            options: {
                description: 'Returns a list of all products',
                notes: 'Prints all products',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/product/{id}',
            handler: productController.getProductById,
            options: {
                validate: {
                    params: {
                        id: joi.number().max(100).positive().min(1).integer().required()
                    }
                },
                description: 'Returns a single product',
                notes: 'Specify the product in the param',
                tags: ['api']
            },

        },
        {
            method: 'DELETE',
            path: '/deleteProduct/{id}',
            handler: productController.deleteProduct,
            options: {
                validate: {
                    params: {
                        id: joi.number().max(100).positive().min(1).integer().required()
                    }
                },
                description: 'Deletes specified product',
                notes: 'Specify product to be deleted',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/productCount',
            handler: productController.countProducts,
            options: {
                description: 'Returns number of products',
                notes: 'Prints number of products',
                tags: ['api']
            }
        },
        {
            method: 'POST',
            path: '/login',
            handler: function (request, h) {
                //   return validate({},request.payload.username, request.payload.password)
            }
        }
    ];
    return routes;
}();
