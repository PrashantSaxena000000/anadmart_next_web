import React from "react";
import styles from "./rewards.module.scss";
import Image from "next/image";

const RewardCard = ({
  btnName,
  cardPara,
  discountHeading,
  img_src,
  showRewardClickHnandler,
}) => {
  return (
    <div className={styles.cardWrap}>
      <div className={styles.mains}>
        <Image src={img_src} alt="" />
        <h6>{discountHeading}</h6>
        <p>{cardPara}</p>
        <button onClick={showRewardClickHnandler}>{btnName}</button>
      </div>
    </div>
  );
};

export default RewardCard;
