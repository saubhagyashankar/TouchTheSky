import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header'
import MenuContainer from '../menu/MenuContainer'
import { BACKEND_URL } from '../static/Constants'
import { UserDetails } from '../static/UserDetails'

const CompleteRecycle = () => {

    const [part, setPart] = useState(null)
    const [id, setId] = useState(null);
    const [keys, setKeys] = useState(null)
    const [values, setValues] = useState(null)
    const [aiRes, setAIRes] = useState(null);
    const [page, setPage] = useState(1);
    let {state} = useLocation()

    const navigate = useNavigate();

    useEffect(() => {

        setPart(state.part)
    }, [])

    useEffect(() => {
        const URL = BACKEND_URL + '/ai/getRecommendationForBuyingPart/';
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(part)
            }).then(res => res.json()).then(res => setAIRes(res.result))
        keyValues()
        console.log(part);
    }, [part])

    const keyValues = async() => {
        if(part != null){

            console.log("keyvalues", part)
            console.log(Object.keys(part))
            setId(part._id)
            // delete part._id;
            delete part.__v;
            delete part.owner;
            delete part.successFailure;
            delete part.auctionRemanufacturing;
            delete part.auctionRecycling;
            delete part.del;
            setKeys(Object.keys(part))
            setValues(Object.values(part))
            
        }
    }

    const purchaseThisPart = () => {
        const URL = BACKEND_URL + '/user/buyPart/?userName=' + encodeURIComponent(UserDetails.user.userName) + '&id=' + encodeURIComponent(id);
        fetch(URL, {
            method: 'POST'
        }).then(res => res.json()).then(res => {
            if(res.message){
                alert(res.message);
                navigate('/general-data');
            }else{
                alert("Something went wrong")
            }
        })
    
    }

    const handleRecycleSuccess = () => {
        const URL = BACKEND_URL + '/user/recycleDone/?userName=' + encodeURIComponent(UserDetails.user.userName) + '&successFailure=' + encodeURIComponent(true)+ '&id=' + encodeURIComponent(id);
        fetch(URL, {
            method: 'POST',
        }).then(res => res.json()).then(res => {
            if(res.message)
                alert(res.message);
            navigate('/recycle-parts')
        })
    }

    const handleRecycleFailure = () => {
        const URL = BACKEND_URL + '/user/recycleDone/?userName=' + encodeURIComponent(UserDetails.user.userName) + '&successFailure=' + encodeURIComponent(false)+ '&id=' + encodeURIComponent(id);
        fetch(URL, {
            method: 'POST',
        }).then(res => res.json()).then(res => {
            if(res.message)
                alert(res.message);
            navigate('/recycle-parts')
        })
    }



    if(page === 1)
  return (
    <div>
        <Header>
            <MenuContainer></MenuContainer>
            CompleteRecycle
            </Header>
            <p>
            {!aiRes && `Generating Insights from our AI.... Please wait` }
            
            </p>
        
            <b>AI: 
            {aiRes}
            </b>
            <br/>
            <br/>
        <p><b>
            Part Complete Details-
            </b>
            </p>
        

        <ul>

                {keys && 
                    keys.map((field, index) => (

                        <li key={index}>
                            <b>
                                {field} 
                                </b>
                                - <i>
                               
                                {values[index]}
                                </i>
                        </li>
                    ))
                }
            </ul>
            <div >

                <button onClick={() => setPage(2)} style={{marginLeft: 'auto', marginRight: 'auto'}}>Start Recycling</button>
            </div>
        
    </div>

  )
  if(page=== 2)
        return (
            <div>
                <h4>Was the recycling Successful - </h4>
                <button onClick={handleRecycleSuccess}>Yes</button>
                <button onClick={handleRecycleFailure}>No</button>
            </div>
        )
}

export default CompleteRecycle