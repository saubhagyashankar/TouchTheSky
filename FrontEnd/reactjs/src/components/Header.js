import React, { useEffect } from "react";
import { UserDetails } from "./static/UserDetails";
import { BACKEND_URL } from "./static/Constants";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'



const Header = (props) => {

    const navigate = useNavigate();
    const page = window.location.href.split('/').pop()

    useEffect(() => {
        console.log(UserDetails.user);
        if (UserDetails.user == null) {
            console.log(Cookies.get('userName'))
            console.log(window.location.href)
            const URL = BACKEND_URL + '/user/';
            fetch(URL, {
                method: 'GET',
                credentials: 'include',
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.userDetails) {
                        UserDetails.user = res.userDetails
                        console.log(UserDetails.user)
                        if (page == 'logout')
                            navigate('/home')
                    }
                    else {
                        if (page != 'logout')
                            navigate('/')
                    }
                })
        }
    }, [])

    return (
        <header className="App-header">
            {props.children}
            {page && page != 'login' &&
                <Link to='/logout' className='end-session'>Logout</Link>
            }
        </header>
    )
}

export default Header