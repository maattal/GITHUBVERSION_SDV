const { Router } = require("express")
const PostController = require("../controllers/post_controller")
const { Authenticate } = require("../middlewares/auth_middleware")

const router = Router()

router.post("/", Authenticate, PostController.WritePost)
router.get("/", PostController.GetPosts)

router.post("/:id", PostController.PostComment)
router.get("/:id", PostController.GetPostById)

module.exports = router
