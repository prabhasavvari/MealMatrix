import React  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";


function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}

export default App;
