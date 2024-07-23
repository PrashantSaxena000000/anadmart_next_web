import React, { useState, useEffect, useRef } from "react";
import styles from "./shop.module.scss";
import Link from "next/link";

const ShopHeader = ({
  categoryDataHandler,
  myAllShopData,
  currentSectionName,

  openMoreOptionHandler,
  moreOption,
  newRef,
  categorySectionName,
}) => {
  return (
    <>
      <div className={styles.shopHeaderWrapper}>
        <div className="container">
          <div className={styles.mainHead}>
            <div className={styles.moreCategoryDiv}>
              <ul>
                {myAllShopData?.slice(0, 7)?.map((items, key) => (
                  <Link
                    href={{
                      pathname: "/shop",
                      query: { item: items.id },
                    }}
                  >
                    <li key={key} onClick={() => categoryDataHandler(items)}>
                      {items.name}
                    </li>
                  </Link>
                ))}

                <li
                  onClick={openMoreOptionHandler}
                  className={
                    moreOption === true
                      ? styles.moreListActive
                      : styles.moreList
                  }
                >
                  More{" "}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.47695 6.49336L3.54023 6.56719L8.32148 12.0691C8.4832 12.2555 8.72578 12.3715 8.99648 12.3715C9.26719 12.3715 9.50977 12.252 9.67148 12.0691L14.4492 6.57773L14.5301 6.48633C14.5898 6.39844 14.625 6.29297 14.625 6.18047C14.625 5.87461 14.3648 5.625 14.0414 5.625H3.95859C3.63516 5.625 3.375 5.87461 3.375 6.18047C3.375 6.29648 3.41367 6.40547 3.47695 6.49336Z"
                      fill="black"
                    />
                  </svg>
                </li>
              </ul>
              {moreOption && (
                <div className={styles.moreDataDiv} ref={newRef}>
                  {myAllShopData?.slice(7)?.map((items, key) => (
                    <Link
                      href={{
                        pathname: "/shop",
                        query: { item: items.id },
                      }}
                    >
                      <p
                        key={key}
                        className={styles.para_of_shopmore}
                        onClick={() => categoryDataHandler(items)}
                      >
                        {items.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.mainHead3}>
            <div className={styles.moreCategoryDiv2}>
              <ul>
                {myAllShopData?.slice(0, 6)?.map((items, key) => (
                  <Link
                    href={{
                      pathname: "/shop",
                      query: { item: items.id },
                    }}
                  >
                    <li key={key} onClick={() => categoryDataHandler(items)}>
                      {items.name}
                    </li>
                  </Link>
                ))}
                <li
                  onClick={openMoreOptionHandler}
                  className={
                    moreOption === true
                      ? styles.moreListActive
                      : styles.moreList
                  }
                >
                  More{" "}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.47695 6.49336L3.54023 6.56719L8.32148 12.0691C8.4832 12.2555 8.72578 12.3715 8.99648 12.3715C9.26719 12.3715 9.50977 12.252 9.67148 12.0691L14.4492 6.57773L14.5301 6.48633C14.5898 6.39844 14.625 6.29297 14.625 6.18047C14.625 5.87461 14.3648 5.625 14.0414 5.625H3.95859C3.63516 5.625 3.375 5.87461 3.375 6.18047C3.375 6.29648 3.41367 6.40547 3.47695 6.49336Z"
                      fill="black"
                    />
                  </svg>
                </li>
              </ul>
              {moreOption && (
                <div className={styles.moreDataDiv} ref={newRef}>
                  {myAllShopData?.slice(6)?.map((items, key) => (
                    <Link
                      href={{
                        pathname: "/shop",
                        query: { item: items.id },
                      }}
                    >
                      <p
                        key={key}
                        className={styles.para_of_shopmore}
                        onClick={() => categoryDataHandler(items)}
                      >
                        {items.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.mainHead2}>
          <div className="container">
            <div className={styles.moreCategoryDiv4}>
              <ul>
                <li
                  onClick={openMoreOptionHandler}
                  className={
                    moreOption === true
                      ? styles.moreListActive
                      : styles.moreList
                  }
                >
                  <span>
                    {currentSectionName?.name
                      ? currentSectionName?.name
                      : categorySectionName}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M2.63343 6.21237L10.5626 15.4375V22.75L15.4376 19.5V15.4375L23.3668 6.21237C23.8186 5.68425 23.4391 4.875 22.7387 4.875H3.26149C2.56112 4.875 2.18168 5.68425 2.63343 6.21237Z"
                      stroke="black"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
              </ul>
              {moreOption && (
                <div className={styles.moreDataDiv2} ref={newRef}>
                  {myAllShopData?.map((items, key) => (
                    <Link
                      href={{
                        pathname: "/shop",
                        query: { item: items.id },
                      }}
                    >
                      <p
                        key={key}
                        className={styles.para_of_shopmore}
                        onClick={() => categoryDataHandler(items)}
                      >
                        {items.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopHeader;
