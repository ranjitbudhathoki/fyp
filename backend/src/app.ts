import express, {Request, Response} from 'express';
import passport from 'passport';
import { Strategy as GithubStrategy  } from 'passport-github';
const app = express()


passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL:'/auth/github/callback'
}, (accessToken:string)=>{console.log(accessToken)}));

app.use(express.json())

app.get('/auth/github',passport.authenticate('github', {scope:['profile', 'email']}))
export default app;



