import { useState } from 'react'
import Editor from './components/Editor'

import Output from './components/Output'
import Section from './components/Section'

const App = () => {

  let sectionsArray = [
    {
      title: 'Background',
      text: `## This is a text sample I guess`,
      included: true,
      current: true
    },
    {
      title: `Description of changes`,
      text: `## This is sample text for changes`,
      included: true,
      current: false
    }, 
    {
      title: `Approach`,
      text: `## This is sample text for Approach`,
      included: false,
      current: false
    }, 
    {
      title: `Failure mitigation strategies`,
      text: `## This is sample text for mitigation `,
      included: false,
      current: false
    }, 
    {
      title: `Screenshots`,
      text: `## This is sample text for Screenshots`,
      included: false,
      current: false
    }, 
    {
      title: `Performance Impact`,
      text: `## This is sample text for Impact`,
      included: false,
      current: false
    }
  ]

  let [sectionsState, setSectionsState] = useState(sectionsArray)

  let selectedItem = sectionsState.filter(item => item.current)

  let [currentItem, setCurrentItem] = useState(selectedItem)

  return (
    <div>

      <h3>Included Sections</h3>
      { sectionsState.map((item) => {
        return item.included ? <Section data={item} /> : null
      }) }

      <h3>Not Included</h3>
      { sectionsState.map((item) => {
        return item.included ? null : <Section data={item} />
      }) }
      <h3>Editor</h3>

      <Editor data={currentItem[0]} />

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

