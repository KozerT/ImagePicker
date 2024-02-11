import React from "react";
import Images from "./Images";

const AvailablePlaces = ({ handleSelectImage }) => {
  return (
    <Images
      title="Available Places"
      images={[]}
      fallbackText="No places available."
    />
  );
};

export default AvailablePlaces;
