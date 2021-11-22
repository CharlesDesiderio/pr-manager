import styles from './Section.module.css'

import draggable from '../images/draggable.svg'

const Section = ({ data }) => {
  return (
    <div className={ data.included ?  styles.singleSection : ''} >{ data.included ? <img src={draggable} alt="Drag Icon" /> : ''  }  { data.title }</div>
  )
}

export default Section