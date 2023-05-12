import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SpecificPart = () => {

    const [part, setPart] = useState(null)
    let {state} = useLocation()

    useEffect(() => {
        setPart(state.part)
    }, [])

    useEffect(() => {
        console.log(part);
    }, [part])

  return (
    <div>SpecificPart

        <ul>

        {part && part.map((field, index) => (
            <li key={index}>{field}</li>    
        ))}

        </ul>
    </div>

  )
}

export default SpecificPart