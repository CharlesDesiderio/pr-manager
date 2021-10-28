import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import styles from './Output.module.css'

const Output = (props) => {

  let compiledData = ``

  props.data.forEach((item) => {
    if (item.included) {
      compiledData += `${item.text}\n`
    }
  })

  return (
    <div>
      { props.viewType === 'pre' ? (<ReactMarkdown escapeHtml={false} className={styles.markdown} children={compiledData} remarkPlugins={[remarkGfm]} />) : '' }

      { props.data.map((item, i) => {
        let replaced = item.text.split(/\n/g).filter((item) => item !== '')
        return item.included && props.viewType === 'raw' ?  <span key={`raw-${i}`}><br />{replaced.map((item) => <span>{item}<br /><br /></span>)}</span> : ''
      })}

    </div>
  )
  }
  
export default Output