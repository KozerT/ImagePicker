export const fetchAvailablePlaces = async () => {
  const response = await fetch("http://localhost:3001/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
};

export const updateUserPlaces = async (places) => {
  const response = await fetch("http://localhost:3001/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
};

export default { fetchAvailablePlaces, updateUserPlaces };