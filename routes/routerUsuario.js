const express = require("express");
const path = require("path");   
const router = express.Router();
const controladorUsuario = require("../controller/controladorUsuario");


router.get("/home", (req, res)=>{
    res.sendFile(path.join(__dirname, "../","views","homeUsuario.html"));
});

router.get("/home2", (req, res)=>{
    res.sendFile(path.join(__dirname, "../","views","homeBarbero.html"));
});

router.get("/getBarberos", controladorUsuario.getBarberos);
router.get("/getHorariosDisponibles/:barberoId", controladorUsuario.getHorariosPorBarbero);
router.post("/agendarCita", controladorUsuario.postAgendarCita);



module.exports = router;
