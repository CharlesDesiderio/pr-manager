import { useState } from 'react'

import styles from './App.module.css'

import Editor from './components/Editor'
import Output from './components/Output'
import Section from './components/Section'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faPlusCircle, faMinusCircle, faSave } from '@fortawesome/free-solid-svg-icons'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {


  // Default values for sections
  const sectionsArray = [
    {
      title: `Background`,
      text: `## Background\n\nAn explanation of the background situation in regards to this PR.`,
      included: true
    },
    {
      title: `Description of Changes`,
      text: `## Description of Changes\n\nA description of what changes were made to the project.`,
      included: true
    },
    {
      title: `Approach`,
      text: `## Approach\n\nA methodology of how the changes were designed and implemented.`,
      included: false
    },
    {
      title: `Failure Mitigation Strategies`,
      text: `## Failure Mitigation Strategies\n\nAn explanation of what changes were made to prevent any failures.`,
      included: false
    },
    {
      title: `Screenshots`,
      text: `## Screenshots\n\nLinks to screenshots.`,
      included: false
    },
    {
      title: `Performance Impact`,
      text: `## Performance Impact\n\nHow does this PR affect performance, either positively or negatively?`,
      included: false
    },
    {
      title: `Expected Behavior`,
      text: `## Expected Behavior\n\nWhat this PR intends to accomplish in regards to behavior.`,
      included: false
    },
    {
      title: `Actual Behavior`,
      text: `## Actual Behavior\n\nWhat his PR actually accomplishes in regards to behavior.`,
      included: false
    },
    {
      title: `Observability`,
      text: `## Observability\n\nDetails related to observability.`,
      included: false
    },
    {
      title: `Type of Change`,
      text: `## Type of Change\n\nA detailed description of the way the project has been changed.`,
      included: false
    },
    {
      title: `What Issue Does it Fix`,
      text: `## What Issue Does it Fix\n\nWhich specific bug or error was fixed.`,
      included: false
    },
    {
      title: `How Was It Tested`,
      text: `## How Was It Tested\n\nAn explanation of testing methodology.`,
      included: false
    },
    {
      title: `Customer Impact`,
      text: `## Customer Impact\n\nHow these changes will impact current customers and users.`,
      included: false
    }
  ]

  let initialSectionState

  if (window.localStorage.getItem("prManagerState")) {
    initialSectionState = JSON.parse(window.localStorage.getItem("prManagerState"))
  } else {
    initialSectionState = sectionsArray
  }

  let [sectionsState, setSectionsState] = useState(initialSectionState)
  let [currentItem, setCurrentItem] = useState(0)
  let [previewState, setPreviewState] = useState('pre')

  // Select which section is currently selected and passed to the editor
  const chooseEditor = (i) => {
    setCurrentItem(i)
  }

  // Make a section part of the output
  const addSection = (i) => {
    let newState = sectionsState
    console.log(i)
    newState[i].included = true
    setSectionsState([...newState])
    window.localStorage.setItem("prManagerState", JSON.stringify(sectionsState))
  }

  // State-managed inputs!
  const handleDataChange = (event) => {
    let newState = sectionsState
    newState[currentItem].text = event.target.value
    setSectionsState([...newState])
    window.localStorage.setItem("prManagerState", JSON.stringify(sectionsState))
  }

  // Revert a section back to its default values, taken from array used for initial state
  const resetItem = (i) => {
    let newState = sectionsState
    let initialArrayItem = sectionsArray.filter((item) => item.title === sectionsState[i].title)
    newState[i].text = initialArrayItem[0].text
    setSectionsState([...newState])
    window.localStorage.setItem("prManagerState", JSON.stringify(sectionsState))
  }

  // Remove a section from output
  const removeItem = (i) => {
    let newState = sectionsState
    newState[i].included = false
    setSectionsState([...newState])
    window.localStorage.setItem("prManagerState", JSON.stringify(sectionsState))
  }

  const toggleOutput = (option) => {
    if (option === 'pre') {
      setPreviewState('pre')
    }
    else if (option === 'raw') {
      setPreviewState('raw')
    } else {
      console.log('Hey stop that.')
    }
  }

  // Shift the positions of items in the array corresponding to a drag event
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    let newState = Array.from(sectionsState)
    const [reorderedItem] = newState.splice(result.source.index, 1)
    newState.splice(result.destination.index, 0, reorderedItem)
    setCurrentItem(result.destination.index)
    setSectionsState(newState)
    window.localStorage.setItem("prManagerState", JSON.stringify(sectionsState))
  }

  const clearStorage = () => {
    localStorage.removeItem("prManagerState")
    setSectionsState(sectionsArray)
    setCurrentItem(0)
  }

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='sectionItems'>
      {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef} className={`${styles.sectionContainer} ${styles.sectionItems}`}>
        { sectionsState.map((item, i) => {
          return item.included ? 
          (<Draggable key={`drag-${i}`} draggableId={`drag-${i}`} index={i}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={i} onClick={(arrNum) => chooseEditor(i)} id={i} className={`${styles.section} ${i === currentItem ? styles.selected : ''}` } >
            <Section data={item} />
            <FontAwesomeIcon onClick={(arrNum) => removeItem(i)} className={styles.faIcon} icon={faMinusCircle} />
            <FontAwesomeIcon onClick={(arrNum) => resetItem(i)} className={styles.faIcon} icon={faBackward} />
            
          </div>)}</Draggable>) : null
        }) }
        {provided.placeholder}
        <div className={styles.divider}></div>
        { sectionsState.map((item, i) => {
          return item.included ? null : <div key={i} onClick={(arrNum) => chooseEditor(i)} className={`${styles.inactiveSection} ${i === currentItem ? styles.selected : ''}` } id={i}><Section data={item} /><FontAwesomeIcon onClick={(arrNum) => addSection(i)} className={styles.faIcon} icon={faPlusCircle} /></div>
        }) }
      
      </div>
      )}
      </Droppable>
      </DragDropContext>

      <Editor data={sectionsState[currentItem]} editData={(event) => handleDataChange(event)} />

      <div className={styles.outputContainer}>
        <div className={styles.buttonContainer}>
        <button className={`${styles.outputToggle} ${previewState === 'pre' ? `${styles.outputToggleSelected}` : ''  }`} onClick={() => toggleOutput('pre')}>Preview</button><button className={`${styles.outputToggle} ${previewState === 'raw' ? `${styles.outputToggleSelected}` : ''  }`} onClick={() => toggleOutput('raw')}>Raw</button>
        </div>
      <Output viewType={previewState} data={sectionsState} />

      </div>
      {window.localStorage.getItem("prManagerState") ?  <div onClick={clearStorage} className={styles.resetButton}><FontAwesomeIcon icon={faSave} />Reset All</div> : null }
      
    </div>
  )
}

export default App

