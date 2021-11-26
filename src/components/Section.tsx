import React from 'react'

import styles from './Section.module.css'

import draggable from '../images/draggable.svg'

interface sectionProps {
  data: {
    title: String
    text: String
    included: Boolean
  }
}

const Section = ({ data }: sectionProps): JSX.Element => {
  return (
    <div className={ data.included ?  styles.singleSection : ''} >{ data.included ? <img src={draggable} alt="Drag Icon" /> : ''  }  { data.title }</div>
  )
}

export default Section