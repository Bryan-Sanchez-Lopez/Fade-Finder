const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ByV12@bx2",
    database: "fadeFinder"
});

connection.connect((err)=>{
    if(err){
        console.log("Error al conectarse");
        return;
    }else{
        console.log("Estamos dentro");
    }
});


module.exports = connection;