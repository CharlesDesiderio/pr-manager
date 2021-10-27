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
      title: `Background`,
      text: `## Background\n\nSample text goes here.`,
      included: true
    },
    {
      title: `Description of Changes`,
      text: `## Description of Changes\n\nSample text goes here.`,
      included: true
    },
    {
      title: `Approach`,
      text: `## Approach\n\nSample text goes here.`,
      included: false
    },
    {
      title: `Failure Mitigation Strategies`,
      text: `## Failure Mitigation Strategies\n\nSample text goes here.`,
      included: false
    },
    {
      title: `Screenshots`,
      text: `## Screenshots\n\nSample text goes here.`,
      included: false
    },
    {
      title: `Performance Impact`,
      text: `## Performance Impact\n\nSample text goes here.`,
      included: false
    },
    {
      title: `Expected Behavior`,
      text: `## Expected Behavior\n\nSample text goes here.`,
      included: false
    },
    {
      title: `Actual Behavior`,
      text: `## Actual Behavior\n\nSample text goes here.`,
      included: false
    },
    {
      title: `Observability`,
      text: `## Observability\n\nSample text goes here.`,
      included: false
    },
    {
      title: `Type of Change`,
      text: `## Type of Change\n\nSample text goes here.`,
      included: false
    },
    {
      title: `What Issue Does it Fix`,
      text: `## What Issue Does it Fix\n\nSample text goes here.`,
      included: false
    },
    {
      title: `How Was It Tested`,
      text: `## How Was It Tested\n\nSample text goes here.`,
      included: false
    },
    {
      title: `Customer Impact`,
      text: `## Customer Impact\n\nSample text goes here.`,
      included: false
    },
    // {
    //   title: 'Background',
    //   text: `## This is a text sample I guess`,
    //   included: true
    // },
    // {
    //   title: `Description of changes`,
    //   text: `## This is sample text for changes\n\nTesting something  `,
    //   included: true
    // }, 
    // {
    //   title: `Approach`,
    //   text: `## This is sample text for Approach`,
    //   included: false
    // }, 
    // {
    //   title: `Failure mitigation strategies`,
    //   text: `## This is sample text for mitigation `,
    //   included: false
    // }, 
    // {
    //   title: `Screenshots`,
    //   text: `## This is sample text for Screenshots`,
    //   included: false
    // }, 
    // {
    //   title: `Performance Impact`,
    //   text: `## This is sample text for Impact`,
    //   included: false
    // }
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
    let initialArrayItem = sectionsArray.filter((item) => item.title === sectionsState[i].title)
    newState[i].text = initialArrayItem[0].text
    setSectionsState([...newState])
  }

  const removeItem = (i) => {
    let newState = sectionsState
    newState[i].included = false
    setSectionsState([...newState])
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        { sectionsState.map((item, i) => {
          return item.included ? 
          <div onClick={(arrNum) => chooseEditor(i)} id={i} className={`${styles.section} ${i === currentItem ? styles.selected : ''}` } >
            <Section data={item} />
            <FontAwesomeIcon onClick={(arrNum) => removeItem(i)} className={styles.faIcon} icon={faMinusCircle} />
            <FontAwesomeIcon onClick={(arrNum) => resetItem(i)} className={styles.faIcon} icon={faBackward} />
          </div> : null
        }) }
        <div className={styles.divider}></div>
        { sectionsState.map((item, i) => {
          return item.included ? null : <div onClick={(arrNum) => chooseEditor(i)} className={`${styles.inactiveSection} ${i === currentItem ? styles.selected : ''}` } id={i}><Section data={item} /><FontAwesomeIcon onClick={(arrNum) => addSection(i)} className={styles.faIcon} icon={faPlusCircle} /></div>
        }) }
      </div>

      <Editor data={sectionsState[currentItem]} editData={(event) => handleDataChange(event)} />

      <Output data={sectionsState} />
    </div>
  )
}

export default App

