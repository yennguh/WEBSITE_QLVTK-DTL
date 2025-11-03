
import bodyParser from 'body-parser';
import express from 'express'
import { CONNECT_DB } from './config/mongodb.js'
import cors from 'cors'
import { errorHandlingMiddleware } from './middlewares/handleError.js'
import API from "./routes/index.js"
import { setupSwagger } from './config/swagger.js'
const START_SERVER = () => {
  const app = express()
  app.use(bodyParser.json());
  const corsOption = {
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:3000']
  }
  app.use(cors(corsOption));
  setupSwagger(app);
  const hostname = 'localhost'
  const port = 8017
  app.use('/v1', API)
  app.use(errorHandlingMiddleware)
  app.listen(port, hostname, () => {
    console.log(` I am running ok   ${hostname}:${port}/`)
  })
}
CONNECT_DB().then(
  console.log("conectDB"),
  START_SERVER()
).catch(error => {
  console.error(error)
  process.exit(0)
}
)

