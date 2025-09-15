import  express  from 'express';
import { PostController } from './post.controller';

const router = express.Router()


router.post(
    "/",
    PostController.createPost
)
router.get(
    "/",
    PostController.getAllPost
)
router.get(
    "/:id",
    PostController.getPostById
)
router.patch(
    "/:id",
    PostController.updatePost
)
router.delete(
    "/:id",
    PostController.deletePost
)



//get all post
//get single post
//update post
//delete post
export const postRouter = router