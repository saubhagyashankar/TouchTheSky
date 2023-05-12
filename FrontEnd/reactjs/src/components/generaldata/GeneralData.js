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
    const [mainData, setMainData] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        //fetch all general data
        const URL = BACKEND_URL + '/user/getAllGeneralData';
        fetch(URL).then(res => res.json()).then(res => {
            setMainData(res.data);
            setData(res.data)})
    }, [])

    const openSpecificPart = (part) => {
        navigate('/specific-part', {state: {part: part}})
    }

    const getUsedParts = async() => {
        let tData = mainData;
        tData = tData.filter(item =>  item.condition === "Used")
        console.log(tData)
        setData(tData);
    }

    const getNewParts = () => {
        let tData = mainData;
        tData = tData.filter(item =>  item.condition == 'New')
        setData(tData);
    }

    const getAllParts = () => {
        let tData = mainData;
        setData(tData);

    }
    

  return (
    <div>
        <Header>
            <MenuContainer></MenuContainer>
            General Data
        </Header>
        <div style={{marginRight: '0px'}}>

        <button onClick={_ => getUsedParts()}>Used</button>
        <button onClick={getNewParts}>New</button>
        <button onClick={getAllParts}>All</button>
        </div>
        <div  style={{width: '100%', height: '100%', flex: 1,
        flexDirection: 'row', marginLeft: '40px',
        flexWrap: 'wrap',justifyContent: "flex-start", display: 'flex'}}>

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