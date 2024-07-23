import React from "react";
import styles from "./activeorder.module.scss";
import Link from "next/link";

const ActiveOrder = ({
  handleChangeTab,
  orderStatus,
  items,
  showDetailsClickHandler,
  cancelData,
  reOrder,
  openCancelModalClickHandler,
  reOrderClickHandler,
  trackingTab,
}) => {
  return (
    <div className={styles["order_row"]}>
      <div className={styles.order_detail_div1}>
        <h4>Order no: #000{items?.order_id}</h4>
      </div>
      <div className={styles.order_detail_div2}>
        <p>
          Order Date <span> : {items?.placed_at}</span>{" "}
        </p>
        <p>
          Order Status <span> : {orderStatus}</span>{" "}
        </p>
      </div>
      <div className={styles.order_detail_div2}>
        <>
          {trackingTab === "active" && (
            <p>
              Estimated Delivery Date
              <span>: {items.estimate_delivery}</span>
            </p>
          )}
        </>

        <p>
          Payment Method <span> : {items?.order_type} </span>
        </p>
      </div>
      <hr className={styles.mainHr} />
      <div className={styles.details_data}>
        {items?.order_items?.map((data, key) => (
          <div className={styles.img_of_active_div}>
            <div className={styles.img_divs_main}>
              <img src={data?.product_image} alt="" />
            </div>
            <div className={styles.product_info}>
              <h6 className={styles.product_title}>{data?.product_name}</h6>
              {/* <p>
              MG : <span>100</span>
            </p> */}
              <p>
                Qty : <span>{data?.qty}</span>
              </p>
              <p>
                Total: <span>${data?.total_price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.details_btn}>
        <Link
          href={{
            pathname: "/dashboard/tracksDetail",
            query: { ref: items?.order_id },
          }}
          // onClick={() => showDetailsClickHandler(items)}
        >
          <button className={styles.view_btn}>View Detail</button>
        </Link>
        {cancelData && (
          <button
            className={styles.cancel_btn}
            onClick={() => openCancelModalClickHandler(items)}
          >
            Cancel
          </button>
        )}
        {reOrder && (
          <button
            className={styles.cancel_btn}
            onClick={() => reOrderClickHandler(items)}
          >
            Reorder
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveOrder;
