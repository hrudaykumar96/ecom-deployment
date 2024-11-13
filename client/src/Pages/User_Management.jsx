import { useEffect, useState } from "react";
import Navs from "../components/Navs";
import User_Management_Section from "../components/User_Management_Section";
import Update_User from "../forms/Update_User";
import { useDispatch, useSelector } from "react-redux";
import { getuserdatabyid } from "../redux/api";
import { clearusersdatabyid } from "../redux/slices";

const User_Management = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | User Management'
  },[]);

  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const token = localStorage.getItem('token');
  const data = useSelector((state)=>state.userdatabyidslice.data);
  const userdata = useSelector((state)=>state.userdata.data);

  useEffect(()=>{
    if(id && token){
      dispatch(getuserdatabyid({token, id}))
      dispatch(clearusersdatabyid())
    }
  },[id, token, dispatch]);
  
  return (
    <div className="min-vh-100 w-100" style={{backgroundColor:'rgba(217,217,217'}}>
        <Navs/>
        <User_Management_Section setId={setId} userdata={userdata}/>
        <Update_User data={data}/>
    </div>
  )
}

export default User_Management