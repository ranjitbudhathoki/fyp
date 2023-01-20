import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import prisma from "../services/prisma";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  prisma.user
    .findUnique({
      where: {
        id: id,
      },
    })
    .then((user) => {
      done(null, user);
    });
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: "/auth/github/callback",
    },

    async function (accessToken: string, _: any, profile: any, done: Function) {
      const user = await prisma.user.findUnique({
        where: { githubId: profile.id },
      });

      if (!user) {
        await prisma.user.create({
          data: {
            githubId: profile.id,
            displayName: profile.displayName,
            username: profile.username,
            bio: (profile._json as any)?.bio,
            photoUrl: (profile._json as any)?.avatar_url,
            githubAccessToken: accessToken,
          },
        });
      }
      done(null, user);
    }
  )
);
