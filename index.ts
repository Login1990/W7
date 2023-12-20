import express, {Express, NextFunction, Request, Response} from "express"
import router from "./routes/backend"
import cookieParser from "cookie-parser"

const app: Express = express()
const port: number = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/', router)


app.listen(port, () => {
    console.log("Server is running at localhost:"+port)
})

export default app;