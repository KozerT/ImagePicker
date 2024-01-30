import { useRef, useState } from "react";
import { AVAILABLE_IMAGES } from "./data.js";
import Images from "./components/Images.jsx";

function App() {
  const modal = useRef();
  const selectedImage = useRef();
  const [pickedImages, setPickedImages] = useState([]);

  function handleStartRemoveImage(id) {
    modal.current.open();
    selectedImage.current = id;
  }

  function handleSelectImage(id) {
    setPickedImages((prevPickedImages) => {
      if (prevPickedImages.some((image) => image.id === id)) {
        return prevPickedImages;
      }
      const image = AVAILABLE_IMAGES.find((image) => image.id === id);
      return [image, ...prevPickedImages];
    });
  }

  return (
    <>
      <header>
        <h1>Dream Destination Gallery</h1>
        <p>
          Create a visual collection of dream destinations to motivate your
          travel adventures.
        </p>
      </header>
      <main>
        <Images
          title="My curated collection"
          fallbackText={
            "Select images that resonate with you from the gallery."
          }
          images={pickedImages}
          onSelectImage={handleStartRemoveImage}
        />
        <Images
          title="Gallery"
          images={AVAILABLE_IMAGES}
          onSelectImage={handleSelectImage}
        />
      </main>
    </>
  );
}

export default App;
