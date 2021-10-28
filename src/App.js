import { useState } from 'react'

import styles from './App.module.css'

import Editor from './components/Editor'
import Output from './components/Output'
import Section from './components/Section'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {


  // Default values for sections
  const sectionsArray = [
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

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='sectionItems'>
      {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef} className={`${styles.sectionContainer} sectionItems `}>
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

      <div><button className={`${styles.outputToggle} ${previewState === 'pre' ? `${styles.outputToggleSelected}` : ''  }`} onClick={() => toggleOutput('pre')}>Preview</button><button className={`${styles.outputToggle} ${previewState === 'raw' ? `${styles.outputToggleSelected}` : ''  }`} onClick={() => toggleOutput('raw')}>Raw</button>
        <Output viewType={previewState} data={sectionsState} />

      </div>
    </div>
  )
}

export default App

