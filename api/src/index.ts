import express from "express";
import morgan from "morgan";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
const app = express();
const port = 8080

app.use(morgan("tiny"))
app.use(cors())
app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true
    })
);

app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${ port }` );
} );