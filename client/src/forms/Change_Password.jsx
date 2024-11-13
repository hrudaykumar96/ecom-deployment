import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { changepassword } from "../redux/api";
import { userreducer } from "../redux/slices";
import ButtonLoader from "../effects/ButtonLoader";

const Change_Password = React.memo(({ data }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userslice.loading);
  const response = useSelector((state) => state.userslice.data);
  /* Form validation */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: data?.success?.email || "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Enter email address")
        .email("Enter a valid email address"),
      password: yup
        .string()
        .required("Enter password")
        .min(8, "Password should be at least 8 characters")
        .max(12, "Password should not exceed 12 characters"),
      confirm_password: yup
        .string()
        .required("Enter confirm password")
        .oneOf([yup.ref("password")], "Passwords does not match"),
    }),
    onSubmit: (values) => {
      dispatch(changepassword(values));

      /* Close modal after form submitting */
      const modalElement = document.getElementById("exampleModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    },
  });

  useEffect(() => {
    if (data?.success) {
      formik.setFieldValue("email", data?.success?.email);
    }
  }, [data]);

  useEffect(() => {
    if (response) {
      if (response.success) {
        swal("Success", `${response.success}`, "success");
        formik.resetForm();
        dispatch(userreducer());
      } else if (response.email) {
        formik.setErrors({ email: `${response.email}` });
        dispatch(userreducer());
      } else if (response.error) {
        swal("Error", "internal server error", "error");
        formik.resetForm();
        localStorage.removeItem("token");
        dispatch(userreducer());
      }
    }
  }, [response, dispatch]);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="container" onSubmit={formik.handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Change Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <span className="text-danger">*</span>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={`form-control ${
                    formik.touched.email &&
                    (formik.errors.email ? "is-invalid" : "")
                  }`}
                  placeholder="Enter email address"
                  disabled
                />
                <div className="invalid-feedback">{formik.errors.email}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <span className="text-danger">*</span>
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={`form-control ${
                    formik.touched.password &&
                    (formik.errors.password ? "is-invalid" : "")
                  }`}
                  placeholder="Enter password"
                />
                <div className="invalid-feedback">{formik.errors.password}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                </label>
                <span className="text-danger">*</span>
                <input
                  type="password"
                  name="confirm_password"
                  value={formik.values.confirm_password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={`form-control ${
                    formik.touched.confirm_password &&
                    (formik.errors.confirm_password ? "is-invalid" : "")
                  }`}
                  placeholder="Enter confirm password"
                />
                <div className="invalid-feedback">
                  {formik.errors.confirm_password}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {loading ? (
                <ButtonLoader />
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
Change_Password.displayName = "Change_Password";
Change_Password.propTypes = {
  data: propTypes.any,
};
export default Change_Password;