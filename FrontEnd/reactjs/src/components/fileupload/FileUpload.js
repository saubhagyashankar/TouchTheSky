import React, { useState } from 'react'
import { BACKEND_URL } from '../static/Constants';

const  FileUpload = () => {
    const [selectedFile, setSelectedFile] =useState(null);

    const onChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleFileUpload = () => {
        const URL = BACKEND_URL + '/user/togeneraldata'
        const data = new FormData();
        data.append('file', selectedFile);
        fetch(URL, {
            method: 'POST',
            body: data,
        }).then(res => res.json()).then(res => {
            //todo: handle
        })

    }


  return (
    <div>FileUpload
        <input type='file' name='file' onChange={e => onChangeHandler}></input>
        <button onClick={handleFileUpload}>Upload</button>
        
    </div>
  )
}

export default FileUpload