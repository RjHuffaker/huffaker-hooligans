import Resizer from "react-image-file-resizer";

export const resizeImageFile = (file, maxWidth, maxHeight) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  }
);