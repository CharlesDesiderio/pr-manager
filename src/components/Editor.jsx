import React from 'react'
import styles from './Editor.module.css'

const Editor = React.forwardRef(({ data, editData }, ref) => {

  let completeData = `${data.text}`

  return (
    <div ref={ref} className={styles.editor}>
      <textarea value={completeData} onChange={(event) => editData(event)} />
    </div>
  )
})

export default Editor