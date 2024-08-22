import styles from "./Login.module.css";

const LoginForm = () => {
  return (
    <div className={styles.logincontainer}>
      <h2 className={styles.logintitle}>Login to Your Account</h2>
      <form className={styles.loginform}>
        <div className={styles.formgroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.formgroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className={styles.loginbutton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
