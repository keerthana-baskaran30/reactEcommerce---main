import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import "react-toastify/dist/ReactToastify.css";
import {setNotLogged } from "storeold/action/userActions";
import validateForm from "shared/utils/validateForm";
import getDetail from "shared/utils/details";
import success, { failure } from "shared/utils/alertMessages";
import "assets/css/signin.css";
import { loginAsync } from "store/features/userSlice";
import {clearSuccessMessage} from "store/features/productSlice"

function SignIn() {
  const initialState = {
    username: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState({});
  const [buttonDisable, setButtonDisable] = useState(true);
  const navigate = useNavigate();
  const { errorMessage } = useSelector((state) => state.userData);
  const { successMessage } = useSelector((state) => state.userData);

  useEffect(() => {
    if (successMessage) {
      success(successMessage);
      dispatch(clearSuccessMessage());
    } else if (errorMessage) {
      failure(errorMessage);
      dispatch(setNotLogged());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    if (getDetail("username") && getDetail("email")) {
      navigate("/");
    }
  });

  const handleOnChange = (event) => {
    const errorMessage = validateForm(event.target.name, event.target.value);
    setUser({ ...user, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: errorMessage });

    const formIsValid = Object.values(user).every((value) => {
      if (value !== "") {
        return true;
      }
      return false;
    });
    const errorIsEmpty = Object.values(error).every((value) => {
      if (value === "") {
        return true;
      }
      return false;
    });

    formIsValid && errorIsEmpty
      ? setButtonDisable(false)
      : setButtonDisable(true);
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    dispatch(loginAsync(user))
  };

  return (
    <>
      <div className="container-signin">
        <h3>
          <PersonIcon /> Sign In
        </h3>
        <Form method="POST" onSubmit={submitLoginForm}>
          <Form.Group className="mb-3" controlId="formBasicuserName">
            <PersonIcon /> <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              onChange={handleOnChange}
              type="text"
              placeholder="Your userName"
            />
            <span className="danger-text">{error.username}</span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <LockIcon />
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleOnChange}
              type="password"
              placeholder="Your Password"
            />
            <span className="danger-text">{error.password}</span>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={buttonDisable}>
            Submit
          </Button>

          <Row className="py-3">
            <Col>
              New user ? <Link to="/signup">Sign Up</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
