import express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './configs/viewEngine'
import initWebRouter from './routers/web'
import initAPIRouter from './routers/api'
import * as dotenv from 'dotenv'
import connection from './configs/connectdb'
import cors from 'cors'
dotenv.config()


const app = express()
app.use(cors({ credentials: true, origin: true }))
const port = process.env.PORT || 6969

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

//setup view
configViewEngine(app)
// setup router
initWebRouter(app)

initAPIRouter(app)
connection()

app.listen(port, () => {
    return console.log("server running on port: ", port)
})