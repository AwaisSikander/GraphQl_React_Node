import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useMutation, gql } from '@apollo/client';
import AuthForm from "../../components/forms/AuthForm"
import {USER_CREATE} from "../../graphql/mutations"

const CompleteRegistration = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const [userCreate] = useMutation(USER_CREATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validation
    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // Remove Email From Local Storage
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        // Dispatch User With Token
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });
        // make api to save/update user in mongodb
        userCreate();
        // Then Redirect
        history.push('/profile');
      }
    } catch (error) {
      console.log("register complete error", error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="contianer ">
      <div className="row p-5">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <h4>Complete Your Registeration</h4>
        )}
        <AuthForm
          email={email}
          loading={loading}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          showPasswordInput={true}
        />
      </div>
    </div>
  );
};

export default CompleteRegistration;
