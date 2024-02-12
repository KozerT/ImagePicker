const Images = ({
  title,
  images,
  fallbackText,
  onSelectImage,
  isLoading,
  loadingText,
}) => {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && images.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}
      {!isLoading && images.length > 0 && (
        <ul className="places">
          {images.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectImage(place)}>
                <img
                  src={`http://localhost:3001/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Images;
