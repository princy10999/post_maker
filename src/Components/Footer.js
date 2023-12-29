import React, { useState, createRef, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import webImage from "../assets/image/webito_infotech.png";

function Footer() {
  return (
    <>
      <Row className="footer">
        <Col className="col-sm-6 col-12">
          <img src={webImage} alt="icone" className="web_img" />
        </Col>
        <Col className="col-sm-6 col-12">
          <span className="d-flex footer_strip">
            © Powered By
            <a href="https://webitoinfotech.com/" target="_blank">
              Webito Infotech PVT. LTD.
            </a>
          </span>
        </Col>
      </Row>
    </>
  );
}
export default Footer;
