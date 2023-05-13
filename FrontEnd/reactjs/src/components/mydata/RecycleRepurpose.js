import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../static/Constants'
import Header from '../Header'
import MenuContainer from '../menu/MenuContainer'
import { UserDetails } from '../static/UserDetails'

const RecycleRepurpose = () => {

    const [part, setPart] = useState(null)
    const [id, setId] = useState(null)
    const [keys, setKeys] = useState([])
    const [values, setValues] = useState([])
    const [aiRes, setAIRes] = useState(null)
    const [tempList, setLi] = useState([])
    let {state} = useLocation()

    const navigate = useNavigate()
    useEffect(() => {
        // console.log(state.part);
        setPart(state?.part)
    }, [])

    useEffect(() => {
        if(part != null){

            console.log("imp", part)
            const URL = BACKEND_URL + '/ai/getRecommendationForPart/';
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(part)
            }).then(res => res.json()).then(res => setAIRes(res.result))
            keyValues()
            
        }
    }, [part])

    useEffect(() => {
        if (values.length > 0) {
            console.log(new Array(values.length).fill(0))
            setLi(new Array(values.length).fill(0));
        }
    }, [values])

    const keyValues = async() => {
        if(part != null){

            console.log("keyvalues", part)
            console.log(Object.keys(part))
            setId(part._id);
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
    
    const handleRecycle = () => {
        const URL = BACKEND_URL + '/user/recycleAuction/?userName='+encodeURIComponent(UserDetails.user.userName)+'&id='+ encodeURIComponent(id);
        fetch(URL, {
            method: 'POST'
        }).then(res => res.json()).then(res => {
            if (res.message)
                alert(res.message)
            navigate('/my-data')
        })
    
    }

   const handleReManufacturer = () => {
    const URL = BACKEND_URL + '/user/remanufactureAuction/?userName='+encodeURIComponent(UserDetails.user.userName)+'&id='+ encodeURIComponent(id);
        fetch(URL, {
            method: 'POST'
        }).then(res => res.json()).then(res => {
            if (res.message)
                alert(res.message)
            navigate('/my-data')
        })
   }


  return (
    <div>
        <Header>
            <MenuContainer></MenuContainer>
            ReImagine Future
        </Header>
        <p>
            {!aiRes && `Generating Insights from our AI.... Please wait` }
            
            </p>
        
            <b>AI: 
            {aiRes}
            </b>
            <br/>
            <br/>
           <b>
                Part Complete Detail-
                </b>
                
                <br/>

            <div>

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
                </div>
            <button onClick={handleRecycle}>Re-Cycle</button>
            <button onClick={handleReManufacturer}>Re-Manufacture</button>
            <button >Re-Purpose</button>
    </div>
  )
}

export default RecycleRepurpose