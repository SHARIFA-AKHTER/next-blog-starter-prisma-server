import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    // console.log("Console from Controller");

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllPost = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured =
      req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined;

      const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const result = await PostService.getAllPost({
      page,
      limit,
      search,
      isFeatured,
      tags
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts", details: error });
  }
};
const getPostById = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getPostById(Number(req.params.id));

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.updatePost(
      Number(req.params.id),
      req.body
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.deletePost(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const PostController = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};
