import { useState } from 'react'
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
    newState[event.currentTarget.id].included = true
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
    <div>

      <h3>Included Sections</h3>
      { sectionsState.map((item, i) => {
        return item.included ? <div onClick={(event) => chooseEditor(event)} id={i}><Section data={item} />
        <div onClick={(event => removeItem(event))}>🗑</div><div onClick={(event) => resetItem(event)}>reset</div>
        </div> : null
      }) }

      <h3>Not Included</h3>
      { sectionsState.map((item, i) => {
        return item.included ? null : <div onClick={(event) => addSection(event)} id={i}><Section data={item} /></div>
      }) }
      <h3>Editor</h3>

      <Editor data={sectionsState[currentItem]} editData={(event) => handleDataChange(event)} />

      <h3>Output</h3>

      <Output data={sectionsState} />
    </div>
  )
}

//   let [sectionState, setSectionState] = useState([0, 2, 5])

//   let completeData = ``

//   sectionState.forEach((item) => {
//     completeData += `${sectionsArray[item].title}  \n`
//     completeData += `${sectionsArray[item].text}  \n`
//   })

//   let [editorData, setEditorData] = useState(completeData)


//   const handleAdd = (event) => {
//     let newState = sectionState
//     newState.push(parseInt(event.currentTarget.id))
//     setSectionState([...newState])
//   }

//   const handleRemove = () => {
//     alert('beep')
//   }

//   return (
//     <div>
//       { sectionState.map((section) => {
//         return <div onClick={() => handleRemove()} ><Section data={sectionsArray[section]} /></div>
//       }) }
//       <hr />

//       { sectionsArray.map((unused, i) => {
//         return sectionState.includes(i) ? '' : <div id={i} onClick={(event) => handleAdd(event)} ><Section data={unused} /></div>
//       })
//       }

//       <Editor setData={setEditorData} data={editorData} />

//       <Output data={editorData} />

//     </div>
//   )

export default App

