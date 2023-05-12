import React, { useState } from 'react'
import MenuButton from './MenuButton'
import Menu from './Menu'

const MenuContainer = () => {
    const [visible, isVisible] = useState(false)

    const toggleMenu = () => {
        isVisible(prev => !prev)
    }

    const handleMouseDown = (e) => {
        toggleMenu();
        console.log("clicked");
        // e.stopPropagation();
      }

  return (
    <div>
        <MenuButton handleMouseDown={e => handleMouseDown(e)}/>
        {visible && <Menu isVisible={isVisible}></Menu>
        }
        </div>
  )
}

export default MenuContainer