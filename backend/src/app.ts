import express, { Request, Response } from "express";
require("./services/passport");
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use("/auth/github", authRouter);

export default app;
