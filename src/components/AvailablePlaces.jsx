import { useEffect, useState } from "react";
import Images from "./Images";

const AvailablePlaces = ({ onSelectImage }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      const response = await fetch("http://localhost:3001/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false);
    };
    fetchPlaces();
  }, []);

  return (
    <Images
      title="Available Places"
      images={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data.."
      fallbackText="No places available."
      onSelectImage={onSelectImage}
    />
  );
};

export default AvailablePlaces;
