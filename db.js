
const util = require('util');
var mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password:"1234",
    database: 'MRPT'
});
 
pool.getConnection((err, connection)=>{
    if (err) throw err ;
    else
    console.log("DB Connected to my sql"); 
    if (connection)
    connection.release() ;
    return;
});

  pool.query = util.promisify(pool.query);
  module.exports=pool ;
