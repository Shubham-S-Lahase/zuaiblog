import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import NewPostForm from "./components/newpost/NewPost.jsx";
import PostList from "./components/posts/PostList.jsx";
import PostDetail from "./components/posts/PostDetails.jsx";
import "./App.css";
import { AuthProvider } from "./hooks/useAuth.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <Router>
      <AuthProvider>
        <div className="App">
          <header className="nav">
            <Navbar scrolled={scrolled} />
          </header>
          <section className="main">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/new-post" element={<NewPostForm />} />
            </Routes>
          </section>
          <ToastContainer/>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
