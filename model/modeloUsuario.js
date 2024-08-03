const db = require("../model/database");

class modeloUsuario{
    constructor(){};

    //Traer los barberos para que el cliente seleccione uno
    getBarberos(callback){
        const sql = "SELECT * FROM usuarios WHERE rol_id = ?";
        db.query(sql, [2], (err, results)=>{
            if(err){
                console.error("Error", err);
                callback(new Error("Error en el servidor"),null);
                return;
            }
            if(results.length === 0){
                callback(new Error("No hay barberos"),null);
                return;
            }

            const barberos = results;
            callback(null, barberos);

        })
    }


        //Traer los barberos para que el cliente seleccione uno
    getBarberos(callback){
        const sql = "SELECT * FROM usuarios WHERE rol_id = ?";
        db.query(sql, [2], (err, results)=>{
            if(err){
                console.error("Error", err);
                callback(new Error("Error en el servidor"),null);
                return;
            }
            if(results.length === 0){
                callback(new Error("No hay barberos"),null);
                return;
            }

            const barberos = results;
            callback(null, barberos);

        })
    }


    //Traer las citas disponibles por barbero
    getHorariosPoBarbero(barberoId,callback){
        const sql = "SELECT horarios.fecha, horarios.horario_id FROM horarios JOIN usuarios ON horarios.barbero_id = usuarios.usuario_id WHERE usuarios.usuario_id = ? AND horarios.status = '0'";
        db.query(sql, [barberoId], (err, results)=>{
            if(err){
                console.error("Error", err);
                callback(new Error("Error en el servidor"),null);
                return;
            }
            if(results[0] === 0){
                callback(new Error("No hay horarios disponibles"),null);
                return;
            }

            const horarios = results;
            callback(null, horarios);

        })
    }





    //Agendar cita por usuario
    postAgendarCita(usuario_id, barbero_id, horario_id, callback){

        const sql = "SELECT citas.cita_id FROM citas JOIN usuarios ON citas.usuario_id = usuarios.usuario_id join horarios on citas.horario_id = horarios.horario_id WHERE usuarios.usuario_id = ? AND horarios.status = '1'";
        db.query(sql, [usuario_id], (err, results)=>{
            if(err){
                callback(new Error("Error al agendar cita"), null);
                return;
            }
            console.log(results.length);
            if(results.length === 0){
                const sql = "INSERT INTO citas (usuario_id, barbero_id, horario_id) VALUES (?, ?, ?)";
                db.query(sql, [usuario_id, barbero_id, horario_id], (err, results)=>{
                    if(err){
                        callback(new Error("Error al agendar cita"), null);
                        return;
                    }

                    // Actualizar estado del horario
                    const updateSql = "UPDATE horarios SET status = '1' WHERE horario_id = ?";
                    db.query(updateSql, [horario_id], (err, results) => {
                        if (err) {
                            callback(new Error("Error al actualizar el estado del horario"), null);
                            return;
                        }
                        callback(null, results);
                    });

                })
            }else{
                callback(new Error("Limite de citas excedido"), null);
                return;
            }
        })

            

        
    }

}



module.exports = modeloUsuario;