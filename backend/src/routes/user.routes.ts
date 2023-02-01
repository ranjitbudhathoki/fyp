import Express from "express";
import prisma from "../services/prisma";
const router = Express.Router();

router.get("/current-user", async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

router.post("/update-profile", async (req: any, res) => {
  console.log(req);
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      birthDate: new Date(req.body.birthDate),
      gender: req.body.gender,
      preferredGender: req.body.gender,
      updatedAt: new Date(),
    },
  });

  res.status(200).json({
    updatedUser,
  });
});

export default router;
