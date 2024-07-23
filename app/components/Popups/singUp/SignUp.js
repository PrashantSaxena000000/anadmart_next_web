"use client";
import React, { useState } from "react";
import "../Login/login.scss";
import "react-responsive-modal/styles.css";
import styles from "../registration.module.scss";
import { Button } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import { useDispatch } from "react-redux";
import { onRegister } from "../../redux/actions/authActions";
import TermsOfUse from "../../../components/termsOfUse/TermsOfUse";
import PrivacyPolicy from "../../../components/privacyPolicy/PrivacyPolicy";
import { toast } from "react-toastify";

const SignUp = ({ registerOpen, closeRegisterModal, openLoginModal }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({ type: "5" });
  const [errors, setErrors] = useState({});
  const [throwError, setThrowError] = useState(false);
  const [showPassword, SetShowPassword] = useState(false);
  const [showPassword2, SetShowPassword2] = useState(false);

  const [openTerms, setOpenTerms] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);

  const handleOpenterms = () => {
    setOpenTerms(true);
  };
  const handleCloseterms = () => {
    setOpenTerms(false);
  };

  const handleOpenPolicy = () => {
    setOpenPolicy(true);
  };

  const handleClosePolicy = () => {
    setOpenPolicy(false);
  };

  const eyeClickHandler = () => {
    SetShowPassword(!showPassword);
  };
  const eyeClickHandler2 = () => {
    SetShowPassword2(!showPassword2);
  };

  const inputChangeHandler = (e) => {
    if (e.target.name !== "agree_terms") {
      setValues({ ...values, [e.target.name]: e.target.value });
    } else {
      setValues({ ...values, [e.target.name]: e.target.checked });
    }
    setErrors({ ...errors, [e.target.name]: false });
  };

  const signUpFormSubmitHandler = (e) => {
    e.preventDefault();

    let errorExist = false;
    let errorsObject = {};

    if (
      values?.email === "" ||
      values?.email === null ||
      values?.email === undefined
    ) {
      errorsObject.email = "Please Enter Your Email";
      errorExist = true;
    } else if (!values?.email.trim()) {
      errorsObject.email = "Email is required";
      errorExist = true;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values?.email)
    ) {
      errorsObject.email = "Please type a valid email address";
      errorExist = true;
    }

    if (
      values?.password === "" ||
      values?.password === null ||
      values?.password === undefined
    ) {
      errorsObject.password = "Please enter your password";
      errorExist = true;
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()+/\\|-]{8,}$/.test(
        values?.password
      )
    ) {
      errorsObject.password =
        "Password must be at least 8 characters with 1 Special & 1 Number";
      errorExist = true;
    }

    if (
      values?.confirm_password === "" ||
      values?.confirm_password === null ||
      values?.confirm_password === undefined
    ) {
      errorsObject.confirm_password = "Please enter your confirm password";
      errorExist = true;
    } else if (values?.password !== values?.confirm_password) {
      errorsObject.confirm_password = "Password do not match.";
      errorExist = true;
    }

    if (
      values?.agree_terms == 0 ||
      values?.agree_terms == false ||
      !values?.agree_terms
    ) {
      errorsObject.agree_terms = "Please Agree Terms and Conditions";
      errorExist = true;
    }

    if (
      values?.first_name == 0 ||
      values?.first_name == false ||
      !values?.first_name
    ) {
      errorsObject.first_name = "Please Enter Your First Name";
      errorExist = true;
    }

    // if (!values?.first_name.trim()) {
    //   errorsObject.first_name = toast.error(
    //     "First name cannot be whitespace"
    //   );
    //   errorExist = true;
    // }

    // if (!values?.middle_name?.trim()) {
    //   errorsObject.middle_name = "Middle name cannot be whitespace";
    // }

    // if (
    //   values?.middle_name == 0 ||
    //   values?.middle_name == false ||
    //   !values?.middle_name
    // ) {
    //   errorsObject.middle_name = "Please Enter Your First Name";
    //   errorExist = true;
    // }
    if (
      values?.last_name == 0 ||
      values?.last_name == false ||
      !values?.last_name
    ) {
      errorsObject.last_name = "Please Enter Your Last Name";
      errorExist = true;
    }
    if (values?.phone == 0 || values?.phone == false || !values?.phone) {
      errorsObject.phone = "Please Enter Your Phone Number";
      errorExist = true;
    }

    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    const data = {
      first_name: values?.first_name,
      middle_name: values?.middle_name,
      last_name: values?.last_name,
      email: values?.email,
      phone: values?.phone,
      password: values?.password,
      confirm_password: values?.confirm_password,
      type: "5",
    };
    dispatch(
      onRegister(data, closeRegisterModal, openLoginModal, setThrowError)
    );
  };

  return (
    <>
      <Modal
        open={registerOpen}
        onClose={closeRegisterModal}
        classNames={{ modal: "signup-popup-modal" }}
        center
      >
        <div className="inner-container-logins">
          <div className="content">
            <div className="left">
              <div className="forms">
                <form action="" onSubmit={signUpFormSubmitHandler}>
                  <h4 className="headOfLOGin">Create An Account</h4>
                  <div style={{ height: "24px" }}>
                    {" "}
                    {throwError && <p className="errors">{throwError}</p>}
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      First Name*
                    </label>
                    <input
                      type="text"
                      className={
                        errors?.first_name
                          ? "loginFormActive_input"
                          : "loginForm_input"
                      }
                      placeholder={
                        errors.first_name
                          ? errors?.first_name
                          : "Enter Your First Name"
                      }
                      onChange={inputChangeHandler}
                      name="first_name"
                    />
                    {values?.first_name && errors?.first_name ? (
                      <p>First name cannot be whitespace</p>
                    ) : null}
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      Middle Name* (optional)
                    </label>
                    <input
                      type="text"
                      className={
                        errors?.middle_name && !values?.middle_name
                          ? "loginFormActive_input"
                          : "loginForm_input"
                      }
                      placeholder={
                        errors.middle_name && !values?.middle_name
                          ? errors?.middle_name
                          : "Enter Your Middle Name"
                      }
                      name="middle_name"
                      onChange={inputChangeHandler}
                    />
                    {!values.middle_name?.trim() &&
                    !values?.middle_name == "" ? (
                      <p>Middle name cannot be whitespace</p>
                    ) : null}
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      className={
                        errors?.last_name && !values?.last_name
                          ? "loginFormActive_input"
                          : "loginForm_input"
                      }
                      placeholder={
                        errors.last_name && !values?.last_name
                          ? errors?.last_name
                          : "Enter Your Last Name"
                      }
                      name="last_name"
                      onChange={inputChangeHandler}
                    />
                    {values?.last_name && errors?.last_name ? (
                      <p>Last name cannot be whitespace</p>
                    ) : null}
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={
                        errors?.email && !values?.email
                          ? "loginFormActive_input"
                          : "loginForm_input"
                      }
                      placeholder={
                        errors.email && !values?.email
                          ? errors?.email
                          : "Enter Your Email"
                      }
                      onChange={inputChangeHandler}
                    />
                    {values?.email === "" && errors?.email ? (
                      <p>{errors?.email}</p>
                    ) : null}
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      Phone Number*
                    </label>
                    <input
                      type="number"
                      className={
                        errors?.phone && !values?.phone
                          ? "loginFormActive_input"
                          : "loginForm_input"
                      }
                      placeholder={
                        errors.phone && !values?.phone
                          ? errors?.phone
                          : "Enter Your Phone Number"
                      }
                      name="phone"
                      onChange={inputChangeHandler}
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
                          errors?.password && !values?.password
                            ? "loginFormActive_input"
                            : "loginForm_input"
                        }
                        placeholder="**********"
                        name="password"
                        onChange={inputChangeHandler}
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
                    <p>{errors?.password}</p>
                  </div>
                  <div className="loginForm">
                    <label htmlFor="" className="loginForm_label">
                      Confirm Password*
                    </label>
                    <div className="loginform_input_maindiv">
                      <input
                        type={showPassword2 === true ? "text" : "password"}
                        className={
                          errors?.confirm_password && !values?.confirm_password
                            ? "loginFormActive_input"
                            : "loginForm_input"
                        }
                        placeholder="***********"
                        name="confirm_password"
                        onChange={inputChangeHandler}
                      />

                      {!showPassword2 ? (
                        <span className="spam2" onClick={eyeClickHandler2}>
                          <i
                            className="fa-sharp fa-solid fa-eye-slash "
                            style={{ color: "#949494" }}
                          ></i>
                        </span>
                      ) : (
                        <span className="spam2" onClick={eyeClickHandler2}>
                          <i
                            className="fa-solid fa-eye"
                            style={{ color: "#949494" }}
                          ></i>
                        </span>
                      )}
                    </div>
                    <p>{errors?.confirm_password}</p>
                  </div>
                  <div className="ticksDiv_login">
                    <div className={styles.checkbpx_wrapper_divSignup}>
                      <div className="checkbox check_transparent">
                        <div className={styles.checkbox_wrapper}>
                          <input
                            type="checkbox"
                            id="cutOfCheckbox"
                            className={styles.custom_checkbox}
                            name="agree_terms"
                            onChange={inputChangeHandler}
                          />
                          <label className="" htmlFor="cutOfCheckbox"></label>
                          <p>
                            by clicking “create account” you agree to the
                            anadmart.com{" "}
                            <span onClick={handleOpenterms}>terms of use </span>{" "}
                            and
                            <span onClick={handleOpenPolicy}> privacy</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <p>{errors?.agree_terms}</p>
                  </div>
                  <div className="button_login">
                    <Button type="submit">Create Account</Button>
                  </div>
                  <div className="signup_tag">
                    <h5 className="signup_tag_h5">
                      Already have an Account?{" "}
                      <span
                        onClick={() => {
                          closeRegisterModal();
                          openLoginModal();
                        }}
                      >
                        Sign in
                      </span>
                    </h5>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <TermsOfUse openTerms={openTerms} handleCloseterms={handleCloseterms} />
      <PrivacyPolicy
        openPolicy={openPolicy}
        handleClosePolicy={handleClosePolicy}
      />
    </>
  );
};

export default SignUp;
