import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ProductImages } from "data";
import getDetail from "shared/utils/details";
import CategoryComponent from "./categoryBar";
import { addToCartAsync, clearSuccessMessage, getProductAsync } from "store/features/productSlice";
import Header from "./header";
import "assets/css/viewProduct.css";
import success, { failure } from "shared/utils/alertMessages";

function ViewProduct() {
  let { id } = useParams();
  const { singleProduct } = useSelector((state) => state.productData);
  const { errorMessage } = useSelector((state) => state.productData);
  const { successMessage } = useSelector((state) => state.productData);

  const [user, setUser] = useState("customer");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, []);

  useEffect(() => {
    if (getDetail("role") === "seller") {
      setUser("seller");
    } else {
      setUser("customer");
    }
  });

  useEffect(() => {
    if (successMessage) {
      success(successMessage);
      dispatch(clearSuccessMessage());
    } else if (errorMessage) {
      failure(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const handleAddToCart = () => {
    if (getDetail("username")) {
      dispatch(addToCartAsync({'pid':singleProduct.pid, 'qty':1, 'username':getDetail("username")}));
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <Header />
      {getDetail("role") === "customer" ? <CategoryComponent /> : <></>}
      <div className="container view-product">
        <div id="demo" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="card">
                <div className="row">
                  <div className="col-md-6 text-center align-self-center">
                    <img
                      className="img-fluid"
                      src={ProductImages[singleProduct?.pcategory]}
                      alt={singleProduct.pname}
                    />
                  </div>
                  <div className="col-md-6 info">
                    <div className="row title">
                      <div className="col">
                        <h2>{singleProduct.pname}</h2>
                      </div>
                    </div>
                    <div className="row price">
                      <div className="row">
                        <h3>
                          <b>Price: ₹{singleProduct.pprice}</b>
                        </h3>
                      </div>
                    </div>
                    <div className="row price">
                      <div className="row">
                        <h3>
                          <b>Description: {singleProduct.pdescription}</b>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row lower">
                  <div className="col text-left align-self-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(-1)}
                    >
                      Go Back
                    </button>
                  </div>

                  {user === "customer" ? (
                    <div className="col text-right align-self-center">
                      <button
                        className="btn btn-success"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCartIcon /> Add to Cart
                      </button>
                    </div>
                  ) : (
                    <div className="col text-right align-self-center">
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          navigate(`/editProduct/${singleProduct.pid}`)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProduct;
