import React, { useEffect } from "react";
import { UserDetails } from "./static/UserDetails";
import { BACKEND_URL } from "./static/Constants";
import {Link, useNavigate} from 'react-router-dom';


const Header = (props) => {

    const navigate = useNavigate();
    useEffect(() => {
        if(!UserDetails.user?.userName){
            const URL = BACKEND_URL + '/user/';
            fetch(URL, {
                method: 'GET',
                credentials: 'include',
            }).then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.userDetails){
                    UserDetails.user = res.UserDetails
                    navigate('/home')
                }
                else
                    navigate('/')
            })
        }
    }, [])

    return (
        <header className="App-header">
            {props.children}
            <Link to='/logout' className='end-session'>Logout</Link>
        </header>
    )
}

export default Header