"use client";
import React from "react";
import styles from "./consultaion.module.scss";

const Consultaion = () => {
  return (
    <>
      {/* <Banner text="free health consultation and diagnosis" /> */}
      <div className={styles["light_consultaion_wrapper"]}>
        <div className="container">
          <div className={styles.privacy_main}>
            <div className={styles.send_message}>
              <div className={styles.send_message_box}>
                <input type="text" placeholder="Send a massage" />

                <div className={styles.send_icon}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.0829 12.9496L4.19955 2.44959C3.14955 1.98292 1.98288 2.91625 2.44955 3.96625L5.36621 11.7829L18.6662 13.9996L5.36621 16.2162L2.44955 24.0329C2.09955 25.0829 3.14955 26.0162 4.19955 25.4329L25.0829 14.9329C25.8995 14.5829 25.8995 13.4162 25.0829 12.9496Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className={styles.detals_inqr}>
              <div className={styles.qrbox}>QR</div>
              <div className={styles.chat_answers}>
                <h6 className={styles.privacy_main_headings}>
                  Creating the best UI design in Figma involves a combination of
                  design principles, best practices, and the following steps:
                </h6>
                <ul className={styles.listsin_qr}>
                  1. Understand the Project and Audience:
                  <ul>
                    • Begin by thoroughly understanding the project requirements
                    and the target audience. Know what problem your design is
                    solving and who it is solving it for.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  2. Research and Inspiration::
                  <ul>
                    • Gather inspiration from various sources, including
                    competitor analysis, design websites, and apps. Create mood
                    boards and collect design references.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  3. Wireframing:
                  <ul>
                    • Start with wireframes to create a basic layout of your UI.
                    Focus on the structure and layout without worrying about
                    visual design elements.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  4. Information Architecture:
                  <ul>
                    • Organize content logically and create a sitemap to ensure
                    the flow of information makes sense.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  5. Typography:
                  <ul>
                    • Choose appropriate fonts that match the brand and are easy
                    to read. Consider typography hierarchy for headings,
                    subheadings, and body text.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  6. ustrations, and graphics that enhance the user experience
                  and support the content.
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <ShopByCategory title={true} /> */}

        <div className={styles.products}>
          <button className={styles.chat_with_expertBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g clipPath="url(#clip0_630_2489)">
                <path
                  d="M33.332 3.33325H6.66536C4.8237 3.33325 3.3487 4.82492 3.3487 6.66659L3.33203 36.6666L9.9987 29.9999H33.332C35.1737 29.9999 36.6654 28.5083 36.6654 26.6666V6.66659C36.6654 4.82492 35.1737 3.33325 33.332 3.33325ZM9.9987 14.9999H29.9987V18.3333H9.9987V14.9999ZM23.332 23.3333H9.9987V19.9999H23.332V23.3333ZM29.9987 13.3333H9.9987V9.99992H29.9987V13.3333Z"
                  fill="#121212"
                />
              </g>
              <defs>
                <clipPath id="clip0_630_2489">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Chat With Heath Expert
          </button>
        </div>
      </div>
    </>
  );
};

export default Consultaion;
