import React, { useEffect, useState } from 'react'
import MenuContainer from '../menu/MenuContainer'
import { BACKEND_URL } from '../static/Constants'
import Header from '../Header'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
  } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';

const RemanufactureParts = () => {

    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const URL = BACKEND_URL + '/user/getRemanufactureParts/';
        fetch(URL).then(res => res.json()).then(res => setData(res.data))
    }, [])


    const openPartForRemanufacturing = (part) => {
        navigate('/complete-remanufacturing', {state:{part: part}})
    }

  return (
    <div>
        <Header>
            <MenuContainer></MenuContainer>
            ReManufacture Parts
        </Header>

        {data && data.map((part, index) => (
            <MDBCard onClick={() => openPartForRemanufacturing(part)} style={{height: '200px', width: '300px', marginTop: '3px',}} key={index} alignment='center'>
             <MDBCardHeader>{part.age} yrs</MDBCardHeader>
             <MDBCardBody>
               <MDBCardTitle>{part.partName}</MDBCardTitle>
               <MDBCardText>{part.materialComposition}</MDBCardText>
             </MDBCardBody>
             <MDBCardFooter className='text-muted'>{part.condition}</MDBCardFooter>
           </MDBCard>
        ))}

    </div>
  )
}

export default RemanufactureParts