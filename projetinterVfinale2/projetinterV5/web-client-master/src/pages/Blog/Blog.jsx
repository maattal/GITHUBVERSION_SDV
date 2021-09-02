import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Pagination from "components/Pagination"
import BlogCard from "components/BlogCard"

import styles from "./style.scss"
import { getPosts } from "../../api/post"

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState()
  const [loading, setLoading] = useState(true)

  const loadPosts = async () => {
    setLoading(true)

    const { posts, pages } = await getPosts(page)

    setPosts(posts)
    setMaxPage(pages)
    setLoading(false)
  }

  useEffect(() => {
    loadPosts()
  }, [page])

  const manager = sessionStorage.getItem("manager") === "true"

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.container}>
      <h1>Blog</h1>

      {manager && (
        <Link className={styles["write-post-button"]} to="/write-post">
          Write a blog post
        </Link>
      )}

      {posts.map((post) => (
        <BlogCard
          key={post._id}
          id={post._id}
          title={post.title}
          author={post.author}
          postedAt={post.postedAt}
          numberComments={post.comments.length}
        />
      ))}

      <Pagination page={page} maxPage={maxPage} onChangePage={setPage} />
    </div>
  )
}

export default Blog
