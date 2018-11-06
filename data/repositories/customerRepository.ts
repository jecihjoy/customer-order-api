import { BaseRepository } from '../repositories/baseReposity';
import { pool } from '../../connection/dbConnection';
import { SqlGenerator } from '../sqlGenerator/slqGenerator';

const qeurygenerator = new SqlGenerator();
export class CustomerRepository extends BaseRepository {
    tName = "tbl_customers";
    tColumns = ['customer_name', 'customer_phone'];

    constructor() {
        super()
        this.getDbInstance(this.tName)
    }

    createCustomers(customers) {
        return new Promise((resolve, reject) => {
            let values = []
            let columns = Object.keys(customers[0]);
            customers.forEach((data) => {
                let value = []
                columns.forEach((col) => {
                    value.push(data[col]);
                })
                values.push(value);
            })
            console.log(values);
            let insertQuery = qeurygenerator.generateInsert(this.tName, this.tColumns)
            pool.query(insertQuery, [values], (err, results, fields) => {
                if (err) {
                    console.log('p insert err', err);
                    reject(err);
                } else {
                    resolve(results);
                }

            });
        });
    }

    updateCustomers(customers) {
        return new Promise((resolve, reject) => {
            let values = []
            let columns = Object.keys(customers[0]);
            customers.forEach((data) => {
                let value = []
                columns.forEach((col) => {
                    value.push(data[col]);
                })
                values.push(value);

            })
            values.forEach(value => {
                value.push(value[0]);
                value.shift();
                let updateElement = qeurygenerator.generateUpdateQuery(this.tName, this.tColumns);
                pool.query(updateElement, value, (err, results, fields) => {
                    if (err) {
                        console.log('customer insert err', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
    }

    deleteCustomer(id: number) {
        return new Promise((resolve, reject) => {
            let q = qeurygenerator.generateDeleteQuery(this.tName);
            pool.query(q, id, (err, results, fields) => {
                if (err) {
                    console.log('customer delete err', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }

}