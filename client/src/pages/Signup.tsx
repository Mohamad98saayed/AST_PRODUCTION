import { Link, useNavigate } from "react-router-dom";
import Metadata from "../components/Metadata";

import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { useEffect } from "react";
import { signupAsync } from "../state/features/user/userSlice";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <section id="signup">
      <Metadata title="signup page" />

      <div className="image-container">
        <div className="overlay" />
      </div>

      <div className="form-container">
        <h1>Signup Page</h1>
        <h6>
          Welcome! Here you can create a new account and make use of our
          services!
        </h6>
        <Formik
          initialValues={{ name: "", email: "", password: "", image: "" }}
          validate={(values: {
            email: string;
            password: string;
            name: string;
            image: string;
          }) => {
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
            dispatch(signupAsync(values));
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
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Full Name"
                value={values.name}
              />

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

              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      values.image = `${reader.result}`;
                    }
                  };
                  reader.onerror = (err) => console.log(err);
                  e.target.files && reader.readAsDataURL(e.target.files[0]);
                }}
              />

              <button type="submit">signup</button>
              <p>
                already a user? <Link to="/signin">signin!</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Signup;
