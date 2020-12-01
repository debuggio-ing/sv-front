
import React from "react";
import {accountService} from '@/_services'



export default function PictureUpload() {
  const imageUploader = React.useRef(null);
  const uploadedImage = React.useRef(null);
  const [picture, setPicture] = React.useState("");

  React.useEffect(() => {
    async function fetchPicture() {
        const response = await accountService.getPicture();
        setPicture(response);
      } fetchPicture();
  }, []);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        const imagedata = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
            let formData = new FormData();
            formData.append('file', imagedata,file.name);
            accountService.uploadPicture(formData)
        }
    };

    return (

        < div style = {
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }} >
        <form encType="multipart/form-data" action="">
                < input type = "file"
                accept = "image/*"
                onChange = {handleImageUpload}
                ref = {imageUploader}
                style = {{display: "none"}}/>
        </form>
            < div style = {{
                height: "200px",
                width: "200px",
                border: "4px solid black"
            }
        }
        onClick = {() => imageUploader.current.click()} >
    <img src = {picture} ref = {uploadedImage}
            style = {
                {
                    objectFit: 'cover',
                    width: "100%",
                    height: "100%",
                }
            }/>
          </div>

        Clickee para cambiar su avatar
        </div>
    );
}
