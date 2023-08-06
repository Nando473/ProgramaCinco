var express=require("express");
var usuariosRuta=require("./rutas/usuarios");

var app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use("/", usuariosRuta);

var port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Servidor en http://localhost:${port}`);
    //console.log("Servidor en http://localhost:"+port);
});