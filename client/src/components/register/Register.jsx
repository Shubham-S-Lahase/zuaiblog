import styles from "./Register.module.css"

const RegisterForm = () => {
  return (
    <div className={styles.registercontainer}>
      <h2 className={styles.registertitle}>Create an Account</h2>
      <form className={styles.registerform}>
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

        <button type="submit" className={styles.registerbutton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
