import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const config = {
      url: process.env.REACT_APP_CONFIRMATION_REDIRECT,
      handleCodeInApp: true,
    };
    const result = await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email} click the link to complete your reisteration.`);
    // Save User Email to Local Storage
    window.localStorage.setItem("emailForRegistration", email);
    /* Clear Email State */
    setEmail("");
    setloading(false);
  };
  return (
    <div className="contianer ">
      <div className="row p-5">
        {loading ? (<h4 className="text-danger">Loading...</h4>) :(<h4>Register</h4>)} 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email"
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

export default Register;
