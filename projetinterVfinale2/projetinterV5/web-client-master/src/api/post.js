import axios from "axios"

// Authenticated
// { posts: [Posts], pages: Number }
export const getPosts = (page = 1) =>
  axios
    .get("http://localhost:3000/api/post", { params: { page } })
    .then((res) => res.data)

// Authenticated
// Post
export const getPostById = (id) =>
  axios.get(`http://localhost:3000/api/post/${id}`).then((res) => res.data)

// Authenticated/Manager
// String
export const writePost = (data) =>
  axios
    .post("http://localhost:3000/api/post", data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data.id)
