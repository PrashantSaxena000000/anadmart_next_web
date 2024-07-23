import React, { useEffect } from "react";
import "../Popups/Login/Login.scss";

import "react-responsive-modal/styles.css";
// import styles from "../registration.module.scss";
import { Button } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchTermsOfUseData } from "../redux/actions/authActions";

const TermsOfUse = ({ openTerms, handleCloseterms }) => {
  const dispatch = useDispatch();

  const getTermsOfUseDetails = useSelector(
    (state) => state?.home?.getTermsOfUseDetails?.data
  );

  useEffect(() => {
    dispatch(fetchTermsOfUseData());
  }, []);
  return (
    <div>
      {" "}
      <Modal
        open={openTerms}
        onClose={handleCloseterms}
        classNames={{ modal: "signup-popup-modal" }}
        center
      >
        <div className="terms">
          <div
            className="left"
            dangerouslySetInnerHTML={{
              __html: getTermsOfUseDetails?.content,
            }}
          >
            {/* privacy policy */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TermsOfUse;
