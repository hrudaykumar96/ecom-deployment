import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import propTypes from "prop-types";

const Sidebar = React.memo(({data}) => {
    const location = useLocation();
  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample1" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title fs-3" id="offcanvasExampleLabel"><span style={{color:'#fb641b'}}>E</span><span className='text-warning' style={{textTransform:'none', fontStyle:'italic'}}>com</span></h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body p-0">
  <div className="list-group list-group-flush">
  <Link to="/add/products" className={`list-group-item list-group-item-action ${location.pathname === "/add/products" ? 'active' : null}`} aria-current="true">
    add products
  </Link>
  { data?.success?.role === 'admin' && 
  <Link to="/seller/management" className={`list-group-item list-group-item-action ${location.pathname === "/seller/management" ? 'active' : null}`} >sellers management</Link>
}
  <Link to="/products" className={`list-group-item list-group-item-action ${location.pathname === "/products" ? 'active' : null}`}>products section</Link>
  { data?.success?.role === 'admin' && 
  <Link to="/user/management" className={`list-group-item list-group-item-action ${location.pathname === "/user/management" ? 'active' : null}`}>user management</Link>
}
{ data?.success?.role === 'admin' && 
  <Link to="/send/notifications" className={`list-group-item list-group-item-action ${location.pathname === "/send/notifications" ? 'active' : null}`}>send notification</Link>
}
</div>
  </div>
</div>
  )
})
Sidebar.displayName = 'Sidebar'
Sidebar.propTypes={
  data:propTypes.any
}
export default Sidebar