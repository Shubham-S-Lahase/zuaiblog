import styles from "./Navbar.module.css";

const Navbar = ({ scrolled }) => {
  return (
    <div
      className={`${styles.container} ${scrolled ? styles.containerup : ""}`}
    >
      <div className={styles.logoContainer}>
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className={styles.menus}>
        <div id={styles.loginBtn}>Login</div>
        <div id={styles.joinBtn}>Join Now</div>
      </div>
      <div className={styles.menus2} style={{ display: "none" }}>
        <span>Username</span>
        <img src="/logout.svg" alt="logout" />
      </div>
    </div>
  );
};

export default Navbar;
