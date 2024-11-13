import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getsellers, deletesellerdatabyid } from '../redux/api';
import { clearallsellersdata, cleardeletesellerdata } from '../redux/slices';
import propTypes from "prop-types";
import swal from "sweetalert";

const Seller_Management_Section = React.memo(({setId}) => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.allsellerslice);
  const response = useSelector((state)=>state.deletesellerdataslicebyid.response);

  // State for filter fields
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    mobile: '',
    status: ''
  });

  // State for filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Fetch sellers data
  useEffect(() => {
    if (token) {
      dispatch(getsellers(token));
    }
  }, [token, dispatch]);

  useEffect(()=>{
    if(data){
      if(data?.error){
        dispatch(clearallsellersdata());
      }
    }
  },[data, dispatch]);

  // Handle data updates and apply filters
  useEffect(() => {
    if (data && Array.isArray(data?.success)) {
      // Apply filters to data after fetching
      applyFilters(data?.success);
    } else {
      // Handle case where data.success is not an array
      setFilteredData([]);
    }
  }, [data, dispatch, filters]);

  // Apply filters to sellers data
  const applyFilters = (sellers) => {
    let filtered = [...sellers];

    // Filter by name
    if (filters.name) {
      filtered = filtered.filter((seller) =>
        seller.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filter by email
    if (filters.email) {
      filtered = filtered.filter((seller) =>
        seller.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    // Filter by mobile
    if (filters.mobile) {
      filtered = filtered.filter((seller) =>
        seller.mobile.toString().includes(filters.mobile)
      );
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter((seller) =>
        seller.status.toLowerCase() === filters.status.toLowerCase() // Case-insensitive match
      );
    }

    setFilteredData(filtered);
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const getid=(id)=>{
    setId(id)
  }

  const deleteseller=(id)=>{
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover",
      icon: "warning", 
      buttons: ["No, cancel plx!", "Yes, delete it!"], 
    })
    .then((isConfirm) => {
      if (isConfirm) {
        dispatch(deletesellerdatabyid({token, id}));
        dispatch(cleardeletesellerdata());
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  useEffect(()=>{
    if(response){
      if(response?.success && token){
        dispatch(getsellers(token))
        dispatch(cleardeletesellerdata());
      }
    }
  },[response, dispatch, token]);

  return (
    <div className="d-flex align-items-center justify-content-center flex-column min-vh-100 p-2">
      <h4 className="text-center">Seller Management</h4>
      <div className="table-responsive w-100">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Name</p>
                  <input
                    type="search"
                    name="name"
                    className="form-control"
                    placeholder="Search by Name"
                    value={filters.name}
                    onChange={handleFilterChange}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Search by Email"
                    value={filters.email}
                    onChange={handleFilterChange}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Mobile Number</p>
                  <input
                    type="number"
                    name="mobile"
                    className="form-control"
                    placeholder="Search by Mobile"
                    value={filters.mobile}
                    onChange={handleFilterChange}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Status</p>
                  <select
                    name="status"
                    className="form-select"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending verification">Pending Verification</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                    <option value="on hold">On Hold</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">
                  <p className="text-center">Loading, please wait...</p>
                </td>
              </tr>
            ) : (
              <>
                {filteredData.length > 0 ? (
                  filteredData.map((seller, index) => (
                    <tr key={index}>
                      <td>{seller.name}</td>
                      <td style={{ textTransform: 'none' }}>{seller.email}</td>
                      <td>{seller.mobile}</td>
                      <td>{seller.status}</td>
                      <td>
                        <div className="d-flex flex-wrap justify-content-center">
                          <button
                            type="button"
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#sellerModal"
                            onClick={()=>getid(seller._id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button type="button" className="btn btn-danger" onClick={()=>deleteseller(seller._id)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <p className="text-center text-danger">No data found</p>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

Seller_Management_Section.displayName = 'Seller_Management_Section';
Seller_Management_Section.propTypes={
  setId: propTypes.any
}
export default Seller_Management_Section;