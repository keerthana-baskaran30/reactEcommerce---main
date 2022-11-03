import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "components/header";
import { ProductImages } from "data";
import getDetail from "shared/utils/details";
import success, { failure } from "shared/utils/alertMessages";
import { addToCartAsync, clearSuccessMessage, deleteCartAsync, displayCartAsync } from "store/features/productSlice";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.productData);
  const { errorMessage } = useSelector((state) => state.productData);
  const { successMessage } = useSelector((state) => state.productData);

  useEffect(() => {
    if (getDetail("username")) {
      dispatch(displayCartAsync(getDetail("username")));
    } else {
      navigate("/signin");
    }
  }, [successMessage]);

  useEffect(() => {
    if (successMessage) {
      success(successMessage);
      dispatch(clearSuccessMessage());
    } else if (errorMessage) {
      failure(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const DeleteCart = (pid) => {
    dispatch(deleteCartAsync(pid));
  };

  const DecreaseQuantity = (pid) => {
    dispatch(addToCartAsync({'pid':pid, 'qty':-1, 'username':localStorage.getItem("username")}));
  };

  const IncreaseQuantity = (pid) => {
    dispatch(addToCartAsync({'pid':pid, 'qty':1, 'username':localStorage.getItem("username")}));
  };

  const TotalPrice = (price, qty) => {
    return price * qty;
  };

  const totalAmount = () => {
    let total = 0;
    cart &&
      cart.map((item) => {
        total += item.pprice * item.pqty;
        return total;
      });
    return total;
  };

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-md-12">
          <h1>Cart</h1>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((item) => {
                  return (
                    <tr key={item.pid}>
                      <td>
                        <i
                          className="btn btn-primary"
                          onClick={() => DeleteCart(item.pid)}
                        >
                          X
                        </i>
                      </td>
                      <td>{item.pname}</td>
                      <td>
                        <img
                          src={ProductImages[item.pcategory]}
                          alt={item.pname}
                          style={{ width: "100px", height: "80px" }}
                        />
                      </td>
                      <td>{item.pprice} $</td>
                      <td>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                          onClick={() => DecreaseQuantity(item.pid)}
                        >
                          -
                        </span>
                        <span className="btn btn-info">{item.pqty}</span>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                          onClick={() => IncreaseQuantity(item.pid)}
                        >
                          +
                        </span>
                      </td>
                      <td>{TotalPrice(item.pprice, item.pqty)} $</td>
                    </tr>
                  );
                })}
              <tr>
                <td colSpan="5">Total Cart</td>
                <td>{totalAmount()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default CartPage;
