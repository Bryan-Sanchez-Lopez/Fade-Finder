const db = require("../model/database");

class modeloGeneral{

    constructor(){};


    registrarUsuario(nombre, telefono, email, password, callback){
        const sql = "INSERT INTO usuarios (nombre, telefono, email, password, status, rol_id) VALUES(?, ?, ?, ?, '1', 1)";
        db.query(sql, [nombre, telefono, email, password],(err, results) =>{
            if(err){
                console.log("Error al agregar usuario");
                callback(err, null);
                return;
            }else{
                callback(null, results);
            }
        });
    }

    login(email, password, callback){
        const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
        db.query(sql, [email, password], (err, results)=>{
            if(err){
                console.error("Error", err);
                callback(new Error("Error en el servidor"), null);
                return;
            }

            if (results.length === 0) {
                callback(new Error("Credenciales invalidas"), null)
                return;
            }

            const user = results[0];

            callback(null, user);
        })
    }


}


module.exports = modeloGeneral;