import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BACKEND_URL } from '../static/Constants'
import Header from '../Header'
import MenuContainer from '../menu/MenuContainer'

const RecycleRepurpose = () => {

    const [part, setPart] = useState(null)
    const [keys, setKeys] = useState([])
    const [values, setValues] = useState([])
    const [aiRes, setAIRes] = useState(null)
    const [tempList, setLi] = useState([])
    let {state} = useLocation()

    useEffect(() => {
        console.log(state.part);
        setPart(state.part)
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
            delete part._id;
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

  return (
    <div>
        <Header>
            <MenuContainer></MenuContainer>
            ReImagine Future
        </Header>
        <p>
            {!aiRes && `Suggestion from our AI....` }
            
            </p>
        
            <b>
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
            <button>Re-Cycle</button>
            <button>Re-Manufacture</button>
            <button>Re-Purpose</button>
    </div>
  )
}

export default RecycleRepurpose