import prisma from "../services/prisma";

const getAllPost = async (req: any, res: any) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const createPost = async (req: any, res: any) => {
  try {
    const { authorID, title, body, tech_stack, project_link } = req.body;
    const post = await prisma.post.create({
      data: {
        author: {
          connect: { id: authorID },
        },
        title,
        body,
        tech_stack,
        project_link,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(post);

    res.status(201).json({
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const updatePost = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findFirst({ where: { id } });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.authorID !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this post" });
    }
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });

    res.status(204).json({
      updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const deletePost = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findFirst({ where: { id } });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.authorID !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }
    await prisma.post.delete({
      where: {
        id,
      },
    });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export { getAllPost, createPost, updatePost, deletePost };
