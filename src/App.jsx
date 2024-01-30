import { useEffect, useRef, useState } from "react";
import { AVAILABLE_IMAGES } from "./data.js";
import Images from "./components/Images.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { sortPlacesByDistance } from "./loc.js";

const storedIds = JSON.parse(localStorage.getItem("selectedImages")) || [];
const storedImages = storedIds.map((id) =>
  AVAILABLE_IMAGES.find((place) => place.id === id)
);

function App() {
  const modal = useRef();
  const selectedImage = useRef();
  const [availableImages, setAvailableImages] = useState([]);
  const [pickedImages, setPickedImages] = useState(storedImages);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedImages = sortPlacesByDistance(
        AVAILABLE_IMAGES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailableImages(sortedImages);
    });
  }, []);

  function handleStartRemoveImage(id) {
    modal.current.open();
    selectedImage.current = id;
  }

  function handleStopRemoveImage() {
    modal.current.close();
  }

  function handleSelectImage(id) {
    setPickedImages((prevPickedImages) => {
      if (prevPickedImages.some((image) => image.id === id)) {
        return prevPickedImages;
      }
      const image = AVAILABLE_IMAGES.find((image) => image.id === id);
      return [image, ...prevPickedImages];
    });

    const storedIds = JSON.parse(localStorage.getItem("selectedImages")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedImages",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  function handleRemoveImage() {
    setPickedImages((prevPickedImages) =>
      prevPickedImages.filter((image) => image.id !== selectedImage.current)
    );
    modal.current.close();

    const storedIds = JSON.parse(localStorage.getItem("selectedImages")) || [];
    localStorage.setItem(
      "selectedImages",
      JSON.stringify(storedIds.filter((id) => id !== selectedImage.current))
    );
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemoveImage}
          onConfirm={handleRemoveImage}
        />
      </Modal>
      <header>
        <h1>Dream Destination Gallery</h1>
        <p>
          Create a visual collection of dream destinations to motivate your
          travel adventures.
        </p>
      </header>
      <main>
        <Images
          title="My collection"
          fallbackText={
            "Select images that resonate with you from the gallery."
          }
          images={pickedImages}
          onSelectImage={handleStartRemoveImage}
        />
        <Images
          title="Gallery"
          images={availableImages}
          fallbackText="Sort places by distance to you..."
          onSelectImage={handleSelectImage}
        />
      </main>
    </>
  );
}

export default App;
