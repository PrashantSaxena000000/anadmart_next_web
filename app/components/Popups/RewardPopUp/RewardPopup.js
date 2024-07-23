import React from "react";
import styles from "./reward.module.scss";
import Modal from "react-responsive-modal";
import Image from "next/image";
import Images from "../../Images/Images";

const RewardPopup = ({ open, onCloseModal }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{ modal: styles["login-popup-modal"] }}
        center
      >
        <div className={styles.inner_container_logins}>
          <div className={styles["content"]}>
            <div className={styles["left"]}>
              <Image src={Images.rewardClaim} alt="" />
              <h6>Comparte can 10 amigos Y recibe bonificacion</h6>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour To The Lorem Ipsum Text Delor,
              </p>
              <div className={styles.dasheddiv}>
                <div className={styles.leftSectio}>
                  <h5>FTE563TRE</h5>
                </div>
                <span className={styles.greenSpan}></span>
                <div className={styles.rightSectio}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25 11.25H13.75C12.3693 11.25 11.25 12.3693 11.25 13.75V25C11.25 26.3807 12.3693 27.5 13.75 27.5H25C26.3807 27.5 27.5 26.3807 27.5 25V13.75C27.5 12.3693 26.3807 11.25 25 11.25Z"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.25 18.75H5C4.33696 18.75 3.70107 18.4866 3.23223 18.0178C2.76339 17.5489 2.5 16.913 2.5 16.25V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H16.25C16.913 2.5 17.5489 2.76339 18.0178 3.23223C18.4866 3.70107 18.75 4.33696 18.75 5V6.25"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>Code Copy</span>
                </div>
              </div>
              <button>Done</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RewardPopup;
