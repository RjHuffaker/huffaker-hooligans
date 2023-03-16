import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";

import { storage } from "../../config/firebase-storage";

import "./image-uploader.css";

function ImageUploader({imageUrl, setImageUrl}) {
  const [ imageFile, setImageFile ] = useState(null);
  const [ percent, setPercent ]= useState();

  const uploadFile = () => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
        );
      
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setImageUrl(url);
          });
        }
      );
  };
  
  return (
    <>
      <InputGroup>
        <input
          type="file"
          className="form-control"
          onChange={(event) => {
            setImageFile(event.target.files[0]);
          }}
        />
      </InputGroup>

      {imageUrl && <img className="w-100" src={imageUrl} alt={imageUrl}/>}

      {imageFile && <>
        <InputGroup>
          <Button className="w-100" onClick={uploadFile}> 
            {percent > 0 ? <p>{percent}% done</p> : <span>Upload Image</span>}
          </Button>
        </InputGroup>
      </>}
    </>
  );
}

export default ImageUploader;