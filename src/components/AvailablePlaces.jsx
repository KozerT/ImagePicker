import { useEffect, useState } from "react";
import Images from "./Images";
import ErrorComponent from "./Error";
import { sortPlacesByDistance } from "../loc";

const AvailablePlaces = ({ onSelectImage }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3001/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
        setIsFetching(false);
      }
    };
    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorComponent title="An error occurred!" message={error.message} />
    );
  }
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
