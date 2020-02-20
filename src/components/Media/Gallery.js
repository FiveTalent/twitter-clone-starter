import React, { useState, useEffect } from 'react';

const LEVEL = "protected";

function PhotoGallery(lastRefreshTime) {

  const [ photoList, setPhotoList ] = useState([]);

  useEffect(() => {
    getImages();
  }, [lastRefreshTime])

  const getImages = async () => {
    
    const images = [];
    
    //TODO: Get images from S3

    setPhotoList(images);
  }

  const renderPhotoList = () => {
    if(!photoList || photoList.length === 0) {
      return "You have not yet added any images";
    }

    return photoList.map((item) => {
      //TODO: Render images in list

      return null;
    });
  }

  const promptForRemoval = key => {
    const confirmResult = window.confirm("Are you sure you want to delete this photo?");

    if (confirmResult === true) {
      removePhoto(key);
    } 
  }

  const removePhoto = async (key) => {
    try {
      //TODO: Remove photo from S3

      let newPhotoList = photoList.filter(function( obj ) {
        return obj.key !== key;
      });

      setPhotoList(newPhotoList);
    }
    catch(error) {
      console.error("Error Removing Photo: ", error);
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center container m-auto">
      { renderPhotoList() }
    </div>
  );
}

export default PhotoGallery;