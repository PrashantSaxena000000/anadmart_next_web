"use client";
import React, { useState } from "react";
import styles from "./chnagePassword.module.scss";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { changeMyPassword } from "../redux/actions/authActions";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [forgotValue, setForgotValue] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, SetShowPassword] = useState(false);
  const [confirmShowPassword, SetConfirmShowPassword] = useState(false);

  const navigate = useRouter();

  const getSignupMail = useSelector(
    (state) => state?.home?.getForgotPasswordMail
  );
  const inputChangeHandler = (e) => {
    setForgotValue({ ...forgotValue, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const SetLatestPasswordFormHandler = (e) => {
    e.preventDefault();

    let errorExist = false;
    let errorsObject = {};

    if (
      forgotValue?.password === "" ||
      forgotValue?.password === null ||
      forgotValue?.password === undefined
    ) {
      errorsObject.password = "Please enter your password";
      errorExist = true;
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*()+/\\|-]{8,}$/.test(
        forgotValue?.password
      )
    ) {
      errorsObject.password =
        "Password must be at least 8 characters with 1 Special & 1 Number";
      errorExist = true;
    }

    if (
      forgotValue?.confirm_password === "" ||
      forgotValue?.confirm_password === null ||
      forgotValue?.confirm_password === undefined
    ) {
      errorsObject.confirm_password = "Please enter your confirm password";
      errorExist = true;
    } else if (forgotValue?.password !== forgotValue?.confirm_password) {
      errorsObject.confirm_password = "Password do not match.";
      errorExist = true;
    }

    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    const data = {
      password: forgotValue?.password,
      confirm_password: forgotValue?.confirm_password,
      email: getSignupMail?.email,
    };

    dispatch(changeMyPassword(data, navigate));
  };

  const eyeClickHandler = () => {
    SetShowPassword(!showPassword);
  };
  const confirmeyeClickHandler = () => {
    SetConfirmShowPassword(!confirmShowPassword);
  };

  return (
    <>
      <div className={styles.forgot_wrapper}>
        <div className={styles.main_div}>
          <h4>Change Password</h4>
          <form action="" onSubmit={SetLatestPasswordFormHandler}>
            <div className={styles.long_input_divs}>
              <div className={styles.label_div2}>
                <label>Password </label>
                <input
                  className={`${
                    errors.password
                      ? styles["errorInputMain"]
                      : styles["inputmain"]
                  }
                  }}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={inputChangeHandler}
                  name="password"
                />
                <span className="validation_error">
                  {errors.password && errors?.password}
                </span>

                {!showPassword ? (
                  <span className={styles.eyeSpan} onClick={eyeClickHandler}>
                    <i
                      className="fa-sharp fa-solid fa-eye-slash "
                      style={{ color: "#949494" }}
                    ></i>
                  </span>
                ) : (
                  <span className={styles.eyeSpan} onClick={eyeClickHandler}>
                    <i
                      className="fa-solid fa-eye"
                      style={{ color: "#949494" }}
                    ></i>
                  </span>
                )}
              </div>
            </div>
            <div className={styles.long_input_divs}>
              <div className={styles.label_div2}>
                <label>Confirm Password </label>
                <input
                  className={`${
                    errors.confirm_password
                      ? styles["errorInputMain"]
                      : styles["inputmain"]
                  }
                  }}`}
                  type={confirmShowPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={inputChangeHandler}
                  name="confirm_password"
                />
                {!confirmShowPassword ? (
                  <span
                    className={styles.eyeSpan}
                    onClick={confirmeyeClickHandler}
                  >
                    <i
                      className="fa-sharp fa-solid fa-eye-slash "
                      style={{ color: "#949494" }}
                    ></i>
                  </span>
                ) : (
                  <span
                    className={styles.eyeSpan}
                    onClick={confirmeyeClickHandler}
                  >
                    <i
                      className="fa-solid fa-eye"
                      style={{ color: "#949494" }}
                    ></i>
                  </span>
                )}
                <span className="validation_error">
                  {errors.confirm_password && errors?.confirm_password}
                </span>
              </div>
            </div>

            <Button className={styles.btn_of_otp} type="submit">
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
