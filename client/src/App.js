import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import "./App.css";

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <header className="nav">
        <Navbar scrolled={scrolled} />
      </header>
      <section className="test">
        
      </section>
    </div>
  );
}

export default App;
