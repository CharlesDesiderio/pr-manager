import React from 'react'
import ReactMarkdown from 'react-markdown'

const Output = (props) => {

  let compiledData = ``

  props.data.forEach((item) => {
    if (item.included) {
      compiledData += `\n${item.title}\n`
      compiledData += `${item.text}\n`
    }

  })

  return (
    <div>
      <ReactMarkdown>{compiledData}</ReactMarkdown>
    </div>
  )
  }
  
export default Output