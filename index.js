var express = require('express');

const app = express();
const PORT = 3000;
const routes = require('./src/routes/crmRoutes')

// app.use(function(req, res, next)=>{
//     console.log('Time', Date.now())
// })

app.get('/', function(req,res,next){
    console.log('Request method is: ',req.method)
    next()
}, function(req,res,next){
    console.log("Ori", req.originalUrl);
    next()
}, function(req,res,next){
    res.send("Success")
})

app.listen(PORT, ()=>{
    console.log(`Node and Express is running on port: ${PORT}`)
})