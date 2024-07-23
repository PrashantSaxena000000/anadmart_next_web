"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./tracking.module.scss";
import ActiveOrder from "./ActiveOrder/ActiveOrder";
import {
  cancelMyOrder,
  myAllOrders,
  myOrderDetails,
  reOrder,
} from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import Modal from "react-responsive-modal";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Images from "../../Images/Images";

const Tracking = ({
  handleChangeTab,
  myAllOrdersDataList,
  trackingTab,
  setTrackingTab,
}) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [cancel, setCancel] = useState(false);

  const closeModal = () => setOpen(false);

  const pageLoading = useSelector((state) => state?.home?.pageLoading);

  const cancellingMyOrder = useSelector(
    (state) => state?.home?.cancellingMyOrder
  );
  const reOrderMyOrder = useSelector((state) => state?.home?.reOrderMyOrder);
  useEffect(() => {
    if (trackingTab) {
      dispatch(myAllOrders(trackingTab));
    }
  }, [trackingTab, cancellingMyOrder, reOrderMyOrder]);

  const showDetailsClickHandler = (item) => {
    handleChangeTab("tracksDetail");
  };

  const openCancelModalClickHandler = (item) => {
    setCancel(item.order_id);
    setOpen(true);
  };

  const cancelOrderClickHandler = () => {
    const data = {
      order_id: cancel,
      status: "C",
    };
    dispatch(cancelMyOrder(data, setOpen));
  };

  const reOrderClickHandler = (item) => {
    dispatch(reOrder(item.order_id));
  };

  return (
    <>
      <div className={styles["tracking_wrapper"]}>
        <div className={styles.head_tag}>
          <h4>My Orders</h4>
          <div className={styles.save_div}>
            {myAllOrdersDataList?.total_spend !== undefined ? (
              <p>Total Spend: ${myAllOrdersDataList?.total_spend} </p>
            ) : null}
            {myAllOrdersDataList?.total_saving !== undefined ? (
              <p>Total Save This Month : ${myAllOrdersDataList?.total_saving}</p>
            ) : null}
          </div>
        </div>

        <div className={styles.tracking_tabs}>
          <p
            className={
              trackingTab === "active"
                ? styles.trackingTabActive
                : styles.tracking
            }
            onClick={() => setTrackingTab("active")}
          >
            Active
          </p>
          <p
            className={
              trackingTab === "cancel"
                ? styles.trackingTabActive
                : styles.tracking
            }
            onClick={() => setTrackingTab("cancel")}
          >
            Cancelled
          </p>
          <p
            className={
              trackingTab === "complete"
                ? styles.trackingTabActive
                : styles.tracking
            }
            onClick={() => setTrackingTab("complete")}
          >
            Completed
          </p>
          <p
            className={
              trackingTab === "refund"
                ? styles.trackingTabActive
                : styles.tracking
            }
            onClick={() => setTrackingTab("refund")}
          >
            Refund
          </p>
        </div>
        <hr />

        <div className={styles.allcards}>
          {trackingTab === "active" && (
            <>
              {myAllOrdersDataList?.order_details?.length === 0 ? (
                <>
                  <div className={styles.EmptyImg}>
                    <Image
                      src={Images.EmptyOrder}
                      alt=""
                      className={styles.EmptyImg}
                    />
                  </div>

                  <h4>No Active Orders Found</h4>
                </>
              ) : (
                myAllOrdersDataList?.order_details?.map((items, key) => (
                  <ActiveOrder
                    handleChangeTab={handleChangeTab}
                    orderStatus={items?.delivery_status}
                    items={items}
                    showDetailsClickHandler={showDetailsClickHandler}
                    cancelData
                    openCancelModalClickHandler={openCancelModalClickHandler}
                    trackingTab={trackingTab}
                  />
                ))
              )}
            </>
          )}
          {trackingTab === "cancel" && (
            <>
              {myAllOrdersDataList?.order_details?.length === 0 ? (
                <>
                  <Image
                    src={Images.EmptyOrder}
                    alt=""
                    className={styles.Empty_svg}
                  />

                  <h4 className={styles.h_tag}>No Cancel Orders Found</h4>
                </>
              ) : (
                myAllOrdersDataList?.order_details?.map((items, key) => (
                  <ActiveOrder
                    handleChangeTab={handleChangeTab}
                    orderStatus="Cancelled"
                    items={items}
                    showDetailsClickHandler={showDetailsClickHandler}
                  />
                ))
              )}
            </>
          )}
          {trackingTab === "complete" && (
            <>
              {myAllOrdersDataList?.order_details?.length === 0 ? (
                <>
                  <div className={styles.EmptyImg}>
                    <Image src={Images.EmptyOrder} alt="" />
                  </div>

                  <h4>No Complete Orders Found</h4>
                </>
              ) : (
                myAllOrdersDataList?.order_details?.map((items, key) => (
                  <ActiveOrder
                    handleChangeTab={handleChangeTab}
                    orderStatus="Completed"
                    items={items}
                    showDetailsClickHandler={showDetailsClickHandler}
                    reOrder
                    reOrderClickHandler={reOrderClickHandler}
                  />
                ))
              )}
            </>
          )}

          {trackingTab === "refund" && (
            <>
              {myAllOrdersDataList?.order_details?.length === 0 ? (
                <>
                  <div className={styles.EmptyImg}>
                    <Image src={Images.EmptyOrder} alt="" />
                  </div>

                  <h4>No Refund Orders Found</h4>
                </>
              ) : (
                myAllOrdersDataList?.order_details?.map((items, key) => (
                  <ActiveOrder
                    handleChangeTab={handleChangeTab}
                    orderStatus="refund"
                    items={items}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
      <Modal open={open} onClose={closeModal} className={["addQuanity"]} center>
        <div className={styles.mainone}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 140 140"
            fill="none"
          >
            <g clipPath="url(#clip0_2649_1591)">
              <path
                d="M35 110.833C35 117.25 40.25 122.5 46.6666 122.5H93.3333C99.7499 122.5 105 117.25 105 110.833V40.8333H35V110.833ZM49.3791 69.3L57.6333 61.0458L70 73.4125L82.3666 61.0458L90.6208 69.3L78.2541 81.6667L90.6208 94.0333L82.3666 102.287L70 89.9208L57.6333 102.287L49.3791 94.0333L61.7458 81.6667L49.3791 69.3ZM90.4166 23.3333L84.5833 17.5H55.4166L49.5833 23.3333H29.1666V35H110.833V23.3333H90.4166Z"
                fill="#E42525"
              />
            </g>
            <defs>
              <clipPath id="clip0_2649_1591">
                <rect width="140" height="140" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h4>Are you sure you want to cancel your order?</h4>

          <div className={styles.buttonDivs}>
            <Button className={styles.buttonNo} onClick={() => setOpen(false)}>
              No
            </Button>
            <Button
              className={styles.buttonYes}
              onClick={() => cancelOrderClickHandler()}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Tracking;
