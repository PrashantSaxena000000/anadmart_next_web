"use client";
import React, { useEffect, useState } from "react";
import styles from "./thirdHeader.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { requestForToken } from "../../components/firebase/firebase";

const ThirdHeader = () => {
  const [showDown, setShowDown] = useState(false);
  const myhopageData = useSelector((state) => state?.home?.myhopageData);
  const showDownClickHandler = () => {
    setShowDown(!showDown);
  };
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    requestForToken(setTokenFound);
  }, []);

  useEffect(() => {
    if (isTokenFound) {
      localStorage.setItem("fcm_token", isTokenFound);
    }
  }, [isTokenFound]);

  return (
    <>
      <div className={styles.third_wrapper}>
        <div className="container">
          <div className={styles.third_main_div}>
            {/* <div
              className={
                showDown ? styles.max_leftDivActive : styles.max_leftDiv
              }
              onClick={showDownClickHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
              >
                <line y1="1" x2="16" y2="1" stroke="white" strokeWidth="2" />
                <line y1="5" x2="16" y2="5" stroke="white" strokeWidth="2" />
                <line y1="9" x2="16" y2="9" stroke="white" strokeWidth="2" />
              </svg>
              <p>Shop by Department</p>
              {showDown ? (
                <div className={styles.leftpart_abs}>
                  <p>Vape kits</p>
                  <p>Refills & Pods</p>
                  <p>Nicotine Pouches</p>
                  <p>Juul Products</p>
                  <p>Vape Mods</p>
                  <p>Coils</p>
                  <p>E-cig Batteries</p>
                </div>
              ) : null}
            </div> */}
            <div className={styles.max_right_div}>
              <div className={styles.rightList_div}>
                <ul>
                  <Link href="/">
                    <li>Home</li>
                  </Link>
                  <Link href="/shop/?item=1">
                    <li>Shop</li>
                  </Link>
                  {/* <Link href="/aboutus">
                    <li>About us</li>
                  </Link>

                  {/* <li>Blog</li> 
                  <Link href="/contact-us">
                    <li>Contact us </li>
                  </Link> */}
                </ul>
              </div>
              <p>
                Free Delivery{" "}
                <span>
                  On Order Over $ {myhopageData?.free_delivery_amount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThirdHeader;
