import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../static/Constants';
import { UserDetails } from '../static/UserDetails';
import Cookies from 'js-cookie'
import Header from '../Header';
import './login.css'


const Login = () => {
    const [userName, setUserName] = useState('')
    const [pwd, setPwd] = useState('')

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const URL = BACKEND_URL + '/user/?userName='+encodeURIComponent(userName)
                    +'&password='+encodeURIComponent(pwd);
        console.log(URL);
        fetch(URL, {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json()).then(res => {
            if(res.success){
                console.log('login.js', res.userDetails);
                UserDetails.user = res.userDetails;

                navigate('/home')
            }
        })

    }

    useEffect(() => {
        if(Cookies.get('empid'))
            navigate('/home')
    }, [])


    return (
        <div>
            <Header className='App-header'>
                Login
            </Header>

            <section className='login-section'>

                <form className='login-form'>
                    <div className='input-field'>
                        <input onChange={e => setUserName(e.target.value)} placeholder='Enter Username' 
                        type='text' name='username' id='username' />
                    </div>

                    <div className='input-field'>
                        <input onChange={e => setPwd(e.target.value)} placeholder='Enter Password' 
                        type='password' name='password' id='password' />
                    </div>

                    <button className='login-button' onClick={e => handleLogin(e)}>Login</button>
                    <button className='login-button' onClick={_ => navigate('/forgot-password')}>Forgot Password</button>
                    <br/>
                    <button className='login-button' onClick={_ => navigate('/create-user')}>Create User</button>

                
                </form>

            </section>
        </div>
    )
}

export default Login