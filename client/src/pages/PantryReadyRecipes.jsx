
import React, { useState } from "react";
import axios from "axios";
import "../css/Pantry.css";
import styled from "styled-components";
import Recomand from "../components/Recomand";


const PantryReadyRecipes = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  const onSelectFile = (event) => {
    console.log(event.target.files);
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFiles[0]);
    console.log(typeof selectedFiles[0]);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("uploadFiles", selectedFiles[i]);
      setImageNames(selectedFiles[i].name);
    }
    console.log(formData);
    console.log(imageNames);
    axios({
      url: "/uploadAjax",
      method: "post",
      data: formData,
      baseURL: "http://http://127.0.0.1:5173/",
      //withCredentials: true,
    });
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    // FOR BUG IN CHROME
    event.target.value = "";
  };
  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }
  return (
    <Container>
    <section style={{marginTop:100}}>
      <label>
        + Add Images
        <br />
        <span>up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br/><br/>

      <input type="file" multiple />

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 food ingredients! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(selectedImages); // 보낼 사진 url 데이터(map 형태)  selectedImages
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}

      <div className="images">
        {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                  <div key={image} className="image">
                    <img src={image} height="200" alt="upload" />
                    <button onClick={() => deleteHandler(image)}>
                      delete ingredients
                    </button>
                    <p>{index + 1}</p>
                  </div>
              );
            })}
      </div>
    </section>
    <Recomand/>
    </Container>
  );
}

export default PantryReadyRecipes

const Container = styled.div`
justify-content: center;
`