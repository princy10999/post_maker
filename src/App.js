import React, { useState, createRef, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useScreenshot, createFileName } from "use-react-screenshot";
import webImage from "./assets/image/webito_infotech.png";
import CropEasy from "./Components/crop/CropEasy";
import SVGPhoto from "./Components/SVGPhoto";
import "./assets/style/index.css";

function App() {
  const [state, setState] = React.useState({ name: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const ref = createRef(null);
  const [fileMain, setFileMain] = React.useState(null);
  const [fileSide, setFileSide] = React.useState(null);
  const [photoURLSide, setPhotoURLSide] = React.useState();
  const [photoURLMain, setPhotoURLMain] = React.useState();
  const [photoMain, setPhotoMain] = React.useState();
  const [photoSide, setPhotoSide] = React.useState();
  const [type, setType] = useState("");
  const [openCrop, setOpenCrop] = React.useState(false);

  const handleSideChange = async (e) => {
    const file = e.target.files[0];
    setType("Side");
    if (file) {
      setOpenCrop(true);
      setFileSide(file);
      setPhotoURLSide(URL.createObjectURL(file));
    }
  };

  const handleMainChange = async (e) => {
    const file = e.target.files[0];
    setType("Main");
    if (file) {
      setOpenCrop(true);
      setFileMain(file);
      setPhotoURLMain(URL.createObjectURL(file));
    }
  };
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
    setIsLoading(false);
  };

  const downloadScreenshot = async () => {
    setIsLoading(true);
    takeScreenShot(ref.current).then(download);
  };
  console.log("photoMain", photoMain);
  return (
    <>
      {openCrop ? (
        <CropEasy
          {...{
            photoURLSide,
            photoURLMain,
            setOpenCrop,
            setPhotoURLSide,
            setPhotoURLMain,
            setFileSide,
            setFileMain,
            setPhotoMain,
            setPhotoSide,
            type,
          }}
        />
      ) : (
        <div className="App">
        <div className="nav w-100 ">
          <h2 className="nav_head">
          શિવલહેરી
          </h2>
          <h5 className="navp">
          તા. બાબરા જી. અમરેલી
          </h5>
          <h5 className="navp">
          (રજી. નં. ૧૬૬૮)
          </h5>
          </div>
          <Container>
            <Row>
              <Col className="col-12 SVGImage d-flex col-md-6 ">
                <div ref={ref}>
                  <SVGPhoto
                    className="SVGPhoto"
                    fileMain={photoMain}
                    fileSide={photoSide}
                    name={state.name}
                  />
                </div>
              </Col>
              <Col className="col-12 col-md-6 form_main">
                <Form className="  form_data">
                  <Form.Group className="form_C form_name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setState({ ...state, name: e.target.value });
                      }}
                      name="name"
                      value={state?.name}
                      placeholder="Enter the Name"
                    />
                  </Form.Group>
                  <Form.Group className="mt-3 form_C form_upload">
                    <Form.Label>Upload Profile Photo:</Form.Label>

                    <Form.Control
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      id="myfile"
                      name="myfile"
                      onChange={handleMainChange}
                    />
                  </Form.Group>

                  <Button
                    type="button"
                    className="mt-3 form_button"
                    onClick={downloadScreenshot}
                  >
                    {isLoading ? "Loading......" : "Download"}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
          <Row className="footer w-100">
            <Col>
              <img src={webImage} alt="icone" className="web_img" />
            </Col>
            <Col className="">
              <span className="d-flex footer_strip">
                © Powered By
                <a href="https://webitoinfotech.com/" target="_blank">
                  Webito Infotech PVT. LTD.
                </a>
              </span>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default App;
