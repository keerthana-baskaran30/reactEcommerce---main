import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Header from "./header";
import getDetail from "shared/utils/details";
import validateForm from "shared/utils/validateForm";
import { categories } from "data";
import { clearError } from "storeold/action/productActions";
import "assets/css/signin.css";
import "assets/css/form.css";
import success, { failure } from "shared/utils/alertMessages";
import { getProductAsync, clearSuccessMessage, updateProductAsync } from "store/features/productSlice";

function EditProduct() {
  const initialState = {
    pid: "",
    pname: "",
    pdescription: "",
    pprice: "",
    pcategory: "",
  };

  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProduct } = useSelector((state) => state.productData);
  const [product, setProduct] = useState(initialState);
  const [error, setError] = useState({});
  const [buttonDisable, setButtonDisable] = useState(true);

  const { errorMessage } = useSelector((state) => state.productData);
  const { successMessage } = useSelector((state) => state.productData);

  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, []);

  useEffect(() => {
    if (singleProduct) {
      setProduct({ ...singleProduct });
    }
  }, [singleProduct]);

  useEffect(() => {
    if (successMessage) {
      success(successMessage);
      dispatch(clearSuccessMessage());
      navigate("/");
    } else if (errorMessage) {
      failure(errorMessage);
      dispatch(clearError());
    }
  }, [successMessage, errorMessage]);

  const handleChange = (event) => {
    const errorMessage = validateForm(event.target.name, event.target.value);
    setProduct({ ...product, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: errorMessage });

    const formIsValid = Object.values(product).every((value) => {
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

  const onSubmitAddProduct = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync({'pid':id, 'product':product, 'username':getDetail("username")}));
  };

  return (
    <>
      <Header />
      <div className="container-signin">
        <h2>Edit Product </h2>
        <Form method="POST" onSubmit={onSubmitAddProduct}>
          <Form.Group className="mb-3" controlId="formBasicPid">
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={product.pid}
              name="pid"
              className="form-control"
            />
            <span className="danger-text">{error.pid}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPname">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={product.pname}
              name="pname"
              className="form-control"
            />
            <span className="danger-text">{error.pname}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPprice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={product.pprice}
              name="pprice"
              className="form-control"
            />
            <span className="danger-text">{error.pprice}</span>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Category
            </Form.Label>
            <Col sm={8}>
              <Form.Select name="pcategory" onChange={handleChange}>
                <option>{product.pcategory}</option>
                {categories.map((category) => {
                  return (
                    <option
                      name="handleChange"
                      value={category.title}
                      key={category.id}
                    >
                      {category.title}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <span className="danger-text">{error.pcategory}</span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPdescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={product.pdescription}
              name="pdescription"
              className="form-control"
            />
            <span className="danger-text">{error.pdescription}</span>
          </Form.Group>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
              color="primary"
              disabled={buttonDisable}
            >
              Update Product
            </Button>
          </Form.Group>
        </Form>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default EditProduct;
