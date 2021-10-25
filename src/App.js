import { useState } from 'react'
import Editor from './components/Editor'

import Output from './components/Output'
import Section from './components/Section'

const App = () => {

  let sectionsArray = [
    {
      title: 'Background',
      text: `## This is a text sample I guess`
    },
    {
      title: `Description of changes`,
      text: `## This is sample text for changes`
    }, 
    {
      title: `Approach`,
      text: `## This is sample text for Approach`
    }, 
    {
      title: `Failure mitigation strategies`,
      text: `## This is sample text for mitigation `
    }, 
    {
      title: `Screenshots`,
      text: `## This is sample text for Screenshots`
    }, 
    {
      title: `Performance Impact`,
      text: `## This is sample text for Impact`
    }
  ]

  let [sectionState, setSectionState] = useState([0, 2, 5])

  let completeData = ``

  sectionState.forEach((item) => {
    completeData += `${sectionsArray[item].title}  \n`
    completeData += `${sectionsArray[item].text}  \n`
  })

  let [editorData, setEditorData] = useState(completeData)

  return (
    <div>
      { sectionState.map((section) => {
        return <Section data={sectionsArray[section]} />
      }) }
      <hr />

      { sectionsArray.map((unused, i) => {
        return sectionState.includes(i) ? '' : <Section data={unused} />
      })
      }


      <Editor setData={setEditorData} data={editorData} />

      <Output data={editorData} />

    </div>
  )
}

export default App