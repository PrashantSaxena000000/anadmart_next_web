import React from "react";
import styles from "./aboutus.module.scss";
import Image from "next/image";

const TeamCard = ({ items }) => {
  return (
    <>
      <div className={styles.teamCard_wrapper}>
        <div>
          <img src={items?.image} alt="" />
        </div>
        <h6>{items?.designation}</h6>
        <p>{items?.name}</p>
      </div>
    </>
  );
};

export default TeamCard;
