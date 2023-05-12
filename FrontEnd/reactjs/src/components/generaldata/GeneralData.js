import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
  } from 'mdb-react-ui-kit';
import { BACKEND_URL } from '../static/Constants';
import { useNavigate } from 'react-router-dom';
import MenuContainer from '../menu/MenuContainer';
import Header from '../Header';

const GeneralData = () => {

    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        //fetch all general data
        const URL = BACKEND_URL + '/user/getAllGeneralData';
        fetch(URL).then(res => res.json()).then(res => setData(res.data))
    }, [])

    const openSpecificPart = (part) => {
        navigate('/specific-part', {state: {part: part}})
    }
    

  return (
    <div>
        <Header>
            <MenuContainer></MenuContainer>
            General Data
        </Header>
        <div  style={{width: '100%', height: '100%', flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',justifyContent: "space-between", display: 'flex'}}>

        {data && data.map((part, index) => (
            <MDBCard onClick={() => openSpecificPart(part)} style={{height: '200px', width: '300px', marginTop: '3px',}} key={index} alignment='center'>
             <MDBCardHeader>{part.age} yrs</MDBCardHeader>
             <MDBCardBody>
               <MDBCardTitle>{part.partName}</MDBCardTitle>
               <MDBCardText>{part.materialComposition}</MDBCardText>
             </MDBCardBody>
             <MDBCardFooter className='text-muted'>{part.condition}</MDBCardFooter>
           </MDBCard>
        ))}
        </div>
    </div>
  )
}

export default GeneralData