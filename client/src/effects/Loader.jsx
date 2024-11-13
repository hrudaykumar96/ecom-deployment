import logo from "../assets/logo.webp";

const Loader = () => {
  return (
    <div
      className="position-fixed top-0 bottom-0 start-0 end-0 w-100 d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light"
      
    >
      <img
        src={logo}
        alt="logo"
        loading="lazy"
        className="img-fluid"
        style={{ height: "100px", width: "300px", mixBlendMode: "darken" }}
      />
      <div className="d-flex align-items-center flex-wrap">
        <strong role="status">Loading Please Wait...</strong>
        <div className="spinner-border ms-3" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default Loader;