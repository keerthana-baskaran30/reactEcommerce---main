import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "components/header";
import Product from "components/product";
import CategoryComponent from "components/categoryBar";
import getDetail from "shared/utils/details";
import success, { failure } from "shared/utils/alertMessages";
import "assets/css/productList.css";
import notFound from "assets/images/notFound.png";
import { clearSuccessMessage, getProductsAsync } from "store/features/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();

  let { searchField } = useParams();
  let { category } = useParams();
  const { products } = useSelector((state) => state.productData);
  const { errorMessage } = useSelector((state) => state.productData);
  const { successMessage } = useSelector((state) => state.productData);
  const search_parameters = ["pname", "pcategory", "pprice", "pdescription"];
  let productsToDisplay;

  useEffect(() => {
      dispatch(getProductsAsync(category))
  }, [category]);


  useEffect(() => {
    if (getDetail("role") === "seller") {
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

  if (searchField) {
    productsToDisplay = products.filter((item) => {
      return search_parameters.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(searchField.toLowerCase()) > -1
        );
      });
    });
  } else {
    productsToDisplay = products;
  }

  return (
    <>
      {category || searchField ? (
        <>
          <Header />
          <CategoryComponent />
        </>
      ) : (
        <></>
      )}
      <div className="wrapper">
        <ul className="card-grid">
          {productsToDisplay.length === 0 ? (
            <div className="not-found">
              <div>About 0 results </div>
              <div>
                Your search -{searchField} - did not match any documents.
              </div>
              <div>
                <b>Suggestions:</b>
                <ul>
                  <li>Make sure that all words are spelled correctly.</li>
                  <li>Try different keywords.</li>
                  <li>Try more general keywords.</li>
                </ul>
              </div>
              <img src={notFound} alt="not found" />
            </div>
          ) : (
            productsToDisplay.map((product) => (
              <Product product={product} key={product.id} />
            ))
          )}
        </ul>
      </div>
    </>
  );
}
