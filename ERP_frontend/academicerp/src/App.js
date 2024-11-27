
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddDomain from './domains/AddDomain';
import ModifyDomain from './domains/ModifyDomain';
import ViewStudents from './domains/ViewStudents';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/addDomain" element={<AddDomain/>}/>
        <Route exact path="/editDomain/:id" element={<ModifyDomain/>}/>
        <Route exact path="/viewStudents/:domain_id" element={<ViewStudents/>}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;

