import React, { useEffect, useState } from 'react'
import ChartRecycle from './ChartRecycle';
import { BACKEND_URL } from '../static/Constants';
import { UserDetails } from '../static/UserDetails';

const Dashboard = () => {
    const [data, setData] = useState(null)

    const getSetDashboardData = () => {
        const URL = BACKEND_URL + '/user/getUserDashBoardData/?userName=' + encodeURIComponent(UserDetails.user.userName) + '&role=' + encodeURIComponent(UserDetails.user.role);
        fetch(URL).then(res => res.json()).then(res => setData(res.data))
      }


      useEffect(() => {
        //getData
        getSetDashboardData();
       
      }, []);

    return (
        <div>
            {/* All the graphs go here */}
            <ChartRecycle data={data}></ChartRecycle>
        </div>
    )
}

export default Dashboard