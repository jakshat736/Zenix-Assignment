var mysql=require('mysql')
var pools=mysql.createPool({

    host:'localhost',
    port:3306,
    user:'root',
    password:'2209',
    database:'discussion_forum',
    connectionLimit:100
})
module.exports = pools;