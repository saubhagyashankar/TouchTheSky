import React, { useState } from 'react'
import Header from '../Header'
import FileUpload from '../fileupload/FileUpload'
import { BACKEND_URL } from '../static/Constants'
import GeneralData from '../../components/generaldata/GeneralData'
import Dashboard from '../dashboards/Dashboard'

function AirlineHomePage() {
    const [data, setData] = useState(null)

    const getAllGeneralData = () => {
        const URL = BACKEND_URL + '/user/getAllGeneralData'
        fetch(URL).then(res => res.json()).then(res => setData(res.data))
    }
  return (
    <div>
        <Header>
            AirlineHomePage
        </Header>

        <Dashboard></Dashboard>

        <FileUpload></FileUpload>
        <button onClick={getAllGeneralData}>Fetch data</button>
        <p>{data && data.map((item, index) => (
            <div key={index}>
                {item.partName}
            </div>
        ))}</p>


            <GeneralData>

            </GeneralData>

        </div>
  )
}

export default AirlineHomePage