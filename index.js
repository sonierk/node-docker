const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const port = process.env.PORT || 3000
const app = express()

const session = require('express-session')
let RedisStore = require('connect-redis').default
// const redis = require('redis')
const { createClient } = require('redis')

// const redisClient = redis.createClient({
//   host: REDIS_URL,
//   port: REDIS_PORT,
// })
// connetion to the redis server is done via the url otherwise thows error

const redisClient = createClient({ url: `redis://${REDIS_URL}:${REDIS_PORT}` })
redisClient.on("error", (err)=> console.log('Redis Client Error',err))
redisClient.connect();

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "blog-app:",
})

app.use(session({
  store: redisStore,
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    httpOnly: true,
    resave: false,
    saveUninitialized: true,
    maxAge: 120000,
  }
}))

app.use(express.json())

const connectWithRetry = ()=> {
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
  .then(() => console.log('Connected to DB!'))
  .catch((e)=>{
    console.log(e)
    setTimeout(connectWithRetry,5000)
  });
}
connectWithRetry()

app.get('/api/v1', (req, res)=>{
    res.send('<h2>Hi !!!</h2>')
})
//localhost:3000/api/v1/posts
app.use('/api/v1/posts', require('./routes/postRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))

app.listen(port, ()=>console.log(`listening on port ${port}`))