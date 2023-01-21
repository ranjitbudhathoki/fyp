import Express from "express";
import passport from "passport";
import prisma from "../services/prisma";

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

router.get("/user", async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
