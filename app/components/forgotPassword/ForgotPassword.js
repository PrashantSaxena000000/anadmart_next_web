"use client";
import React, { useState } from "react";
import styles from "./forgotpassword.module.scss";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { onForgotPassword, setPageLoading } from "../redux/actions/authActions";
import Loading from "../Loading/Loading";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [forgotValue, setForgotValue] = useState({});
  const [errors, setErrors] = useState({});

  const pageLoading = useSelector((state) => state?.home?.pageLoading);

  const navigate = useRouter();

  const forgotInputChangeHandler = (e) => {
    setForgotValue({ ...forgotValue, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const forgotPasswordFormHandler = (e) => {
    e.preventDefault();

    let errorExist = false;
    let errorsObject = {};

    if (
      forgotValue?.email === "" ||
      forgotValue?.email === null ||
      forgotValue?.email === undefined
    ) {
      errorsObject.email = "Please enter your email";
      errorExist = true;
    } else if (!forgotValue?.email.trim()) {
      errorsObject.email = "Email is required";
      errorExist = true;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(forgotValue?.email)
    ) {
      errorsObject.email = "Please type a valid email address";
      errorExist = true;
    }

    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    dispatch(setPageLoading(true));

    dispatch(onForgotPassword(forgotValue, navigate));
  };
  return (
    <>
      <div className={styles["forgot_wrapper"]}>
        <div className={styles.main_div}>
          <h4>Forgot Password</h4>
          <form action="" onSubmit={forgotPasswordFormHandler}>
            <div className={styles.long_input_divs}>
              <div className={styles.label_div2}>
                <label>Email* </label>
                <input
                  type="email"
                  placeholder={
                    errors?.email ? errors?.email : "Enter your email"
                  }
                  onChange={forgotInputChangeHandler}
                  name="email"
                  className={errors?.email && styles.forgotEmailActive}
                />
              </div>
            </div>

            <Button className={styles.btn_of_otp} type="submit">
              SEND
            </Button>
          </form>
        </div>
      </div>
      {pageLoading && <Loading />}
    </>
  );
};

export default ForgotPassword;
