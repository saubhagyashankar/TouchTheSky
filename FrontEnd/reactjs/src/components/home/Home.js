import React, { useEffect, useState } from 'react';
import { UserDetails } from '../static/UserDetails';
import Header from '../Header'
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            setUserName(UserDetails?.user?.userName)
        }, 100);
    }, [])
    return (
        <div>
            <Header>
                HomePage
            </Header>
            <h4>Hello {userName}</h4>
            <button onClick={e => navigate('/generate-pet-names')}>Pet Names Generator</button>
            </div>
    )
}


export default Home