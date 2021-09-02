import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { writePost } from "../../api/post"

import styles from "./style.scss"

const WritePost = () => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    author: sessionStorage.getItem("name"),
  })
  const [formErrors, setFormErrors] = useState({ title: "", content: "" })

  const history = useHistory()

  const handleChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })

  const handleSubmit = async () => {
    try {
      const postId = await writePost(formState)
      history.push(`/blog/${postId}`)
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Write a blog post: </h1>
      <div className={styles["form-group"]}>
        <label htmlFor="title">Title :</label>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          autoComplete="off"
        />
        <small className={styles.error}>{formErrors.title}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="content">Content :</label>
        <textarea
          type="text"
          name="content"
          value={formState.content}
          onChange={handleChange}
          rows="10"
        />
        <small className={styles.hint}>
          Content is displayed as markdown. Edit markdown{" "}
          <a
            href="https://liyasthomas.github.io/marcdown/"
            target="blank"
            tabIndex="-1"
          >
            here
          </a>
          .
        </small>
      </div>
      <button className="button" onClick={handleSubmit}>
        Post
      </button>
    </div>
  )
}

export default WritePost
