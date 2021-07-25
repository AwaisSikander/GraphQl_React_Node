import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
const Login = () => {
    const [email, setEmail] = useState("sikande007@gmail.com");
    const [password, setPassword] = useState("Awais@786");
    const [loading, setloading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            await auth
                .signInWithEmailAndPassword(email, password)
                .then(async (result) => {
                    const { user } = result;
                    const idTokenResult = await user.getIdTokenResult();
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: { email: user.email, token: idTokenResult.token },
                    });
                    // send user info to our server to save/update in mongodb
                    // Then Redirect
                    history.push("/");
                });
        } catch (error) {
            console.log("Login Error", error);
            toast.error(error.message);
            setloading(false);
        }
    };
    const googleLogin = () => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload: { email: user.email, token: idTokenResult.token },
            });
            // send user info to our server to save/update in mongodb
            // Then Redirect
            history.push("/");
        });
    };

    return (
        <div className="contianer  p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}
            <button onClick={googleLogin} className="btn btn-danger my-3">Login with google</button>
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
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter password"
                        disabled={loading}
                    />
                </div>
                <button
                    className="btn btn-raised btn-primary mt-2"
                    disabled={!email || !password || loading}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
