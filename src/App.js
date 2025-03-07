import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Layout/Navbar';
import HomePage from './pages/Home';
import ChildGame from './pages/ChildGame';
import Colorpicer from './pages/colorpicer';
import ScrambleWord from './pages/scrambleWord';
import WordsByLevel  from './pages/wordsByLevel ';
import ScavengerHunt   from './pages/ScavengerHunt';
import WordAssociationGame   from './pages/WordAssociationGame';
import WordMemoryGame   from './pages/WordMemoryGame';
import Mathgame from './pages/Mathgame';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import CarRacing from './pages/CarRacing';
import CarSence from './pages/CarSence'

const App = () => {
  return (
    <>
   
    <div className=' text-center mt-3'>
<h1>Child Gmes</h1>
    <Router>
      {/* <NavigationBar /> */}
      <Routes>
        {/* <Route path="/HomePage" element={<HomePage />} /> */}
        <Route path="/" element={<ChildGame />} />
        <Route path="/Colorpicer" element={<Colorpicer />} />
        <Route path="/scrambleWord" element={<ScrambleWord />} />
        <Route path="/ScavengerHunt" element={<ScavengerHunt/>} />
        <Route path="/Mathgame" element={<Mathgame />} />
        <Route path="/WordsByLevel" element={<WordsByLevel />} />
        <Route path="/WordMemoryGame" element={<WordMemoryGame />} />
        <Route path="/WordAssociationGame" element={<WordAssociationGame />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/CarSence" element={<CarSence />} />

      </Routes>
    </Router>
    </div>
    </>
  );
};

export default App;
