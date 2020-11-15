
import React from "react";
import {accountService} from '@/_services'



export default function PictureUpload() {
  const imageUploader = React.useRef(null);
  const [picture, setPicture] = React.useState("");
  const fetchPicture = async () => {
    const response = await accountService.getPicture();
    setPicture(response);
  };
  fetchPicture()

    const handleImageUpload = e => {
        const [file] = e.target.files;
        const imagedata = e.target.files[0]
        if (file) {
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
                height: "60px",
                width: "60px",
                border: "1px dashed black"
            }
        }
        onClick = {() => imageUploader.current.click()} >
    <img src = {picture}
            style = {
                {
                    width: "100%",
                    height: "100%",
                }
            }/>
          </div>

        Clickee para cambiar su avatar
        </div>
    );
}
