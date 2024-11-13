import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateuserdatabyid } from "../redux/api";
import swal from "sweetalert";
import { clearupdateusersdatabyid } from "../redux/slices";
import ButtonLoader from "../effects/ButtonLoader";

const Update_User = React.memo(({ data }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const id = data?.success?._id;
  const { loading, response } = useSelector(
    (state) => state.updateuserdatabyidslice
  );
  /* Form validation */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.success?.name || "",
      email: data?.success?.email || "",
      mobile: data?.success?.mobile || "",
      address: data?.success?.address || "",
      role: data?.success?.role || "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Enter your name")
        .min(3, "Name should be at least 3 characters"),
      email: yup
        .string()
        .required("Enter email address")
        .email("Enter valid email address"),
      mobile: yup
        .string()
        .required("Enter mobile number")
        .length(10, "enter valid mobile number"),
      address: yup.string().required("Enter address"),
      role: yup.string().required("Select a role"),
    }),
    onSubmit: (values) => {
      dispatch(updateuserdatabyid({ token, id, values }));
    },
  });

  useEffect(() => {
    if (response) {
      if (response.success) {
        formik.resetForm();
        const modalElement = document.getElementById("userModal");
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
        swal("Success", `${response.success}`, "success");
        dispatch(clearupdateusersdatabyid());
      } else if (response.email) {
        formik.setErrors({ email: `${response.email}` });
        dispatch(clearupdateusersdatabyid());
      } else if (response.mobile) {
        formik.setErrors({ mobile: `${response.mobile}` });
        dispatch(clearupdateusersdatabyid());
      } else if (response.error) {
        formik.resetForm();
        const modalElement = document.getElementById("userModal");
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
        swal("Error", "Internal server error", "error");
        dispatch(clearupdateusersdatabyid());
      }
    }
  }, [dispatch, formik, response]);

  return (
    <div
      className="modal fade"
      id="userModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update User
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
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className={`form-control ${
                    formik.errors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your name"
                />
                <div className="invalid-feedback">{formik.errors.name}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <span className="text-danger">*</span>
                <input
                  type="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={`form-control ${
                    formik.errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter email address"
                />
                <div className="invalid-feedback">{formik.errors.email}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="mobile"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                  className={`form-control ${
                    formik.errors.mobile ? "is-invalid" : ""
                  }`}
                  placeholder="Enter mobile number"
                />
                <div className="invalid-feedback">{formik.errors.mobile}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <span className="text-danger">*</span>
                <textarea
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className={`form-control ${
                    formik.errors.address ? "is-invalid" : ""
                  }`}
                  placeholder="Enter address"
                ></textarea>
                <div className="invalid-feedback">{formik.errors.address}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <span className="text-danger">*</span>
                <select
                  name="role"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  className={`form-select ${
                    formik.errors.role ? "is-invalid" : ""
                  }`}
                >
                  <option value="" label="Select Role" />
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="user">User</option>
                </select>
                <div className="invalid-feedback">{formik.errors.role}</div>
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
                    Save changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
Update_User.displayName = "Update_User";
Update_User.propTypes = {
  data: propTypes.any,
};
export default Update_User;