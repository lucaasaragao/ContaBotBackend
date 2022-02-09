import dotenv from "dotenv"
dotenv.config()

import "reflect-metadata"
import "express-async-errors"
import App from "app"
import "./database"
import "./shared/container"

App.http.listen(process.env.HTTP_PORT, () => console.log(`HTTP :: http://${process.env.SERVER_HOST + ':' + process.env.HTTP_PORT}`))
App.https.listen(process.env.HTTPS_PORT, () => console.log(`HTTPS :: http://${process.env.SERVER_HOST + ':' + process.env.HTTPS_PORT}`))
