import { useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import styles from './Output.module.css'

const Output = ({ data, viewType }) => {

  let copyTextButtonRef = useRef()

  let compiledData = ``

  data.forEach((item) => {
    if (item.included) {
      compiledData += `${item.text}\n`
    }
  })

  const copyText = () => {
    navigator.clipboard.writeText(compiledData)
    copyTextButtonRef.current.textContent = 'Copied!'
    copyTextButtonRef.current.style.backgroundColor = '#FAB003'
    setTimeout(() => {
      copyTextButtonRef.current.textContent = 'Copy'
      copyTextButtonRef.current.style.backgroundColor = 'white'
    }, 1500)
  }

  return (
    <div className={styles.output}>
      { viewType === 'raw' ? <button ref={copyTextButtonRef} className={styles.copyText} onClick={copyText}>Copy</button> : '' }
      { viewType === 'pre' ? (<ReactMarkdown escapeHtml={false} className={styles.markdown} children={compiledData} remarkPlugins={[remarkGfm]} />) : '' }

      { data.map((item, i) => {
        let replaced = item.text.split(/\n/g).filter((item) => item !== '')
        return item.included && viewType === 'raw' ? <span key={`raw-${i}`}><br />{replaced.map((item) => <span>{item}<br /><br /></span>)}</span> : ''
      })}

    </div>
  )
  }
  
export default Output