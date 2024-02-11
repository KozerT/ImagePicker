import { useEffect, useState } from "react";
import Images from "./Images";

const AvailablePlaces = ({ onSelectImage }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await fetch("http://localhost:3001/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    };
    fetchPlaces();
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
