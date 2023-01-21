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
  passport.authenticate("github", {
    successRedirect: `${CLIENT_URL}`,
    failureRedirect: `${CLIENT_URL}/login`,
  })
);

router.get("/user", async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

router.get("/logout", (req, res) => {
  (req as any).logout();
  return res.status(200).json({
    msg: "Logged out successfully",
  });
});

export default router;
