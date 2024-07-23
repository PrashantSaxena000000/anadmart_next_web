import React from "react";
import styles from "./pageHeading.module.scss";

const PageHeading = ({ pageName }) => {
  return (
    <>
      <div className={styles.head_img_div}>
        <h4>{pageName}</h4>
      </div>
    </>
  );
};

export default PageHeading;
