const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');
const port = process.env.PORT || 3000
const app = express()
require('dotenv').config()

const connectWithRetry = ()=> {
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
  .then(() => console.log('Connected to DB!'))
  .catch((e)=>{
    console.log(e)
    setTimeout(connectWithRetry,5000)
  });
}
connectWithRetry()
app.use(express.urlencoded())
app.use(express.json())



app.get('/', (req, res)=>{
    res.send('<h2>Hi !!!</h2>')
})
//localhost:3000/api/v1/posts
app.use('/api/v1/posts', require('./routes/postRoutes'))

app.listen(port, ()=>console.log(`listening on port ${port}`))



