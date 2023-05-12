import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/login/Login'
import Home from './components/home/Home'
import CreateUser from './components/login/CreateUser'
import Logout from './components/login/Logout'
import GeneratePetNames from './components/generatepetnames/GeneratePetNames';
import Dashboard from './components/dashboards/Dashboard';
import SpecificPart from './components/generaldata/SpecificPart';


function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>

          <Route exact path='/' element={<Login></Login>}></Route>
          <Route  path='/home' element={<Home></Home>}></Route>
          <Route  path='/create-user' element={<CreateUser></CreateUser>}></Route>
          <Route  path='/logout' element={<Logout></Logout>}></Route>
          <Route  path='/generate-pet-names' element={<GeneratePetNames></GeneratePetNames>}></Route>
          <Route  path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route  path='/specific-page' element={<SpecificPart></SpecificPart>}></Route>
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
