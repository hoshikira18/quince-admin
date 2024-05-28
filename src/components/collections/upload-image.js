"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const UploadImage = ({ images, setImages, isMultiple = false }) => {
  const [imageURL, setImageURL] = useState("");
  const [imagesURL, setImagesURL] = useState([]);

  useEffect(() => {
    if (images.length === 0) return;
    if (isMultiple) {
      setImagesURL([...images].map((image) => URL.createObjectURL(image)));
      return;
    }
    setImageURL(URL.createObjectURL(images[0]));
  }, [images]);

  return (
    <>
      <Input
        type="file"
        multiple={isMultiple}
        id={`thumbnail`}
        className={`w-full transition-all duration-500`}
        onChange={(e) => {
          setImages([...e.target.files]);
        }}
      />
      {imageURL && (
        <img
          src={imageURL || ""}
          alt=""
          className={"mt-5 rounded-lg border-2"}
        />
      )}
      {imagesURL.length > 0 && (
        <div className={`grid grid-cols-4 gap-5 mt-5`}>
          {imagesURL.map((url, index) => (
            <img
              key={index}
              src={url}
              alt=""
              className={"rounded-lg col-span-1 object-cover h-40 border-2"}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UploadImage;
