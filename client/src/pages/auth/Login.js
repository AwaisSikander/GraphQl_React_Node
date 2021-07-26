import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { useMutation, gql } from '@apollo/client';
import AuthForm from "../../components/forms/AuthForm"
import {USER_CREATE} from "../../graphql/mutations"

const Login = () => {
    const [email, setEmail] = useState("sikande007@gmail.com");
    const [password, setPassword] = useState("Awais@786");
    const [loading, setloading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    let history = useHistory();
    const [userCreate] = useMutation(USER_CREATE);

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
                    userCreate();
                    // Then Redirect
                    history.push("/profile");
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
            userCreate();
            // Then Redirect
            history.push("/profile");
        });
    };

    return (
        <div className="contianer p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}
            <button onClick={googleLogin} className="btn btn-danger my-3">Login with google</button>
            <AuthForm
                email={email}
                loading={loading}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                showPasswordInput={true}
            />
            <Link className="float-end text-danger" to="/password/forgot">Password Forgot</Link>
        </div>
    );
};

export default Login;
