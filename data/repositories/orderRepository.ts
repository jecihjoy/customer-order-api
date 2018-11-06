import { BaseRepository } from "./baseReposity";
import { SqlGenerator } from "../sqlGenerator/slqGenerator";
import { pool } from '../../connection/dbConnection';
import * as _ from 'lodash';

const qeurygenerator = new SqlGenerator();

export class OrderRepository extends BaseRepository {
    tName = "tbl_orders";
    tColumns = ['orderDate']

    constructor() {
        super()
        this.getDbInstance(this.tName)
    }

    createOrders(order) {
        let values = []
            let value = []
            value.push(order.OrderDate);
            values.push(value);

        return new Promise((resolve, reject) => {
            let insertQuery = qeurygenerator.generateInsert(this.tName, this.tColumns);
            pool.query(insertQuery, [values], (err, results, fields) => {
                if (err) {
                    console.log('order insert err', err);
                    reject(err);
                } else {
                    resolve(results.insertId);
                }

            });
        });
    }
   
    deleteOrder(id: number) {
        return new Promise((resolve, reject) => {
            let deleteQ = qeurygenerator.generateDeleteQuery(this.tName);
            pool.query(deleteQ, id, (err, results, fields) => {
                if (err) {
                    console.log('order delete err', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }
}