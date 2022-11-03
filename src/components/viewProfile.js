import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EditIcon from "@mui/icons-material/Edit";
import HelpIcon from "@mui/icons-material/Help";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Header from "./header";
import getDetail from "shared/utils/details";
import { getProfileAsync } from "store/features/userSlice";
import "assets/css/signin.css";
import "assets/css/viewProfile.css";
import "assets/css/form.css";

function ViewProfile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getProfileAsync(getDetail("username")));
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row profile">
          <div className="col-md-3">
            <div className="profile-sidebar">
              <div className="profile-userpic">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_kGluPYWU9tP2OvG7qmFrW6Wixk-B1KHs40i0worECWogmi5GpJH_1yM3o7wrUimAYv0&usqp=CAU"
                  className="img-responsive"
                  alt=""
                />
              </div>

              <div className="profile-userbuttons">
                <button type="button" className="btn btn-success btn-sm">
                  <EditIcon />
                </button>
              </div>
              <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                  {profile.first_name}
                </div>
              </div>

              <div className="profile-userbuttons">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={handleShow}
                >
                  <PersonIcon /> Edit Profile
                </button>
              </div>

              <div className="profile-usermenu">
                <div className="vertical">
                  <a href="#">
                    <ManageAccountsIcon /> Account Settings
                  </a>

                  <a href="#">
                    <HelpIcon /> Help
                  </a>
                </div>
              </div>

              <div className="portlet light bordered">
                <div>
                  <span className="profile-desc-text">
                    Lorem ipsum dolor sit amet diam nonummy nibh dolore.{" "}
                  </span>
                  <div className="margin-top-20 profile-desc-link">
                    <InstagramIcon />
                    <a href="https://www.twitter.com/jasondavisfl/">
                      @{profile.first_name}
                    </a>
                  </div>
                  <div className="margin-top-20 profile-desc-link">
                    <FacebookIcon />
                    <a href="https://www.facebook.com/">{profile.first_name}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="profile-content"></div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form method="POST">
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.first_name}
                    readOnly={true}
                    name="first_name"
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.last_name}
                    name="last_name"
                    readOnly={true}
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>email </Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.email}
                    name="email"
                    readOnly={true}
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={profile.phone}
                    readOnly={true}
                    name="phone"
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.address}
                    readOnly={true}
                    name="address"
                    className="form-control"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ViewProfile;
