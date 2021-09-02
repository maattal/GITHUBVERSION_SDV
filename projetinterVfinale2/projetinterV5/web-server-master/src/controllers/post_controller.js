const Post = require("../models/post")

const validateRegisterInput = ({ title, content }) => {
  const errors = {}

  if (title === undefined || title === "")
    errors.title = "Title cannot be empty"

  if (content === undefined || content === "")
    errors.content = "Password cannot be empty"

  return Object.keys(errors).length > 0 ? errors : null
}

module.exports = {
  WritePost: async (req, res) => {
    if (req.user.manager === false) return res.status(403).end()

    const errors = validateRegisterInput(req.body)

    if (errors !== null) return res.status(400).json(errors)

    const post = await Post.create(req.body)

    return res.status(201).json({ id: post.id })
  },

  PostComment: async (req, res) => {
    const { id } = req.params

    Post.findById(id, (err, post) => {
      if (err) return res.status(404).json("There is no post with this ID")
      else {
        post.comments.push(req.body)
        post.save()
        return res.status(200).end()
      }
    })
  },

  GetPosts: async (req, res) => {
    const offset = req.query.page ? (req.query.page - 1) * 10 : 0

    const pages = Math.ceil((await Post.countDocuments()) / 10)

    const posts = await Post.find()
      .sort({ postedAt: -1 })
      .skip(offset)
      .limit(10)

    return res.status(200).json({ posts, pages })
  },

  GetPostById: async (req, res) => {
    const { id } = req.params

    const post = await Post.findById(id)

    if (post === null) return res.status(404).end()

    post.comments.sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1))

    return res.status(200).json(post)
  },
}
