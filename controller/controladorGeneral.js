const modeloGeneral = require("../model/modeloGeneral");

const model = new modeloGeneral();

exports.registrarUsuario = (req, res) =>{
    const {nombre, telefono, email, password} = req.body;

    model.registrarUsuario(nombre, telefono, email, password, (err, results)=>{
        if(err){
            res.status(500).send("Error al registrar usuario");
            return;
        }
        res.status(201).send("Usuario registrado correctamente");
    });
};


exports.login = (req, res) =>{
    const {email, password} = req.body;
    model.login(email, password, (err, user)=>{
        if(err){
            if(err.message === "Credenciales invalidas"){
                res.status(404).send("Credenciales invalidas");
            }
            else if(err.message === "Error en el servidor"){
                res.status(500).send("Error en el servidor");
            }
            return;
        }
        res.status(201).send(user);
    })
}