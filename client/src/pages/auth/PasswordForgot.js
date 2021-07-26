import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm"

const PasswordForgot = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(process.env.REACT_APP_PASSWORD_FORGOT_REDIRECT)
        const config = {
            url: process.env.REACT_APP_PASSWORD_FORGOT_REDIRECT,
            handleCodeInApp: true,
        };
        await auth.sendPasswordResetEmail(email, config).then(()=>{
            toast.success(`Email is sent to ${email}. Click on the link to reset password`);
            setEmail("");
            setLoading(false);
        }).catch(error=>{
            setLoading(false);
            console.log('Error Reset Password',error)
        })
    }
    return (<div className="contianer ">
        <div className="row p-5">
            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Forgot Password</h4>)}
            <AuthForm
                email={email}
                loading={loading}
                setEmail={setEmail}
                handleSubmit={handleSubmit}
            />
        </div>
    </div>)
}
export default PasswordForgot;