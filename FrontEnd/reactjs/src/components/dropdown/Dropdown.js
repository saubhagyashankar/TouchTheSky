import React, { useState } from 'react'
import './Dropdown.css'

const Dropdown = ({props}) => {
    const [open, isOpen] = useState(false)

    const handleButtonClick = () => {
        isOpen(prev => !prev)
    }


  return (
    <div className="container">
  <button type="button" className="button" onClick={handleButtonClick}>
    ☰
  </button>
  {open && (
    <div className="dropdown">
      {props.children}
    </div>
  )}
</div>
  )
}

export default Dropdown