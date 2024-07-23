import React from "react";
import styles from "./sidedashboard.module.scss";

const SideDashboard = ({
  currentTab,
  handleChangeTab,
  logoutHandler,
  userprofileData,
  router,
}) => {
  return (
    <>
      <div className={styles["sidebar_wrapper"]}>
        <div className={styles.head_div}>
          <h2>
            <svg
              width="6"
              height="28"
              viewBox="0 0 6 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="6" height="28" rx="3" fill="#0B1F14" />
            </svg>

            <span>Hello {userprofileData?.first_name}</span>
          </h2>

          <p>Welcome to your Account</p>
        </div>
        <div
          className={
            currentTab === "my-orders" || currentTab === "tracksDetail"
              ? styles.dashboardTabActive
              : styles.dashparts
          }
          onClick={() => handleChangeTab("my-orders")}
        >
          <div className={styles.dashparts_div}>
            <div className={styles.iconsvg_div}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5833 8.3949L15.5138 7.45785C15.4501 6.59945 14.7083 5.93437 13.8146 5.93437H11.9937M5.5 17.4168H4.45365C3.465 17.4168 2.68398 16.6092 2.75442 15.6596L3.36283 7.45785C3.42651 6.59945 4.16831 5.93437 5.06207 5.93437H6.88298M6.88298 5.93437V4.29402C6.88298 2.93511 8.02705 1.8335 9.43833 1.8335C10.8496 1.8335 11.9937 2.93511 11.9937 4.29402V5.93437M6.88298 5.93437H11.9937M15.5833 13.7502C15.5833 14.7627 14.7625 15.5835 13.75 15.5835C12.7375 15.5835 11.9167 14.7627 11.9167 13.7502M10.0833 19.2502H17.4167C18.4292 19.2502 19.25 18.4294 19.25 17.4168V12.8335C19.25 11.821 18.4292 11.0002 17.4167 11.0002H10.0833C9.07081 11.0002 8.25 11.821 8.25 12.8335V17.4168C8.25 18.4294 9.07081 19.2502 10.0833 19.2502Z"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span>My Orders</span>
          </div>
        </div>
        <div
          className={
            currentTab === "wishlist"
              ? styles.dashboardTabActive
              : styles.dashparts
          }
          onClick={() => handleChangeTab("wishlist")}
        >
          <div className={styles.dashparts_div}>
            <div className={styles.iconsvg_div}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.99486 4.93029C8.49535 3.18277 5.99481 2.7127 4.11602 4.3129C2.23723 5.9131 1.97273 8.58855 3.44815 10.4811C4.67486 12.0547 8.38733 15.3734 9.60407 16.4475C9.7402 16.5677 9.80827 16.6278 9.88766 16.6514C9.95695 16.672 10.0328 16.672 10.1021 16.6514C10.1815 16.6278 10.2495 16.5677 10.3857 16.4475C11.6024 15.3734 15.3149 12.0547 16.5416 10.4811C18.017 8.58855 17.7848 5.89627 15.8737 4.3129C13.9626 2.72953 11.4944 3.18277 9.99486 4.93029Z"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Wishlist</span>
          </div>
        </div>
        <div
          className={
            currentTab === "information" || currentTab === "addaddress"
              ? styles.dashboardTabActive
              : styles.dashparts
          }
          onClick={() => handleChangeTab("information")}
        >
          <div className={styles.dashparts_div}>
            <div className={styles.iconsvg_div}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0002 11.6668C12.3013 11.6668 14.1668 9.80135 14.1668 7.50016C14.1668 5.19898 12.3013 3.3335 10.0002 3.3335C7.69898 3.3335 5.8335 5.19898 5.8335 7.50016C5.8335 9.80135 7.69898 11.6668 10.0002 11.6668ZM10.0002 11.6668C6.31826 11.6668 3.3335 13.9054 3.3335 16.6668M10.0002 11.6668C13.6821 11.6668 16.6668 13.9054 16.6668 16.6668"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span>My Info</span>
          </div>
        </div>
        <div
          className={
            currentTab === "reward"
              ? styles.dashboardTabActive
              : styles.dashparts
          }
          onClick={() => handleChangeTab("reward")}
        >
          <div className={styles.dashparts_div}>
            <div className={styles.iconsvg_div}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.6568 4.10304L11.4412 5.20928L11.7724 6.81866C11.7912 6.90928 11.7568 6.9999 11.6818 7.05614C11.6017 7.11163 11.4978 7.11258 11.4287 7.06866L10.0006 6.25615L8.57249 7.06866C8.49116 7.11552 8.39434 7.10928 8.31934 7.05615C8.24427 6.9999 8.20681 6.90928 8.22558 6.81866L8.55998 5.20928L7.34431 4.10304C7.27557 4.04053 7.25054 3.94366 7.27869 3.85615C7.30677 3.76866 7.38489 3.70615 7.47553 3.69677L9.1099 3.51554L9.78495 2.01865C9.86308 1.8499 10.138 1.8499 10.2131 2.01865L10.8912 3.51554L12.5225 3.69677C12.6162 3.70616 12.6912 3.76866 12.7193 3.85615C12.7506 3.94366 12.7224 4.04053 12.6568 4.10304Z"
                  fill="white"
                />
                <path
                  d="M16.6818 0.465622C16.1344 0.5569 15.6781 0.784328 15.3507 1.31248C15.3069 0.959378 15.2538 0.609359 15.1819 0.265616C15.16 0.15625 15.0631 0.078125 14.9538 0.078125H5.04746C4.935 0.078125 4.84124 0.15625 4.81629 0.265619C4.74747 0.612487 4.69124 0.962488 4.64753 1.30938C4.33021 0.795263 3.8721 0.548841 3.31002 0.465622C2.04265 0.322525 1.0533 1.63261 1.49437 2.87811C1.87506 4.0251 2.53242 5.34147 3.90999 6.96875C4.55376 7.72499 5.84435 9.10624 7.25373 9.85937C7.68693 10.2058 7.44746 10.9469 6.86623 10.9469C6.68183 10.9469 6.51314 10.8687 6.40061 10.7344C6.31936 10.6344 6.16936 10.6219 6.07255 10.7031C5.97252 10.7875 5.95688 10.9344 6.04127 11.0344C6.24436 11.2781 6.54435 11.4156 6.86623 11.4156C7.60382 11.4156 8.15691 10.6692 7.86317 9.93437C8.10685 10.2031 8.34435 10.45 8.56003 10.6656V12.9594H8.04749C7.91939 12.9594 7.81312 13.0625 7.81312 13.1937V14.7562H6.22254C6.11313 14.7562 6.0225 14.8281 5.99442 14.9344L4.80378 19.6313C4.78501 19.7 4.80065 19.775 4.84437 19.8312C4.89121 19.8875 4.9569 19.9219 5.0319 19.9219H14.9693C15.0412 19.9219 15.11 19.8875 15.1537 19.8312C15.1975 19.775 15.2132 19.7 15.1975 19.6313L14.0069 14.9344C13.9787 14.8281 13.8851 14.7562 13.7788 14.7562H12.1881V13.1937C12.1881 13.0625 12.0819 12.9594 11.9537 12.9594H11.4382V10.6656C11.6569 10.45 11.8944 10.2031 12.1381 9.93437C12.0882 10.0594 12.0569 10.1938 12.0569 10.3313C12.0569 10.9312 12.5382 11.4156 13.135 11.4156C13.4569 11.4156 13.7569 11.2781 13.96 11.0344C14.0413 10.9344 14.0288 10.7875 13.9288 10.7031C13.8287 10.6219 13.6819 10.6344 13.5975 10.7344C13.485 10.8687 13.3163 10.9469 13.135 10.9469C12.7975 10.9469 12.5256 10.6719 12.5256 10.3313C12.5256 10.1469 12.6069 9.97187 12.7475 9.85937C14.1569 9.10624 15.4443 7.72499 16.0912 6.96875C18.0522 4.6523 18.398 3.10418 18.5069 2.87811C18.9385 1.65937 17.9901 0.321016 16.6818 0.465622ZM4.26621 6.66561C2.33217 4.37831 2.03972 2.92633 1.93497 2.72186C1.6145 1.82288 2.31641 0.826303 3.25379 0.931244C4.40716 1.06713 4.83573 2.43992 4.0506 3.225C3.95996 3.31875 3.95996 3.46562 4.0506 3.55625C4.14124 3.65 4.29123 3.65 4.38187 3.55625C4.45061 3.48749 4.51005 3.41563 4.56627 3.3375C4.74442 5.71249 6.10375 7.86249 7.39442 9.39688C6.08498 8.67188 4.87877 7.38125 4.26621 6.66561ZM12.3811 18.2992H7.61887C7.48948 18.2992 7.3845 18.1942 7.3845 18.0648C7.3845 17.9354 7.48948 17.8304 7.61887 17.8304H12.3811C12.5105 17.8304 12.6155 17.9354 12.6155 18.0648C12.6155 18.1942 12.5105 18.2992 12.3811 18.2992ZM12.3811 16.3799C12.5105 16.3799 12.6155 16.4849 12.6155 16.6143C12.6155 16.7437 12.5105 16.8487 12.3811 16.8487H7.61887C7.48948 16.8487 7.3845 16.7437 7.3845 16.6143C7.3845 16.4849 7.48948 16.3799 7.61887 16.3799H12.3811ZM11.7194 13.4281V14.7562H8.28187V13.4281H11.7194ZM10.4913 10.9187C10.2256 11.1594 9.77563 11.1594 9.51005 10.9219C7.1965 8.79096 4.91457 5.77781 5.01313 2.62186C5.0319 1.93437 5.11002 1.23749 5.24125 0.546875H14.76C14.8882 1.21561 14.9631 1.91562 14.985 2.62499C15.0821 5.73219 12.8084 8.82876 10.4913 10.9187ZM18.0631 2.72186C17.9533 2.93779 17.6575 4.4039 15.7319 6.6625C15.1225 7.38125 13.9163 8.67188 12.6069 9.39688C13.8912 7.86562 15.2506 5.71875 15.4318 3.34999C15.5257 3.50624 15.6287 3.64687 15.7381 3.75624C15.8287 3.84688 15.9787 3.84688 16.0693 3.75624C16.16 3.66562 16.16 3.51562 16.0693 3.42499C15.7506 3.10625 15.4756 2.44999 15.5881 1.94687C15.7059 1.43993 16.1401 1.00651 16.7413 0.931244C17.6808 0.827606 18.387 1.81391 18.0631 2.72186Z"
                  fill="white"
                />
              </svg>
            </div>
            <span>Rewards</span>
          </div>
        </div>
        {/* <div
          className={
            currentTab === "support"
              ? styles.dashboardTabActive
              : styles.dashparts
          }
          onClick={() => router.push("/ask-us")}
        >
          <div className={styles.dashparts_div}>
            <div className={styles.iconsvg_div}>
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1812_2023)">
                  <path
                    d="M8.06277 19.9999C7.47293 19.8219 7.09782 19.445 7.00683 18.8249C6.90402 18.1242 7.42496 17.4139 8.13808 17.3393C8.92882 17.2653 9.72463 17.2632 10.5157 17.333C11.0231 17.3722 11.3841 17.6659 11.5849 18.1335C11.6441 18.2713 11.7192 18.3138 11.8624 18.3126C12.598 18.3065 13.3337 18.3154 14.0692 18.308C15.37 18.2949 16.4295 17.1272 16.3345 15.8277C16.3241 15.6829 16.246 15.6788 16.1405 15.679C15.5676 15.6803 14.9947 15.6803 14.4218 15.679C13.7447 15.6767 13.3278 15.2597 13.3271 14.5817C13.3258 13.091 13.3292 11.6003 13.3252 10.1095C13.324 9.66854 13.4884 9.3263 13.8745 9.10266C13.9492 9.05937 13.9943 9.0099 13.9916 8.91922C13.9655 8.10099 14.0511 7.28042 13.9139 6.46438C13.5976 4.58286 11.9295 2.97859 10.0316 2.74188C7.97334 2.48516 6.19543 3.39469 5.22043 5.21583C4.89838 5.81489 4.72511 6.4826 4.71522 7.16266C4.70522 7.72229 4.7147 8.28245 4.70964 8.84208C4.70845 8.97083 4.74048 9.05521 4.86152 9.12599C5.2111 9.33037 5.37542 9.65047 5.37589 10.052C5.37756 11.5688 5.37756 13.0855 5.37589 14.6023C5.3747 15.2555 4.95167 15.677 4.2998 15.6788C3.51209 15.681 2.72438 15.6848 1.93678 15.6759C0.896674 15.6642 0.0130799 14.7745 0.0051111 13.7313C-0.00183334 12.807 -0.0020236 11.8826 0.0045389 10.9582C0.0118693 10.4917 0.18132 10.0424 0.483811 9.68729C0.786302 9.33216 1.20297 9.0934 1.6623 9.01198C1.99699 8.9551 1.99183 8.955 1.99813 8.62261C2.01042 7.97234 1.97209 7.32193 2.03037 6.67151C2.14364 5.30035 2.64977 3.9909 3.48813 2.9C4.66522 1.35604 6.22298 0.4275 8.12954 0.0790103C8.30141 0.0477603 8.47568 0.0260938 8.64881 0H10.0551C10.0857 0.0100848 10.1171 0.0181061 10.1488 0.0240103C12.2762 0.279844 13.9883 1.26359 15.2713 2.97635C16.0939 4.07448 16.5536 5.31677 16.674 6.68651C16.7313 7.33662 16.6933 7.98672 16.7056 8.63672C16.7117 8.9575 16.7067 8.9576 17.0164 9.00901C17.4834 9.08474 17.9085 9.32325 18.2165 9.68232C18.5245 10.0414 18.6956 10.4979 18.6994 10.9709C18.7042 11.8819 18.7042 12.7928 18.6994 13.7038C18.6961 14.1269 18.5574 14.5378 18.3037 14.8763C18.0499 15.2149 17.6945 15.4633 17.2894 15.5853C17.0909 15.6426 17.0459 15.7311 17.0446 15.9233C17.0371 16.9008 16.677 17.7223 15.9134 18.3486C15.3591 18.8034 14.7124 19.0166 14.0013 19.0266C13.2857 19.0366 12.5698 19.0289 11.8541 19.0293C11.7568 19.0293 11.6609 19.0201 11.614 19.1435C11.4413 19.5991 11.0942 19.8608 10.6411 20L8.06277 19.9999ZM2.71517 7.8024C2.71517 8.10833 2.72501 8.41469 2.71163 8.72005C2.70319 8.91177 2.75647 8.99219 2.96162 8.97886C3.21443 8.9624 3.46912 8.97526 3.72298 8.97484C3.99147 8.97448 3.98772 8.97412 3.99298 8.70625C4.00756 7.96552 3.95605 7.22401 4.06345 6.48464C4.47657 3.64125 7.30303 1.56859 10.1445 2.03339C12.819 2.47089 14.7036 4.68 14.7115 7.38755C14.7129 7.8563 14.7137 8.32505 14.7108 8.7938C14.7101 8.90984 14.738 8.97844 14.8731 8.97609C15.192 8.97089 15.5111 8.97198 15.83 8.97552C15.9498 8.97687 15.9912 8.92068 15.9886 8.80859C15.9717 8.06734 16.0296 7.32458 15.9479 6.58464C15.7763 5.03083 15.1348 3.69151 14.018 2.60896C12.4022 1.04276 10.4509 0.416249 8.23313 0.797552C5.91022 1.19677 4.26204 2.52823 3.27167 4.66109C2.81016 5.65443 2.65913 6.7125 2.71517 7.8024ZM2.66178 12.3423C2.66178 11.5298 2.65834 10.717 2.66464 9.90438C2.66589 9.74255 2.61199 9.68198 2.4511 9.69229C2.28917 9.70271 2.1261 9.69229 1.96365 9.69646C1.29735 9.71318 0.737093 10.2433 0.725218 10.9096C0.708343 11.8584 0.710269 12.8079 0.724697 13.7568C0.733863 14.358 1.19688 14.853 1.78897 14.9538C2.00251 14.9903 2.21683 14.9746 2.43017 14.9891C2.60699 15.001 2.66751 14.9442 2.66547 14.7607C2.65672 13.9547 2.66183 13.1484 2.66178 12.3423ZM16.042 12.3454C16.042 13.1579 16.0445 13.9706 16.0396 14.7832C16.0387 14.9303 16.0766 15.0025 16.2375 14.9883C16.3665 14.977 16.4973 14.9878 16.6273 14.9855C17.4975 14.9699 18.0069 14.3205 17.9913 13.6172C17.9717 12.7335 17.9935 11.849 17.9822 10.9649C17.9842 10.6658 17.8793 10.3757 17.6864 10.147C17.4936 9.91821 17.2254 9.76582 16.9302 9.71719C16.7152 9.67917 16.4891 9.7087 16.2693 9.69182C16.0857 9.67771 16.0372 9.75125 16.0389 9.92703C16.0462 10.7331 16.0418 11.5395 16.0419 12.3454H16.042ZM3.3809 12.3302C3.3809 12.5318 3.3809 12.7334 3.3809 12.935C3.3809 13.5527 3.3809 14.1705 3.3809 14.7883C3.3809 14.8894 3.37569 14.9889 3.52475 14.9862C3.79131 14.982 4.05829 14.9924 4.32444 14.9807C4.5349 14.9714 4.65444 14.848 4.6548 14.6468C4.65734 13.1056 4.65725 11.5644 4.65454 10.0232C4.65412 9.80636 4.54516 9.70224 4.32798 9.69646C4.10699 9.69063 3.88579 9.69406 3.6647 9.69422C3.38162 9.69422 3.381 9.69474 3.3809 9.96937C3.38062 10.7564 3.38065 11.5434 3.3809 12.3302ZM15.3228 12.3526C15.3228 11.5397 15.3188 10.7268 15.326 9.91391C15.3275 9.74156 15.2695 9.68312 15.1001 9.69167C14.8731 9.70302 14.645 9.69229 14.4175 9.69531C14.1505 9.6988 14.0481 9.7963 14.0477 10.0596C14.0458 11.5748 14.0457 13.09 14.0474 14.6053C14.0477 14.8545 14.1649 14.9756 14.4151 14.9838C14.636 14.991 14.8583 14.9727 15.0781 14.99C15.284 15.0062 15.3288 14.9231 15.3266 14.7327C15.3175 13.9394 15.3229 13.1459 15.3228 12.3526ZM9.34662 18.0197V18.0209C9.00855 18.0209 8.67017 18.013 8.33235 18.0232C8.17768 18.025 8.02923 18.0844 7.91594 18.1897C7.80266 18.295 7.73266 18.4388 7.71959 18.5929C7.69142 18.9592 7.89199 19.2266 8.24772 19.2943C8.31117 19.3082 8.37576 19.3163 8.44068 19.3184C9.04537 19.3203 9.65017 19.3253 10.2548 19.3178C10.718 19.3121 10.9892 19.0601 10.9868 18.6604C10.9841 18.2599 10.7076 18.0209 10.244 18.0198C9.9447 18.0191 9.64558 18.0197 9.34662 18.0197Z"
                    fill="white"
                  />
                  <path
                    d="M9.35976 11.3495C7.15419 11.3621 5.33752 9.56476 5.32357 7.35616C5.30971 5.1558 7.11987 3.32033 9.31315 3.31059C11.5484 3.30069 13.373 5.09887 13.3798 7.31845C13.3867 9.53236 11.5872 11.3366 9.35976 11.3495ZM9.34935 4.02965C8.91549 4.02782 8.48554 4.11173 8.08421 4.27656C7.68288 4.4414 7.31807 4.68391 7.01075 4.99016C6.70342 5.29641 6.45964 5.66036 6.2934 6.06111C6.12716 6.46187 6.04174 6.89152 6.04206 7.32538C6.04065 9.15408 7.53289 10.652 9.35456 10.6506C10.2306 10.6458 11.0694 10.2954 11.6886 9.67556C12.3077 9.05571 12.6572 8.21653 12.661 7.34043C12.6632 6.90496 12.5791 6.47337 12.4134 6.07063C12.2477 5.66789 12.0039 5.302 11.6959 4.99411C11.3879 4.68623 11.022 4.44246 10.6192 4.27691C10.2164 4.11137 9.78482 4.02732 9.34935 4.02965Z"
                    fill="white"
                  />
                  <path
                    d="M9.71138 7.77361C9.71138 8.20309 9.71147 8.63259 9.71164 9.0621C9.7119 9.31283 9.71247 9.31283 9.97075 9.32018C10.284 9.32908 10.4574 9.5733 10.3284 9.82455C10.3049 9.87897 10.2661 9.92539 10.2168 9.95821C10.1674 9.99102 10.1096 10.0088 10.0503 10.0094C9.58835 10.0129 9.12622 10.016 8.66429 10.0089C8.5751 10.0071 8.49018 9.97027 8.42796 9.90634C8.36573 9.8424 8.3312 9.75653 8.33184 9.66731C8.33301 9.57858 8.36783 9.4936 8.42927 9.42957C8.49071 9.36554 8.57417 9.32724 8.66278 9.32242C8.992 9.29174 8.99205 9.29174 8.99205 8.95643C8.99205 8.27965 8.98789 7.60283 8.99492 6.92606C8.99664 6.75742 8.96081 6.67794 8.7695 6.68476C8.49721 6.69439 8.32586 6.53825 8.33143 6.32309C8.33664 6.11507 8.50268 5.97887 8.76726 5.97184C8.92986 5.96752 9.09268 5.96804 9.25534 5.97148C9.57305 5.9782 9.70763 6.11007 9.71028 6.42653C9.71398 6.8757 9.71112 7.32476 9.71138 7.77361Z"
                    fill="white"
                  />
                  <path
                    d="M9.7065 5.00075C9.70249 5.09196 9.665 5.17849 9.60118 5.24378C9.53736 5.30907 9.45171 5.34852 9.36061 5.3546C9.26602 5.35298 9.17564 5.31521 9.10803 5.24903C9.04042 5.18286 9.00072 5.0933 8.99707 4.99877C9.00104 4.90422 9.04116 4.8148 9.10915 4.74898C9.17714 4.68315 9.26781 4.64594 9.36244 4.64502C9.45352 4.65156 9.53899 4.69147 9.60248 4.75711C9.66596 4.82275 9.703 4.9095 9.7065 5.00075Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1812_2023">
                    <rect width="18.7029" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span>Support</span>
          </div>
        </div> */}
        <div className={styles.dashparts} onClick={logoutHandler}>
          <div className={styles.dashparts_div}>
            <div className={styles.iconsvg_div}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6667 15.5833L19.25 11M19.25 11L14.6667 6.41667M19.25 11H8.25M8.25 2.75H7.15C5.60986 2.75 4.83978 2.75 4.25153 3.04973C3.73408 3.31338 3.31338 3.73408 3.04973 4.25153C2.75 4.83978 2.75 5.60986 2.75 7.15V14.85C2.75 16.3901 2.75 17.1602 3.04973 17.7485C3.31338 18.2659 3.73408 18.6866 4.25153 18.9503C4.83978 19.25 5.60986 19.25 7.15 19.25H8.25"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Sign out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDashboard;