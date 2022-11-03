import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import validateForm from "shared/utils/validateForm";
import getDetail from "shared/utils/details";
import "assets/css/signin.css";
import success, { failure } from "shared/utils/alertMessages";
import { registerUserAsync } from "store/features/userSlice";
import { clearSuccessMessage } from "store/features/productSlice";

function SignUp() {
  const initialState = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    sex: "",
    address: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState({});
  const [isChecked, setIsChecked] = useState("customer");
  const [buttonDisable, setButtonDisable] = useState(true);
  const { errorMessage } = useSelector((state) => state.userData);
  const { successMessage } = useSelector((state) => state.userData);

  useEffect(() => {
    if (successMessage) {
      success(successMessage);
      dispatch(clearSuccessMessage())
    } else if (errorMessage) {
      failure(errorMessage);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    if (getDetail("username") && getDetail("email")) {
      if (getDetail("role") === "customer") {
        navigate("/");
      } else {
        navigate("/seller/dashboard");
      }
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

  const handleOnCheck = (event) => {
    setIsChecked(event.target.value);
  };

  const submituserRegistrationForm = (e) => {
    e.preventDefault();
    dispatch(registerUserAsync({"user":user,"role":isChecked}))
  };

  return (
    <>
      <div className="container-signin">
        <h3>Register</h3>
        <Form method="POST" onSubmit={submituserRegistrationForm}>
          <Form.Group className="mb-3" controlId="formBasicFirst_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="first_name"
              onChange={handleOnChange}
              type="text"
              placeholder="Enter first_name"
            />
            <span className="danger-text">{error.first_name}</span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLast_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="last_name"
              onChange={handleOnChange}
              type="text"
              placeholder="Enter last_name"
            />
            <span className="danger-text">{error.last_name}</span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              name="username"
              onChange={handleOnChange}
              type="text"
              placeholder="Enter n"
            />
            <span className="danger-text">{error.username}</span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              onChange={handleOnChange}
              type="email"
              placeholder="Enter email"
            />
            <span className="danger-text">{error.email}</span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone"
              onChange={handleOnChange}
              type="tel"
              placeholder="Enter phone number"
            />
            <span className="danger-text">{error.phone}</span>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Gender
            </Form.Label>
            <Col sm={8}>
              <Form.Select name="sex" onChange={handleOnChange}>
                <option>select</option>
                <option name="sex" value="M">
                  Male
                </option>
                <option name="sex" value="F">
                  Female
                </option>
                <option name="sex" value="O">
                  Others
                </option>
              </Form.Select>
              <span className="danger-text">{error.sex}</span>
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              onChange={handleOnChange}
              type="text"
              placeholder="Enter Address"
            />
            <span className="danger-text">{error.address}</span>
          </Form.Group>

          <Form.Label>User </Form.Label>
          <Form.Group className="mb-3" controlId="formBasicCustomer">
            <Form.Check
              inline
              defaultChecked={true}
              name="role"
              value="customer"
              onChange={handleOnCheck}
              type="radio"
              label="Customer"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSeller">
            <Form.Check
              inline
              name="role"
              value="seller"
              onChange={handleOnCheck}
              type="radio"
              label="Seller"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleOnChange}
              type="password"
              placeholder="Password"
            />
            <span className="danger-text">{error.password}</span>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={buttonDisable}>
            Sign Up
          </Button>

          <Row className="py-3">
            <Col>
              Have an Account ? <Link to="/signin">Sign In</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
