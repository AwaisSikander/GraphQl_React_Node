import React, { useState, useMemo, useContext } from 'react';
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client"
// import omitDeep from 'omit-deep';
import { PROFILE } from "../../graphql/queries"
import { USER_UPDATE } from "../../graphql/mutations"
import Resizer from "react-image-file-resizer";
import axios from "axios"
import { AuthContext } from "../../context/authContext"

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

    const fileResizeAndUpload = (e) => {
        var fileInput = false;
        if (e.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    e.target.files[0],
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        console.log(uri);
                        axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`, { image: uri }, {
                            headers: {
                                authtoken: state.user.token
                            }
                        })
                            .then(res => {
                                setLoading(false);
                                console.log("CLOUDINARY UPLOAD",res)
                                setValues({...values,images:[...images,res.data]})
                            })
                            .catch(err => {
                                setLoading(false);
                                console.log('CLOUDINARY UPLOAD FAILED',err)
                            })
                    },
                    "base64",
                    200,
                    200
                );
            } catch (err) {
                console.log(err);
            }
        }
    }
    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Username"
                    disabled={loading}
                />
            </div>
            <div className="form-group">
                <label>Name</label>
                <input type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Name"
                    disabled={loading}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                    disabled
                />
            </div>
            <div className="form-group">
                <label>Image</label>
                <input type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={fileResizeAndUpload}
                    placeholder="Image"
                />
            </div>
            <div className="form-group">
                <label>About</label>
                <textarea
                    className="form-control"
                    name="about"
                    value={about}
                    placeholder="About"
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>
            <button className="btn btn-primary mt-2" type="submit" disabled={!email || loading}>Submit</button>
        </form>
    );

    return (
        <div className="container p-5">
            {profileUpdateForm()}
        </div>
    )
}
export default Profile;