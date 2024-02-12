import { useCallback, useRef, useState } from "react";
import Images from "./components/Images.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation";
import AvailablePlaces from "./components/AvailablePlaces";
import { updateUserPlaces } from "./http.js";
import ErrorComponent from "./components/Error.jsx";

function App() {
  const selectedImage = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [pickedImages, setPickedImages] = useState([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  function handleStartRemoveImage(id) {
    setModalIsOpen(true);
    selectedImage.current = id;
  }

  function handleStopRemoveImage() {
    setModalIsOpen(false);
  }

  const handleSelectImage = async (selectedImage) => {
    setPickedImages((prevPickedImages) => {
      if (!prevPickedImages) {
        prevPickedImages = [];
      }
      if (prevPickedImages.some((place) => place.id === selectedImage.id)) {
        return prevPickedImages;
      }
      return [selectedImage, ...prevPickedImages];
    });
    try {
      await updateUserPlaces([selectedImage, ...pickedImages]);
    } catch (error) {
      setPickedImages(pickedImages); //role-back the changes
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update place",
      });
    }
  };

  const handleRemoveImage = useCallback(
    async function handleRemoveImage() {
      setPickedImages((prevPickedImages) =>
        prevPickedImages.filter(
          (image) => image.id !== selectedImage.current.id
        )
      );

      try {
        await updateUserPlaces(
          pickedImages.filter((place) => place.id !== selectedImage.current.id)
        );
      } catch (error) {
        setPickedImages(pickedImages);
        setErrorUpdatingPlaces({
          message: error.message || "Failed to delete place",
        });
      }

      setModalIsOpen(false);
    },
    [pickedImages]
  );

  const handleError = () => {
    setErrorUpdatingPlaces(null);
  };

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorComponent
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemoveImage}>
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
        <AvailablePlaces onSelectImage={handleSelectImage} />
      </main>
    </>
  );
}

export default App;
