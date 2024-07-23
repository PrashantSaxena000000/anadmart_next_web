import React, { useEffect } from "react";
import "../Popups/Login/Login.scss";

import "react-responsive-modal/styles.css";
// import styles from "../registration.module.scss";
import { Button } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivacyPolicyData } from "../redux/actions/authActions";

const PrivacyPolicy = ({ openPolicy, handleClosePolicy }) => {
  const dispatch = useDispatch();

  const getPRivacyPolicyDetails = useSelector(
    (state) => state?.home?.getPRivacyPolicyDetails?.data
  );
  useEffect(() => {
    dispatch(fetchPrivacyPolicyData());
  }, []);
  return (
    <div>
      {" "}
      <Modal
        open={openPolicy}
        onClose={handleClosePolicy}
        classNames={{ modal: "signup-popup-modal" }}
        center
      >
        <div className="inner-container-logins">
          <div className="content">
            <div
              className="left"
              dangerouslySetInnerHTML={{
                __html: getPRivacyPolicyDetails?.content,
              }}
            >
              {/* privacy policy */}
            </div>
            <div></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PrivacyPolicy;
