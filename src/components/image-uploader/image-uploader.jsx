import "./image-uploader.css";
import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { storage } from "../../config/firebase";

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
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageFile(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {percent && <p>{percent}% done</p>}
      {imageUrl && <div>
        <img className="titleImage" src={imageUrl} alt={imageUrl}/>
      </div>}
    </div>
  );
}

export default ImageUploader;