import React from "react";
import styles from "./askus.module.scss";
const AskCard = ({ imgsvg, items, key }) => {
  return (
    <>
      <div className={styles.askCard_wrapper} key={key}>
        <div className={styles.cardsvg}>{imgsvg}</div>
        <div className={styles.askCardparas}>
          <h4>{items?.question}</h4>
          <p dangerouslySetInnerHTML={{ __html: items?.answer }}></p>
        </div>
      </div>
    </>
  );
};

export default AskCard;
