import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/login/Login'
import Home from './components/home/Home'
import CreateUser from './components/login/CreateUser'
import Logout from './components/login/Logout'

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>

          <Route exact path='/' element={<Login></Login>}></Route>
          <Route  path='/home' element={<Home></Home>}></Route>
          <Route  path='/create-user' element={<CreateUser></CreateUser>}></Route>
          <Route  path='/logout' element={<Logout></Logout>}></Route>
        
        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
