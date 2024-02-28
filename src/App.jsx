import { BrowserRouter as Router } from "react-router-dom";
import RoutesView from "./routes/RoutesView";
import FooterComp from "./components/FooterComp";
import NavbarComp from "./components/NavbarComp";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    setTimeout(() => {
      setCargando(false);
    }, 3000);
    Aos.init({ duration: 1800, once: true });
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
