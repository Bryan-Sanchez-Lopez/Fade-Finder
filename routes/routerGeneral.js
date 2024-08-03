const express = require("express");
const router = express.Router();
const path = require("path");
const controladorGeneral = require("../controller/controladorGeneral");

router.get("/register", (req, res)=>{
    res.sendFile(path.join(__dirname, "../", "views", "register.html"))
})

router.get("/login", (req, res)=>{
    res.sendFile(path.join(__dirname, "../", "views", "login.html"))
})


router.post("/register", controladorGeneral.registrarUsuario);
router.post("/login", controladorGeneral.login);


module.exports = router;