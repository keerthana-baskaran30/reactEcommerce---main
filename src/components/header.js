import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logoutUser } from "store/features/userSlice";
import { categories } from "data";
import getDetail, { removeDetail } from "shared/utils/details";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchField, setSearchField] = useState("");
  const [isloggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("customer");

  useEffect(() => {
    if (getDetail("username")) {
      if (getDetail("role") === "customer") {
        setLoggedIn(true);
      } else {
        setLoggedIn(true);
        setUser("seller");
      }
    }
  }, []);

  const onHandleLogout = () => {
    setUser("customer");
    removeDetail();
    dispatch(logoutUser());
    setLoggedIn(false);
    toast.success("Logged Out", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
    navigate("/");
    window.location.reload();
    console.log("navigate finished");
  };

  const searchOnChange = (event) => {
    setSearchField(event.target.value);
  };

  const onSubmitSearch = () => {
    if (searchField) {
      navigate(`/searchProducts/${searchField}`);
    }
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Ecommercey</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {user === "customer" ? (
                <>
                  <Nav.Link as={Link} to={"/"}>
                    Home
                  </Nav.Link>
                  <NavDropdown title="Categories" id="collasible-nav-dropdown">
                    {categories.map((category) => {
                      return (
                        <NavDropdown.Item
                          as={Link}
                          to={`/category/${category.title}`}
                          key={category.id}
                        >
                          {category.title}
                        </NavDropdown.Item>
                      );
                    })}
                    <NavDropdown.Divider />
                  </NavDropdown>

                  <Nav.Link as={Link} to={"/myorders"}>
                    My Orders
                  </Nav.Link>

                  <Nav.Link as={Link} to={"/cart"}>
                    <ShoppingCartIcon
                      style={{ color: "white", fontSize: "25px" }}
                    />
                    Cart
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to={"/"}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/addProducts"}>
                    Add Products
                  </Nav.Link>

                  <Nav.Link as={Link} to={"/myorders"}>
                    Orders Placed
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {isloggedIn ? (
                <>
                  <Nav.Link as={Link} to={"/profile"}>
                    <Person2Icon style={{ color: "white", fontSize: "30px" }} />
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={onHandleLogout}>
                    <LogoutIcon style={{ color: "white", fontSize: "30px" }} />
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav>
                  <Nav.Link as={Link} to={"/signup"}>
                    Sign up
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/signin"}>
                    Sign in
                  </Nav.Link>
                </Nav>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={searchOnChange}
              />
              <Button variant="outline-success" onClick={onSubmitSearch}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
