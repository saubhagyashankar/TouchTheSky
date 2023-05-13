import React, { useState } from 'react'
import './Menu.css'
import { Link, useNavigate } from 'react-router-dom';
import { UserDetails } from '../static/UserDetails';

const Menu = ({ isVisible}) => {


        return (
            <div id="flyoutMenu"
            
            className='show'>
            <h3>
                
                 <p style={{position: "absolute", top: '10px', right: '30px'}} onClick={() => isVisible(false)}>x</p>
                </h3>   
            <h2><Link to='/dashboard' style={{color: 'rgb(235, 102, 102)', marginTop: '70px'}}><small>Dashboard</small></Link></h2>
            {UserDetails.user && (UserDetails.user.role == 'M' || UserDetails.user.role == 'A') && 
            <div>
            <h2><Link to='/general-data' style={{color: 'rgb(235, 102, 102)'}}><small>Buy Parts</small></Link></h2>
            <h2><Link to='/my-data' style={{color: 'rgb(235, 102, 102)'}}><small>My Parts</small></Link></h2> 
            <h2><Link to='/upload-parts' style={{color: 'rgb(235, 102, 102)'}}><small>Upload Parts</small></Link></h2>
            </div>
            }
            {
                UserDetails.user && UserDetails.user.role == 'M' &&
                <h2><Link to='/remanufacture-parts' style={{color: 'rgb(235, 102, 102)'}}><small>ReManufacture Part</small></Link></h2>
            }
            {
                UserDetails.user && (UserDetails.user.role == 'R') &&
                <h2><Link to='/recycle-parts' style={{color: 'rgb(235, 102, 102)'}}><small>Parts to Recycle</small></Link></h2> 
            }
            </div>
        )
}

export default Menu