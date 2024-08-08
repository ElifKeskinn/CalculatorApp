import React from "react";
import Header from "./components/Header"
import Calculator from "./components/Calculator";
import ThemeSwitch from "./components/ThemeSwitch";
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Calculator />
        <ThemeSwitch />
      </div>
    </div>
  );
}

export default App;
