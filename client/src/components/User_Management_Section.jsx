import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteuserdatabyid, getallusers } from '../redux/api';
import propTypes from "prop-types";
import swal from "sweetalert";
import { clearallusersdata } from '../redux/slices';

const User_Management_Section = React.memo(({setId, userdata}) => {
  const { loading, data, error } = useSelector((state) => state.alluserslice);
  const response = useSelector((state)=>state.updateuserdatabyidslice.response);
  const deleteresponse = useSelector((state)=>state.deleteuserdatabyidslice.response);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const getid=(id)=>{
    setId(id)
  }
  
  const [filterdata, setFilterdata] = useState({
    name: '',
    email: '',
    mobile: '',
    role: ''
  });

  useEffect(() => {
    if (token) {
      dispatch(getallusers(token));
    } 
    
    if(response?.success && token){
      dispatch(getallusers(token));
    }
    if(deleteresponse?.success && token){
      dispatch(getallusers(token));
    }
  }, [token, dispatch, response, deleteresponse]);
  clearallusersdata

  const handlefiltersubmit = useCallback((e) => {
    const { name, value } = e.target;
    setFilterdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const filteredUsers = useMemo(() => {
    return data?.success?.filter((user) => {
      return (
        (filterdata.name ? user.name.toLowerCase().includes(filterdata.name.toLowerCase()) : true) &&
        (filterdata.email ? user.email.toLowerCase().includes(filterdata.email.toLowerCase()) : true) &&
        (filterdata.mobile ? user.mobile.includes(filterdata.mobile) : true) &&
        (filterdata.role ? user.role.toLowerCase().includes(filterdata.role.toLowerCase()) : true)
      );
    });
  }, [data, filterdata]);

  const deleteuser = (id) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover",
      icon: "warning", 
      buttons: ["No, cancel plx!", "Yes, delete it!"], 
    })
    .then((isConfirm) => {
      if (isConfirm) {
        dispatch(deleteuserdatabyid({ token, id }));
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  useEffect(()=>{
    if(data?.error){
      dispatch(clearallusersdata());
      swal("Error",'Internal server error','error');
    }
  },[dispatch, data]);


  return (
    <div className="d-flex align-items-center justify-content-center flex-column min-vh-100 p-2">
      <h4 className="text-center">User Management</h4>

      <div className="table-responsive w-100">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Name</p>
                  <input
                    type="search"
                    value={filterdata.name}
                    name="name"
                    className="form-control"
                    placeholder="Search by Name"
                    onChange={handlefiltersubmit}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Email</p>
                  <input
                    type="email"
                    value={filterdata.email}
                    name="email"
                    className="form-control"
                    placeholder="Search by Email"
                    onChange={handlefiltersubmit}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Mobile Number</p>
                  <input
                    type="number"
                    value={filterdata.mobile}
                    name="mobile"
                    className="form-control"
                    placeholder="Search by Mobile"
                    onChange={handlefiltersubmit}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="d-flex flex-column">
                  <p>Role</p>
                  <select
                    className="form-select"
                    name="role"
                    aria-label="Role Select"
                    value={filterdata.role}
                    onChange={handlefiltersubmit}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                    <option value="user">User</option>
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
            ) : error ? (
              <tr>
                <td colSpan="5">
                  <p className="text-center text-danger">{error.message}</p>
                </td>
              </tr>
            ) : (
              <>
                {filteredUsers?.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td style={{ textTransform: 'none' }}>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.role}</td>
                      <td>
                        <div className="d-flex flex-wrap justify-content-center">
                          <button type="button" className={`btn btn-success ${userdata?.success?._id === user._id ? 'disabled':''}`} data-bs-toggle="modal" data-bs-target="#userModal" onClick={()=>getid(user._id)} >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button type="button" className={`btn btn-danger ${userdata?.success?._id === user._id ? 'disabled':''}`} onClick={()=>deleteuser(user._id)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <p className="text-center text-danger">no data found</p>
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

User_Management_Section.displayName = 'User_Management_Section';
User_Management_Section.propTypes={
  setId:propTypes.any,
  userdata:propTypes.any,
}
export default User_Management_Section;