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
        <h1>Image Picker</h1>
        <p>
          Create your personal collection of images of places you would like to
          visit.
        </p>
      </header>
      <main>
        <Images
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          images={pickedImages}
          onSelectImage={handleStartRemoveImage}
        />
        <Images
          title="Available Places"
          images={AVAILABLE_IMAGES}
          onSelectImage={handleSelectImage}
        />
      </main>
    </>
  );
}

export default App;
