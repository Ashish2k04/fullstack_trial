const express = require('express');
const userModel = require('./models/user.model');
const dns = require('dns');
const cors = require('cors');
const path = require('path');

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

console.log(__dirname, '..' , '/public')

app.post('/api/users', async (req,res)=>{

    await userModel.create({
        name: req.body.name,
        age: req.body.age
    })
 
    res.status(201).json({
        message: "User created...",
    })

})

app.get('/api/users', async (req,res)=>{
    const userFetched = await userModel.find()
 
    res.status(200).json({
        message: "User fetched...",
        userFetched
    })

})

app.patch('/api/users/:id', async (req,res)=>{
    const userID = req.params.id

    const {name, age} = req.body

    await userModel.findByIdAndUpdate(userID, {name, age});
 
    res.status(200).json({
        message: "User updated...",
    })

})

app.delete('/api/users/:id', async (req,res)=>{
    const userID = await req.params.id

    await userModel.findByIdAndDelete(userID);
 
    res.status(200).json({
        message: "User deleted...",
    })

})

app.use('*name', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', '/public/index.html'));
})

module.exports = app;