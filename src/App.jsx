import { useCallback, useRef, useState } from "react";
import Images from "./components/Images.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation";
import AvailablePlaces from "./components/AvailablePlaces";

function App() {
  const selectedImage = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [pickedImages, setPickedImages] = useState([]);

  function handleStartRemoveImage(id) {
    setModalIsOpen(true);
    selectedImage.current = id;
  }

  function handleStopRemoveImage() {
    setModalIsOpen(false);
  }

  function handleSelectImage(selectedImage) {
    setPickedImages((prevPickedImages) => {
      if (!prevPickedImages) {
        prevPickedImages = [];
      }
      if (prevPickedImages.some((place) => place.id === selectedImage.id)) {
        return prevPickedImages;
      }
      return [selectedImage, ...prevPickedImages];
    });
  }

  const handleRemoveImage = useCallback(async function handleRemoveImage() {
    setPickedImages((prevPickedImages) =>
      prevPickedImages.filter((image) => image.id !== selectedImage.current.id)
    );
    setModalIsOpen(false);
  }, []);

  return (
    <>
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
