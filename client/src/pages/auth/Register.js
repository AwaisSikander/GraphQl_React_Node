import React,{useState} from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  function handleSubmit() {
    //Will be implemented later
  }
  return (
    <div className="contianer ">
      <div className="row p-5">
        <h4>Register</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter email"
              disabled={loading}
            />
          </div>
          <button className="btn btn-raised btn-primary mt-2" disabled={!email || loading}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
