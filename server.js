 const express = require ('express')
 const mysql = require ('mysql')
 const myconn = require ('express-myconnection')
 const { PORT, DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DB_USER } = require('./config.js');

 const routes = require ('./routes')
 const tarea = require('./routes_task');

//config
 const app = express()
 app.set('port', process.env.PORT || PORT)
 const dbOptions = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
 }

//middlewares
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
//routes
 app.get('/', (req, res)=>{
    res.send('Welcome to my API')
 })
 app.use('/api', routes)
 app.use('/tarea', tarea);

//server running
 app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'));
 })

