// DEPENDENCIAS
//Router de URL (Get, Post, Put …) - express
var app = require('express')();
var responseTime = require('response-time') // response time for requests in HTTP servers.
var redis = require('redis');

//CREAR UN CLIENTE DE REDIS EN LA INSTANCIA CONFIGURADA EN UBUNTU
var client = redis.createClient();

// SI OCURRE UN ERROR SE IMPRIME EN CONSOLA
client.on('error', function (err) {
    console.log("Error " + err);
});

//CONFIGURAR EL PUERTO DE EXPRESS
app.set('port', (process.env.PORT || 5000));

// UTILIZAR EL TIEMPO DE RESPUESTA COMO MIDDLEWARE
app.use(responseTime());

//STORE DATA DESDE REDIS
/*client.hmset("alumnos","alumna1","dulce","alumno2","iris","alumno3","liliana",function(err,reply) {
    console.log(err);
    console.log(reply);
} );*/

//LEER CON LISTAS
app.get('/getList', function(req, res) {
       client.lrange('mylist','0','-1',function(err,reply){
        console.log(reply);
        console.log(err);
        res.json(reply);
    });
});

//LEER CON HASHES
app.get('/getHash', function(req, res) {
    client.hgetall('tareas',function(err,reply){
     console.log(reply);
     console.log(err);
     res.json(reply);
 });
});

//INSERTAR CON LISTAS
app.post('/insertList', function(req, res) {
    client.lpush('mylist',"angularjs","nodejs","go",function(err,reply) {
        console.log("ERROR",err);
        console.log("RESPUESTA",reply);
        res.json({"result":"dato recibido"});
       });
});

//INSERTAR CON HASHES
app.post('/insertHash/:hash/:tarea', function(req, res) {
    console.log(req.params.tarea);
    client.hmset('tareas',req.params.hash,req.params.tarea,function(err,reply) {
        console.log("ERROR",err);
        console.log("RESPUESTA",reply);
        res.json({"result":"dato recibido"});
       });
});

//BORRAR LISTA
app.delete('/deleteList', function(req, res) {
    client.del('mylist',function(err,reply) {
        if(!err) {
         if(reply === 1) {
          console.log("Key is deleted");
          res.json({"result":"llave borrada"});
         } else {
          console.log("Does't exists");
          res.json({"result":"la llave no existe"});
         }
        }
       });
});

//BORRAR HASHES
app.delete('/deleteHash/:hash', function(req, res) {
    client.hdel('tareas',req.params.hash,function(err,reply) {
        console.log(err);
        if(!err) {
         if(reply === 1) {
          console.log("Key is deleted");
          res.json({"result":"llave borrada"});
         } else {
          console.log("Does't exists");
          res.json({"result":"la llave no existe"});
         }
        }
       });
});



//LISTEN INICIAL NOS INDICA SI EL SERVIDOR DE EXPRESSESTA CORRIENDO
app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});