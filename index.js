var express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3001;
const routes = require('./src/routes/crmRoutes');
const mongoose = require('mongoose');

// app.use(function(req, res, next)=>{
//     console.log('Time', Date.now())
// })

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const SPUserSchema = require('./src/models/crmModel')
const spUserModel = mongoose.model('spUser', SPUserSchema)

app.post('/newSPUser', (req,res)=>{
    let spUser = new spUserModel(req.body)
    spUser.save((err, spUserModel)=>{
        if(err){
            res.send(err)
        }
        res.json(spUser)
    })
})

let getAllSPUsers = (req,res)=>{
    spUserModel.find({}, (err,spUsers)=>{
        if(err){
            res.send(err)
        }else{
            res.json(spUsers)
        }
    })
}

let getSPUserByID = (req,res)=>{
    spUserModel.findById((req.params.spUserId), (err, spUser)=>{
        if(err){
            res.send(err)
        }else {
            res.json(spUser)
        }
    })
}

let updateSPUser = (req, res)=>{
    spUserModel.findOneAndUpdate({_id: req.params.spUserId}, req.body, {new:true}, (err, updatedSPUser)=>{
        if(err){
            res.send(err)
        }else {
            res.json(updatedSPUser)
        }
    })
}

let deleteSPUser = (req,res)=>{
    spUserModel.deleteOne({_id: req.params.spUserId}, (err) =>{
        if(err){
            res.send(err)
        }else {
            res.json({message: 'spUser deleted yay'})
        }
    })
}

app.put('/spUser/:spUserId', updateSPUser)

app.get('/getSPUsers', getAllSPUsers)

app.get('/spUser/:spUserId', getSPUserByID)

app.delete('/spUser/:spUserId', deleteSPUser)

app.listen(PORT, ()=>{
    console.log(`Node and Express is running on port: ${PORT}`)
})