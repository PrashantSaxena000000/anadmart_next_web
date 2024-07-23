import React from "react";
import styles from "./headerbar.module.scss";
import Link from "next/link";

const HeaderBar = () => {
  return (
    <>
      <div className={styles.headbar_wrapper_main}>
        <div className="container">
          <div className={styles.headerBar_wrapper}>
            <div className={styles.left_side}>
              <p>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.375 10.125H2.625C1.8 10.125 1.125 9.45 1.125 8.625V3.375C1.125 2.55 1.8 1.875 2.625 1.875H9.375C10.2 1.875 10.875 2.55 10.875 3.375V8.625C10.875 9.45 10.2 10.125 9.375 10.125Z"
                    stroke="#4DBA4D"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.125 3.75L6 6.75L10.875 3.75"
                    stroke="#4DBA4D"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                <a
                  href="mailto:info@gmail.com"
                  style={{ textDecoration: "none" }}
                >
                  <span>info@gmail.com</span>
                </a>
              </p>
              <p>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.53558 12.3063C9.10784 12.3032 8.68197 12.2495 8.26683 12.1464C6.8332 11.8005 5.35691 10.923 4.11058 9.67559C2.86426 8.42817 1.9857 6.9516 1.6398 5.51934C1.27558 4.0127 1.53535 2.72371 2.37043 1.88863L2.60887 1.6502C2.8252 1.4343 3.11835 1.31304 3.42398 1.31304C3.72962 1.31304 4.02277 1.4343 4.2391 1.6502L5.60929 3.02012C5.82533 3.23638 5.94667 3.52956 5.94667 3.83524C5.94667 4.14091 5.82533 4.43409 5.60929 4.65035L4.79992 5.45945C5.18793 6.14031 5.71566 6.82172 6.33937 7.44543C6.96308 8.06914 7.64504 8.59715 8.32562 8.98516L9.13472 8.17578C9.24175 8.06872 9.36883 7.98378 9.50869 7.92583C9.64855 7.86789 9.79845 7.83806 9.94984 7.83806C10.1012 7.83806 10.2511 7.86789 10.391 7.92583C10.5309 7.98378 10.6579 8.06872 10.765 8.17578L12.1349 9.5457C12.351 9.76188 12.4723 10.055 12.4723 10.3607C12.4723 10.6663 12.351 10.9595 12.1349 11.1757L11.8962 11.4141C11.3075 12.0039 10.4926 12.3063 9.53558 12.3063ZM3.42398 2.13281C3.38032 2.1326 3.33706 2.14109 3.29673 2.15781C3.2564 2.17453 3.21981 2.19912 3.1891 2.23016L2.95039 2.46859C2.32504 3.09395 2.14238 4.10922 2.43605 5.32574C2.74695 6.61445 3.5473 7.95348 4.68945 9.09535C5.8316 10.2372 7.17035 11.0368 8.45933 11.3488C9.67613 11.6424 10.6909 11.4598 11.3162 10.8344L11.5546 10.596C11.6169 10.5336 11.6519 10.4491 11.6519 10.361C11.6519 10.2728 11.6169 10.1883 11.5546 10.1259L10.185 8.75602C10.1226 8.69372 10.0381 8.65872 9.94998 8.65872C9.86184 8.65872 9.77731 8.69372 9.71496 8.75602L8.68929 9.78168C8.62775 9.84326 8.54821 9.88366 8.46218 9.89703C8.37616 9.9104 8.28811 9.89605 8.21078 9.85606C7.36996 9.42129 6.5223 8.78828 5.75941 8.02539C4.99652 7.2625 4.36488 6.41539 3.92902 5.57457C3.88899 5.49727 3.8746 5.40924 3.88792 5.32321C3.90124 5.23719 3.94159 5.15763 4.00312 5.09606L5.02906 4.07039C5.09136 4.00804 5.12635 3.92351 5.12635 3.83537C5.12635 3.74723 5.09136 3.6627 5.02906 3.60035L3.65914 2.23016C3.62834 2.19917 3.59169 2.17462 3.55132 2.15791C3.51095 2.1412 3.46767 2.13267 3.42398 2.13281Z"
                    fill="#4DBA4D"
                  />
                  <path
                    d="M9.97363 7.37543C9.86485 7.37543 9.76053 7.33222 9.68361 7.2553C9.60669 7.17838 9.56348 7.07405 9.56348 6.96527C9.56268 6.24573 9.27651 5.55588 8.76774 5.04706C8.25897 4.53824 7.56915 4.252 6.84961 4.25113C6.74083 4.25113 6.6365 4.20792 6.55959 4.131C6.48267 4.05408 6.43945 3.94976 6.43945 3.84098C6.43945 3.7322 6.48267 3.62787 6.55959 3.55095C6.6365 3.47403 6.74083 3.43082 6.84961 3.43082C8.7984 3.43082 10.3838 5.01676 10.3838 6.96527C10.3838 7.07405 10.3406 7.17838 10.2637 7.2553C10.1867 7.33222 10.0824 7.37543 9.97363 7.37543Z"
                    fill="#4DBA4D"
                  />
                  <path
                    d="M11.7072 7.37543C11.5984 7.37543 11.4941 7.33222 11.4172 7.2553C11.3403 7.17838 11.2971 7.07406 11.2971 6.96528C11.2971 4.51281 9.30098 2.51754 6.84961 2.51754C6.74083 2.51754 6.6365 2.47433 6.55959 2.39741C6.48267 2.32049 6.43945 2.21616 6.43945 2.10738C6.43945 1.9986 6.48267 1.89428 6.55959 1.81736C6.6365 1.74044 6.74083 1.69723 6.84961 1.69723C9.75434 1.69723 12.1174 4.06055 12.1174 6.96528C12.1174 7.07406 12.0742 7.17838 11.9973 7.2553C11.9203 7.33222 11.816 7.37543 11.7072 7.37543Z"
                    fill="#4DBA4D"
                  />
                </svg>
                <a href="tel:+91 9876543210" style={{ textDecoration: "none" }}>
                  <span>91 9876543210</span>
                </a>
              </p>
              <p>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_185_431)">
                    <path
                      d="M10.125 4.5C10.125 2.22188 8.27812 0.375 6 0.375C3.72188 0.375 1.875 2.22188 1.875 4.5C1.875 7.5 6 11.625 6 11.625C6 11.625 10.125 7.5 10.125 4.5Z"
                      stroke="#4DBA4D"
                      strokeMiterlimit="10"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6C6.82843 6 7.5 5.32843 7.5 4.5C7.5 3.67157 6.82843 3 6 3C5.17157 3 4.5 3.67157 4.5 4.5C4.5 5.32843 5.17157 6 6 6Z"
                      stroke="#4DBA4D"
                      strokeMiterlimit="10"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_185_431">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span>121 King Street, Melbourne Victoria3000, Australia</span>
              </p>
            </div>
            <div className={styles.right_side}>
              <svg
                width="34"
                height="24"
                viewBox="0 0 34 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="34" height="23.375" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_43_5093"
                      transform="matrix(0.0208333 0 0 0.030303 0 -0.212121)"
                    />
                  </pattern>
                  <image
                    id="image0_43_5093"
                    width="48"
                    height="48"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>

              <p>English</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
