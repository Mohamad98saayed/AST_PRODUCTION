import { Link, useNavigate } from "react-router-dom";
import Metadata from "../components/Metadata";

import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { useEffect } from "react";
import { signinAsync } from "../state/features/user/userSlice";

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <section id="signin">
      <Metadata title="signin page" />

      <div className="image-container">
        <div className="overlay" />
      </div>

      <div className="form-container">
        <h1>Signin Page</h1>
        <h6>Welcome back!</h6>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values: { email: string; password: string }) => {
            const errors: any = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Please enter a valid email!";
            } else if (!values.password) {
              errors.password = "Required!";
            } else if (values.password.length < 8) {
              errors.password = "Password should be more than 8 characters!";
            }
            return errors;
          }}
          onSubmit={(values) => {
            dispatch(signinAsync(values));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
              />
              {errors.email && touched.email && errors.email ? (
                <p style={{ color: "red" }}>
                  {errors.email && touched.email && errors.email}
                </p>
              ) : (
                ""
              )}

              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
              />
              {errors.password && touched.password && errors.password ? (
                <p style={{ color: "red" }}>
                  {errors.password && touched.password && errors.password}
                </p>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={errors.email || errors.password ? true : false}
              >
                signin
              </button>
              <p>
                not a user? <Link to="/signup">signup!</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Signin;
