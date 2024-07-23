import React from "react";
import styles from "./categories.module.scss";

const CardCategory = ({ img, name }) => {
  return (
    <>
      <div className={styles.catCard_wrapper}>
        <div className={styles.imfmandiv}>
          <img src={img} alt="" />
        </div>
        <p>{name}</p>
      </div>
    </>
  );
};

export default CardCategory;
