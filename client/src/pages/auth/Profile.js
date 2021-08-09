import React, { useState, useMemo, useContext } from 'react';
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client"
// import omitDeep from 'omit-deep';
import { PROFILE } from "../../graphql/queries"
import { USER_UPDATE } from "../../graphql/mutations"
import { AuthContext } from "../../context/authContext"
import UserProfile from "../../components/forms/UserProfile"
import FileUpload from '../../components/forms/FileUpload';

const Profile = () => {

    const { state } = useContext(AuthContext);
    const [values, setValues] = useState({
        username: "",
        name: "",
        email: "",
        about: "",
        images: []
    })
    const [loading, setLoading] = useState(false);

    const { data } = useQuery(PROFILE);

    useMemo(() => {
        if (data) {
            console.log(data.profile)
            setValues({
                ...values,
                username: data.profile.username,
                name: data.profile.name,
                email: data.profile.email,
                about: data.profile.about,
                images: data.profile.images
            })
        }
    }, [data])

    // MUTATION HOOK
    const [userUpdate] = useMutation(USER_UPDATE, {
        update: ({ data }) => {
            console.log("USER UPDATED DATA", data)
            toast.success("Profile Updated")
        }
    });

    // DESTRUCTURE    
    const { username, name, email, about, images } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        userUpdate({ variables: { input: values } });
        setLoading(false);

    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-12 pb-3">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Profile</h4>}
                </div>
                <FileUpload
                    setLoading={setLoading}
                    setValues={setValues}
                    values={values}
                    loading={loading}
                />
            </div>
            <UserProfile
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                {...values}
                loading={loading}
            />
        </div>
    )
}
export default Profile;