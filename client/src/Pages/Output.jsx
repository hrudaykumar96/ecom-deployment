import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getnotificationsdatabyid } from "../redux/api";
import Skeleton from "react-loading-skeleton";


const Output = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Output'
  },[]);

  const { id } = useParams();
  const token = localStorage.getItem('token');
  const { loading, data } = useSelector((state)=>state.getnotificationbyidslice);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(token && id){
      dispatch(getnotificationsdatabyid({token, id}))
    }
  },[token, id, dispatch]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); 
  };

  return (
<div
      className="min-vh-100 p-auto pt-3 pb-3"
      style={{ backgroundColor: "rgb(217, 217, 217)" }}
    >
      <div className="container">
        <div className="card">
          <div className="card-body" style={{ textAlign: "justify" }}>
            {loading ? <Skeleton count={10}/> : data?.success?.notification}
          </div>
          <div className="card-footer">
          <p className="card-text">
            <small className="text-body-secondary">
            {loading ? <Skeleton/> : formatDate(data?.success?.createdAt)}
            </small>
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Output