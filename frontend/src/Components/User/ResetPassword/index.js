import React, { useEffect, useState } from 'react'
import "./style.css"
import MetaData from "../../Layouts/MetaData";
import Loading from '../../Layouts/Loading';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from '../../../Redux/action/userAction';
import Toast from "../../Layouts/Toast";
import ToastContainerBox from "../../Layouts/ToastContainerBox";

const ResetPassword = ({ match, history }) => {
    const dispatch = useDispatch();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(match.params.token, myForm));
        
        Toast({
            msg: "Password Change Succesfully"
        });
    };

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

        if (success) {
            history.push("/login");
        }

    }, [dispatch, error, history, success]);

    return (
        <>
            <MetaData title={`Update Password`} />
            <ToastContainerBox />
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className="passwordResetContainer">
                        <div className="passwordResetBox">
                            <form className='passwordResetBody' onSubmit={resetPasswordSubmit}>
                                <h2>RESET PASSWORD</h2>
                                <div className='resetPasswordInput'>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className='resetPasswordInput'>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="resetPasswordBtn">
                                    <input
                                        type="submit"
                                        value="RESET"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ResetPassword