import { CustomerOrderModel } from '../../connection/connection';
import { TestFunctions } from '../../tests/data/repositories/testFunctions';
import { String, StringBuilder } from 'typescript-string-operations';

export class BaseRepository {
    tName: any;
    tableName: any;
    results = [];
    dbInstance = null;
    getDbInstance(dbInstance) {
        this.tableName = new CustomerOrderModel({ tableName: dbInstance })
    }

    findAll() {
        return new Promise((resolve, reject) => {
            return this.tableName.find('all', (err, rows, fields) => {
                if (err) throw err;
                resolve(rows);
            })
        })
    }

    findOne(id: number) {
        return new Promise((resolve, reject) => {
            return this.tableName.find('first', { where: 'id = "' + id + '"' }, (err, rows, fields) => {
                if (err) {
                    console.log('findone erroe', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    getCount() {
        return new Promise((resolve, reject) => {
            return this.tableName.find('count', (err, result) => {
                if (err) {
                    console.log('count product err', err);
                    reject(err);
                } else {
                    resolve(result)
                }
            })
        })
    }

    executequery(query) {
        return new Promise((resolve, reject) => {
            return this.tableName.query(query, (err, results) => {
                if (err) {
                    console.log('execute query error', err);
                    reject(err);
                } else {
                    resolve(results)
                }
            })
        })
    }

    calculate(x, y) {
        const testFunctions = new TestFunctions();
        return new Promise((resolve, reject) => {
            testFunctions.addTwoNumbers(x, y).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}