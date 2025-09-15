import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return result;
};

const getAllPost = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[]
}) => {
  // console.log({page,limit});
  const skip = (page - 1) * limit;
  console.log({ tags });

  const where: any = {
    AND: [
      search && {
        OR: [
          {title: { contains: search,mode: "insensitive",}},
          {content: { contains: search,mode: "insensitive"}}
        ]
      },
      typeof isFeatured === "boolean" && { isFeatured },
       tags && tags.length > 0 && {tags: { hasEvery: tags}}
    ].filter(Boolean)
  };
  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
  });

  return result;
};
//{{URL}}/post?page=3&limit=2 {{URL}}/post?page=1&limit=2&search= title 2  Page Limit search korer postman url
//{{URL}}/post?isFeatured=true isFeatured er jonno true false tags  {{URL}}/post?isFeatured=true&tags=next
const getPostById = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
    // select: {
    //   id: true,
    //   title: true,
    //   content: true,
    //   thumbnail: true,
    //   isFeatured: true,
    //   tags: true,
    //   views: true,
    //   createdAt: true,
    //   updatedAt: true,
    //   author: {
    //     select: {
    //       id: true,
    //       name: true,
    //       email: true
    //     }
    //   }
    // }
  });

  return result;
};

const updatePost = async (id: number, data: Partial<any>) => {
  const result = await prisma.post.update({ where: { id }, data });
  return result;
};
const deletePost = async (id: number) => {
  const result = await prisma.post.delete({
    where: { id },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};
