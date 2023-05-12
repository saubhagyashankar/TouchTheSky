import React, { useEffect, useState } from 'react'
import ChartRecycle from './ChartRecycle';
import { BACKEND_URL } from '../static/Constants';
import { UserDetails } from '../static/UserDetails';
import MenuContainer from '../menu/MenuContainer';
import Header from '../Header';
import ChartCategory from './ChartCategory';
import ChartMaterial from './ChartMaterial';
import ChartPieMaterial from './ChartPieMaterial';




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
            <small><b><i>

                You are helping re-image the future using the circular economy
            </i>
                </b>
                 </small>
            {data && 
            <ChartRecycle data={data}></ChartRecycle>
            }
            {data &&
              <ChartMaterial data={data}></ChartMaterial>
            }
            { data &&
              <ChartPieMaterial data={data}></ChartPieMaterial>
            }
            {data && 
              <ChartCategory data ={data}></ChartCategory>
            }
        </div>
    )
}

export default Dashboard