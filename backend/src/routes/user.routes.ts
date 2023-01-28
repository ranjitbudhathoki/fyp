import Express from "express";
import prisma from "../services/prisma";
const router = Express.Router();

router.get("/current-user", async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

router.get("/profile", async (req: any, res) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      gender: req.gender,
      preferredGender: req.gender,
    },
  });

  res.status(200).json({
    updatedUser,
  });
});

export default router;
