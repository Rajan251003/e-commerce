import React, { useState, useEffect } from 'react'
import "./style.css"
import { UPDATE_PROFILE_RESET } from "../../../Redux/constant/userConstant";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../Layouts/MetaData";
import Loading from '../../Layouts/Loading';
import { clearErrors } from '../../../Redux/action/productAction';
import { loadUser, updateProfile } from '../../../Redux/action/userAction';
import Toast from "../../Layouts/Toast";
import ToastContainerBox from "../../Layouts/ToastContainerBox";

const UpdateProfile = ({ history }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("https://img.freepik.com/free-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?size=626&ext=jpg&ga=GA1.2.1407001320.1653475015");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
        
        Toast({
            msg: "Profile Update Successfully"
        })
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            Toast({
                msg: error
            })

            dispatch(clearErrors());
        }

        if (isUpdated) {
            dispatch(loadUser());

            history.push("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, history, user, isUpdated]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <MetaData title="Update Profile" />
                    <ToastContainerBox />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <form className="updateProfile" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                                <h2>UPDATE PROFILE</h2>
                                <div className="updateInput">
                                    <input
                                        type="text"
                                        placeholder="Enter Your Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateInput">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        required
                                        value={email}
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="updateImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        className='fileChange'
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <div className="updateSubmitBtn">
                                    <input
                                        type="submit"
                                        value="UPDATE"
                                        className="submitBrn"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateProfile