import styles from './Editor.module.css'

const Editor = (props) => {

    let completeData = `${props.data.title}  \n`
    completeData += `${props.data.text}  \n`

  return (
    <div>
      <textarea value={completeData} />
    </div>
  )
}

export default Editor