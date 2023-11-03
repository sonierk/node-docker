const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');
require('dotenv').config()

const app = express()

const connectWithRetry = ()=> {
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
  .then(() => console.log('Connected to DB!'))
  .catch((e)=>{
    console.log(e)
    setTimeout(connectWithRetry,5000)
  });

}



const port = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send('<h2>Hi !!!</h2>')
})

app.listen(port, ()=>console.log(`listening on port ${port}`))



