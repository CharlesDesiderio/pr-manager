const Editor = (props) => {
  return (
    <div>
      <textarea onChange={(event) => props.setData(event.target.value)} value={props.data} />
    </div>
  )
}

export default Editor