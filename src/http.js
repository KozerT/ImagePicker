const fetchAvailablePlaces = async () => {
  const response = await fetch("http://localhost:3001/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
};

export default fetchAvailablePlaces;
