import React from "react";
import styles from "./shop.module.scss";

const LeftSection = ({ changeTabHAndler, currentSection, myAllSubCatData }) => {
  const modifiedData = myAllSubCatData?.sub_category?.map((item) => {
    const urlParts = item?.image.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_50x50.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");

    return {
      ...item,
      image: resizedUrl,
    };
  });
  return (
    <>
      <div className={styles.leftSectionWrapper}>
        {modifiedData?.map((items, key) => (
          <>
            <div
              key={key}
              className={
                currentSection?.id == items?.id
                  ? styles.leftdivactive
                  : styles.leftdiv
              }
              onClick={() => changeTabHAndler(items)}
            >
              <div className={styles.greenDiv}></div>

              <div className={styles.mainDiv_of_left}>
                <div className={styles.imgDiv}>
                  <img className={styles.imgDivImg} alt="" src={items.image} />
                </div>
                <div className={styles.text_div}>
                  <h6>{items.name}</h6>
                </div>
              </div>
            </div>
            <hr
              style={{
                margin: "0px",
                borderTop: "1px solid #DCDCDC",
                opacity: "1",
              }}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default LeftSection;
