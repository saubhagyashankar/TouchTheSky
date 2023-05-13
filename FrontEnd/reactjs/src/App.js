import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/login/Login'
import Home from './components/home/Home'
import CreateUser from './components/login/CreateUser'
import Logout from './components/login/Logout'
import GeneratePetNames from './components/generatepetnames/GeneratePetNames';
import Dashboard from './components/dashboards/Dashboard';
import SpecificPart from './components/generaldata/SpecificPart';
import GeneralData from './components/generaldata/GeneralData';
import MyData from './components/mydata/MyData';
import UploadParts from './components/uploadparts/UploadParts';
import RecycleRepurpose from './components/mydata/RecycleRepurpose';
import RecycleParts from './components/recyclefacility/RecycleParts';
import CompleteRecycle from './components/recyclefacility/CompleRecycle';
import RemanufactureParts from './components/manufacturer/RemanufactureParts';
import CompleteRemanufacturing from './components/manufacturer/CompleteRemanufacturing';


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
          <Route  path='/specific-part' element={<SpecificPart></SpecificPart>}></Route>
          <Route  path='/general-data' element={<GeneralData></GeneralData>}></Route>
          <Route  path='/my-data' element={<MyData></MyData>}></Route>
          <Route  path='/upload-parts' element={<UploadParts></UploadParts>}></Route>
          <Route  path='/recycle-repurpose-page' element={<RecycleRepurpose></RecycleRepurpose>}></Route>
          <Route  path='/recycle-parts' element={<RecycleParts></RecycleParts>}></Route>
          <Route  path='/complete-recycle' element={<CompleteRecycle></CompleteRecycle>}></Route>
          <Route  path='/remanufacture-parts' element={<RemanufactureParts></RemanufactureParts>}></Route>
          <Route  path='/complete-remanufacturing' element={<CompleteRemanufacturing></CompleteRemanufacturing>}></Route>
          
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
