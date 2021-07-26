import React, { useState, Fragment } from 'react';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm"

const PasswordUpdate = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        auth.currentUser.updatePassword(password).then(()=>{
            setLoading(false)
            setPassword("");
            toast.success("Password Updated Successfully");

        }).catch(err=>{
            setLoading(false)
            toast.error(err.message)
        })
    }

    return (
        <div className="contianer ">
            <div className="row p-5">
                {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Update Password</h4>)}
                <AuthForm
                    password={password}
                    loading={loading}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                    showPasswordInput={true}
                    hideEmailInput={true}
                />
            </div>
        </div>
    )
}
export default PasswordUpdate;