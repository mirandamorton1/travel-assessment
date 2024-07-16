import React, { useState } from "react";
import weatherImages from "../assets/weatherImages";
import hotelImages from "../assets/hotelImages";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getRandomImage = (images) =>
    images[Math.floor(Math.random() * images.length)];

  const handleSearch = () => {
    // Simulate search results
    setSearchResults({
      weather: "Weather data for city",
      hotels: "Hotel listings for city",
    });
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
            <p>{searchResults.hotels}</p>
          </div>
        ) : (
          <React.Fragment>
            <div
              className="mt-10 mb-10"
              style={{
                border: "2px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                width: `calc(5 * 150px + 4 * 10px)`,
              }}
            >
              {currentIndex > 0 && <button onClick={handlePrev}>&lt;</button>}
              {weatherImages
                .slice(currentIndex, currentIndex + 5)
                .map((image, index) => (
                  <div
                    key={index}
                    className="weather-card mr-2"
                    style={{ display: "inline-block" }}
                  >
                    <img
                      src={image}
                      alt={`Weather ${index}`}
                      style={{
                        width: "150px", 
                        height: "150px", 
                        objectFit: "cover",
                        borderRadius: "10px",
                        opacity: "0.9",
                      }}
                    />
                  </div>
                ))}
              {currentIndex + 5 < weatherImages.length && (
                <button onClick={handleNext}>&gt;</button>
              )}
            </div>
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
