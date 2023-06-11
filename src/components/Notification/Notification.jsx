import React from 'react'
import styles from "./Notification.module.scss"
function Notification(props) {
  return (
    <div className={styles.notification}>{props.message}</div>
  )
}

export default Notification