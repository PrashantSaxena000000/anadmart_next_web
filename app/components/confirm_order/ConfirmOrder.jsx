"use client";
import React from "react";
import styles from "./confirmorder.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Link from "next/link";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const myPlacedOrderData = useSelector(
    (state) => state?.home?.myPlacedOrderData
  );

  return (
    <div className={styles.confirm_order_main_wrap}>
      <div className={styles.confirm_wrap}>
        <div className={styles.left_div}>
          <Image src={Images.secGirl} alt="" />
        </div>
        <div className={styles.right_div}>
          <Image src={Images.msgimg} alt="" />
          <div className={styles.msg_div}>
            <h3>Your Order is Confirmed</h3>
            <Link href="/shop/?item=1">
              <button>Continue Shopping</button>
            </Link>
            <Link
              href={{
                pathname: "/dashboard/tracksDetail",
                query: { ref: myPlacedOrderData?.order_id },
              }}
            >
              <button className={styles.del_ord_btn}>Order Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
