import React, { useState } from 'react'
import './Menu.css'
import { Link, useNavigate } from 'react-router-dom';

const Menu = ({ isVisible}) => {


        return (
            <div id="flyoutMenu"
            
            className='show'>
                <p style={{position: "absolute", right: '40px'}} onClick={() => isVisible(false)}>X</p>
            <h2><Link to='/dashboard' style={{color: 'white'}}>Dashboard</Link></h2>
            <h2><Link to='/general-data' style={{color: 'white'}}>Buy Parts</Link></h2>
            <h2><Link to='/my-data' style={{color: 'white'}}>My Parts</Link></h2>
            </div>
        )
}

export default Menu