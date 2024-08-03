const modeloBarbero = require("../model/modeloBarbero");

const model = new modeloBarbero();

exports.getCitas = (req, res)=>{

    model.getCitas(req.params.idBarbero, (err, citas)=>{
        if(err){
            if(err.message === "Error en el servidor"){
                res.status(500).send("Error en el servidor");
            }
            return;
        }

        res.status(201).send(citas);
    })
}

exports.accionCita = (req, res)=>{
    console.log(req.body.idCita, req.body.idBarbero, req.body.idHorario);

    model.accionCita(req.body.idCita, req.body.idBarbero, req.body.idHorario, (err, results)=>{
        if(err){
            res.status(500).send("Error en el servidor");
        }

        res.status(201).send("Accion exitosa");
    })
}