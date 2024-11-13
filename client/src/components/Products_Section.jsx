import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteproductbyid, getallproducts, getproducts } from '../redux/api';
import { clearallproducts, cleardeleteproductsdatabyid } from '../redux/slices';
import swal from "sweetalert";

const Products_Section = React.memo(() => {

  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.allproductslice);
  const response = useSelector((state)=>state.deleteproductsdataslicebyid.response);

  // State for filters
  const [filters, setFilters] = useState({
    sellerName: '',
    sellerEmail: '',
    sellerMobile: '',
    brandName: '',
    category: '',
    section: '',
    status: ''
  });

  useEffect(() => {
    if (token) {
      dispatch(getallproducts(token));
    }
  }, [token, dispatch]);

  // Handle changes in filter inputs
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Filter products based on the filters state
  const filteredData = data?.success?.filter((product) => {
    return (
      product?.user?.name.toLowerCase().includes(filters.sellerName.toLowerCase()) &&
      product?.user?.email.toLowerCase().includes(filters.sellerEmail.toLowerCase()) &&
      product?.user?.mobile.toString().includes(filters.sellerMobile) &&
      product?.brand_name.toLowerCase().includes(filters.brandName.toLowerCase()) &&
      product?.category.toLowerCase().includes(filters.category.toLowerCase()) &&
      (filters.section === '' || product?.section.toLowerCase() === filters.section.toLowerCase()) &&
      (filters.status === '' || product?.status.toLowerCase() === filters.status.toLowerCase())
    );
  });

  useEffect(()=>{
    if(data?.error){
      dispatch(clearallproducts());
      swal("Error",'Internal server error', 'error')
    }
  },[data, dispatch]);

  const deleteproduct=(id)=>{
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover",
      icon: "warning", 
      buttons: ["No, cancel plx!", "Yes, delete it!"], 
    })
    .then((isConfirm) => {
      if (isConfirm) {
        dispatch(deleteproductbyid({token, id}));
        dispatch(cleardeleteproductsdatabyid());
        swal("Deleted!", "product deleted successfully.", "success");
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  useEffect(()=>{
    if(response){
      if(response?.error){
        swal('Error', 'internal server error', 'error')
      } else if(response?.status){
        swal('Error', `${response?.status}`, 'error')
      } else if(response?.success){
        if(token){
          dispatch(getallproducts(token))
          dispatch(getproducts(token))
        }
      }
    }
  },[response, token, dispatch]);
  

  return (
    <div className='p-2 d-flex align-items-center justify-content-center flex-column' style={{ minHeight: '100vh' }}>
      <h4 className='text-center'>Products Management</h4>
      <div className='table-responsive w-100'>
        <span className='bg-light p-2 mb-1'>total products: {filteredData?.length}</span>

        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Seller Name</p>
                  <input
                    type="search"
                    name="sellerName"
                    value={filters.sellerName}
                    onChange={handleFilterChange}
                    className='form-control'
                    placeholder='Search Seller Name'
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Seller Email</p>
                  <input
                    type="search"
                    name="sellerEmail"
                    value={filters.sellerEmail}
                    onChange={handleFilterChange}
                    className='form-control'
                    placeholder='Search Seller Email'
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Seller Mobile Number</p>
                  <input
                    type="number"
                    name="sellerMobile"
                    value={filters.sellerMobile}
                    onChange={handleFilterChange}
                    className='form-control'
                    placeholder='Search Seller Mobile Number'
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Brand Name</p>
                  <input
                    type="search"
                    name="brandName"
                    value={filters.brandName}
                    onChange={handleFilterChange}
                    className='form-control'
                    placeholder='Search Brand Name'
                  />
                </div>
              </th>

              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Category</p>
                  <input
                    type="search"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className='form-control'
                    placeholder='Search Category'
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Section</p>
                  <select
                    name="section"
                    value={filters.section}
                    onChange={handleFilterChange}
                    className="form-select"
                  >
                    <option value="">Select Section</option>
                    <option value="mens wear">Mens Wear</option>
                    <option value="womens wear">Womens Wear</option>
                    <option value="footwear">Footwear</option>
                  </select>
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Status</p>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="form-select"
                  >
                    <option value="">Select Status</option>
                    <option value="in stock">In Stock</option>
                    <option value="only few left">Only Few Left</option>
                    <option value="out of stock">Out of Stock</option>
                  </select>
                </div>
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">
                  <p className='text-center'>Loading, please wait...</p>
                </td>
              </tr>
            ) : (
              filteredData?.length > 0 ? (
                filteredData?.map((product, index) => (
                  <tr key={index}>
                    <td>{product?.user?.name}</td>
                    <td style={{textTransform:'none'}}>{product?.user?.email}</td>
                    <td>{product?.user?.mobile}</td>
                    <td>{product?.brand_name}</td>
                    <td>{product?.category}</td>
                    <td>{product?.section}</td>
                    <td>{product?.status}</td>
                    <td>
                      <div className="d-flex flex-wrap justify-content-center">
                        <Link className='btn btn-success' to={`/update/products/${product?._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                        <Link className='btn btn-warning' to={`/description/${product._id}`}><i className="fa-solid fa-eye"></i></Link>
                        <button type="button" className='btn btn-danger' onClick={()=>deleteproduct(product?._id)}><i className="fa-solid fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <p className='text-center text-danger'>No data found</p>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

Products_Section.displayName = 'Products_Section';
export default Products_Section;