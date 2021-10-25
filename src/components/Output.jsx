const Output = (props) => {
  return (
    <div>
    OUTPUT
      { props.data.map((item) => {
        return <div>{props.array[item].title} { props.array[item].text }</div>
      }) }
    </div>
  )
}

export default Output