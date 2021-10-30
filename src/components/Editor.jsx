import React from 'react'
import styles from './Editor.module.css'

const Editor = React.forwardRef((props, ref) => {

  let completeData = `${props.data.text}`

  return (
    <div ref={ref} className={styles.editor}>
      <textarea value={completeData} onChange={(event) => props.editData(event)} />
    </div>
  )
})

export default Editor