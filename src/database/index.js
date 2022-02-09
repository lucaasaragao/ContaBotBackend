import { createConnection, getConnectionOptions } from "typeorm"

getConnectionOptions().then(async options => {
  createConnection(options).then(async connection => {
    console.log(`DB :: ${process.env.MONGODB_CONNECTION_STRING + process.env.MONGODB_DATABASE}`)
  })
})

