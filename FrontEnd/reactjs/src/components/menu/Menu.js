import React, { useState } from 'react'
import './Menu.css'
import { Link, useNavigate } from 'react-router-dom';
import { UserDetails } from '../static/UserDetails';

const Menu = ({ isVisible}) => {


        return (
            <div id="flyoutMenu"
            
            className='show'>
            <h3>
                
                 <p style={{position: "absolute", top: '10px', right: '30px'}} onClick={() => isVisible(false)}>X</p>
                </h3>   
            <h2><Link to='/dashboard' style={{color: 'white'}}>Dashboard</Link></h2>
            {UserDetails.user && (UserDetails.user.role == 'M' || UserDetails.user.role == 'A') && 
            <div>
            <h2><Link to='/general-data' style={{color: 'white'}}>Buy Parts</Link></h2>
            <h2><Link to='/my-data' style={{color: 'white'}}>My Parts</Link></h2> 
            <h2><Link to='/upload-parts' style={{color: 'white'}}>Upload Parts</Link></h2>
            </div>
            }
            {
                UserDetails.user && UserDetails.user.role == 'M' &&
                <h2><Link to='/remanufacture-parts' style={{color: 'white'}}>ReManufacture Part</Link></h2>
            }
            {
                UserDetails.user && (UserDetails.user.role == 'R') &&
                <h2><Link to='/recycle-parts' style={{color: 'white'}}>Parts to Recycle</Link></h2> 
            }
            </div>
        )
}

export default Menu