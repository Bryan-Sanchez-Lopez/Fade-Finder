const modeloUsuario = require("../model/modeloUsuario");

const model = new modeloUsuario();

exports.getBarberos = (req, res) =>{
    model.getBarberos((err, barberos)=>{
        if(err){
            if(err.message === "No hay barberos"){
                res.status(404).send("No hay barberos");
            }
            else if(err.message === "Error en el servidor"){
                res.status(500).send("Error en el servidor");
            }
            return;
        }
        res.status(201).send(barberos);
    })
}

exports.getHorariosPorBarbero = (req, res)=>{
    barberoId = req.params.barberoId;
    model.getHorariosPoBarbero(barberoId, (err, horarios)=>{
        if(err){
            if(err.message === "Error en el servidor"){
                res.status(500);
            }
            else if(err.message === "No hay horarios disponibles"){
                res.status(404);
            }
            return;
        }

        res.status(201).send(horarios);
    })
}

exports.postAgendarCita = (req, res)=>{
    model.postAgendarCita(req.body.usuario_id, req.body.barbero_id, req.body.horario_id,(err, results)=>{
        if(err){
            if(err.message === "Limite de citas excedido"){
                console.log("Excesos");
                res.status(501).send("Limite de citas excedido");
            }
            if(err.message === "Error al actualizar el estado del horario"){
                res.status(500).send( "Error a agendar cita");
            }
            if(err.message === "Error al agendar cita"){
                res.status(500).send("Error al agendar cita");
            }
            return;
        }

        res.status(201).send("Cita agendada con exito");
    })
}