const db = require("../model/database");

class modeloBarbero{

    constructor(){};

    getCitas(idBarbero, callback){
        
        const sql = "SELECT citas.cita_id, horarios.horario_id, cliente.nombre AS cliente_nombre, barbero.nombre AS barbero_nombre, horarios.fecha FROM citas JOIN usuarios AS cliente ON citas.usuario_id = cliente.usuario_id JOIN usuarios AS barbero ON citas.barbero_id = barbero.usuario_id JOIN horarios ON citas.horario_id = horarios.horario_id WHERE citas.barbero_id = ?";

        db.query(sql, [idBarbero], (err, results)=>{
            if(err){
                callback(new Error("Error en el servidor"), null);
                console.log(err);
                
                return;
            }
            if(results.length === 0){
                callback(null, results);
                return;
            }
            callback(null, results);
        })
    }

    accionCita(idCita, idBarbero, idHorario, callback){
        console.log(idCita, idBarbero, idHorario);
        
        const sql = "DELETE FROM citas WHERE cita_id = ?";
        db.query(sql, [idCita], (err, results)=>{
            if(err){
                callback(new Error("Error en el servidor"), null);
                return;
            }
            const update = "UPDATE horarios SET status = '0' WHERE horario_id = ? AND barbero_id = ?";
            db.query(update, [idHorario, idBarbero], (err, results)=>{
                if(err){
                    callback(new Error("Error en el servidor"), null);
                    return;
                }
            })
            callback(null, results);
        })
    }

}


module.exports = modeloBarbero;