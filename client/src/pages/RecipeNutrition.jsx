import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Chart } from "primereact/chart";
import Box from "@mui/material/Box";
import axios from "axios";
import { ServerIP, ServeIP } from "../IP";
import oil from "../assets/oil.jpg";
import styled from "styled-components";
import bg_1 from "../assets/bg_1.jpg";

export default function RecipeNutrition() {
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [food, setFood] = useState({});

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    console.log("totalSize: " + e.files);
    console.log("totalSize: " + e.files.length);
    Array.from(e.files).forEach((file) => {
      _totalSize += file.size;
    });
    console.log("totalSize: " + _totalSize);
    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{ width: "300px", height: "20px", marginLeft: "auto" }}
        ></ProgressBar>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const myUploader = (event) => {
    //event.files == files to upload
    console.log("hi" + event.files);
    const formData = new FormData();
    Array.from(event.files).forEach((file) => {
      formData.append("uploadFile", file);
    });

    // console.log(formData.get('recipe_content'));
    // console.log(formData.getAll('uploadFiles'));
    axios({
      method: "POST",
      url: `${ServerIP}/RecipeDB/nser/fooImageDetectionNutritionalInfo`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(function (res) {
      console.log("sd");
      if (res.status === 200) {
        console.log(res.data.nutritional_info.totalNutrients);
        var nu = res.data.nutritional_info.totalNutrients;
        setBasicData({
          labels: ["Calcium", "Carbs", "Fat", "Cholesterol", "Protein"],
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "#42A5F5",
              data: [
                nu.CA.quantity,
                nu.CHOCDF.quantity,
                nu.FAT.quantity,
                nu.CHOLE.quantity,
                nu.PROCNT.quantity,
              ],
            },
            {
              label: "My Second dataset",
              backgroundColor: "#FFA726",
              data: [700, 130, 51, 300, 90],
            },
          ],
        });
        // return response.json();
      } else if (res.status === 403) {
        //window.location.href = "/login"; // redirect
      } else {
        new Error(res);
      }
    });
  };

  const [basicData, setBasicData] = useState({
    labels: ["Calcium", "Carbs", "Fat", "Cholesterol", "Protein"],
    datasets: [
      {
        label: "My Food Nutritions",
        backgroundColor: "#42A5F5",
        data: [0, 0, 0, 0, 0],
      },
      {
        label: "Recommanded Adult Nutritions",
        backgroundColor: "#FFA726",
        data: [700, 130, 51, 300, 90],
      },
    ],
  });
  const getLightTheme = () => {
    let horizontalOptions = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    return {
      horizontalOptions,
    };
  };

  const onRemoveClear = () => {
    setBasicData({
      labels: ["Calcium", "Carbs", "Fat", "Cholesterol", "Protein"],
      datasets: [
        {
          label: "My Food Nutritions",
          backgroundColor: "#42A5F5",
          data: [0, 0, 0, 0, 0],
        },
        {
          label: "Recommanded Adult Nutritions",
          backgroundColor: "#FFA726",
          data: [700, 130, 51, 300, 90],
        },
      ],
    });
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };
  const { horizontalOptions } = getLightTheme();
  return (
    <Container>
      <img
        style={{
          objectFit: "cover",
          height: "400px",
          width: "1920px",
          marginTop: "5%",
        }}
        src={bg_1}
      />
      <Box sx={{ width: "auto", typography: "body1", marginTop: "120px" }}>
        <Toast ref={toast}></Toast>

        <Tooltip
          target=".custom-choose-btn"
          content="Choose"
          position="bottom"
        />
        <Tooltip
          target=".custom-upload-btn"
          content="Upload"
          position="bottom"
        />
        <Tooltip
          target=".custom-cancel-btn"
          content="Clear"
          position="bottom"
        />

        <div>
          <FileUpload
            ref={fileUploadRef}
            name="demo[]"
            url="./upload"
            multiple
            accept="image/*"
            maxFileSize={1000000}
            onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            onRemove={onRemoveClear}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            customUpload
            uploadHandler={myUploader}
          />
        </div>

        <div>
          <h5>Horizontal</h5>
          <Chart type="bar" data={basicData} options={horizontalOptions} />
        </div>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  margintop: 5%;
`;
