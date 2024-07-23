import React, { useState } from "react";
import Modal from "react-responsive-modal";
import styles from "./changepasswordModal.module.scss";
import { Button } from "react-bootstrap";
import { updateMyPassword } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";

const ChangePasswordPopup = ({ open, onCloseModal }) => {
  const dispatch = useDispatch();
  const [forgotValue, setForgotValue] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const inputChangeHandler = (e) => {
    setForgotValue({ ...forgotValue, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const SetLatestPasswordFormHandler = (e) => {
    e.preventDefault();

    let errorExist = false;
    let errorsObject = {};

    if (
      forgotValue?.oldPassword === "" ||
      forgotValue?.oldPassword === null ||
      forgotValue?.oldPassword === undefined
    ) {
      errorsObject.oldPassword = "Please Enter Your Old Password";
      errorExist = true;
    }
    if (
      forgotValue?.newPassword === "" ||
      forgotValue?.newPassword === null ||
      forgotValue?.newPassword === undefined
    ) {
      errorsObject.newPassword = "Please Enter Your New Password";
      errorExist = true;
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()+/\\|-]{8,}$/.test(
        forgotValue?.newPassword
      )
    ) {
      errorsObject.newPassword =
        "Password must be at least 8 characters with 1 Special & 1 Number";
      errorExist = true;
    }

    if (
      forgotValue?.confirm_password === "" ||
      forgotValue?.confirm_password === null ||
      forgotValue?.confirm_password === undefined
    ) {
      errorsObject.confirm_password = "Please Enter Your Confirm Password";
      errorExist = true;
    } else if (forgotValue?.newPassword !== forgotValue?.confirm_password) {
      errorsObject.confirm_password = "Password does not match.";
      errorExist = true;
    }

    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    const data = {
      old_password: forgotValue?.oldPassword,
      new_password: forgotValue?.newPassword,
      confirm_password: forgotValue?.confirm_password,
    };

    dispatch(updateMyPassword(data, onCloseModal));
  };

  const oldPasswordClickHandler = () => {
    setShowPassword({
      ...showPassword,
      oldPassword: !showPassword?.oldPassword,
    });
  };
  const newPasswordClickHandler = () => {
    setShowPassword({
      ...showPassword,
      newPassword: !showPassword?.newPassword,
    });
  };
  const confirmPasswordClickHandler = () => {
    setShowPassword({
      ...showPassword,
      confirmPassword: !showPassword?.confirmPassword,
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{ modal: "login-popup-modal" }}
        center
      >
        <div className="inner-container-logins">
          <div className="content">
            <div className="left">
              <div className="forms">
                <form action="" onSubmit={SetLatestPasswordFormHandler}>
                  <h4 className="headOfLOGin">Change Password</h4>

                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      Old Password*
                    </label>
                    <div className={styles.eyeinput}>
                      <input
                        type={
                          showPassword?.oldPassword === true
                            ? "text"
                            : "password"
                        }
                        className={
                          errors?.oldPassword && !errors?.oldPassword
                            ? "loginFormActive_input"
                            : "loginForm_input"
                        }
                        placeholder={
                          errors?.oldPassword && !errors?.oldPassword
                            ? errors?.oldPassword
                            : "Enter Your Old Password"
                        }
                        name="oldPassword"
                        onChange={inputChangeHandler}
                      />
                      <div className={styles.eyeDivs}>
                        {showPassword?.oldPassword === true ? (
                          <i
                            className="fa-solid fa-eye"
                            style={{ color: "rgb(148, 148, 148)" }}
                            onClick={oldPasswordClickHandler}
                          ></i>
                        ) : (
                          <i
                            className="fa-sharp fa-solid fa-eye-slash "
                            style={{ color: "rgb(148, 148, 148)" }}
                            onClick={oldPasswordClickHandler}
                          ></i>
                        )}
                      </div>
                    </div>
                    <p>{errors?.oldPassword && errors?.oldPassword}</p>
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      New Password*
                    </label>
                    <div className={styles.eyeinput}>
                      <input
                        type={
                          showPassword?.newPassword === true
                            ? "text"
                            : "password"
                        }
                        className={
                          errors?.newPassword && !errors?.newPassword
                            ? "loginFormActive_input"
                            : "loginForm_input"
                        }
                        placeholder={
                          errors?.newPassword && !errors?.newPassword
                            ? errors?.newPassword
                            : "Enter Your New Password"
                        }
                        name="newPassword"
                        onChange={inputChangeHandler}
                      />
                      <div className={styles.eyeDivs}>
                        {showPassword?.newPassword === true ? (
                          <i
                            className="fa-solid fa-eye"
                            style={{ color: "rgb(148, 148, 148)" }}
                            onClick={newPasswordClickHandler}
                          ></i>
                        ) : (
                          <i
                            className="fa-sharp fa-solid fa-eye-slash "
                            style={{ color: "rgb(148, 148, 148)" }}
                            onClick={newPasswordClickHandler}
                          ></i>
                        )}
                      </div>
                    </div>
                    <p>{errors?.newPassword && errors?.newPassword}</p>
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      New Confirm Password
                    </label>
                    <div className={styles.eyeinput}>
                      <input
                        type={
                          showPassword?.confirmPassword === true
                            ? "text"
                            : "password"
                        }
                        className={
                          errors?.confirm_password && !errors?.confirm_password
                            ? "loginFormActive_input"
                            : "loginForm_input"
                        }
                        placeholder={
                          errors?.confirm_password && !errors?.confirm_password
                            ? errors?.confirm_password
                            : "Enter Your Confirm Password"
                        }
                        name="confirm_password"
                        onChange={inputChangeHandler}
                      />
                      <div className={styles.eyeDivs}>
                        {showPassword?.confirmPassword === true ? (
                          <i
                            className="fa-solid fa-eye"
                            style={{ color: "rgb(148, 148, 148)" }}
                            onClick={confirmPasswordClickHandler}
                          ></i>
                        ) : (
                          <i
                            className="fa-sharp fa-solid fa-eye-slash "
                            style={{ color: "rgb(148, 148, 148)" }}
                            onClick={confirmPasswordClickHandler}
                          ></i>
                        )}
                      </div>
                    </div>
                    <p>
                      {errors?.confirm_password && errors?.confirm_password}
                    </p>
                  </div>
                  <Button type="submit" className={styles.buttonSaves}>
                    Save
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChangePasswordPopup;
