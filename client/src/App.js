import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import PostList from "./components/posts/PostList.jsx";
import PostDetail from "./components/posts/PostDetails.jsx";
import "./App.css";
import { AuthProvider } from "./hooks/useAuth.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewPostForm from "./components/newpost/NewPost.jsx";
import Modal from "./components/Modal/Modal.jsx";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isNewPostForm, setIsNewPostForm] = useState(false);

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
            <span id="post" onClick={() => setIsNewPostForm(true)}>
              Post something!
            </span>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>

            <Modal
              isOpen={isNewPostForm}
              onClose={() => setIsNewPostForm(false)}
            >
              <NewPostForm closeModal={() => setIsNewPostForm(false)} />
            </Modal>
          </section>
          <ToastContainer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
