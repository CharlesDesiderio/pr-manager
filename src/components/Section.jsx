import styles from './Section.module.css'

import draggable from '../images/draggable.svg'

const Section = (props) => {
  console.log(props)
  return (
    <div className={ props.data.included ?  styles.singleSection : ''} >{ props.data.included ? <img src={draggable} alt="Drag Icon" /> : ''  }  { props.data.title }</div>
  )
}

export default Section