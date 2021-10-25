import { useState } from 'react'

import Editor from "./components/Editor"
import Section from './components/Section'

const App = () => {

  let sectionsArray = [
    {
      title: 'Background',
      text: `## This is a text sample I guess`
    },
    {
      title: `Description of changes`,
      text: `This is sample text for changes`
    }, 
    {
      title: `Approach`,
      text: `This is sample text for Approach`
    }, 
    {
      title: `Failure mitigation strategies`,
      text: `This is sample text for mitigation `
    }, 
    {
      title: `Screenshots`,
      text: `This is sample text for Screenshots`
    }, 
    {
      title: `Performance Impact`,
      text: `This is sample text for Impact`
    }, 

  ]

  let [sectionState, setSectionState] = useState([0, 2, 5])

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

    </div>
  )
}

export default App