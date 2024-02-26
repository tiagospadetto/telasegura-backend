import express from 'express';
import cors from 'cors'
import http from 'http';
import {Server} from 'socket.io';
import {CORS_ORIGIN} from './config/constants.js';
import conectaNaDatabase from './config/dbConect.js';

const conexao = await conectaNaDatabase();

const app = express();


app.use(cors());
app.disable('x-powered-by');



const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: CORS_ORIGIN,
  },
});


export {serverHttp, io};
