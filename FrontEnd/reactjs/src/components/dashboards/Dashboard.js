import React, { useEffect, useState } from 'react'
import ChartRecycle from './ChartRecycle';
import { BACKEND_URL } from '../static/Constants';
import { UserDetails } from '../static/UserDetails';
import MenuContainer from '../menu/MenuContainer';
import Header from '../Header';
import ChartCategory from './ChartCategory';
import ChartMaterial from './ChartMaterial';
import ChartPieMaterial from './ChartPieMaterial';

// import logo from '../assets/load.gif'


const Dashboard = () => {
    const [data, setData] = useState(null)

    const getSetDashboardData = () => {
        setTimeout(() => {
            const URL = BACKEND_URL + '/user/getUserDashBoardData/?userName=' + encodeURIComponent(UserDetails.user.userName) + '&role=' + encodeURIComponent(UserDetails.user.role);
            fetch(URL).then(res => res.json()).then(res => setData(res.data))
        }, 1000);
      }
      
      useEffect(() => {
        //getData
        getSetDashboardData();
       
      }, []);

    return (
        <div>
            <Header>
                <MenuContainer></MenuContainer>
                Dashboard - {UserDetails && UserDetails.user.userName}
            </Header>
            {/* All the graphs go here */}
            <small><b><i>

                Be Proud!, You are helping Re-Imagine the future using the Sustainable circular economy!
            </i>
                </b>
                 </small>
                     { data &&
                       <ChartPieMaterial data={data}></ChartPieMaterial>
                     }
                     {data && 
                       <ChartCategory data ={data}></ChartCategory>
                     }
                 <div style={{display: 'flex' ,    flexDirection: "column"}}>

            {data && 
            <ChartRecycle style={{justifyContent: ''}}  data={data}></ChartRecycle>
        }
            {data &&
              <ChartMaterial data={data}></ChartMaterial>
            }
            </div>
        </div>
    )
}

export default Dashboard