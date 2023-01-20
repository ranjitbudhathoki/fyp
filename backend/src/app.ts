import express, { Request, Response } from "express";
require("./services/passport");
import authRouter from "./routes/auth.routes";
import passport from "passport";
import checkLoggedIn from "./utils/checkLoggedIn";
import cookieSession from "cookie-session";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http:localhost:3000",
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "cookie",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY as string],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/", authRouter);

export default app;
