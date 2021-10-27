import { useState } from 'react'

import styles from './App.module.css'

import Editor from './components/Editor'
import Output from './components/Output'
import Section from './components/Section'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBackward, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

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

  const chooseEditor = (i) => {
    setCurrentItem(parseInt(i))
  }

  const addSection = (i) => {
    let newState = sectionsState
    console.log(i)
    newState[i].included = true
    setSectionsState([...newState])
  }

  const handleDataChange = (event) => {
    let newState = sectionsState
    newState[currentItem].text = event.target.value
    setSectionsState([...newState])
  }

  const resetItem = (i) => {
    let newState = sectionsState
    newState[i].text = sectionsArray[i].text
    setSectionsState([...newState])
  }

  const removeItem = (i) => {
    let newState = sectionsState
    newState[i].included = false
    setSectionsState([...newState])
  }

  return (
    <div className={styles.container}>
      <div>
        { sectionsState.map((item, i) => {
          return item.included ? 
          <div onClick={(arrNum) => chooseEditor(i)} id={i} className={styles.section} >
            <Section data={item} />
            <FontAwesomeIcon onClick={(arrNum) => removeItem(i)} className={styles.faIcon} icon={faMinusCircle} />
            <FontAwesomeIcon onClick={(arrNum) => resetItem(i)} className={styles.faIcon} icon={faBackward} />
          </div> : null
        }) }
        <div className={styles.divider}></div>
        { sectionsState.map((item, i) => {
          return item.included ? null : <div className={styles.inactiveSection} id={i}><Section data={item} /><FontAwesomeIcon onClick={(arrNum) => addSection(i)} className={styles.faIcon} icon={faPlusCircle} /></div>
        }) }
      </div>

      <Editor data={sectionsState[currentItem]} editData={(event) => handleDataChange(event)} />

      <Output data={sectionsState} />
    </div>
  )
}

export default App

