import React, { useState } from 'react';
import PhotoGallery from './Gallery';

function Media() {
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState('');
  const [lastUploadTime, setLastUploadTime] = useState('');

  const uploadImage = async (level) => {
    if(!selectedImage) {
      alert("No Image Selected");
      return;
    }

    const uploadResult = null; //TODO: Upload image to S3

    if(uploadResult && uploadResult.key) {
      clearImageSelection();
      setLastUploadTime(new Date());
    }
  }

  const clearImageSelection = () => {
    setImagePreview('');
    setSelectedImage('');
  }

  const renderImageSelection = () => {
    return "TODO ADD IMAGE SELECTION USING AMPLIFY REACT COMPONENTS";
  }

  const renderImageUpload = () => {
    return (
      <React.Fragment>
        <h3 className="text-2xl font-bold text-blue-700 m-2">Selected Image</h3>
        <img src={imagePreview} className="w-1/2 m-auto" alt="upload preview" />

        <div className="flex justify-center m-4">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline curstor-pointer m-2" 
            onClick={() => uploadImage('private')} 
            type="button"
          >
            Upload Private Image
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline curstor-pointer m-2" 
            onClick={() => uploadImage('protected')} 
            type="button"
          >
            Upload Protected Image
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline curstor-pointer m-2" 
            onClick={() => uploadImage('public')} 
            type="button"
          >
            Upload Public Image
          </button>
          <button 
            className="bg-white hover:bg-blue-500  hover:text-white text-blue-500 font-bold border-2 border-blue-500 py-2 px-4 rounded-full cursor-pointer m-2" 
            onClick={() => clearImageSelection()} 
            type="button"
          >
            Pick New Image
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center container m-auto pb-12">
      {!selectedImage ? renderImageSelection() : renderImageUpload()}

      <div className="flex flex-col w-1/2 m-auto mt-4">
        TODO RENDER IMAGE GALLERY
      </div> 
    </div>
  );
}

export default Media;