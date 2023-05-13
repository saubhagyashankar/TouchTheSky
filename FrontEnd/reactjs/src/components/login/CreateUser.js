import React, {useState} from 'react'
import bcrypt from 'bcryptjs'
import { BACKEND_URL } from '../static/Constants'
import {Link, useNavigate} from 'react-router-dom'
import Header from '../Header'

const CreateUser = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userName: '',
        password:'',
        email:'',
        role:''
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
            <Header className='App-header'>
                Create User
            </Header>

            <section className='login-section'>

            <form className='login-form'>
                    <div className='input-field'>
                {/* <label>userName</label> */}
                <input type='text' onChange={e => handleOnChange(e)}
                 name='userName' placeholder='UserName'></input>
                <br></br>
                </div>
                <div className='input-field'>

                {/* <label>password</label> */}
                <input type='password' onChange={e => handleOnChange(e)}
                 name='password' placeholder='Password'></input>
                <br></br>
                 </div>
                 <div className='input-field'>
                {/* <label>Email</label> */}
                <input type='text' onChange={e => handleOnChange(e)}
                 name='email' placeholder='Email'></input>
                <br></br>
                </div>
                <div className='input-field'>
                {/* <label>Role</label> */}
                <input type='text' onChange={e => handleOnChange(e)}
                  name='role' placeholder='Role' maxLength={1}></input>
                <br></br>
                </div>
                <br></br>
                <button className='login-button' onClick={handleCreateUser}>Submit</button>
        
       
        </form>
            </section>
        </div>
    )
}

export default CreateUser