import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";
import cookie from "react-cookies";

import { Row } from "react-bootstrap";
import { Redirect } from "react-router";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import CONSTANTS from "../utils/consts";
import { get, post } from "../utils/serverCall";
import FileUpload from "../common/FileUpload";
import CountriesList from "../utils/CountriesList";
import Location from "../account/Location";
import { isCustomer } from "../utils/checkAuth";
import { doMutate, doQuery } from "../graphql/serverCall";
import { getUserProfile, gqlUpdateUserProfile } from "../graphql/queries";

function Profile() {
  const status = localStorage.getItem(CONSTANTS.STATUS);
  // const cookieData = cookie.load(CONSTANTS.COOKIE);
  const isCustomerLogin = isCustomer();
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  let email = "";
  const [editMode, setEditMode] = useState(status === "0" && isCustomerLogin);

  if (isCustomerLogin) {
    if (params.get("id")) {
      return <Redirect to="/profile" />;
    }
  } else {
    email = params.get("id");
  }

  const defaultFormData = {
    contact: "",
    dob: "",
    email: "",
    location: "",
    name: "",
    nickname: "",
    picture: "",
    about: "",
    country: "US",
    latitude: "",
    longitude: "",
  };
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    doQuery(
      getUserProfile,
      {
        email,
      },
      "getUserProfile"
    )
      // get("/getUserProfile", {
      //   email,
      // })
      .then((response) => {
        const { user } = response;
        const userData = response.profile;
        const { addresses } = response;
        setFormData((prev) => ({
          ...prev,
          ...user,
          ...userData,
          ...addresses,
        }));
      });
  }, []);

  const eventHandler = (e) => {
    if (e.target.name === "contact") {
      setFormData({
        ...formData,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    doMutate(gqlUpdateUserProfile, formData, "updateUserProfile")
      // post("/updateUserInfo", formData)
      .then(() => {
        setEditMode(false);
        // setViewMode(true);
        localStorage.removeItem(CONSTANTS.STATUS);
      });
  };

  const editProfile = () => {
    setEditMode(true);
  };

  if (editMode) {
    return (
      <Container>
        <Col>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3" controlId="nickname">
              <Col xs={6} md={4}>
                <Image src={formData.picture} roundedCircle thumbnail="true" />
              </Col>
              <Col>
                <FileUpload
                  onUpload={(e) => {
                    setFormData({ ...formData, picture: e });
                  }}
                  id={`${new Date().valueOf() + formData.email}-profilePic`}
                />
              </Col>
            </Form.Group>
            <FloatingLabel
              controlId="email"
              label="Email Address"
              className="mb-3"
            >
              <Form.Control
                name="email"
                onChange={eventHandler}
                type="email"
                required
                value={formData.email}
              />
            </FloatingLabel>
            <FloatingLabel controlId="name" label="Name" className="mb-3">
              <Form.Control
                name="name"
                type="input"
                onChange={eventHandler}
                required
                value={formData.name}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="dob"
              label="Date of Birth"
              className="mb-3"
            >
              <Form.Control
                name="dob"
                type="date"
                onChange={eventHandler}
                required
                value={formData.dob ? formData.dob.split("T")[0] : ""}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="nickname"
              label="Nickname"
              className="mb-3"
            >
              <Form.Control
                name="nickname"
                type="input"
                onChange={eventHandler}
                required
                value={formData.nickname}
              />
            </FloatingLabel>
            <FloatingLabel controlId="about" label="About" className="mb-3">
              <Form.Control
                as="textarea"
                name="about"
                onChange={eventHandler}
                required
                value={formData.about}
              />
            </FloatingLabel>
            <FloatingLabel controlId="country" label="Country" className="mb-3">
              <CountriesList
                name="country"
                value={formData.country}
                onChange={eventHandler}
              />
              <Location
                value={formData.location}
                change={(e) => {
                  setFormData((prev) => ({ ...prev, location: e }));
                }}
                select={(e) => {
                  setFormData((prev) => ({ ...prev, location: e }));
                  geocodeByAddress(e)
                    .then((results) => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                      setFormData((prev) => ({
                        ...prev,
                        latitude: lat,
                        longitude: lng,
                      }));
                    });
                }}
                country={formData.country}
              />
            </FloatingLabel>
            <FloatingLabel controlId="contact" label="Phone" className="mb-3">
              <Form.Control
                name="contact"
                type="input"
                onChange={eventHandler}
                required
                value={formData.contact}
              />
            </FloatingLabel>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Container>
    );
  }
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image
            src={
              formData.picture ||
              "https://imageuploadlab1.s3.us-east-2.amazonaws.com/profile/customer.jpeg"
            }
            roundedCircle
            thumbnail="true"
          />
        </Col>
        <Col>
          <Row>
            <Col>Name:</Col>
            <Col>{formData.name}</Col>
          </Row>
          <Row>
            <Col>Nickname:</Col>
            <Col>{formData.nickname}</Col>
          </Row>
          <Row>
            <Col>Date Of Birth:</Col>
            <Col>{formData.dob}</Col>
          </Row>
          <Row>
            <Col>Contact:</Col>
            <Col>{formData.contact}</Col>
          </Row>
          <Row>
            <Col>Email:</Col>
            <Col>{formData.email}</Col>
          </Row>
          <Row>
            <Col>About:</Col>
            <Col>{formData.about}</Col>
          </Row>
          <Row>
            <Col>Primary Address:</Col>
            <Col>{formData.location}</Col>
          </Row>

          <Row>
            {isCustomerLogin && (
              <Button variant="primary" type="button" onClick={editProfile}>
                Edit
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
