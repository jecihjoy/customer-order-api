import * as mysqlModel from 'mysql-model';
const config = require('../config/config');

export const CustomerOrderModel  = mysqlModel.createConnection(config.database); 