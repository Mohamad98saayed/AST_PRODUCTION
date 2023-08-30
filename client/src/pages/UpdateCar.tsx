import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateCarAsync,
  getOneCarAsync,
  reset,
} from "../state/features/car/carSlice";
import { CarData } from "../state/features/car/carService";

const UpdateCar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { response, car, isLoading } = useAppSelector((state) => state.cars);

  useEffect(() => {
    if (response?.success) {
      navigate(-1);
      dispatch(reset());
    }

    dispatch(getOneCarAsync(`${params.id}`));
  }, [dispatch, navigate, params.id, response?.success]);

  return (
    <section id="update-car">
      <Formik
        initialValues={{
          manufacturer: car?.car?.manufacturer,
          model: car?.car?.model,
          year: car?.car?.year,
          color: car?.car?.color,
          fuelType: car?.car?.fuelType,
          transmition: car?.car?.transmition,
          price: car?.car?.price,
          images: [],
        }}
        validate={(values: CarData) => {
          const errors: any = {};
          if (!values.manufacturer) {
            errors.manufacturer = "Required!";
          } else if (!values.model) {
            errors.model = "Required!";
          } else if (!values.year) {
            errors.year = "Required!";
          } else if (!values.color) {
            errors.color = "Required!";
          } else if (!values.fuelType) {
            errors.fuelType = "Required!";
          } else if (!values.price) {
            errors.price = "Required!";
          }

          return errors;
        }}
        onSubmit={(values) => {
          dispatch(updateCarAsync({ id: `${params.id}`, carData: values }));
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
              name="manufacturer"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.manufacturer}
              placeholder="Manufacturer"
            />
            {errors.manufacturer &&
            touched.manufacturer &&
            errors.manufacturer ? (
              <p style={{ color: "red" }}>
                {errors.manufacturer &&
                  touched.manufacturer &&
                  errors.manufacturer}
              </p>
            ) : (
              ""
            )}

            <input
              type="text"
              name="model"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.model}
              placeholder="Model"
            />
            {errors.model && touched.model && errors.model ? (
              <p style={{ color: "red" }}>
                {errors.model && touched.model && errors.model}
              </p>
            ) : (
              ""
            )}

            <input
              type="number"
              name="year"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.year}
              placeholder="Year"
            />
            {errors.year && touched.year && errors.year ? (
              <p style={{ color: "red" }}>
                {errors.year && touched.year && errors.year}
              </p>
            ) : (
              ""
            )}

            <input
              type="text"
              name="color"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.color}
              placeholder="Color"
            />
            {errors.color && touched.color && errors.color ? (
              <p style={{ color: "red" }}>
                {errors.color && touched.color && errors.color}
              </p>
            ) : (
              ""
            )}

            <input
              type="text"
              name="fuelType"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fuelType}
              placeholder="Fuel Type"
            />
            {errors.fuelType && touched.fuelType && errors.fuelType ? (
              <p style={{ color: "red" }}>
                {errors.fuelType && touched.fuelType && errors.fuelType}
              </p>
            ) : (
              ""
            )}

            <select
              value={values.transmition}
              onChange={handleChange}
              onBlur={handleBlur}
              name="transmition"
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="SMG">SMG</option>
            </select>

            <input
              type="number"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              placeholder="Price"
            />
            {errors.price && touched.price && errors.price ? (
              <p style={{ color: "red" }}>
                {errors.price && touched.price && errors.price}
              </p>
            ) : (
              ""
            )}

            <input
              type="file"
              multiple
              onBlur={handleBlur}
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = Array.from(e.target.files || []);

                values.images = [];
                files.forEach((file) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      values.images.push(`${reader.result}`);
                    }
                  };
                  reader.readAsDataURL(file);
                });
              }}
            />

            <button type="submit" disabled={isLoading ? true : false}>
              {isLoading ? "loading" : "update"}
            </button>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default UpdateCar;
