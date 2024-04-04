import { BrowserRouter as Router } from "react-router-dom";
import RoutesView from "./routes/RoutesView";
import FooterComp from "./components/FooterComp";
import NavbarComp from "./components/NavbarComp";
import "aos/dist/aos.css";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    import("aos")
      .then((Aos) => {
        Aos.init({ duration: 1800, once: true });
      })
      .catch((error) => {
        console.error("Error al cargar AOS:", error);
      });
  }, []);
  

  return (
    <Router>
      <div className="App">
        <NavbarComp />
        <main className="main-content">
            <RoutesView />
        </main>
        <FooterComp />
      </div>
    </Router>
  );
}

export default App;
