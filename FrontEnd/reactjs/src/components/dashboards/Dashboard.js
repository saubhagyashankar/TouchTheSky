import React, { useEffect, useState } from 'react'
import ChartRecycle from './ChartRecycle';
import { BACKEND_URL } from '../static/Constants';
import { UserDetails } from '../static/UserDetails';
import MenuContainer from '../menu/MenuContainer';
import Header from '../Header';


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
            <Header>
                <MenuContainer></MenuContainer>
                Dashboard
            </Header>
            {/* All the graphs go here */}
            {data && 
            <ChartRecycle data={data}></ChartRecycle>
            }
        </div>
    )
}

export default Dashboard