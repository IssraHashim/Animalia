import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'

const app = express()

const startServer = async() => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

    app.use((req,res,next) => {
      console.log(`🚨 incoming request ${req.method} = ${req.url}`)
      next()
    })
  
    app.use(express.json())
    
    app.use('/api', router)
  
    app.listen(port, () => console.log(`🏃🏻‍♀️ Express is up and running on port ${port}`))

  } catch (err) {
    console.log(err)
  }
}
startServer()


