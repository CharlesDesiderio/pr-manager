import React from 'react'
import ReactMarkdown from 'react-markdown'

const Output = (props) => {

  let compiledData = ``

  props.data.forEach((item) => {
    if (item.included) {
      compiledData += `${item.text}\n`
    }
  })

  return (
    <div>
      { props.viewType === 'pre' ? (<ReactMarkdown>{compiledData}</ReactMarkdown>) : '' }

      { props.data.map((item, i) => {
        let replaced = item.text.split(/\n/g).filter((item) => item !== '')
        return item.included && props.viewType === 'raw' ?  <span key={`raw-${i}`}><br />{replaced.map((item) => <span>{item}<br /><br /></span>)}</span> : ''
      })}

    </div>
  )
  }
  
export default Output