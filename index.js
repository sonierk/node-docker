const express = require('express')
const mongoose = require('mongoose');

const app = express()

mongoose.connect('mongodb://sanjeev:mypassword@mongo:27017/?authSource=admin')
  .then(() => console.log('Connected to DB!'))
  .catch((e)=>console.log(e));


const port = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send('<h2>Hi All!!!</h2>')
})

app.listen(port, ()=>console.log(`listening on port ${port}`))



