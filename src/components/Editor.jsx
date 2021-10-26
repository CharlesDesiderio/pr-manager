import styles from './Editor.module.css'

const Editor = (props) => {

  let completeData = `${props.data.text}`

  return (
    <div className={styles.editor}>
      <textarea value={completeData} onChange={(event) => props.editData(event)} />
    </div>
  )
}

export default Editor