var mysql = require('mysql');

//Wrapper
function createDBConnection() {
    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'banco_cdc_mysql'
        });
    }

    if (process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'banco_cdc_mysql_test'
        });
    }

}

module.exports = function () {
    return createDBConnection;
}
