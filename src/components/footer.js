import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import "assets/css/footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-dark">
        <div className="col item social">
          <FacebookIcon />
          <InstagramIcon />
        </div>

        <p className="copyright">Ecommercy © 2018</p>
      </div>
    </footer>
  );
}

export default Footer;
