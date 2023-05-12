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

const GeneralData = () => {

    const [data, setData] = useState(null);

    useEffect(() =>{
        //fetch all general data
        const URL = BACKEND_URL + '/user/getAllGeneralData';
        fetch(URL).then(res => res.json()).then(res => setData(res.data))
    }, [])

  return (
    <div>
        {data && data.map((part, index) => (
             <MDBCard key={index} alignment='center'>
             <MDBCardHeader>{part.age}</MDBCardHeader>
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

export default GeneralData