"use client";
import React, { useState } from "react";
import styles from "./rewards.module.scss";
import RewardCard from "./RewardCard";
import Images from "../../Images/Images";
import RewardPopup from "../../Popups/RewardPopUp/RewardPopup";

const Rewards = () => {
  const [openCard, setOpenCard] = useState(false);

  const showRewardClickHnandler = () => {
    setOpenCard(true);
  };
  const onCloseModal = () => {
    setOpenCard(false);
  };
  return (
    <>
      <div className={styles.reward_wrapper}>
        <h4>Rewards</h4>
        <div className={styles.rewards}>
          <RewardCard
            btnName="Redeem Now"
            cardPara="For 1000 Points"
            discountHeading="10% Discounts"
            img_src={Images.reward_zomato}
            showRewardClickHnandler={showRewardClickHnandler}
          />
          <RewardCard
            btnName="Redeem Now"
            cardPara="For 1000 Points"
            discountHeading="10% Discounts"
            img_src={Images.reward_zomato}
          />
          <RewardCard
            btnName="Redeem Now"
            cardPara="For 1000 Points"
            discountHeading="10% Discounts"
            img_src={Images.reward_zomato}
          />
          <RewardCard
            btnName="Redeem Now"
            cardPara="For 1000 Points"
            discountHeading="10% Discounts"
            img_src={Images.reward_zomato}
          />
        </div>
      </div>
      <RewardPopup open={openCard} onCloseModal={onCloseModal} />
    </>
  );
};

export default Rewards;
