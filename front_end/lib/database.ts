const mysql = require("mysql");

const banco = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'backend'
    }
);

export default banco;
