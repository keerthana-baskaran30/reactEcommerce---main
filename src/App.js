import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./routes/router";
import Footer from "components/footer";

function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
