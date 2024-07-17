import PropTypes from "prop-types";
import { useState } from "react";

const Weather = ({ weather }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < weather.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center items-center">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="bg-gray-700 text-white p-2 rounded-lg mr-2"
          >
            &lt;
          </button>
        )}
        {weather
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((day, index) => {
            const isToday = currentIndex === 0 && index === 0;
            const date = new Date(day.dt * 1000);

            return (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md flex flex-col items-center m-2"
                style={{ width: "150px" }}
              >
                <div className="text-center">
                  {isToday ? (
                    <>
                      <p>{(((day.temp.day - 273.15) * 9) / 5 + 32).toFixed(1)}°F
                      </p>
                      <p>UV Index:{" "}{day.uvi}</p>
                    </>
                  ) : (
                    <>
                      <p>
                        Min:{" "}
                        {(((day.temp.min - 273.15) * 9) / 5 + 32).toFixed(1)}°F
                      </p>
                      <p>
                        Max:{" "}
                        {(((day.temp.max - 273.15) * 9) / 5 + 32).toFixed(1)}°F
                      </p>
                    </>
                  )}
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                    className="w-12 h-12"
                  />
                  <p>Humidity: {day.humidity}%</p>
                  <p>Wind: {(day.wind_speed * 2.237).toFixed(1)} mph</p>
                  <p>
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}{" "}
                    {date.toLocaleDateString("en-US", {
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        {currentIndex + itemsPerPage < weather.length && (
          <button
            onClick={handleNext}
            className="bg-gray-700 text-white p-2 rounded-lg ml-2"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

Weather.propTypes = {
  weather: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired,
        }),
      ).isRequired,
      temp: PropTypes.shape({
        day: PropTypes.number.isRequired,
        min: PropTypes.number,
        max: PropTypes.number,
      }).isRequired,
      humidity: PropTypes.number.isRequired,
      wind_speed: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Weather;
