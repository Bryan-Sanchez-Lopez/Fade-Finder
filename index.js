const express = require("express");
const bodyParser = require("body-parser");

const server = express();
server.use(bodyParser.json());
const path = require("path");

//////   Declaramos una carpeta estatica para los recursos como imagenes  /////
server.use("/public", express.static(path.join(__dirname, 'public')));



//////////  Declaracion de los manejadores de rutas (routers)  /////////////
const routerGeneral = require("./routes/routerGeneral");
const routerUsuario = require("./routes/routerUsuario");
const routerBarbero = require("./routes/routerBarbero");



////   Recibe las rutas generales y las envia al controlador routerGeneral  ////
server.use("/general", routerGeneral);
server.use("/usuario", routerUsuario);
server.use("/barbero", routerBarbero);



server.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "views", "landingPage.html"));
});







const port = 3000;
server.listen(port, ()=>{
    console.log("Server escuchando");
})