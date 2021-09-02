import React from "react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"

import styles from "./style.scss"

export default function BlogCard({ id, title, postedAt, numberComments }) {
  return (
    <Link className={styles["link-card"]} to={`/blog/${id}`}>
      <div className={styles.card}>
        <h2>{title}</h2>
        <p>
          <strong>
            Published {formatDistanceToNow(new Date(postedAt))} ago · {numberComments} responses
          </strong>
        </p>
      </div>
    </Link>
  )
}
