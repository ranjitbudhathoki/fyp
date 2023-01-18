import http from 'http';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'})
import {app} from "./app"

const server = http.createServer(app);

server.listen(process.env.PORT|| 8000,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})