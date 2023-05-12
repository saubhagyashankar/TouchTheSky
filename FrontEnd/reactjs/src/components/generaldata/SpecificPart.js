import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header'
import MenuContainer from '../menu/MenuContainer'
import { BACKEND_URL } from '../static/Constants'
import { UserDetails } from '../static/UserDetails'

const SpecificPart = () => {

    const [part, setPart] = useState(null)
    const [id, setId] = useState(null);
    const [keys, setKeys] = useState(null)
    const [values, setValues] = useState(null)
    const [aiRes, setAIRes] = useState(null);
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

  return (
    <div>
        <Header>
            <MenuContainer></MenuContainer>
            SpecificPart
            </Header>
            <p>
            {!aiRes && `Suggestion from our AI....` }
            
            </p>
        
            <b>
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

                <button onClick={purchaseThisPart} style={{marginLeft: 'auto', marginRight: 'auto'}}>Buy</button>
            </div>
        
    </div>

  )
}

export default SpecificPart