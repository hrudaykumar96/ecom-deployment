import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getallproducts, getProductsDataById, updateproductbyid } from '../redux/api';
import swal from 'sweetalert';
import ButtonLoader from '../effects/ButtonLoader';
import { clearupdateproductsdatabyid } from '../redux/slices';

const Update_Products_Form = React.memo(() => {
  // Image format validation
  const imageformat = ['image/jpg', 'image/jpeg', 'image/png'];
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState([]);
  const product_data = useSelector((state)=>state.getproductsdataslicebyid.data);
  const { loading, response } = useSelector((state)=>state.updateproductsdataslicebyid);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getProductsDataById({ token, id }));
    }
  }, [token, dispatch, id]);


  // Formik initialization
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brand_name: product_data?.success?.brand_name || '',
      category: product_data?.success?.category || '',
      fabric: product_data?.success?.fabric || '',
      sleeve: product_data?.success?.sleeve || '',
      pattern: product_data?.success?.pattern || '',
      color: product_data?.success?.color || '',
      items: product_data?.success?.items || '',
      price: product_data?.success?.price || '',
      section: product_data?.success?.section || '',
      about: product_data?.success?.about || '',
      status: product_data?.success?.status || '',
      description: product_data?.success?.description || '',
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
      images: yup.array()
      .nullable()
      .min(0)
      .of(
        yup.mixed().test(
          'fileformat',
          'Only jpg, jpeg, png are allowed',
          (value) => !value || imageformat.includes(value?.type)
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
    dispatch(updateproductbyid({formData, token, id}))
    },
  });

  

  // Handling file input change
  const fileSubmit = (e) => {
    const imagefiles = Array.from(e.target.files);
    formik.setFieldValue("images", imagefiles);
    const preview = imagefiles.map((file) => URL.createObjectURL(file));
    setImagePreview(preview);
  };

  useEffect(()=>{
    if(response){
      if(response?.success){
        navigate('/products');
        dispatch(getallproducts(token));
        swal('Success', `${response?.success}`, 'success')
        dispatch(clearupdateproductsdatabyid());
      } else if(response?.status){
        swal('Error', `${response?.status}`, 'error')
        dispatch(clearupdateproductsdatabyid())
      } else if(response?.error){
        swal('Error', 'internal server error', 'error')
        dispatch(clearupdateproductsdatabyid())
      }
    }
  },[response, dispatch, navigate]);

  return (
    <div className='p-3'>
      <form
        action=""
        className='bg-light p-3'
        style={{ borderRadius: '1rem' }}
        onSubmit={formik.handleSubmit}
      >
        <h4 className='text-center text-decoration-underline'>Update Product</h4>
        <div className="row g-3">
          {/* Brand Name */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="brand_name" className="form-label">Brand Name</label>
            <input
              type="text"
              name="brand_name"
              value={formik.values.brand_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.brand_name && formik.touched.brand_name ? 'is-invalid' : ''}`}
              placeholder="Enter brand name"
            />
            <div className="invalid-feedback">{formik.errors.brand_name}</div>
          </div>

          {/* Category */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.category && formik.touched.category ? 'is-invalid' : ''}`}
              placeholder="Enter category"
            />
            <div className="invalid-feedback">{formik.errors.category}</div>
          </div>

          {/* Fabric */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="fabric" className="form-label">Fabric</label>
            <input
              type="text"
              name="fabric"
              value={formik.values.fabric}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.fabric && formik.touched.fabric ? 'is-invalid' : ''}`}
              placeholder="Enter fabric"
            />
            <div className="invalid-feedback">{formik.errors.fabric}</div>
          </div>

          {/* Sleeve */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="sleeve" className="form-label">Sleeve</label>
            <input
              type="text"
              name="sleeve"
              value={formik.values.sleeve}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.sleeve && formik.touched.sleeve ? 'is-invalid' : ''}`}
              placeholder="Enter sleeve type"
            />
            <div className="invalid-feedback">{formik.errors.sleeve}</div>
          </div>

          {/* Pattern */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="pattern" className="form-label">Pattern</label>
            <input
              type="text"
              name="pattern"
              value={formik.values.pattern}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.pattern && formik.touched.pattern ? 'is-invalid' : ''}`}
              placeholder="Enter pattern"
            />
            <div className="invalid-feedback">{formik.errors.pattern}</div>
          </div>

          {/* Color */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="color" className="form-label">Color</label>
            <input
              type="text"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.color && formik.touched.color ? 'is-invalid' : ''}`}
              placeholder="Enter color"
            />
            <div className="invalid-feedback">{formik.errors.color}</div>
          </div>

          {/* Number of Items */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="items" className="form-label">Number of Items</label>
            <input
              type="number"
              name="items"
              value={formik.values.items}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.items && formik.touched.items ? 'is-invalid' : ''}`}
              placeholder="Enter number of items"
            />
            <div className="invalid-feedback">{formik.errors.items}</div>
          </div>

          {/* Price */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.price && formik.touched.price ? 'is-invalid' : ''}`}
              placeholder="Enter price"
            />
            <div className="invalid-feedback">{formik.errors.price}</div>
          </div>

          {/* Section */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <label htmlFor="section" className="form-label">Section</label>
            <select
              name="section"
              value={formik.values.section}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-select ${formik.errors.section && formik.touched.section ? 'is-invalid' : ''}`}
            >
              <option value="">Select Section</option>
              <option value="mens wear">Mens Wear</option>
              <option value="womens wear">Womens Wear</option>
              <option value="footwear">Footwear</option>
            </select>
            <div className="invalid-feedback">{formik.errors.section}</div>
          </div>

          {/* About Product */}
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <label htmlFor="about" className="form-label">About Product</label>
            <input
              type="text"
              name="about"
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.about && formik.touched.about ? 'is-invalid' : ''}`}
              placeholder="Enter a short description"
            />
            <div className="invalid-feedback">{formik.errors.about}</div>
          </div>

          {/* Status */}
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-select ${formik.errors.status && formik.touched.status ? 'is-invalid' : ''}`}
            >
              <option value="">Select Status</option>
              <option value="in stock">In Stock</option>
              <option value="only few left">Only Few Left</option>
              <option value="out of stock">Out of Stock</option>
            </select>
            <div className="invalid-feedback">{formik.errors.status}</div>
          </div>

          {/* Product Description */}
          <div className="col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.description && formik.touched.description ? 'is-invalid' : ''}`}
              placeholder="Enter product description"
            />
            <div className="invalid-feedback">{formik.errors.description}</div>
          </div>

          {/* Product Images */}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Product Images</label>
            <input
              type="file"
              multiple
              name="images"
              onChange={fileSubmit}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.errors.images && formik.touched.images ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{formik.errors.images}</div>
          </div>

          {/* Image Previews */}
          {imagePreview?.length > 0 && (
            <div className="card">
              <div className="card-body row g-3">
                {imagePreview.map((file, index) => (
                  <div key={index} className="col-lg-2 col-md-4 col-sm-12">
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
                    <img
                      src={file.startsWith('blob:') ? file : `http://localhost:3000/${file}`}
                      alt={`product-image-${index}`}
                      className="img-fluid"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="m-3 text-end">
          { loading ? <ButtonLoader/>:(
          <button type="submit" className='btn btn-success'>
          Update Product
        </button>
          )}
        </div>
      </form>
    </div>
  );
});

Update_Products_Form.displayName = 'Update_Products_Form';
export default Update_Products_Form;