import PropTypes from "prop-types";

const Placeholders = ({ images, currentIndex, handleNext, handlePrev }) => {
  return (
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
      {images.slice(currentIndex, currentIndex + 5).map((image, index) => (
        <div
          key={index}
          className="weather-card mr-2"
          style={{ display: "inline-block" }}
        >
          <img
            src={image}
            alt={`Placeholder ${index}`}
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
      {currentIndex + 5 < images.length && (
        <button onClick={handleNext}>&gt;</button>
      )}
    </div>
  );
};

Placeholders.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentIndex: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
};

export default Placeholders;
