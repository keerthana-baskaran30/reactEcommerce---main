import React, { useState, useEffect } from "react";
import Header from "components/header";
import CategoryComponent from "components/categoryBar";
import ProductList from "./productList";
import SellerProductsList from "./sellerProductList";
import getDetail from "shared/utils/details";

export default function Home() {
  const [homePage, setHomePage] = useState("");

  useEffect(() => {
    if (getDetail("username") && getDetail("email")) {
      if (getDetail("role") === "customer") {
        setHomePage("customer");
      } else if (getDetail("role") === "seller") {
        setHomePage("seller");
      } else {
        setHomePage("/");
      }
    } else {
      setHomePage("/");
    }
  });

  return (
    <div>
      <Header />
      {homePage === "customer" ? (
        <>
          <CategoryComponent />
          <ProductList />
        </>
      ) : homePage === "seller" ? (
        <SellerProductsList />
      ) : (
        <>
          <CategoryComponent />
          <ProductList />
        </>
      )}     
    </div>
  );
}
