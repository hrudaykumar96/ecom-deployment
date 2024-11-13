

const ButtonLoader = () => {
  return (
    <>
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <span role="status"> please wait...</span>
      </button>
    </>
  );
};

export default ButtonLoader;