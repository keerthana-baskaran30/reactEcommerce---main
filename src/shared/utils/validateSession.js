import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ValidateSession() {
  const navigate = useNavigate();

  const ValidateSession = () => {
    let url = window.location.href;

    //free routes
    if (
      url.indexOf("signin") > -1 ||
      url.indexOf("signup") > -1 ||
      url.indexOf("MensClothing") > -1 ||
      url.indexOf("KidsClothing") > -1 ||
      url.indexOf("WomenClothing") > -1 ||
      url.indexOf("electronics") ||
      url.indexOf("viewproduct") > -1 ||
      url.indexOf("searchProducts") > -1 ||
      url === "http://localhost:3000/"
    ) {
      return true;
    }

    if (localStorage.getItem("username") && localStorage.getItem("email"))
      //Check if login
      return true;
    else {
      return false;
    }
  };

  useEffect(() => {
    if (!ValidateSession()) {
      navigate("/signin");
    }
  });
}

export default ValidateSession;
