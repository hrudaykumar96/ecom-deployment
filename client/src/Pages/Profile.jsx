import Orders from "../components/Orders";
import AddressForm from "../forms/AddressForm";
import Profile_Details from "../components/Profile_Details";
import { useEffect } from "react";
import propTypes from "prop-types";
import { useSelector } from "react-redux";
import Loader from "../effects/Loader";

const Profile = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Profile'
  },[]);

  const { loading, data } = useSelector((state)=>state.userdata);

  if(loading){
    return (<Loader/>)
  }
  return (
    <div className="min-vh-100 w-100" style={{ backgroundColor: "rgb(217, 217, 217)" }}>
        <AddressForm data={data}/>
        <Profile_Details data={data}/>
        <Orders/>
    </div>
  )
}
Profile.propTypes={
  data:propTypes.any
}
export default Profile