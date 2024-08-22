import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import RegisterForm from "./components/register/Register.jsx";
import LoginForm from "./components/login/Login.jsx";
import NewPostForm from "./components/newpost/NewPost.jsx";
import PostList from "./components/posts/PostList.jsx";
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
      <section className="main">
          <RegisterForm/>
          <LoginForm/>
          <NewPostForm/>
          <PostList/>
      </section>
    </div>
  );
}

export default App;
