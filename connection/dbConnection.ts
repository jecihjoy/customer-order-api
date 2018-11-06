const config = require('../config/config');
import * as mysql from 'mysql';

export const pool = mysql.createPool(config.database)