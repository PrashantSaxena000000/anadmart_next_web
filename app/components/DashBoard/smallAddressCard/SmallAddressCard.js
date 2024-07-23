import React from "react";
import styles from "./smallcard.module.scss";
import { useSelector } from "react-redux";

const SmallAddressCard = ({
  items,
  deleteAddressClickHandler,
  editAddressClickHandler,
  defaultAddressClickHandler,
  userprofileData,
}) => {
  return (
    <>
      <div className={styles["smallcard_wrapper"]}>
        <div className={styles.smallcard_btns}>
          <h4>{userprofileData?.full_name}</h4>
          <span>{items?.address_type}</span>
        </div>
        <h6>{userprofileData?.phone}</h6>
        {/* <h6>{items?.address_type}</h6> */}
        <p>
          {items?.city}, {items?.state}, {items?.zip_code}
        </p>

        {/* <span
            onClick={() => defaultAddressClickHandler(items)}
            className={
              items?.default_address === true
                ? styles.spanDefaultActive
                : styles.spanDefault
            }
          >
            Default Address
          </span> */}

        <div className={styles.smallcardparadiv}>
          <p
            className={styles.smallcardpara1}
            onClick={() => deleteAddressClickHandler(items)}
          >
            Remove
          </p>{" "}
          |{" "}
          <p
            className={styles.smallcardpara1}
            onClick={() => editAddressClickHandler(items)}
          >
            Edit
          </p>
        </div>
      </div>
    </>
  );
};

export default SmallAddressCard;
