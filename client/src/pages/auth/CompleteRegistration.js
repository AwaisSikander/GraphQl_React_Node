import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const CompleteRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const handleSubmit = () => {

  };
  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [history])
  return (
    <div className="contianer ">
      <div className="row p-5">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <h4>Register</h4>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email"
              disabled
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control my-1"
              placeholder="Enter Password"
              disabled={loading}
            />
          </div>
          <button
            className="btn btn-raised btn-primary mt-2"
            disabled={!email || loading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegistration;
