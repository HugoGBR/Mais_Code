const mysql = require("mysql");

const banco = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mais_code'
    }
);

export default banco;
