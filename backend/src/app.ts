import { initializeControllers, registerControllers } from "@lib/ControllerRegistry";
import express, { Router } from "express";
import UserController from "./users/UserController";
import ProductRouter from "./product/ProductRouter";


import helmet from "helmet";
import compress from 'compression';
import cors from "cors";
import cookieParser from "cookie-parser";
import { requestLogger } from "@lib/Logger";
import { createLogger } from "winston";
import { wrapAsyncControllers } from "@lib/AsyncController";
import path from "path";


const app = express()
const router = Router();
const logger = createLogger();


app.use(requestLogger(logger));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());
app.use(cors());

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

wrapAsyncControllers(router)
registerControllers([
    UserController
]);
initializeControllers(router)

router.use(ProductRouter)
app.use(router);

export default app;
