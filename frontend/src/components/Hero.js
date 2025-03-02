import React, {useState} from "react";
import "../styles/Hero.css";
import heroImage from "../assets/images/heroImage.jpg";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [food, setFood] = useState("");

  const handleSearch = () => {
    if (location.trim() === "" && food.trim() === "") {
      alert("Please enter both location and food/restaurant name!");
      return;
    }
    console.log(`Searching for ${food} in ${location}`);
    // Here, you can call an API to fetch restaurant details
  };

  return (
    <div className="hero hero-container" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content text-center">
        <h1>Delicious Food, Delivered Fast!</h1>
        <p>Order from the best restaurants in town</p>
        <div className="search-container">
          <input className="location-search"
            type="text"
            placeholder="Enter your location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search for food or restaurant..."
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;