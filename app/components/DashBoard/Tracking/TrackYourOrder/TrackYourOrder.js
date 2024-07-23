import React, { useEffect, useState } from "react";
import styles from "./track.module.scss";
import { Row } from "react-bootstrap";
import Feedback from "./Feedback";
import { feedback, myOrderDetails } from "../../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TrackYourOrder = ({
  handleChangeTab,
  mySelectedOrderDetails,
  prevCount,
  setTrackingTab,
}) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingData, setRatingData] = useState({});
  const [popUpData, setPopupData] = useState();

  const [url, setUrl] = useState();

  var params = new URLSearchParams(url);
  let od_id = params.get("ref");

  useEffect(() => {
    if (typeof window !== undefined) {
      setUrl(window.location.search);
    }
  }, [od_id, params, url]);

  useEffect(() => {
    if (od_id) {
      dispatch(myOrderDetails(od_id));
    }
  }, [od_id]);

  const handleStarClick = (selectedRating) => {
    if (!ratingData?.rate) {
      setRating(selectedRating);
    }
  };

  const changeTextHandler = (e) => {
    setRatingData({ ...ratingData, review: e.target.value });
  };

  const closeModal = () => {
    setOpen(false);
  };
  const giveReviewOpenClickHandler = (id, data) => {
    setOpen(true);
    setRatingData({ id: id?.product_id, order: data, rate: id?.rating });
    setPopupData(id);
  };
  const sendFeedback = () => {
    if (!ratingData?.review && !rating) {
      toast.error("Select Star or Write Something");
    } else {
      const data = {
        product_id: ratingData?.id,
        rating: rating,
        review: ratingData?.review,
        order_id: ratingData?.order,
      };
      dispatch(feedback(data, setOpen));
    }
  };

  return (
    <>
      <div className={styles["tracker_wrapper"]}>
        <h4 onClick={() => handleChangeTab("my-orders")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6665 5L7.2558 9.41074C6.93036 9.73618 6.93036 10.2638 7.2558 10.5893L11.6665 15"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>{" "}
          Order Details
        </h4>
        <div className={styles.tracks}>
          <Row className={styles.order_row}>
            <div className={styles.order_detail_div1}>
              <h4>Order no: #000{mySelectedOrderDetails?.order_id}</h4>
            </div>
            <div className={styles.order_detail_div2}>
              <p>
                Order Date <span> : {mySelectedOrderDetails?.placed_at}</span>{" "}
              </p>
              <p>
                Order Status{" "}
                <span> : {mySelectedOrderDetails?.delivery_status}</span>{" "}
              </p>
            </div>
            <div className={styles.order_detail_div2}>
              {mySelectedOrderDetails?.delivery_status === "Order Placed" && (
                <p>
                  Estimated Delivery Date{" "}
                  <span> {mySelectedOrderDetails?.estimate_delivery}</span>{" "}
                </p>
              )}
              <p>
                Payment Method
                <span> : {mySelectedOrderDetails?.order_type} </span>{" "}
              </p>
            </div>
          </Row>

          <div className={styles.classTracks}>
            <div className={styles.trackproress_div}>
              <div className={styles.trackproress}>
                {mySelectedOrderDetails?.order_activity?.map((data) => (
                  <div className={styles.div_span_data}>
                    <div
                      className={
                        data?.id && data?.note === "Order Cancelled"
                          ? styles.trackproress_cancel
                          : styles.trackproress_complete
                      }
                    ></div>
                    <span>{data?.note}</span>
                  </div>
                ))}
                {mySelectedOrderDetails?.order_activity?.length === 1 && (
                  <>
                    <div className={styles.div_span_data}>
                      <div className={styles.trackproress_process}>
                        <div className={styles.process_inprocess}></div>
                      </div>
                      <span>Inprogress</span>
                    </div>

                    <div className={styles.div_span_data}>
                      <div className={styles.trackproress_waiting}></div>
                      <span>shipped</span>
                    </div>
                    <div className={styles.div_span_data}>
                      <div className={styles.trackproress_waiting}></div>
                      <span>Delivered</span>
                    </div>
                  </>
                )}
                {mySelectedOrderDetails?.order_activity?.length === 2 && (
                  <>
                    <div className={styles.div_span_data}>
                      <div className={styles.trackproress_waiting}></div>
                      <span>shipped</span>
                    </div>
                    <div className={styles.div_span_data}>
                      <div className={styles.trackproress_waiting}></div>
                      <span>Delivered</span>
                    </div>
                  </>
                )}
                {mySelectedOrderDetails?.order_activity?.length === 3 && (
                  <>
                    <div className={styles.div_span_data}>
                      <div className={styles.trackproress_waiting}></div>
                      <span>Delivered</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Row className={styles.order_row}>
            {mySelectedOrderDetails?.order_items?.map((items, key) => (
              <>
                <div className={styles.details_data}>
                  <div className={styles.img_of_active_div}>
                    <div className={styles.img_divs_main}>
                      <img
                        src={items?.product_image}
                        alt=""
                        className={styles.imgProduct}
                      />
                    </div>
                    <div className={styles.product_info}>
                      <span>{items?.product_name}</span>
                      {/* <p>
                  MG <span className={styles.para_span}>: 100</span>
                </p> */}
                    </div>
                  </div>
                  <div className={styles.qty_div}>
                    <p>
                      Qty : <span> {items?.qty}</span>
                    </p>
                    <p>
                      Total: <span> ${items?.total_price}</span>
                    </p>
                    {items?.feedback === false ? (
                      mySelectedOrderDetails?.delivery_status ===
                      "Delivered" ? (
                        <button
                          className={styles.btnReview}
                          onClick={() =>
                            giveReviewOpenClickHandler(
                              items,
                              mySelectedOrderDetails?.order_id
                            )
                          }
                        >
                          Give Review
                        </button>
                      ) : (
                        ""
                      )
                    ) : (
                      <div className={styles.starsDiv}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              cursor: "pointer",
                              stroke: star <= items?.rating ? "" : "gray",
                              fill: star <= items?.rating ? "gold" : "",
                            }}
                          >
                            <path d="M22.4213 9.39C22.245 8.862 21.7995 8.48325 21.2595 8.40075L15.7778 7.5795L13.3103 2.3415C13.065 1.8225 12.5633 1.5 12 1.5C11.4368 1.5 10.935 1.8225 10.6898 2.3415L8.25826 7.56075L2.74051 8.40075C2.20051 8.48325 1.75576 8.862 1.57876 9.39C1.39801 9.93225 1.53151 10.5203 1.92751 10.9245L5.91826 15.009L4.97551 20.766C4.88176 21.3412 5.11426 21.9045 5.58376 22.2352C6.03526 22.5555 6.61576 22.587 7.09876 22.3207L11.9655 19.6027L16.9013 22.3207C17.3858 22.587 17.9648 22.554 18.4163 22.2352C18.8858 21.9045 19.119 21.3412 19.0245 20.766L18.0803 15.0015L22.0725 10.9245C22.4685 10.5203 22.602 9.93225 22.4213 9.39Z" />
                          </svg>
                        ))}

                        {/* <p
                      onClick={() =>
                        giveReviewOpenClickHandler(
                          items,
                          mySelectedOrderDetails?.order_id
                        )
                      }
                      style={{ cursor: "pointer", marginTop: "10px" }}
                    >
                      Write A Review
                    </p> */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ))}
            <hr className={styles.mainHr} />
          </Row>
          <Row className={styles.order_row}>
            <>
              <div className={styles.details_data2}>
                <div className={styles.detailprice}>
                  <p className={styles.leftPara}>Subtotal</p>
                  <p className={styles.rightPara}>
                    {/* <del>$ {mySelectedOrderDetails?.item_total_original}</del> */}
                    $ {mySelectedOrderDetails?.item_total}
                  </p>
                </div>
                <div className={styles.detailprice}>
                  <p className={styles.leftPara}>Tax:</p>
                  <p className={styles.rightPara}>
                    $ {mySelectedOrderDetails?.tax}
                  </p>
                </div>
                <div className={styles.detailprice}>
                  <p className={styles.leftPara}>Discount:</p>
                  <p className={styles.rightPara}>
                    ${" "}
                    {mySelectedOrderDetails?.coupon_discount?.discounted_price
                      ? mySelectedOrderDetails?.coupon_discount
                          ?.discounted_price
                      : 0}
                  </p>
                </div>
                <div className={styles.detailprice}>
                  <p className={styles.leftPara}>Shipping:</p>
                  <p className={styles.rightPara}>
                    {mySelectedOrderDetails?.delivery_charges === 0
                      ? "Free"
                      : ` $ ${mySelectedOrderDetails?.delivery_charges}`}
                  </p>
                </div>
                <div className={styles.detailprice}>
                  <p className={styles.leftPara2}>Total:</p>
                  <p className={styles.rightPara2}>
                    $ {mySelectedOrderDetails?.grand_total}
                  </p>
                </div>
              </div>
            </>
          </Row>
        </div>
      </div>
      <Feedback
        open={open}
        closeModal={closeModal}
        sendFeedback={sendFeedback}
        handleStarClick={handleStarClick}
        rating={rating}
        changeTextHandler={changeTextHandler}
        ratingData={ratingData}
      />
    </>
  );
};

export default TrackYourOrder;
