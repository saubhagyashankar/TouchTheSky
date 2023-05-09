import React, { useEffect, useState } from 'react';
import { UserDetails } from '../static/UserDetails';
import Header from '../Header'


const Home = () => {
    const [userName, setUserName] = useState('')

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
            </div>
    )
}


export default Home