"use client";
import React, { useEffect, useState } from "react";
import styles from "./verifyotp.module.scss";
import { Button } from "react-bootstrap";
import Link from "next/link";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import {
  onResendVerifyOtp,
  passwordVerifyOtp,
  setBtnLoading,
  setPageLoading,
} from "../redux/actions/authActions";

const VerifyOtp = () => {
  const [otp, setOtp] = useState();
  const [time, setTime] = useState(60);
  const [reOtp, setReOtp] = useState(true);

  const dispatch = useDispatch();

  const navigate = useRouter();

  const getSignupMail = useSelector(
    (state) => state?.home?.getForgotPasswordMail
  );

  useEffect(() => {
    setReOtp(false);
    let i = 1;
    const timeout2 = setInterval(() => {
      setTime(time - i);
      i = i + 1;
    }, 1000);

    setTimeout(() => {
      setReOtp(true);
      clearInterval(timeout2);
      setTime(60);
    }, 60000);
  }, []);

  const resendOtpClickHandler = () => {
    dispatch(onResendVerifyOtp({ email: getSignupMail?.email }));
    setOtp();
    setReOtp(false);

    let i = 1;

    const timeout2 = setInterval(() => {
      setTime(time - i);
      i = i + 1;
    }, 1000);

    setTimeout(() => {
      setReOtp(true);
      clearInterval(timeout2);
      setTime(60);
    }, 60000);
  };

  const confirmClickHandler = (e) => {
    // dispatch();
    e.preventDefault();

    const data = {
      email: getSignupMail?.email,
      otp: otp,
    };

    dispatch(passwordVerifyOtp(data, navigate));
  };

  return (
    <>
      <div className={styles.verify_wrapper}>
        <div className={styles.main_div}>
          <h4>Verify Otp</h4>
          <form action="" onSubmit={confirmClickHandler}>
            <div className={styles.long_input_divs}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            {!reOtp ? (
              <>
                <h6>00:{time}</h6>
                <h5>Didn't you receive the OTP?</h5>
              </>
            ) : (
              <>
                <h2 onClick={resendOtpClickHandler}> Resend OTP</h2>
              </>
            )}

            <Button className={styles.btn_of_otps} type="submit">
              Verify
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
