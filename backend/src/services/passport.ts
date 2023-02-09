import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import prisma from '../services/prisma';

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
      callbackURL: '/auth/github/callback',
    },

    async function (access, _: any, profile: any, done: Function) {
      const existingUser = await prisma.user.findUnique({
        where: { githubId: profile.id },
      });

      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await prisma.user.create({
          data: {
            githubId: profile.id,
            displayName: profile.displayName,
            username: profile.username,
            bio: (profile._json as any)?.bio,
            photoUrl: (profile._json as any)?.avatar_url,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        done(null, user);
      }
    }
  )
);
