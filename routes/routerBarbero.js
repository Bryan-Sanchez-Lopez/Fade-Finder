const express = require("express");
const router = express.Router();
const path = require("path");
const controladorBarbero = require("../controller/controladorBarbero");


router.get("/home", (req, res)=>{
    res.sendFile(path.join(__dirname, "../", "views", "homeBarbero.html"));
})

router.get("/getCitas/:idBarbero", controladorBarbero.getCitas);
router.post("/accionCita", controladorBarbero.accionCita);






module.exports = router;   