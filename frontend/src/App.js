import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LogIn } from './Components/LogInPage/logIn'; // Assuming the Login component is in this path
import { Dashboard } from './Components/Dashboard/dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          
            {/* Left half for Greeting */}
            

            {/* Right half for the Form (Login/Register) */}
            
              
              <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            
          
        </header>
      </div>
    </Router>
  );
}

export default App;
