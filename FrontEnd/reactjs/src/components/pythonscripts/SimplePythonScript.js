import React, { useState } from 'react'
import { BACKEND_URL } from '../static/Constants'



const SimplePythonScript = () => {

    const [inputArg, setInputArg] = useState('')
    const [scriptOutput, setScriptOutput] = useState(null)

    const executePythonScript = () => {
        const URL = BACKEND_URL + '/pythonScripts/runSimplepythonscript/?inputArg=' + encodeURIComponent(inputArg)
        fetch(URL).then(res => res.json()).then(res => {
            if(res.message){
                setScriptOutput(res.message);
            }
        })
    }


    return (
        <div>
            <input type='text' value={inputArg} onChange={e => setInputArg(e.target.value)} placeholder='Enter text'></input>
            <button onClick={executePythonScript}>Run Simple Python Script</button>
            <p>{scriptOutput}</p>
        </div>
    )
}


export default SimplePythonScript