import React from 'react'
import ReactMarkdown from 'react-markdown'

const Output = (props) => {
  return (
    <div>
      <ReactMarkdown>{props.data}</ReactMarkdown>
    </div>
  )
}

export default Output