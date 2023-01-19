import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: "/auth/github/callback",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: GithubStrategy.Profile,
      done
    ) => {
      console.log("access", accessToken);
      console.log("refresh", refreshToken);
      console.log("profile", profile);
    }
  )
);
