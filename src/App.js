import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import StateNote from './context/StateNote';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {

  return (
    <>
    <StateNote>
      <Router>
        <Navbar/>
        <div className="container">
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </div>
      </Router>
    </StateNote>
    </>
  );
}

export default App;
