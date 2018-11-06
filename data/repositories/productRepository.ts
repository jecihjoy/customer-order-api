import { BaseRepository } from "./baseReposity";
import { SqlGenerator } from "../sqlGenerator/slqGenerator";
import { pool } from '../../connection/dbConnection';
import * as _ from 'lodash';

const qeurygenerator = new SqlGenerator();

export class ProductRepository extends BaseRepository {
    tName = "tbl_products";
    tColumns = ['product_name', 'product_price']

    constructor() {
        super()
        this.getDbInstance(this.tName)
    }

    createProducts(products) {
        let payload = products;
        let values = []
        let columns = Object.keys(payload[0]);
        console.log(Object.keys(payload[0]));
        payload.forEach((data) => {
            let value = []
            columns.forEach((col) => {
                value.push(data[col]);
            })
            values.push(value);
        })

        return new Promise((resolve, reject) => {
            let insertQuery = qeurygenerator.generateInsert(this.tName, this.tColumns);
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

    updateProducts(products) {
        return new Promise((resolve, reject) => {
            let values = []
            let columns = Object.keys(products[0]);
            products.forEach((data) => {
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
                        console.log('product insert err', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
    }
   
    deleteProduct(id: number) {
        return new Promise((resolve, reject) => {
            let q = qeurygenerator.generateDeleteQuery(this.tName);
            pool.query(q, id, (err, results, fields) => {
                if (err) {
                    console.log('product delete err', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }
}