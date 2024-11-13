import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getnotificationsdata } from "../redux/api";
import Skeleton from "react-loading-skeleton";

const Notifications = () => {
  /* document title */
  useEffect(() => {
    document.title = "Ecom | Notifications";
  }, []);

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { loading, data } = useSelector((state)=>state.getnotificationslice);
  const userdata = useSelector((state)=>state.userdata.data);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); 
  };

  useEffect(()=>{
    if(token){
      dispatch(getnotificationsdata(token))
    }
  },[token, dispatch]);

  return (
    <div
      className="min-vh-100 w-100 p-1"
      style={{ backgroundColor: "rgb(217, 217, 217)" }}
    >
      <div className="list-group">
        { data?.success?.length > 0 ? (
          data?.success?.map((msg,index)=>(
<Link
  key={index}
  to={`/notification/${msg._id}`}
  className="list-group-item list-group-item-action text-truncate"
  style={{ fontWeight: !msg.readBy?.includes(userdata?.success?._id) ? 'bold' : 'normal' }} // Apply inline style for unread
  aria-current="true"
>
  { loading ? <Skeleton/> : msg?.notification}
  <p className="card-text">
    <small className="text-body-secondary">
      {loading ? <Skeleton/> : formatDate(msg?.createdAt)}
    </small>
  </p>
</Link>

          ))
        ): (
          <p className="min-vh-100 w-100 d-flex align-items-center justify-content-center text-danger">no notifications found</p>
        )}
        
      </div>
    </div>
  );
};

export default Notifications;