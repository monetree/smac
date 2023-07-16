import React, { useState } from "react";

const Admin = ({}) => {
  const [height, setHeight] = useState(64);

  return (
    <div className="mt-3 container">
      <div className="row mt-5">
        <div className="col-md-4 offset-md-2">
          <input
            placeholder="Enter email address.."
            type="text"
            className="form-control p-1"
          />
        </div>
        <div className="col-md-2">
          <div>
            <button type="button" className={`btn btn-sm btn-danger me-2`}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
