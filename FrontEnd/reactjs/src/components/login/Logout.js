import React, {useEffect} from 'react'
import { BACKEND_URL } from '../static/Constants'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const URL = BACKEND_URL + '/user/logout';
        fetch(URL).then(res => res.json())
        .then(res => {
            Cookies.remove('userName');
            Cookies.remove('connect.sid')
            navigate('/')
        })
    }, [])
}

export default Logout