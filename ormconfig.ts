import { ConnectionOptions } from "typeorm"

const connection: ConnectionOptions = {
   type: "mongodb",
   url: process.env.MONGODB_CONNECTION_STRING,
   database: process.env.MONGODB_DATABASE,
   useUnifiedTopology: true,
   useNewUrlParser: true,
   synchronize: false,
   logging: false,
   cache: false,
   entities: ["./src/modules/**/entities/*.ts"],
   migrations: ["./src/database/migrations/*.ts"],
   cli: {
      migrationsDir: "./src/database/migrations",
   }
}

export = connection