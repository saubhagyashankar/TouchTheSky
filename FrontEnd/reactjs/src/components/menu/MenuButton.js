import React from 'react'
import './MenuButton.css';


const MenuButton = ({handleMouseDown}) => {
  return (
    <button id="roundButton"
              onMouseDown={handleMouseDown}></button>
  )
}

export default MenuButton