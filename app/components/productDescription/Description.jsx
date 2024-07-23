import React from "react";
import styles from "./productDescription.module.scss";
const Description = ({ singleproductData }) => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: singleproductData?.content }}
      ></div>

      {/* <p className={styles.product_desc}>
        100% Bio-washed Cotton – makes the fabric extra soft & silky. Flexible
        ribbed crew neck. Precisely stitched with no pilling & no fading.
        Provide all-time comfort. Anytime, anywhere. Infinite range of
        matte-finish HD prints.
      </p>
      <div className={styles.discDetaildiv}>
        <div className={styles.discDetail}>
          <h5>Fabric</h5>
          <h6>Bio-washed Cotton</h6>
        </div>
        <div className={styles.discDetail}>
          <h5>Pattern</h5>
          <h6>Printed</h6>
        </div>
        <hr />
        <div className={styles.discDetail}>
          <h5>Neck</h5>
          <h6>Round Neck</h6>
        </div>
        <div className={styles.discDetail}>
          <h5>Sleeve</h5>
          <h6>Half-sleeves</h6>
        </div>
      </div> */}
    </>
  );
};

export default Description;
