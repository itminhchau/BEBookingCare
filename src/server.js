import express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './configs/viewEngine'
import initWebRouter from './routers/web'
import * as dotenv from 'dotenv'
import connection from './configs/connectdb'
dotenv.config()


const app = express()
const port = process.env.PORT || 6969

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//setup view
configViewEngine(app)
// setup router
initWebRouter(app)

connection()

app.listen(port, () => {
    return console.log("server running on port: ", port)
})