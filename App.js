import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loginpage from './components/Loginpage.jsx';
import Home from './components/Home.jsx';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;


