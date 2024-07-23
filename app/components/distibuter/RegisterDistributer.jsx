"use client";
import React, { useState, useRef } from "react";
import "./registerDisibuter.scss";
import "../../components/Popups/registration.module.scss";
import styles from "../../components/Popups/registration.module.scss";
import { Button } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Images from "../Images/Images";
import { onRegister, onRegisterDistibuter } from "../redux/actions/authActions";
// import { onRegister } from "../../redux/actions/authActions";

const RegisterDistributer = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const formRef = useRef(null);

  const [values, setValues] = useState({ type: "5" });
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleInputChnage = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setSelectedFile(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setSelectedFile(null);
    }
  };

  const inputChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const signUpFormSubmitHandler = (e) => {
    e.preventDefault();

    let errorExist = false;
    let errorsObject = {};
    let firstEmptyFieldRef;

    if (
      values?.first_name == 0 ||
      values?.first_name == false ||
      !values?.first_name
    ) {
      errorsObject.first_name = "Please Enter Your First Name";
      errorExist = true;
    }

    if (
      values?.email === "" ||
      values?.email === null ||
      values?.email === undefined
    ) {
      errorsObject.email = "Please enter your email";
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

    // if (
    //   values?.password === "" ||
    //   values?.password === null ||
    //   values?.password === undefined
    // ) {
    //   errorsObject.password = "Please enter your password";
    //   errorExist = true;
    // } else if (
    //   !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()+/\\|-]{8,}$/.test(
    //     values?.password
    //   )
    // ) {
    //   errorsObject.password =
    //     "Password must be at least 8 characters with 1 Special & 1 Number";
    //   errorExist = true;
    // }

    if (
      values?.zipCode === "" ||
      values?.zipCode === null ||
      values?.zipCode === undefined
    ) {
      errorsObject.zipCode = "Please enter your zip code";
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
    if (
      values?.address1 == 0 ||
      values?.address1 == false ||
      !values?.address1
    ) {
      errorsObject.address1 = "Please Enter Your address1";
      errorExist = true;
    }
    if (
      values?.address2 == 0 ||
      values?.address2 == false ||
      !values?.address2
    ) {
      errorsObject.address2 = "Please Enter Your address2";
      errorExist = true;
    }
    // if (
    //   values?.city == 0 ||
    //   values?.middle_name == false ||
    //   !values?.middle_name
    // ) {
    //   errorsObject.middle_name = "Please Enter Your middle name";
    //   errorExist = true;
    // }
    if (values?.city == 0 || values?.city == false || !values?.city) {
      errorsObject.city = "Please Enter Your city";
      errorExist = true;
    }
    if (values?.state == 0 || values?.state == false || !values?.state) {
      errorsObject.state = "Please Enter Your state";
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

    const formData = new FormData();

    formData.append("first_name", values?.first_name);
    if (!values?.middle_name === undefined) {
      formData.append("middle_name", values?.middle_name);
    } else {
      formData.append("middle_name", "");
    }
    formData.append("last_name", values?.last_name);
    formData.append("email", values?.email);
    formData.append("phone", values?.phone);
    formData.append("zipcode", values?.zipCode);
    formData.append("city", values?.city);
    formData.append("state", values?.state);
    formData.append("address1", values?.address1);
    formData.append("address2", values?.address2);
    formData.append("profile_image", selectedFile);
    //   type" "5",

    dispatch(onRegisterDistibuter(formData, navigate));
  };
  return (
    <>
      <div className="registerDristribute_wrapper">
        <div className="container">
          <div className="forms">
            <form action="" onSubmit={signUpFormSubmitHandler}>
              <h4 className="headOfLOGin">Register As A Distributer</h4>
              <div className={styles.main_wrapperimgWrapper}>
                <div className={styles.img_upload_box}>
                  <div className={styles.img_boxes}>
                    <div
                      className={styles.upload_circle}
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
                    >
                      {selectedImage ? (
                        <img src={selectedImage} alt="Uploaded" />
                      ) : (
                        <Image
                          src={Images.about_team1}
                          alt=""
                          className={styles.download_icon}
                        />
                      )}
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className={styles.upload_logo}>Upload Profile pic</div>
                  </div>
                </div>{" "}
              </div>
              <div className="inputWrapper">
                <div className="loginForm">
                  <label htmlFor="" className="loginForm_label">
                    First Name*
                  </label>
                  <input
                    type="text"
                    className={
                      errors?.first_name && !values?.first_name
                        ? "loginFormActive_input"
                        : "loginForm_input"
                    }
                    placeholder={
                      errors.first_name && !values?.first_name
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
                  {values?.middle_name && errors?.middle_name ? (
                    <p>Middle Name cannot be whitespace</p>
                  ) : null}
                </div>
              </div>
              <div className="inputWrapper">
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
                    name="email"
                    onChange={inputChangeHandler}
                  />
                  {values?.email && errors?.email ? (
                    <p>Email cannot be whitespace</p>
                  ) : null}
                </div>
              </div>
              <div className="inputWrapper">
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
                  {values?.phone && errors?.phone ? (
                    <p>phone cannot be whitespace</p>
                  ) : null}
                </div>
                <div className="loginForm">
                  <label htmlFor="" className="loginForm_label">
                    Address1*
                  </label>
                  <input
                    type="text"
                    className={
                      errors?.address1 && !values?.address1
                        ? "loginFormActive_input"
                        : "loginForm_input"
                    }
                    placeholder={
                      errors.address1 && !values?.address1
                        ? errors?.address1
                        : "Enter Your address1 "
                    }
                    name="address1"
                    onChange={inputChangeHandler}
                  />
                  {values?.address1 && errors?.address1 ? (
                    <p>Address1 cannot be whitespace</p>
                  ) : null}
                </div>
              </div>
              <div className="inputWrapper">
                <div className="loginForm">
                  <label htmlFor="" className="loginForm_label">
                    Address2*
                  </label>
                  <input
                    type="text"
                    className={
                      errors?.address2 && !values?.address2
                        ? "loginFormActive_input"
                        : "loginForm_input"
                    }
                    placeholder={
                      errors.address2 && !values?.address2
                        ? errors?.address2
                        : "Enter Your address2 "
                    }
                    name="address2"
                    onChange={inputChangeHandler}
                  />
                  {values?.address2 && errors?.address2 ? (
                    <p>Address2 cannot be whitespace</p>
                  ) : null}
                </div>
                <div className="loginForm">
                  <label htmlFor="" className="loginForm_label">
                    City*
                  </label>
                  <input
                    type="text"
                    className={
                      errors?.city && !values?.city
                        ? "loginFormActive_input"
                        : "loginForm_input"
                    }
                    placeholder={
                      errors.city && !values?.city
                        ? errors?.city
                        : "Enter Your city "
                    }
                    name="city"
                    onChange={inputChangeHandler}
                  />
                  {values?.city && errors?.city ? (
                    <p>City cannot be whitespace</p>
                  ) : null}
                </div>
              </div>
              <div className="inputWrapper">
                <div className="loginForm">
                  <label htmlFor="" className="loginForm_label">
                    State*
                  </label>
                  <input
                    type="text"
                    className={
                      errors?.state && !values?.state
                        ? "loginFormActive_input"
                        : "loginForm_input"
                    }
                    placeholder={
                      errors.state && !values?.state
                        ? errors?.state
                        : "Enter Your state "
                    }
                    name="state"
                    onChange={inputChangeHandler}
                  />
                  {values?.state && errors?.state ? (
                    <p>State cannot be whitespace</p>
                  ) : null}
                </div>
                <div className="loginForm">
                  <label htmlFor="" className="loginForm_label">
                    Zip Code*
                  </label>
                  <input
                    type="number"
                    className={
                      errors?.zipCode && !values?.zipCode
                        ? "loginFormActive_input"
                        : "loginForm_input"
                    }
                    placeholder={
                      errors.zipCode && !values?.zipCode
                        ? errors?.zipCode
                        : "Enter Your Zip Code Number"
                    }
                    name="zipCode"
                    onChange={inputChangeHandler}
                  />
                  {values?.zipCode && errors?.zipCode ? (
                    <p>ZipCode cannot be whitespace</p>
                  ) : null}
                </div>
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
                        anadmart.com <span>terms of use</span> and
                        <span> privacy</span>
                      </p>
                    </div>
                  </div>
                </div>
                <p>{errors?.agree_terms}</p>
              </div>
              <div className="button_login">
                <Button type="submit">Create Account</Button>
              </div>
              {/* <div className="signup_tag">
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
                  </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterDistributer;
