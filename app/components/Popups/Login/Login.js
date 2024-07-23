"use client";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./login.scss";
import SignUp from "../singUp/SignUp";
import styles from "../registration.module.scss";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { onLogin } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";

const Login = ({
  open,
  onCloseModal,
  openLoginModal,
  cartItemFromLocalstorage,
}) => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [logValue, setLogValue] = useState({});
  const [logErrors, setLogErrors] = useState({});
  const [showPassword, SetShowPassword] = useState(false);
  const [throwError, setThrowError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();



  const openRegisterModal = () => {
    setRegisterOpen(true);
    onCloseModal();
  };
  const closeRegisterModal = () => setRegisterOpen(false);

  const forgotPasswordHandler = () => {
    router.push("/forgot-password");
    onCloseModal();
  };
  const inputLoginChangeHandler = (e) => {
    setLogValue({ ...logValue, [e.target.name]: e.target.value });
    setLogErrors({ ...logErrors, [e.target.name]: false });
  };
  const loginFormHandler = (e) => {
    e.preventDefault();

    let errorExist = false;
    let errorsObject = {};

    if (
      logValue?.email === "" ||
      logValue?.email === null ||
      logValue?.email === undefined
    ) {
      errorsObject.email = "Please enter your email";
      errorExist = true;
    } else if (!logValue?.email.trim()) {
      errorsObject.email = "Email is required";
      errorExist = true;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(logValue?.email)
    ) {
      errorsObject.email = "Please enter a valid email address";
      errorExist = true;
    }

    if (
      logValue?.password === "" ||
      logValue?.password === null ||
      logValue?.password === undefined
    ) {
      errorsObject.password = "Please enter your password";
      errorExist = true;
    }
    // else if (
    //   !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()+/\\|-]{8,}$/.test(
    //     logValue?.password
    //   )
    // ) {
    //   errorsObject.password =
    //     "Password must be at least 8 characters with 1 Special & 1 Number";
    //   errorExist = true;
    // }

    if (errorExist) {
      setLogErrors(errorsObject);
      return false;
    }

    const data = {
      email: logValue?.email,
      password: logValue?.password,
      role: "5",
    };

    dispatch(
      onLogin(data, onCloseModal, cartItemFromLocalstorage, setThrowError,router)
    );
  };

  const eyeClickHandler = () => {
    SetShowPassword(!showPassword);
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
                <form action="" onSubmit={loginFormHandler}>
                  <h4 className="headOfLOGin">Sign In</h4>
                  <div style={{height:"24px"}}>
                    {" "}
                    {throwError && <p className="errors">{throwError}</p>}
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      Email ID or number
                    </label>
                    <input
                      type="email"
                      className={
                        logErrors?.email && !logValue?.email
                          ? "loginFormActive_input"
                          : "loginForm_input"
                      }
                      placeholder={
                        logErrors?.email && !logValue?.email
                          ? logErrors?.email
                          : "Enter Your  Email ID or number"
                      }
                      name="email"
                      onChange={inputLoginChangeHandler}
                    />
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      Password
                    </label>
                    <div className="loginform_input_maindiv">
                      <input
                        type={showPassword === true ? "text" : "password"}
                        className={
                          logErrors?.password && !logValue?.password
                            ? "loginFormActive_input"
                            : "loginForm_input"
                        }
                        placeholder="***********"
                        onChange={inputLoginChangeHandler}
                        name="password"
                      />
                      {!showPassword ? (
                        <span className="spam2" onClick={eyeClickHandler}>
                          <i
                            className="fa-sharp fa-solid fa-eye-slash "
                            style={{ color: "#949494" }}
                          ></i>
                        </span>
                      ) : (
                        <span className="spam2" onClick={eyeClickHandler}>
                          <i
                            className="fa-solid fa-eye"
                            style={{ color: "#949494" }}
                          ></i>
                        </span>
                      )}
                    </div>
                    <p>{logErrors?.password}</p>
                  </div>
                  <div className="ticksDiv_login">
                    <div className={styles.checkbpx_wrapper_div}>
                      <div className="checkbox check_transparent">
                        <div className={styles.checkbox_wrapper}>
                          <input
                            type="checkbox"
                            id="cutOfCheckbox"
                            className={styles.custom_checkbox}
                          />
                          <label className="" htmlFor="cutOfCheckbox">
                            Remember Me
                          </label>
                        </div>
                      </div>

                      <span onClick={forgotPasswordHandler}>
                        {" "}
                        Forgot password?
                      </span>
                    </div>
                  </div>
                  <div className="button_login">
                    <Button type="submit">LOGIN</Button>
                  </div>
                  <div className="Googlebutton_login">
                    <Button>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M36.8001 23.3374C36.8001 22.3867 36.7081 21.4054 36.5548 20.4854H23.2761V25.9134H30.8815C30.5748 27.6614 29.5628 29.1947 28.0601 30.176L32.5988 33.7027C35.2668 31.2187 36.8001 27.6 36.8001 23.3374Z"
                          fill="#4280EF"
                        />
                        <path
                          d="M23.2762 37.0762C27.0789 37.0762 30.2682 35.8188 32.5989 33.6722L28.0602 30.1762C26.8029 31.0348 25.1775 31.5255 23.2762 31.5255C19.5962 31.5255 16.4989 29.0415 15.3642 25.7295L10.7029 29.3175C13.0949 34.0708 17.9402 37.0762 23.2762 37.0762Z"
                          fill="#34A353"
                        />
                        <path
                          d="M15.3641 25.6989C14.7814 23.9509 14.7814 22.0495 15.3641 20.3015L10.7028 16.6829C8.70943 20.6695 8.70943 25.3615 10.7028 29.3175L15.3641 25.6989Z"
                          fill="#F6B704"
                        />
                        <path
                          d="M23.2762 14.5055C25.2696 14.4748 27.2322 15.2415 28.6736 16.6215L32.6909 12.5735C30.1455 10.1815 26.7722 8.89345 23.2762 8.92412C17.9402 8.92412 13.0949 11.9295 10.7029 16.6828L15.3642 20.3015C16.4989 16.9588 19.5962 14.5055 23.2762 14.5055Z"
                          fill="#E54335"
                        />
                      </svg>{" "}
                      Login With Google
                    </Button>
                  </div>
                  <div className="signup_tag">
                    <h5 className="signup_tag_h5">
                      Don't have an Account?{" "}
                      <span onClick={openRegisterModal}>
                        Create Your Account
                      </span>
                    </h5>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <SignUp
        registerOpen={registerOpen}
        closeRegisterModal={closeRegisterModal}
        openLoginModal={openLoginModal}
      />
    </>
  );
};

export default Login;
