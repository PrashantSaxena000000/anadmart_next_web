import React from "react";
import styles from "./delivery.module.scss";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Images from "../Images/Images";

const Delivery = ({ mydata }) => {
  const modifyImageUrlForObject1 = (url) => {
    if (!url) return "";

    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_635.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
    return resizedUrl;
  };
  const modifyImageUrlForObject2 = (url) => {
    if (!url) return "";

    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_635.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
    return resizedUrl;
  };

  const left = modifyImageUrlForObject1(mydata?.lower_iamge_1);
  const right = modifyImageUrlForObject2(mydata?.lower_iamge_2);
  return (
    <>
      <div className={styles.delivery_wrapper}>
        <div className="container">
          <div className={styles.card_div_main}>
            {/* <div className={styles.cards}>
              <h5> Free delivery </h5>
              <h4>Free delivery over $50 </h4>
              <p>Shop $50 product and get free delivery anywhre.</p>
              <Button>
                Shop Now{" "}
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 9C3.5 8.58579 3.83579 8.25 4.25 8.25H14.75C15.1642 8.25 15.5 8.58579 15.5 9C15.5 9.41421 15.1642 9.75 14.75 9.75H4.25C3.83579 9.75 3.5 9.41421 3.5 9Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.96967 3.21967C9.26256 2.92678 9.73744 2.92678 10.0303 3.21967L15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L10.0303 14.7803C9.73744 15.0732 9.26256 15.0732 8.96967 14.7803C8.67678 14.4874 8.67678 14.0126 8.96967 13.7197L13.6893 9L8.96967 4.28033C8.67678 3.98744 8.67678 3.51256 8.96967 3.21967Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </div> */}
            <div className={styles.cardsmain}>
              <img src={left} alt="" />
            </div>
            {/* <div className={styles.cards2}>
              <h5> 60% off</h5>
              <h4>Organic Food</h4>
              <p>Save up to 60% off on your first order</p>
              <Button>
                Order Now{" "}
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 9C3.5 8.58579 3.83579 8.25 4.25 8.25H14.75C15.1642 8.25 15.5 8.58579 15.5 9C15.5 9.41421 15.1642 9.75 14.75 9.75H4.25C3.83579 9.75 3.5 9.41421 3.5 9Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.96967 3.21967C9.26256 2.92678 9.73744 2.92678 10.0303 3.21967L15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L10.0303 14.7803C9.73744 15.0732 9.26256 15.0732 8.96967 14.7803C8.67678 14.4874 8.67678 14.0126 8.96967 13.7197L13.6893 9L8.96967 4.28033C8.67678 3.98744 8.67678 3.51256 8.96967 3.21967Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </div> */}
            <div className={styles.cards2main}>
              <img src={right} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
