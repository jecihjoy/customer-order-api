import { BaseRepository } from "./baseReposity";
import { SqlGenerator } from '../sqlGenerator/slqGenerator';
import { pool } from '../../connection/dbConnection';
import { OrderRepository } from "./orderRepository";

const qeurygenerator = new SqlGenerator();


export class OrderItemRepository extends BaseRepository {
    tName = "tbl_orders_details";
    tColumns = ['order_id', 'customer_id', 'item_id', 'item_quantity']

    constructor() {
        super()
        this.getDbInstance('tbl_order')
    }

    saveOrderDetails(data) {
        const orderRepo = new OrderRepository()
        return new Promise((resolve, reject) => {
            let values = [];
            orderRepo.createOrders(data).then((res) => {
                data.Products.forEach(element => {
                    let value = []
                    value.push(res);
                    value.push(data.CustomerId);
                    value.push(element.ProductId);
                    value.push(element.ProductQuantity);
                    values.push(value);
                    console.log(values);
                    console.log('date', data.OrderDate);
                });
                let insertQuery = qeurygenerator.generateInsert(this.tName, this.tColumns);
                pool.query(insertQuery, [values], (err, results, fields) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(results)
                    }
                })

            })

        })
    }

    getAllOrders() {
        let query = "SELECT " +
            "tbl_customers.customer_name AS CustomerName " +
            ", tbl_customers.customer_phone AS CustomerPhone " +
            ", tbl_customers.id AS CustomerId " +
            ", tbl_orders.orderDate AS OrderDate " +
            ", tbl_orders.id AS OrderId " +
            ", tbl_orders_details.customer_id AS OrderCustomerId " +
            ", tbl_orders_details.item_id AS OrderItemId " +
            ", tbl_orders_details.item_quantity AS ItemQuantity " +
            ", tbl_orders_details.order_id AS OderDetailsId " +
            ", tbl_products.id AS ProductId " +
            ", tbl_products.product_name AS ProductName " +
            ", tbl_products.product_price As ProductPrice " +

            "FROM " +
            "customer_order.tbl_orders_details " +
            "INNER JOIN customer_order.tbl_customers " +
            "   ON (tbl_orders_details.customer_id = tbl_customers.id) " +
            "INNER JOIN customer_order.tbl_products " +
            "    ON (tbl_orders_details.item_id = tbl_products.id) " +
            "INNER JOIN customer_order.tbl_orders " +
            "    ON (tbl_orders_details.order_id = tbl_orders.id)";
        return new Promise((resolve, reject) => {
            return this.tableName.query(query, (err, results) => {
                if (err) {
                    console.log('return all data error', err);
                    reject(err);
                } else {
                    resolve(results)
                }
            })
        })
    }

    getByOrderId(searchParam) { //phoneNumber/orderId/customerId
        let query = "SELECT " +
            "tbl_customers.customer_name AS CustomerName " +
            ", tbl_customers.customer_phone AS CustomerPhone " +
            ", tbl_customers.id AS CustomerId " +
            ", tbl_orders.orderDate AS OrderDate " +
            ", tbl_orders.id AS OrderId " +
            ", tbl_orders_details.customer_id AS OrderCustomerId " +
            ", tbl_orders_details.item_id AS OrderItemId " +
            ", tbl_orders_details.item_quantity AS ItemQuantity " +
            ", tbl_orders_details.order_id AS OderDetailsId " +
            ", tbl_products.id AS ProductId " +
            ", tbl_products.product_name AS ProductName " +
            ", tbl_products.product_price As ProductPrice " +

            "FROM " +
            "customer_order.tbl_orders_details " +
            "INNER JOIN customer_order.tbl_customers " +
            "   ON (tbl_orders_details.customer_id = tbl_customers.id) " +
            "INNER JOIN customer_order.tbl_products " +
            "    ON (tbl_orders_details.item_id = tbl_products.id) " +
            "INNER JOIN customer_order.tbl_orders " +
            "    ON (tbl_orders_details.order_id = tbl_orders.id) " +
            "WHERE tbl_orders_details.order_id = " + searchParam + " "; 
        return new Promise((resolve, reject) => {
            return this.tableName.query(query, (err, results) => {
                if (err) {
                    console.log('get Order By ID  error', err);
                    reject(err);
                } else {
                    resolve(results)
                }
            })
        })


    }

    deleteOrderProduct(orderId, productId) {
        let deleteQuerry = "DELETE FROM tbl_orders_details WHERE tbl_orders_details.order_id = " + orderId + "  " +
            "AND tbl_orders_details.item_id = " + productId + "";
        return new Promise((resolve, reject) => {
            let promises = [];
            promises.push(this.executequery(deleteQuerry));
            Promise.all(promises).then((res) => {
                resolve(res);
            })
                .catch((err) => {
                    reject(err);
                })
        })

    }

    updateOrdeProducts(order, orderId) {
        return new Promise((resolve, reject) => {
            let promises = [];
            order.Products.forEach(product => {
                let updateQuery = "UPDATE tbl_orders_details SET item_quantity = " + product.ProductQuantity + "  " +
                    "WHERE item_id  = " + product.ProductId + " AND order_id = " + orderId + "";
                promises.push(this.executequery(updateQuery));
            });
            Promise.all(promises).then((success) => {
                resolve(success);
            }).catch((err) => {
                console.log('update customers err', err);
                reject(err);
            });
        });
    }

    topCustomerByTransaction() {
        let query = "SELECT order_id as OrderId, c.id as CustomerId, COUNT(c.id) as NumberOfTransactions, customer_name as CustommerName, customer_phone as CustomerPhone" +
            " FROM ( SELECT DISTINCT order_id, c.id, customer_name, customer_phone" +
            " FROM tbl_orders_details, tbl_customers As c" +
            " WHERE tbl_orders_details.customer_id = c.id) as c" +
            " GROUP BY c.id ORDER BY c.id DESC LIMIT 1";
        return new Promise((resolve, reject) => {
            return this.tableName.query(query, (err, results) => {
                if (err) {
                    console.log('customer by transaction error', err);
                    reject(err);
                } else {
                    resolve(results)
                }
            })
        })
    }

    customerTransactions(customerPhone) {
        let query = "SELECT " +
            "tbl_customers.customer_name AS CustomerName " +
            ", tbl_customers.customer_phone AS CustomerPhone " +
            ", tbl_customers.id AS CustomerId " +
            ", tbl_orders.orderDate AS OrderDate " +
            ", tbl_orders.id AS OrderId " +
            ", tbl_orders_details.customer_id AS OrderCustomerId " +
            ", tbl_orders_details.item_id AS OrderItemId " +
            ", tbl_orders_details.item_quantity AS ItemQuantity " +
            ", tbl_orders_details.order_id AS OderDetailsId " +
            ", tbl_products.id AS ProductId " +
            ", tbl_products.product_name AS ProductName " +
            ", tbl_products.product_price As ProductPrice " +

            "FROM " +
            "customer_order.tbl_orders_details " +
            "INNER JOIN customer_order.tbl_customers " +
            "   ON (tbl_orders_details.customer_id = tbl_customers.id) " +
            "INNER JOIN customer_order.tbl_products " +
            "    ON (tbl_orders_details.item_id = tbl_products.id) " +
            "INNER JOIN customer_order.tbl_orders " +
            "    ON (tbl_orders_details.order_id = tbl_orders.id) " +
            "WHERE  customer_phone = " + customerPhone + " " +
            "OR tbl_orders_details.customer_id = " + customerPhone + "  " +
            "OR tbl_orders.orderDate  = " + customerPhone + " ";
        return new Promise((resolve, reject) => {
            return this.tableName.query(query, (err, results) => {
                if (err) {
                    console.log('transaction by customer error', err);
                    reject(err);
                } else {
                    resolve(results)
                }
            })
        })
    }

}