import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header'
import MenuContainer from '../menu/MenuContainer'

const SpecificPart = () => {

    const [part, setPart] = useState(null)
    const [keys, setKeys] = useState(null)
    const [values, setValues] = useState(null)
    let {state} = useLocation()

    useEffect(() => {

        setPart(state.part)
    }, [])

    useEffect(() => {
        keyValues()
        console.log(part);
    }, [part])

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
            SpecificPart
            </Header>

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

                <button style={{marginLeft: 'auto', marginRight: 'auto'}}>Buy</button>
            </div>
        
    </div>

  )
}

export default SpecificPart