import React, { useContext } from 'react'
import Resizer from "react-image-file-resizer";
import axios from "axios"
import { AuthContext } from '../../context/authContext';
import Image from '../Image';

const FileUpload = ({ setLoading, setValues, values, loading }) => {
    const { state } = useContext(AuthContext);
    const fileResizeAndUpload = (e) => {
        var fileInput = false;
        setLoading(true)
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
                        // console.log(uri);
                        axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`, { image: uri }, {
                            headers: {
                                authtoken: state.user.token
                            }
                        })
                            .then(res => {
                                setLoading(false);
                                console.log("CLOUDINARY UPLOAD", res)
                                const { images } = values;
                                setValues({ ...values, images: [...images, res.data] })
                            })
                            .catch(err => {
                                setLoading(false);
                                console.log('CLOUDINARY UPLOAD FAILED', err)
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
    const handleImageRemove = (id) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/removeimage`, { public_id: id }, {
            headers: {
                authtoken: state.user.token
            }
        })
            .then(res => {
                setLoading(false);
                console.log("CLOUDINARY DELETE", res)
                const { images } = values;
                let filteredImages = images.filter(item => {
                    return item.public_id !== id
                })
                setValues({ ...values, images: filteredImages })
            })
            .catch(err => {
                setLoading(false);
                console.log('CLOUDINARY DELETE FAILED', err)
            })
    }
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="form-group">
                    <label className="btn btn-primary" >Upload Image
                        <input
                            type="file"
                            hidden
                            className="form-control"
                            accept="image/*"
                            onChange={fileResizeAndUpload}
                            placeholder="Image"
                        />
                    </label>
                </div>
            </div>
            <div className="col-md-9">
                {values.images.map((image) => {
                    return <Image
                        image={image}
                        key={image.public_id}
                        handleImageRemove={handleImageRemove}
                    />
                })}
            </div>
        </div>

    )
}
export default FileUpload;