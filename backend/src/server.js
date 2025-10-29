
import bodyParser from 'body-parser';
import express from 'express'
// import { mapOrder } from '~/utils/sorts.js'
// import { CONNECT_DB } from './config/mongodb'
// import API_V1 from "~/routes/v1/index"
import cors from 'cors'
import { errorHandlingMiddleware } from './middlewares/handleError.js'
const START_SERVER = () => {

  const app = express()
  app.use(bodyParser.json());
  const corsOption = {
    credentials: true,
    origin: ['http://localhost:4200']
  }
  app.use(cors(corsOption));
  const hostname = 'localhost'
  const port = 8017
  // app.use('/v1', API_V1)
  //  xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)
  // app.get('/', (req, res) => {
  //   // Test Absolute import mapOrder
  //   console.log(mapOrder(
  //     [ { id: 'id-1', name: 'One' },
  //       { id: 'id-2', name: 'Two' },
  //       { id: 'id-3', name: 'Three' },
  //       { id: 'id-4', name: 'Four' },
  //       { id: 'id-5', name: 'Five' } ],
  //     ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'],
  //     'id'
  //   ))
  //   res.end('<h1>Hello World!</h1><hr>')
  // })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(` I am running ok   ${hostname}:${port}/`)
  })
}
START_SERVER()
// CONNECT_DB().then(
//   console.log("conectDB"),
//   START_SERVER()
// ).catch(error => {
//   console.error(error)
//   process.exit(0)
// }
// )

