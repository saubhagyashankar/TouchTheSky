import React, { useEffect, useState } from 'react';
import { UserDetails } from '../static/UserDetails';
import Header from '../Header'
import { useNavigate } from 'react-router-dom';
import SpeechRecognition from '../speechrecognition/SpeechRecognition';
import SimplePythonScript from '../pythonscripts/SimplePythonScript'
import ManufacturerHomePage from '../manufacturer/ManufacturerHomePage';
import AirlineHomePage from '../airline/AirlineHomePage';
import RecycleFacilityHomePage from '../recyclefacility/RecycleFacilityHomePage';

const Home = () => {
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            // console.log(UserDetails.user.userName)
            setUserName(UserDetails?.user?.userName)
            setUserRole(UserDetails?.user?.role)
        }, 1000);
    }, [])


    if(userRole == 'M')
        return (
            <div>
                <ManufacturerHomePage></ManufacturerHomePage>
            </div>
        )
    if (userRole == 'A')
        return (
            <AirlineHomePage></AirlineHomePage>
            )
    if (userRole == 'R')
        return (
            <RecycleFacilityHomePage></RecycleFacilityHomePage>
        )
    else
    return (
        <div>
            Loading ....
            {/* <Header>
                Loading...
            </Header>
            <h4>Hello {userName && (userName[0].toUpperCase() + userName.slice(1))}</h4>
            <button onClick={e => navigate('/generate-pet-names')}>Pet Names Generator</button>

            <SpeechRecognition></SpeechRecognition>
            <SimplePythonScript></SimplePythonScript> */}
            </div>
    )
}


export default Home