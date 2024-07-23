import React, { useState } from "react";
import styles from "./productDescription.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Description from "./Description";
import ProductComments from "./ProductComments";
const ProductDescription = ({
  singleproductData,
  currentTab,
  setCurrentTab,
  resizedUrls,
}) => {
  const [review, setReview] = useState({});

  return (
    <>
      <div className={styles["light_productdetails"]}>
        <div className="container">
          <div className={styles.product_desc_wrapper}>
            <div className={styles.product_desc_heading}>
              <div className={styles.product_desc_line}></div>
              <h6 className={styles.description_heading}>
                Product Description
              </h6>
            </div>
            <div className={styles.discAndimgDiv}>
              <div className={styles.discAnd}>
                <ul>
                  <li
                    // className={styles.active_tab}
                    className={
                      currentTab === 0
                        ? styles["description-active"]
                        : styles["description_heading"]
                    }
                    onClick={() => setCurrentTab(0)}
                  >
                    Description
                  </li>
                  <li
                    className={
                      currentTab === 1
                        ? styles["description-active"]
                        : styles["description_heading"]
                    }
                    onClick={() => setCurrentTab(1)}
                    id="productComments"
                  >
                    User comments{" "}
                    <span>{singleproductData?.review_count || 0}</span>
                  </li>
                  {/* <li>
                    Question & Answer <span>4</span>
                  </li> */}
                </ul>

                {/* <p className={styles.product_desc}>
                  100% Bio-washed Cotton – makes the fabric extra soft & silky.
                  Flexible ribbed crew neck. Precisely stitched with no pilling
                  & no fading. Provide all-time comfort. Anytime, anywhere.
                  Infinite range of matte-finish HD prints.
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

                {currentTab === 0 && (
                  <Description singleproductData={singleproductData} />
                )}
                {currentTab === 1 && (
                  <ProductComments singleproductData={singleproductData} />
                )}

                {/* <ProductComments /> */}
              </div>
              <div className={styles.imgDivscnn}>
                <Image src={resizedUrls} alt="" width={240} height={270} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
