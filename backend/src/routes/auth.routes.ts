import Express from "express";
import passport from "passport";
const router = Express.Router();

router.get(
  "/",
  passport.authenticate("github", { scope: ["profile", "email"] })
);

router.get("/callback", passport.authenticate("github"));

export default router;
