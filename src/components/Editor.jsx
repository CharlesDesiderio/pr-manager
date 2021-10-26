import styles from './Editor.module.css'

const Editor = (props) => {

    let completeData = `${props.data.text}`

  return (
    <div><h3>{props.data.title}</h3>
      <textarea value={completeData} onChange={(event) => props.editData(event)} />
    </div>
  )
}

export default Editor