import Express from "express";
import passport from "passport";

const router = Express.Router();
const CLIENT_URL = "http://localhost:3000/";

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { successRedirect: `${CLIENT_URL}/login` })
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
