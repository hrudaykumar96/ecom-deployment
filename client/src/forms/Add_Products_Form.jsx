import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addproducts, getproducts } from "../redux/api";
import swal from "sweetalert";
import { clearaddproductresponse } from "../redux/slices";
import ButtonLoader from "../effects/ButtonLoader";

const Add_Products_Form = React.memo(() => {
  /* for image format */
  const imageformat = ["image/jpg", "image/jpeg", "image/png"];
  /* to preview upload images */
  const [imagePreview, setImagePreview] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { loading, response } = useSelector((state)=>state.addproductslice);
  const fileInputRef = useRef(null);

  /* form validation */
  const formik = useFormik({
    initialValues: {
      brand_name: "",
      category: "",
      fabric: "",
      sleeve: "",
      pattern: "",
      color: "",
      items: "",
      price: "",
      section: "",
      about: "",
      status: "",
      description: "",
      images: [],
    },
    validationSchema: yup.object({
      brand_name: yup.string().required('Brand name is required'),
      category: yup.string().required('Category is required'),
      fabric: yup.string().required('Fabric type is required'),
      sleeve: yup.string().required('Sleeve type is required'),
      pattern: yup.string().required('Pattern is required'),
      color: yup.string().required('Color is required'),
      items: yup.number().required('Number of items is required').positive().integer(),
      price: yup.number().required('Price is required').positive(),
      section: yup.string().required('Select section'),
      about: yup.string().required('About product is required'),
      status: yup.string().required('Status is required'),
      description: yup.string().required('Description is required'),
      images: yup
        .array()
        .min(1, "atleast one image is required")
        .of(
          yup
            .mixed()
            .required("upload product image")
            .test(
              "fileformat",
              "only jpg, jpeg, png supported",
              (values) => values && imageformat.includes(values?.type)
            )
        ),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('brand_name',values.brand_name);
      formData.append('category', values.category);
      formData.append('fabric', values.fabric);
      formData.append('sleeve', values.sleeve);
      formData.append('pattern', values.pattern);
      formData.append('color', values.color);
      formData.append('items', values.items);
      formData.append('price', values.price);
      formData.append('section', values.section);
      formData.append('about', values.about);
      formData.append('status', values.status);
      formData.append('description', values.description);
      if (values.images && values.images.length) {
        values.images.forEach(file => {
          formData.append('photos', file); 
        });
      } else if (values.images) {
        formData.append('photos', values.images); 
      }
    dispatch(addproducts({token, formData}))
    },
  });

  /* for file upload */
  const fileSubmit = (e) => {
    const imagefiles = Array.from(e.target.files);
    formik.setFieldValue("images", imagefiles);
    const preview = imagefiles.map((file) => URL.createObjectURL(file));
    setImagePreview(preview);
  };

  useEffect(()=>{
    if(response){
      if(response?.success){
        formik.resetForm();
        setImagePreview([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }
        swal("Success", `${response?.success}`, "success")
        dispatch(clearaddproductresponse());
        dispatch(getproducts(token));
      } else if(response.error){
        swal("Error", 'internal server error', "error")
        formik.resetForm();
        setImagePreview([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }
        dispatch(clearaddproductresponse());
      } else if(response?.status){
        swal("Error", `${response.status}`, "warning")
        formik.resetForm();
        setImagePreview([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }
        dispatch(clearaddproductresponse());
      }
    }
  },[response, formik, dispatch]);
  return (
    <div className="p-3">
      <form
        className="bg-light p-3"
        style={{ borderRadius: "1rem" }}
        onSubmit={formik.handleSubmit}
      >
        <h4 className="text-center text-decoration-underline">add products</h4>
        <div className="row g-3">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="brand" className="form-label">
              brand name
            </label>
            <input
              type="text"
              name="brand_name"
              value={formik.values.brand_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="enter brand name"
              className={`form-control ${
                formik.errors.brand_name ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.brand_name}</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="category" className="form-label">
              category
            </label>
            <input
              type="text"
              name="category"
              value={formik.values.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="enter category"
              className={`form-control ${
                formik.errors.category ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.category}</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="fabric" className="form-label">
              fabric
            </label>
            <input
              type="text"
              name="fabric"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fabric}
              placeholder="enter fabric"
              className={`form-control ${
                formik.errors.fabric ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.fabric}</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="sleeve" className="form-label">
              sleeve
            </label>
            <input
              type="text"
              name="sleeve"
              value={formik.values.sleeve}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`form-control ${
                formik.errors.sleeve ? "is-invalid" : ""
              }`}
              placeholder="enter sleeve type"
            />
            <div className="invalid-feedback">{formik.errors.sleeve}</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="pattern" className="form-label">
              pattern
            </label>
            <input
              type="text"
              name="pattern"
              value={formik.values.pattern}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="enter pattern"
              className={`form-control ${
                formik.errors.pattern ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.pattern}</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="color" className="form-label">
              color
            </label>
            <input
              type="text"
              name="color"
              value={formik.values.color}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="enter color"
              className={`form-control ${
                formik.errors.color ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.color}</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="items" className="form-label">
              number of items
            </label>
            <input
              type="number"
              name="items"
              value={formik.values.items}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="enter number of items"
              className={`form-control ${
                formik.errors.items ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.items}</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="price" className="form-label">
              price
            </label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="enter price"
              className={`form-control ${
                formik.errors.price ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.price}</div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="items" className="form-label">
              section
            </label>
            <select
              className={`form-control ${
                formik.errors.section ? "is-invalid" : ""
              }`}
              name="section"
              aria-label="Default select example"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.section}
            >
              <option value="">Select Section</option>
              <option value="mens wear">Mens Wear</option>
              <option value="womens wear">Womens Wear</option>
              <option value="footwear">footwear</option>
            </select>
            <div className="invalid-feedback">{formik.errors.section}</div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <label htmlFor="short description" className="form-label">
              about product
            </label>
            <input
              type="text"
              name="about"
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="enter short description"
              className={`form-control ${
                formik.errors.about ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{formik.errors.about}</div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <label htmlFor="status" className="form-label">
              status
            </label>
            <select
              className={`form-control ${
                formik.errors.status ? "is-invalid" : ""
              }`}
              aria-label="Default select example"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option value="">Select Status</option>
              <option value="in stock">In Stock</option>
              <option value="only few left">Only few left</option>
              <option value="out of stock">Out of stock</option>
            </select>
            <div className="invalid-feedback">{formik.errors.status}</div>
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <textarea
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`form-control ${
                formik.errors.description ? "is-invalid" : ""
              }`}
              placeholder="enter product description"
            ></textarea>
            <div className="invalid-feedback">{formik.errors.description}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              product images
            </label>
            <input
              className={`form-control ${
                formik.errors.images ? "is-invalid" : ""
              }`}
              type="file"
              multiple
              name="images"
              onBlur={formik.handleBlur}
              onChange={fileSubmit}
              id="formFile"
              ref={fileInputRef}
            />
            <div className="invalid-feedback">{formik.errors.images}</div>
          </div>
          {imagePreview.length > 0 ? (
            <div className="card">
              <div className="card-body row g-3">
                {imagePreview.map((image, index) => (
                  <div className="col-lg-2 col-md-4 col-sm-12" key={index}>
                    <div className="w-auto position-absolute">
                      <button
                        type="button"
                        className="text-danger fs-4"
                        onClick={() => {
                          const newImages = formik.values.images.filter(
                            (_, i) => i !== index
                          );
                          formik.setFieldValue("images", newImages);
                          setImagePreview(
                            newImages.map((file) => URL.createObjectURL(file))
                          );
                        }}
                      >
                        <i className="fa-solid fa-rectangle-xmark"></i>
                      </button>
                    </div>
                    <img src={image} alt="images" className="img-fluid" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        { loading ? (
                  <div className="m-3 text-end">
<ButtonLoader/>
                </div>
        ):(
          <div className="m-3 text-end">
          <input
            type="submit"
            value="add product"
            className="btn btn-success"
          />
        </div>
        )}
      </form>
    </div>
  );
});
Add_Products_Form.displayName = "Add_Products_Form";
export default Add_Products_Form;