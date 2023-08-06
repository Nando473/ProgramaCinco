var Sequelize=require("sequelize");
var usuarioModelo=require("./modelos/usuarios");
require("dotenv").config(); //utilizar las variables de .env

var bd = process.env.DB_MYSQL;
var usuario = process.env.USUARIO_MYSQL;
var password = process.env.PASSWORD_MYSQL;
var host = process.env.HOST_MYSQL;
var port = process.env.PORT_MYSQL;

var conexion= new Sequelize(bd, usuario, password, {
    host: host,
    port: port,
    dialect: "mysql",
    dialectOptions:{
        ssl: {
            rejectUnauthorized: false,
          },
    }
});

conexion.sync({force:false})
.then(()=>{
    console.log("Conexion a MySQL de PlanetScale");
})
.catch((err)=>{
    console.log("Error al conectarse a MySQL de PlanetScale " +err);
    console.log("Intentar una conexión Local ");
    bd = process.env.DB_LOCAL;
    usuario = process.env.USUARIO_LOCAL;
    password = process.env.PASSWORD_LOCAL;
    host = process.env.HOST_LOCAL;
    port = process.env.PORT_LOCAL;
    conexion = new Sequelize(db, usuario, password, {
        host: host,
        port: port,
        dialect: "mysql",
      });
    conexion.sync({ force: false })
    .then(()=>{
        console.log("Conexion a MySQL Local ");
    })
    .catch((err)=>{
        console.log("Error al conectarse a MySQL Local " +err);
    });
});

var Usuario=usuarioModelo(conexion);

module.exports={
    Usuario:Usuario
};