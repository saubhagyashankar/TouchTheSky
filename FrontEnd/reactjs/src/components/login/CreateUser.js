import React, {useState} from 'react'
import bcrypt from 'bcryptjs'
import { BACKEND_URL } from '../static/Constants'
import {Link, useNavigate} from 'react-router-dom'

const CreateUser = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userName: '',
        password:'',
        email:''
    })

    const handleOnChange = (e) => {
        let newUserData = userData;
        if(e.target.name === 'password') {
            let encryptedPassword = bcrypt.hashSync(e.target.value, 
                bcrypt.genSaltSync(10))
            newUserData[e.target.name] = encryptedPassword;
        }else
            newUserData[e.target.name] = e.target.value
        setUserData(newUserData)
    }

    const handleCreateUser = () => {
        const URL = BACKEND_URL + '/user/';
        const data = new FormData();
        data.append('user', userData)
        fetch(URL, {
            method: 'POST', 
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            alert(res.message)
            navigate('/')
        })
    }


    return (
        <div>
            <header className='App-header'>
                <Link to='/home' className='back-btn'>Back⬅</Link>
                Create User
            </header>

            <section>
                <label>userName</label>
                <input type='text' onChange={e => handleOnChange(e)}
                 name='userName'></input>
                <br></br>
                <label>Email</label>
                <input type='text' onChange={e => handleOnChange(e)}
                 name='email'></input>
                <br></br>
                <label>password</label>
                <input type='password' onChange={e => handleOnChange(e)}
                 name='password'></input>
                <br></br>
                <button onClick={handleCreateUser}>Submit</button>
            </section>
        </div>
    )
}

export default CreateUser