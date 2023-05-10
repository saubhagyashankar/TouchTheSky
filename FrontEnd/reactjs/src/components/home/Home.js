import React, { useEffect, useState } from 'react';
import { UserDetails } from '../static/UserDetails';
import Header from '../Header'
import { useNavigate } from 'react-router-dom';
import SpeechRecognition from '../speechrecognition/SpeechRecognition';


const Home = () => {
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            // console.log(UserDetails.user.userName)
            setUserName(UserDetails?.user?.userName)
        }, 1000);
    }, [])
    return (
        <div>
            <Header>
                HomePage
            </Header>
            <h4>Hello {userName && (userName[0].toUpperCase() + userName.slice(1))}</h4>
            <button onClick={e => navigate('/generate-pet-names')}>Pet Names Generator</button>

            <SpeechRecognition></SpeechRecognition>
            </div>
    )
}


export default Home