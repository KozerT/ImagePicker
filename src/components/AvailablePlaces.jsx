import { useEffect, useState } from "react";
import Images from "./Images";

const AvailablePlaces = ({ onSelectImage }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/places")
      .then((response) => response.json())
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []);

  return (
    <Images
      title="Available Places"
      images={availablePlaces}
      fallbackText="No places available."
      onSelectImage={onSelectImage}
    />
  );
};

export default AvailablePlaces;
