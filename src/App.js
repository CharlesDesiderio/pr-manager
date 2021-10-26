import { useState } from 'react'

import styles from './App.module.css'

import Editor from './components/Editor'
import Output from './components/Output'
import Section from './components/Section'

const App = () => {

  let sectionsArray = [
    {
      title: 'Background',
      text: `## This is a text sample I guess`,
      included: true
    },
    {
      title: `Description of changes`,
      text: `## This is sample text for changes`,
      included: true
    }, 
    {
      title: `Approach`,
      text: `## This is sample text for Approach`,
      included: false
    }, 
    {
      title: `Failure mitigation strategies`,
      text: `## This is sample text for mitigation `,
      included: false
    }, 
    {
      title: `Screenshots`,
      text: `## This is sample text for Screenshots`,
      included: false
    }, 
    {
      title: `Performance Impact`,
      text: `## This is sample text for Impact`,
      included: false
    }
  ]

  let [sectionsState, setSectionsState] = useState(sectionsArray)
  let [currentItem, setCurrentItem] = useState(0)

  const chooseEditor = (event) => {
    setCurrentItem(parseInt(event.currentTarget.id))
  }

  const addSection = (event) => {
    let newState = sectionsState
    newState[event.target.parentElement.id].included = true
    setSectionsState([...newState])
  }

  const handleDataChange = (event) => {
    let newState = sectionsState
    newState[currentItem].text = event.target.value
    setSectionsState([...newState])
  }

  const resetItem = (event) => {
    let newState = sectionsState
    newState[event.target.parentElement.id].text = sectionsArray[event.target.parentElement.id].text
    setSectionsState([...newState])
  }

  const removeItem = (event) => {
    let newState = sectionsState
    newState[event.target.parentElement.id].included = false
    setSectionsState([...newState])
  }

  return (
    <div className={styles.container}>
      <div>
        { sectionsState.map((item, i) => {
          return item.included ? 
          <div onClick={(event) => chooseEditor(event)} id={i} className={styles.section} >
            <Section data={item} />
            <button onClick={(event => removeItem(event))}>🗑</button>
            <button onClick={(event) => resetItem(event)}>↩</button>
          </div> : null
        }) }
<hr />
        { sectionsState.map((item, i) => {
          return item.included ? null : <div className={styles.inactiveSection} id={i}><Section data={item} /><button onClick={(event) => addSection(event)}>➕</button></div>
        }) }
      </div>

      <Editor data={sectionsState[currentItem]} editData={(event) => handleDataChange(event)} />

      <Output data={sectionsState} />
    </div>
  )
}

export default App

