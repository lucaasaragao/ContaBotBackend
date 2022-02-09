import express from "express"
import fs from "fs"
import http from "http"
import https from "https"
import morgan from "morgan"
import cors from "cors"
import path from "app-root-path"
import cookieParser from "cookie-parser"

import handleExceptions from "./middlewares/handleExceptions"
import { appRoutes } from "./routes"
class App {
  private express: express.Application
  public http: http.Server
  public https: https.Server

  constructor() {
    this.express = express()
    this.setup()
    this.middlewares()
    this.routes()
    this.exceptionsMiddlewares()
  }

  private setup() {
    this.express.use(cookieParser())
    this.express.use(express.json({ limit: '50mb' }))
    this.express.use(cors({ origin: true }))
    this.http = http.createServer(this.express)
    this.https = https.createServer({ key: fs.readFileSync(path.path + "/src/shared/archives/ssl/key.pem"), cert: fs.readFileSync(path.path + "/src/shared/archives/ssl/cert.pem") }, this.express)
  }

  private middlewares() {
    this.express.use(morgan("dev"))
  }

  private routes() {
    this.express.use("/v1", appRoutes)
  }

  private exceptionsMiddlewares() {
    this.express.use(handleExceptions)
  }
}

export default new App()