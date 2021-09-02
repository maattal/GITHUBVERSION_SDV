import React from "react"

import styles from "./style.scss"

const Pagination = ({ page, maxPage, onChangePage }) => {
  return (
    <div className={styles.container}>
      {[...Array(maxPage).keys()]
        .map((i) => i + 1)
        .map((i) => (
          <button
            key={i}
            className={page === i ? styles.active : undefined}
            onClick={() => onChangePage(i)}
            disabled={page === i}
          >
            {i}
          </button>
        ))}
    </div>
  )
}

export default Pagination
