import Express from "express";
import passport from "passport";

const router = Express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get("/success", (req, res) => {
  res.status(200).json({
    message: "homepage ",
  });
});

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/github" })
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
