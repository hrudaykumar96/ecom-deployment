import Navs from "../components/Navs";
import Carousel from "../components/Carousel";
import Hero_Section from "../components/Hero_Section";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userreducer } from "../redux/slices";
import swal from "sweetalert";
import Loader from "../effects/Loader";

const Home = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Home'
  },[]);

  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const { loading, data } = useSelector((state)=>state.userdata);
  
/* show website messages */
  useEffect(()=>{
    if(data){
      if(data?.error){
        navigate('/')
        swal("Error", 'internal server error', "error")
        localStorage.removeItem('token')
        dispatch(userreducer());
      } 
    }

  },[data, dispatch, navigate]);
/* if loading */
  if(loading) return (<Loader/>)
  
  return (
    <>
      <Navs/>
      <Carousel/>
      <Hero_Section />
    </>
  )
}
export default Home