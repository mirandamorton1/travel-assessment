import React, { useState } from "react";
import weatherImages from "../assets/weatherImages";
import hotelImages from "../assets/hotelImages";
import Weather from "./Weather";
import Hotels from "./Hotels";
import Placeholders from "./Placeholders";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [city, setCity] = useState("");
  const apiKey = "d3eead63102fa89270ce7815325e96cd";

  const getRandomImage = (images) =>
    images[Math.floor(Math.random() * images.length)];

  const fetchCoordinates = async (city, apiKey) => {
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
    );
    const geoData = await geoResponse.json();
    if (geoData.length === 0) {
      throw new Error("City not found");
    }
    return { lat: geoData[0].lat, lon: geoData[0].lon };
  };

  const fetchWeatherData = async (lat, lon, apiKey) => {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );
    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const weatherData = await weatherResponse.json();
    return weatherData;
  };

  const handleSearch = async () => {
    try {
      const { lat, lon } = await fetchCoordinates(city, apiKey);
      console.log("Coordinates:", { lat, lon });

      const weatherData = await fetchWeatherData(lat, lon, apiKey);
      console.log("Weather Data:", weatherData);

      setSearchResults({
        weather: weatherData.daily,
        hotels: "Hotel listings for city",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNext = () => {
    if (currentIndex + 5 < weatherImages.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 5 >= 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };

  const weatherPlaceholder = getRandomImage(weatherImages);
  const hotelPlaceholder = getRandomImage(hotelImages);

  return (
    <div>
      <div className="max-w-sm mx-auto flex">
        <input
          type="text"
          placeholder="Search..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 mr-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="bg-violet-600 text-white p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        >
          Go!
        </button>
      </div>
      <div
        className="tables-container"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        {searchResults ? (
          <div>
            <Weather weather={searchResults.weather} />
            <Hotels hotels={searchResults.hotels} />
          </div>
        ) : (
          <React.Fragment>
            <Placeholders
              images={weatherImages}
              currentIndex={currentIndex}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
            <div
              className="hotel-images"
              style={{
                border: "2px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
                marginTop: "20px",
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                minWidth: `${hotelImages.length * 210}px`,
              }}
            >
              {hotelImages.map((image, index) => (
                <div
                  key={index}
                  className="hotel-card mr-2"
                  style={{ display: "inline-block" }}
                >
                  <img
                    src={image}
                    alt={`Hotel ${index}`}
                    style={{
                      maxWidth: "200px",
                      borderRadius: "10px",
                      opacity: "0.8",
                    }}
                  />
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
