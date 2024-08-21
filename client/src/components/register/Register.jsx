import styles from "./Register.module.css";
import { useState } from "react";

const RegisterForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      setIsChecked(true);
      setTimeout(() => {
        setIsChecked(false);
      }, 8000);
    }
  };

  return (
    <div className={styles.registercontainer}>
      <h2 className={styles.registertitle}>Create an Account</h2>
      <form className={styles.registerform} onSubmit={handleSubmit}>
        <div className={styles.formgroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id={styles.username}
            name="username"
            placeholder="Enter your username"
          />
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id={styles.email}
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id={styles.password}
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id={styles.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>

        <div id="button-wrapper" className={`${styles.buttonWrapper} ${isChecked ? styles.checked : ''}`}>
          <button type="submit" className={`${styles.registerbutton} ${styles.submit}`}>Register</button>
          <div className={styles.loaderWrapper}>
            <span className={`${styles.loader} ${styles.yellow}`}></span>
            <span className={`${styles.loader} ${styles.pink}`}></span>
          </div>
          <span className={`${styles.loader} ${styles.orange}`}></span>

          <div className={styles.checkWrapper}>
            <svg version="1.1" width="65px" height="38px" viewBox="0 0 64.5 37.4">
              <polyline className={styles.check} points="5,13 21.8,32.4 59.5,5 " />
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
