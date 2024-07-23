import React, { useState } from "react";
import Modal from "react-responsive-modal";
import styles from "./feedback.module.scss";
import { Button } from "react-bootstrap";

const Feedback = ({
  open,
  closeModal,
  sendFeedback,
  handleStarClick,
  rating,
  changeTextHandler,
  ratingData,
}) => {
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={closeModal}
          className={["addQuanity"]}
          center
        >
          <div className={styles.mainone}>
            <h4>Give Us a Review</h4>
            <h6>How did we do?</h6>
            <div style={{ padding: "10px 0px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleStarClick(star)}
                  style={{
                    cursor: "pointer",
                    stroke: !ratingData?.rate
                      ? star <= rating
                        ? ""
                        : "gray"
                      : star <= ratingData?.rate
                      ? ""
                      : "gray",
                    fill: !ratingData?.rate
                      ? star <= rating
                        ? "gold"
                        : ""
                      : star <= ratingData?.rate
                      ? "gold"
                      : "",
                  }}
                >
                  <path d="M22.4213 9.39C22.245 8.862 21.7995 8.48325 21.2595 8.40075L15.7778 7.5795L13.3103 2.3415C13.065 1.8225 12.5633 1.5 12 1.5C11.4368 1.5 10.935 1.8225 10.6898 2.3415L8.25826 7.56075L2.74051 8.40075C2.20051 8.48325 1.75576 8.862 1.57876 9.39C1.39801 9.93225 1.53151 10.5203 1.92751 10.9245L5.91826 15.009L4.97551 20.766C4.88176 21.3412 5.11426 21.9045 5.58376 22.2352C6.03526 22.5555 6.61576 22.587 7.09876 22.3207L11.9655 19.6027L16.9013 22.3207C17.3858 22.587 17.9648 22.554 18.4163 22.2352C18.8858 21.9045 19.119 21.3412 19.0245 20.766L18.0803 15.0015L22.0725 10.9245C22.4685 10.5203 22.602 9.93225 22.4213 9.39Z" />
                </svg>
              ))}
            </div>

            <p>Care to share more about it?</p>

            <textarea
              id=""
              placeholder="Review Content"
              className={styles.textArea}
              onChange={(e) => changeTextHandler(e)}
            ></textarea>
            <div className={styles.buttonDivs}>
              <Button
                className={styles.buttonSendFeedBack}
                onClick={() => sendFeedback()}
              >
                SEND REVIEW
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Feedback;
