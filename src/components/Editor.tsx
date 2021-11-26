import React from 'react'
import styles from './Editor.module.css'

interface editorProps {
  data: {
    text: string
  }
  editData: React.Dispatch<React.SetStateAction<any>>
}

const Editor = React.forwardRef<HTMLInputElement, editorProps>(({ data, editData }: editorProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {

  let completeData = `${data.text}`

  return (
    <div ref={ref} className={styles.editor}>
      <textarea value={completeData} onChange={(event) => editData(event)} />
    </div>
  )
})

export default Editor