"use client";
import React, { useEffect, useState } from "react";
import styles from "./cart.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addRemoveCartWishlist,
  addRemoveWishlist,
  deleteMyCartData,
  myCartData,
  onApplyCoupon,
  removeCoupon,
  setCartItems,
  setCartItemsInLocalStorage,
  updateMyCart,
} from "../redux/actions/authActions";
import PageHeading from "../../common/PageHeading/PageHeading";
import Loading from "../Loading/Loading";
import Image from "next/image";
import Images from "../Images/Images";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { SET_CART_ITEMS_IN_LOCALSTORAGE } from "../redux/types";
import Login from "../Popups/Login/Login";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);

  const cardDataList = useSelector((state) => state?.home?.cardDataList);
  let cartItemFromLocalstorage = useSelector(
    (state) => state?.home?.cartItemFromLocalstorage
  );
  const isLoggedIn = useSelector((state) => state?.home?.isLoggedIn);
  let newCartData = useSelector((state) => state?.home?.newCartData);
  let couponDiscounts = useSelector(
    (state) =>
      state?.home?.newCartPaymentData?.cartPaymentSummary?.couponDiscount
  );
  let appliescouponCodes = useSelector(
    (state) => state?.home?.newCartPaymentData?.cartPaymentSummary
  );
  const pageLoading = useSelector((state) => state?.home?.pageLoading);
  const myhopageData = useSelector((state) => state?.home?.myhopageData);
  let CouponValue = useSelector((state) => state.home.couponDataDetails?.data);
  let appliedCoupon = CouponValue?.cartPaymentSummary?.couponDiscount;

  const [couponCode, setCouponCode] = useState();

  const openLoginModal = () => setLoginOpen(true);
  const closeLoginModal = () => setLoginOpen(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(myCartData());
    }
  }, []);

  const wishlistClickHandler = (items) => {
    if (isLoggedIn) {
      dispatch(addRemoveCartWishlist({ product_id: items?.product_id }));
    } else {
      openLoginModal();
    }
  };
  const onCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const appleCouponCode = (e) => {
    e.preventDefault();
    if (!couponCode) {
      toast.error("Enter Your Code");
    } else {
      // dispatch(setBtnLoading(true));
      dispatch(
        onApplyCoupon({
          coupon_code: couponCode,
          // total_price:
          //   deliveryType === "delivery"
          //     ? checkoutCartData?.total
          //       ? checkoutCartData?.total
          //       : liveCartItemsList?.total
          //     : checkoutCartData?.subtotal
          //     ? checkoutCartData?.subtotal
          //     : liveCartItemsList?.subtotal,
        })
      );
    }
  };

  const removeQty = (data) => {
    if (isLoggedIn) {
      newCartData = newCartData?.map((item) =>
        item.id === data.id
          ? {
              ...item,
              cart_item_qty: item.cart_item_qty - 1,
            }
          : item
      );
      const updatedata = {
        cart_id: data.id,
        qty: data.cart_item_qty - 1,
      };
      dispatch(updateMyCart(updatedata));
      dispatch(setCartItems(newCartData));
      if (data.cart_item_qty === 0) {
        dispatch(deleteMyCartData(data.id));
      }
    } else {
      cartItemFromLocalstorage = cartItemFromLocalstorage?.map((item) =>
        item.id === data.id
          ? {
              ...item,
              cart_item_qty: item.cart_item_qty - 1,
            }
          : item
      );

      dispatch(setCartItemsInLocalStorage(cartItemFromLocalstorage));
    }
  };

  const addQty = (data) => {
    if (isLoggedIn) {
      if (data.cart_item_qty < data.availability.quantity) {
        newCartData = newCartData?.map((item) =>
          item.variant_id === data.id
            ? {
                ...item,
                cart_item_qty: item.cart_item_qty + 1,
              }
            : item
        );
        const updatedata = {
          cart_id: data.id,
          qty: data.cart_item_qty + 1,
        };

        dispatch(updateMyCart(updatedata));
        dispatch(setCartItems(newCartData));
      } else {
        toast.error("Quantity can't be exceeds for item");
      }
    } else {
      cartItemFromLocalstorage = cartItemFromLocalstorage?.map((item) =>
        item.id === data.id
          ? {
              ...item,
              cart_item_qty: item.cart_item_qty + 1,
            }
          : item
      );

      dispatch(setCartItemsInLocalStorage(cartItemFromLocalstorage));
    }
  };

  const deleteCartItem = (data) => {
    if (isLoggedIn) {
      dispatch(deleteMyCartData({ cart_item_id: data.id }));
    } else {
      cartItemFromLocalstorage = cartItemFromLocalstorage.filter(
        (ele) => ele.id !== data.id
      );

      dispatch(setCartItemsInLocalStorage(cartItemFromLocalstorage));
    }
  };

  const handleRemoveCoupon = () => {
    if (appliescouponCodes) {
      dispatch(removeCoupon());
    }
  };

  const calculateSubTotal = () => {
    let subTotal = 0;

    if (isLoggedIn) {
      // liveCartItems &&
      //   liveCartItems.forEach((p) => {
      //     let productTotal = p.qty * p.s_price;
      //     subTotal = subTotal + productTotal;
      //   });
    } else {
      cartItemFromLocalstorage?.forEach((product) => {
        let productTotal =
          Number(product.cart_item_qty) * Number(product.price);
        subTotal = subTotal + productTotal;
      });
    }

    return subTotal;
  };
  const calculateSubTotalCrossed = () => {
    let subTotal = 0;

    if (isLoggedIn) {
      newCartData &&
        newCartData.forEach((p) => {
          let productTotal =
            Number(p.cart_item_qty) * Number(p.variant_market_price);
          subTotal = subTotal + productTotal;
        });
    } else {
      cartItemFromLocalstorage?.forEach((product) => {
        let productTotal =
          Number(product.cart_item_qty) * Number(product.market_price);
        subTotal = subTotal + productTotal;
      });
    }

    return subTotal;
  };

  const calculatewithShipping = () => {
    let subTotal = 0;

    if (isLoggedIn) {
      // liveCartItems &&
      //   liveCartItems.forEach((p) => {
      //     let productTotal = p.qty * p.s_price;
      //     subTotal = subTotal + productTotal;
      //   });
    } else {
      if (
        myhopageData?.shipping_availability_type === "distributor" &&
        myhopageData?.free_delivery_amount > calculateSubTotal()
      ) {
        subTotal = parseInt(myhopageData?.shipping_charge);
      } else if (myhopageData?.shipping_availability_type === "warehouse") {
        subTotal = parseInt(myhopageData?.shipping_charge);
      } else {
        subTotal = 0;
      }
    }

    return subTotal;
  };
  const calculateShippingTotal = () => {
    let subTotal = 0;

    if (isLoggedIn) {
      // liveCartItems &&
      //   liveCartItems.forEach((p) => {
      //     let productTotal = p.qty * p.s_price;
      //     subTotal = subTotal + productTotal;
      //   });
    } else {
      if (
        myhopageData?.shipping_availability_type === "distributor" &&
        myhopageData?.free_delivery_amount > calculateSubTotal()
      ) {
        subTotal =
          calculateSubTotal() + parseInt(myhopageData?.shipping_charge);
      } else {
        subTotal = calculateSubTotal() + calculatewithShipping();
      }
    }

    return subTotal;
  };

  const calculateTotal = () => {
    let total = 0;

    if (isLoggedIn) {
      // liveCartItems &&
      //   liveCartItems.forEach((p) => {
      //     let productTotal = p.qty * p.s_price;
      //     subTotal = subTotal + productTotal;
      //   });
    } else {
      total = total + calculateSubTotal();
    }

    return total;
  };

  return (
    <>
      <PageHeading pageName="My Cart" />

      {isLoggedIn ? (
        <>
          {newCartData?.length === 0 ? (
            <div className={styles.allcards}>
              <Image src={Images.cartSvg} alt="" />
              <h4 className={styles.btnEmptyText}>Your Cart is Empty</h4>
              <Button
                className={styles.btnEmpty}
                onClick={() => router.push("/shop/?item=1")}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className={styles["cart_wrapper"]}>
              <div className="container">
                <div className={styles.privacy_main}>
                  <div className={styles.main_wrapper}>
                    <div className={styles.first_div}>
                      <div className={styles.second_div}>
                        <div className={styles.third_div}>
                          <table>
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 font-medium"
                                >
                                  Product Details
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 font-medium"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center font-medium"
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center font-medium"
                                >
                                  subtotal
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center font-medium"
                                >
                                  action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {newCartData?.map((items, key) => (
                                <tr>
                                  <td>
                                    <div
                                      className={styles.prodcutimg_pricewrapper}
                                    >
                                      {items?.whislist == true ? (
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 14 14"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          onClick={() =>
                                            wishlistClickHandler(items)
                                          }
                                        >
                                          <path
                                            d="M9.91667 1.16667C8.77407 1.16667 7.74113 1.63593 7 2.39223C6.25894 1.636 5.22593 1.16667 4.08333 1.16667C1.82819 1.16667 0 2.99486 0 5.25C0 7.50515 2.33333 9.33334 7 12.8333C11.6667 9.33334 14 7.50515 14 5.25C14 2.99486 12.1718 1.16667 9.91667 1.16667Z"
                                            fill="#4DBA4D"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          onClick={() =>
                                            wishlistClickHandler(items)
                                          }
                                        >
                                          <path
                                            d="M16.22 5.59001C15.8368 5.03611 15.3239 4.58434 14.726 4.27409C14.1282 3.96384 13.4635 3.80451 12.79 3.81001C12.2673 3.79998 11.7484 3.90085 11.2675 4.10597C10.7866 4.31109 10.3546 4.61579 10 5.00001C9.64503 4.6163 9.21299 4.31193 8.73217 4.10685C8.25136 3.90178 7.73264 3.80062 7.21 3.81001C6.53647 3.80451 5.87182 3.96384 5.27398 4.27409C4.67613 4.58434 4.16324 5.03611 3.78 5.59001C3.38922 6.21098 3.16708 6.92311 3.13551 7.65613C3.10395 8.38915 3.26404 9.11774 3.6 9.77001C4.10981 10.9147 4.81729 11.9607 5.69 12.86C6.67825 13.8967 7.75944 14.8407 8.92 15.68C9.23408 15.9077 9.61208 16.0303 10 16.0303C10.3879 16.0303 10.7659 15.9077 11.08 15.68C12.2408 14.841 13.3221 13.897 14.31 12.86C15.1827 11.9607 15.8902 10.9147 16.4 9.77001C16.736 9.11774 16.8961 8.38915 16.8645 7.65613C16.8329 6.92311 16.6108 6.21098 16.22 5.59001ZM15.56 9.42001C15.0863 10.463 14.4368 11.4169 13.64 12.24C12.6904 13.2318 11.6528 14.1355 10.54 14.94C10.3842 15.0568 10.1947 15.12 10 15.12C9.80527 15.12 9.61579 15.0568 9.46 14.94C8.34748 14.1352 7.30993 13.2315 6.36 12.24C5.55925 11.4202 4.9093 10.4655 4.44 9.42001C4.16765 8.90358 4.03371 8.32541 4.05124 7.74183C4.06876 7.15825 4.23715 6.58916 4.54 6.09001C4.84088 5.66326 5.24131 5.31634 5.70658 5.07935C6.17185 4.84236 6.68791 4.72245 7.21 4.73001C7.63479 4.71575 8.05724 4.79838 8.44534 4.97164C8.83345 5.1449 9.17701 5.40425 9.45 5.73001C9.60076 5.87426 9.80136 5.95477 10.01 5.95477C10.2187 5.95477 10.4193 5.87426 10.57 5.73001C10.8409 5.40694 11.1812 5.14922 11.5656 4.97607C11.95 4.80291 12.3686 4.7188 12.79 4.73001C13.3121 4.72245 13.8282 4.84236 14.2934 5.07935C14.7587 5.31634 15.1591 5.66326 15.46 6.09001C15.7629 6.58916 15.9312 7.15825 15.9488 7.74183C15.9663 8.32541 15.8324 8.90358 15.56 9.42001Z"
                                            fill="#4DBA4D"
                                          />
                                        </svg>
                                      )}

                                      <div className={styles.prodcutimg}>
                                        <div className={styles.discount_div}>
                                          {items.discount_off !== "0% OFF" && (
                                            <button>
                                              {items.discount_off}
                                            </button>
                                          )}
                                          <Link
                                            href={{
                                              pathname: "/product-details",
                                              query: {
                                                item: items.product_id,
                                              },
                                            }}
                                          >
                                            <img src={items.image} alt="" />
                                          </Link>
                                        </div>
                                      </div>
                                      <div
                                        className={
                                          styles.prodcutimg_pricewrapper_prices
                                        }
                                      >
                                        <h4>{items.product_name}</h4>
                                        <span>
                                          Size : {items.variant_qty}
                                          {items.variant_qty_type}
                                        </span>
                                        {!items?.availability
                                          ?.availibility_type ===
                                        "distributor" ? (
                                          <p style={{ color: "#000" }}>
                                            Delivery in : 1 to 2 days
                                          </p>
                                        ) : (
                                          <p style={{ color: "#000" }}>
                                            Delivery in : within 7 days
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className={styles.Prodduct_prices}>
                                      {items?.availability?.is_available ? (
                                        <>
                                          {items.variant_price !==
                                            items.variant_market_price && (
                                            <del>
                                              ${items.variant_market_price}
                                            </del>
                                          )}{" "}
                                          ${items?.variant_price}
                                        </>
                                      ) : (
                                        <span>not available</span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <div className={styles.button_wrapper}>
                                      <button
                                        onClick={() => removeQty(items)}
                                        disabled={items.cart_item_qty === 1}
                                      >
                                        -
                                      </button>
                                      <span>{items.cart_item_qty}</span>
                                      <button onClick={() => addQty(items)}>
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <div className={styles.Prodduct_prices}>
                                      {items?.availability?.is_available ? (
                                        <>
                                          {" "}
                                          $
                                          {items.cart_item_qty *
                                            items.variant_price}
                                        </>
                                      ) : (
                                        <span> Not Available</span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <svg
                                      width="17"
                                      height="20"
                                      viewBox="0 0 17 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      onClick={() => deleteCartItem(items)}
                                    >
                                      <path
                                        d="M7.20702 8C7.20702 7.50294 6.80407 7.1 6.30702 7.1C5.80996 7.1 5.40702 7.50294 5.40702 8H7.20702ZM5.40702 16C5.40702 16.4971 5.80996 16.9 6.30702 16.9C6.80407 16.9 7.20702 16.4971 7.20702 16H5.40702ZM11.4526 8C11.4526 7.50294 11.0497 7.1 10.5526 7.1C10.0556 7.1 9.65263 7.50294 9.65263 8H11.4526ZM9.65263 16C9.65263 16.4971 10.0556 16.9 10.5526 16.9C11.0497 16.9 11.4526 16.4971 11.4526 16H9.65263ZM3.22048 18.782L3.60997 17.9707L3.22048 18.782ZM2.29278 17.908L3.08442 17.4799H3.08442L2.29278 17.908ZM14.5669 17.908L13.7752 17.4798V17.4799L14.5669 17.908ZM13.6392 18.782L13.2497 17.9707H13.2497L13.6392 18.782ZM1 4.1C0.502944 4.1 0.1 4.50294 0.1 5C0.1 5.49706 0.502944 5.9 1 5.9V4.1ZM15.8596 5.9C16.3567 5.9 16.7596 5.49706 16.7596 5C16.7596 4.50294 16.3567 4.1 15.8596 4.1V5.9ZM3.81491 5C3.81491 5.49706 4.21786 5.9 4.71491 5.9C5.21197 5.9 5.61491 5.49706 5.61491 5H3.81491ZM11.2447 5C11.2447 5.49706 11.6477 5.9 12.1447 5.9C12.6418 5.9 13.0447 5.49706 13.0447 5H11.2447ZM5.40702 8V16H7.20702V8H5.40702ZM9.65263 8V16H11.4526V8H9.65263ZM13.8982 5V15.8H15.6982V5H13.8982ZM11.4018 18.1H5.45789V19.9H11.4018V18.1ZM1.1614 5V15.8H2.9614V5H1.1614ZM5.45789 18.1C4.84945 18.1 4.44413 18.0994 4.13271 18.0754C3.83033 18.0521 3.69385 18.0109 3.60997 17.9707L2.83099 19.5934C3.2012 19.7711 3.58898 19.8389 3.99456 19.8701C4.39111 19.9006 4.87745 19.9 5.45789 19.9V18.1ZM1.1614 15.8C1.1614 16.3443 1.16062 16.81 1.19369 17.1914C1.22782 17.5849 1.30291 17.9696 1.50113 18.3361L3.08442 17.4799C3.05127 17.4186 3.01067 17.3093 2.98696 17.0358C2.96219 16.7502 2.9614 16.3758 2.9614 15.8H1.1614ZM3.60997 17.9707C3.37513 17.8579 3.19428 17.683 3.08442 17.4799L1.50113 18.3361C1.79832 18.8856 2.26696 19.3226 2.83099 19.5934L3.60997 17.9707ZM13.8982 15.8C13.8982 16.3758 13.8975 16.7502 13.8727 17.0358C13.849 17.3093 13.8084 17.4186 13.7752 17.4798L15.3585 18.3361C15.5567 17.9696 15.6318 17.5849 15.666 17.1914C15.699 16.81 15.6982 16.3443 15.6982 15.8H13.8982ZM11.4018 19.9C11.9822 19.9 12.4685 19.9006 12.8651 19.8701C13.2707 19.8389 13.6585 19.7711 14.0287 19.5934L13.2497 17.9707C13.1658 18.0109 13.0293 18.0521 12.7269 18.0754C12.4155 18.0994 12.0102 18.1 11.4018 18.1V19.9ZM13.7752 17.4799C13.6654 17.683 13.4845 17.8579 13.2497 17.9707L14.0287 19.5934C14.5927 19.3226 15.0613 18.8856 15.3585 18.3361L13.7752 17.4799ZM1 5.9H2.0614V4.1H1V5.9ZM2.0614 5.9H14.7982V4.1H2.0614V5.9ZM14.7982 5.9H15.8596V4.1H14.7982V5.9ZM5.61491 4.2C5.61491 3.05108 6.74448 1.9 8.42982 1.9V0.1C6.01179 0.1 3.81491 1.8143 3.81491 4.2H5.61491ZM8.42982 1.9C10.1152 1.9 11.2447 3.05108 11.2447 4.2H13.0447C13.0447 1.8143 10.8479 0.1 8.42982 0.1V1.9ZM3.81491 4.2V5H5.61491V4.2H3.81491ZM11.2447 4.2V5H13.0447V4.2H11.2447Z"
                                        fill="#4DBA4D"
                                      />
                                    </svg>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* <Pagination
                    setPageNo={setPageNo}
                    paginaionMeta={getUsersList}
                  /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.checkout_wrapper}>
                    <form className={styles.coupun_div}>
                      <h4>Discount Codes</h4>
                      <p>Enter your coupon code if you have one</p>
                      <div className={styles.send_message}>
                        <div className={styles.send_message_box}>
                          <input
                            type="text"
                            placeholder="Enter Code"
                            value={couponCode}
                            onChange={onCouponChange}
                          />
                          <div
                            className={styles.send_icon}
                            onClick={appleCouponCode}
                          >
                            <span>Apply coupon</span>
                          </div>
                        </div>
                      </div>

                      {appliescouponCodes?.couponCode && (
                        <div className={styles.removeApplyedTicket}>
                          <span>
                            {" "}
                            {appliescouponCodes?.couponCode}{" "}
                            <i
                              className="fa-solid fa-xmark"
                              onClick={handleRemoveCoupon}
                            ></i>
                          </span>

                          <p>
                            Coupon Discount is:
                            <b> ${appliescouponCodes?.couponDiscount}</b>
                          </p>
                        </div>
                      )}

                      <Link href={"/"}>
                        <div className={styles.conti_btn}>
                          <button>Continue Shopping</button>
                        </div>
                      </Link>
                    </form>
                    <div className={styles.checkout_btn}>
                      <div className={styles.pricings}>
                        <h4>Sub Total</h4>

                        <span>
                          {JSON.stringify(calculateSubTotalCrossed()) !==
                            cardDataList?.cartPaymentSummary?.subTotal && (
                            <span className={styles.subTot}>
                              <del>${calculateSubTotalCrossed()}</del>
                            </span>
                          )}{" "}
                          ${cardDataList?.cartPaymentSummary?.subTotal}
                        </span>
                      </div>

                      <div className={styles.pricings}>
                        <h4>Tax</h4>
                        <span>
                          $
                          {cardDataList?.cartPaymentSummary?.tax_1
                            ? cardDataList?.cartPaymentSummary?.tax_1
                            : 0}
                        </span>
                      </div>

                      {couponDiscounts ? (
                        <div className={styles.pricings}>
                          <h4>Discount</h4>
                          <span>${couponDiscounts}</span>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={styles.pricings}>
                        <h4>Shipping</h4>
                        <span>
                          {cardDataList?.cartPaymentSummary?.deliveryCharge == 0
                            ? "Free"
                            : ` $ ${cardDataList?.cartPaymentSummary?.deliveryCharge}`}
                        </span>
                      </div>

                      <div className={styles.pricings}>
                        <h4>Grand Total</h4>
                        <span>${cardDataList?.cartPaymentSummary?.total}</span>
                      </div>
                      <hr />
                      <Link href="/checkout" className="text-decoration-none">
                        <div className={styles.check_btn}>
                          <button>Proceed to checkout</button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {cartItemFromLocalstorage?.length === 0 ? (
            <div className={styles.allcards}>
              <Image src={Images.cartSvg} alt="" />
              <h4 className={styles.btnEmptyText}>Your Cart is Empty</h4>
              <Button
                className={styles.btnEmpty}
                onClick={() => router.push("/shop/?item=1")}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className={styles["cart_wrapper"]}>
              <div className="container">
                <div className={styles.privacy_main}>
                  <div className={styles.main_wrapper}>
                    <div className={styles.first_div}>
                      <div className={styles.second_div}>
                        <div className={styles.third_div}>
                          <table>
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 font-medium"
                                >
                                  Product Details
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 font-medium"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center font-medium"
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center font-medium"
                                >
                                  subtotal
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center font-medium"
                                >
                                  action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartItemFromLocalstorage?.map((items, key) => (
                                <tr>
                                  <td>
                                    <div
                                      className={styles.prodcutimg_pricewrapper}
                                    >
                                      {items?.whislist == true ? (
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 14 14"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          onClick={() =>
                                            wishlistClickHandler(items)
                                          }
                                        >
                                          <path
                                            d="M9.91667 1.16667C8.77407 1.16667 7.74113 1.63593 7 2.39223C6.25894 1.636 5.22593 1.16667 4.08333 1.16667C1.82819 1.16667 0 2.99486 0 5.25C0 7.50515 2.33333 9.33334 7 12.8333C11.6667 9.33334 14 7.50515 14 5.25C14 2.99486 12.1718 1.16667 9.91667 1.16667Z"
                                            fill="#4DBA4D"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          onClick={() =>
                                            wishlistClickHandler(items)
                                          }
                                        >
                                          <path
                                            d="M16.22 5.59001C15.8368 5.03611 15.3239 4.58434 14.726 4.27409C14.1282 3.96384 13.4635 3.80451 12.79 3.81001C12.2673 3.79998 11.7484 3.90085 11.2675 4.10597C10.7866 4.31109 10.3546 4.61579 10 5.00001C9.64503 4.6163 9.21299 4.31193 8.73217 4.10685C8.25136 3.90178 7.73264 3.80062 7.21 3.81001C6.53647 3.80451 5.87182 3.96384 5.27398 4.27409C4.67613 4.58434 4.16324 5.03611 3.78 5.59001C3.38922 6.21098 3.16708 6.92311 3.13551 7.65613C3.10395 8.38915 3.26404 9.11774 3.6 9.77001C4.10981 10.9147 4.81729 11.9607 5.69 12.86C6.67825 13.8967 7.75944 14.8407 8.92 15.68C9.23408 15.9077 9.61208 16.0303 10 16.0303C10.3879 16.0303 10.7659 15.9077 11.08 15.68C12.2408 14.841 13.3221 13.897 14.31 12.86C15.1827 11.9607 15.8902 10.9147 16.4 9.77001C16.736 9.11774 16.8961 8.38915 16.8645 7.65613C16.8329 6.92311 16.6108 6.21098 16.22 5.59001ZM15.56 9.42001C15.0863 10.463 14.4368 11.4169 13.64 12.24C12.6904 13.2318 11.6528 14.1355 10.54 14.94C10.3842 15.0568 10.1947 15.12 10 15.12C9.80527 15.12 9.61579 15.0568 9.46 14.94C8.34748 14.1352 7.30993 13.2315 6.36 12.24C5.55925 11.4202 4.9093 10.4655 4.44 9.42001C4.16765 8.90358 4.03371 8.32541 4.05124 7.74183C4.06876 7.15825 4.23715 6.58916 4.54 6.09001C4.84088 5.66326 5.24131 5.31634 5.70658 5.07935C6.17185 4.84236 6.68791 4.72245 7.21 4.73001C7.63479 4.71575 8.05724 4.79838 8.44534 4.97164C8.83345 5.1449 9.17701 5.40425 9.45 5.73001C9.60076 5.87426 9.80136 5.95477 10.01 5.95477C10.2187 5.95477 10.4193 5.87426 10.57 5.73001C10.8409 5.40694 11.1812 5.14922 11.5656 4.97607C11.95 4.80291 12.3686 4.7188 12.79 4.73001C13.3121 4.72245 13.8282 4.84236 14.2934 5.07935C14.7587 5.31634 15.1591 5.66326 15.46 6.09001C15.7629 6.58916 15.9312 7.15825 15.9488 7.74183C15.9663 8.32541 15.8324 8.90358 15.56 9.42001Z"
                                            fill="#4DBA4D"
                                          />
                                        </svg>
                                      )}

                                      <div className={styles.prodcutimg}>
                                        <div className={styles.discount_div}>
                                          {items.discount_off !== "0% OFF" && (
                                            <button>
                                              {items.discount_off}
                                            </button>
                                          )}
                                          <img
                                            src={
                                              items?.product_image
                                                ? items?.product_image
                                                : items?.thumbnail_image
                                            }
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className={
                                          styles.prodcutimg_pricewrapper_prices
                                        }
                                      >
                                        <h4>{items.product_name}</h4>
                                        <span>
                                          Size : {items.variant_qty}
                                          {items.variant_qty_type}
                                        </span>
                                        {items?.availability
                                          ?.availibility_type ===
                                        "distributor" ? (
                                          <p style={{ color: "#000" }}>
                                            Delivery in : 1 to 2 days
                                          </p>
                                        ) : (
                                          <p style={{ color: "#000" }}>
                                            Delivery in : within 7 days
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className={styles.Prodduct_prices}>
                                      {items?.availability?.is_available ? (
                                        <>
                                          {items.price !==
                                            items.market_price && (
                                            <del>${items.market_price}</del>
                                          )}{" "}
                                          <span> ${items.price}</span>
                                        </>
                                      ) : (
                                        <span className={styles.spanAvailabel}>
                                          Not Available
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <div className={styles.button_wrapper}>
                                      <button
                                        onClick={() => removeQty(items)}
                                        disabled={items.cart_item_qty === 1}
                                      >
                                        -
                                      </button>
                                      <span>{items.cart_item_qty}</span>
                                      <button onClick={() => addQty(items)}>
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <div className={styles.Prodduct_prices}>
                                      {/* {items?.availability?.is_available ? (
                                        <>
                                          {" "}
                                          $
                                          {items.cart_item_qty *
                                            items.variant_price}
                                        </>
                                      ) : (
                                        <span>not available</span>
                                      )} */}

                                      <>
                                        <span>
                                          {" "}
                                          ${items.cart_item_qty * items.price}
                                        </span>
                                      </>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <svg
                                      width="17"
                                      height="20"
                                      viewBox="0 0 17 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      onClick={() => deleteCartItem(items)}
                                    >
                                      <path
                                        d="M7.20702 8C7.20702 7.50294 6.80407 7.1 6.30702 7.1C5.80996 7.1 5.40702 7.50294 5.40702 8H7.20702ZM5.40702 16C5.40702 16.4971 5.80996 16.9 6.30702 16.9C6.80407 16.9 7.20702 16.4971 7.20702 16H5.40702ZM11.4526 8C11.4526 7.50294 11.0497 7.1 10.5526 7.1C10.0556 7.1 9.65263 7.50294 9.65263 8H11.4526ZM9.65263 16C9.65263 16.4971 10.0556 16.9 10.5526 16.9C11.0497 16.9 11.4526 16.4971 11.4526 16H9.65263ZM3.22048 18.782L3.60997 17.9707L3.22048 18.782ZM2.29278 17.908L3.08442 17.4799H3.08442L2.29278 17.908ZM14.5669 17.908L13.7752 17.4798V17.4799L14.5669 17.908ZM13.6392 18.782L13.2497 17.9707H13.2497L13.6392 18.782ZM1 4.1C0.502944 4.1 0.1 4.50294 0.1 5C0.1 5.49706 0.502944 5.9 1 5.9V4.1ZM15.8596 5.9C16.3567 5.9 16.7596 5.49706 16.7596 5C16.7596 4.50294 16.3567 4.1 15.8596 4.1V5.9ZM3.81491 5C3.81491 5.49706 4.21786 5.9 4.71491 5.9C5.21197 5.9 5.61491 5.49706 5.61491 5H3.81491ZM11.2447 5C11.2447 5.49706 11.6477 5.9 12.1447 5.9C12.6418 5.9 13.0447 5.49706 13.0447 5H11.2447ZM5.40702 8V16H7.20702V8H5.40702ZM9.65263 8V16H11.4526V8H9.65263ZM13.8982 5V15.8H15.6982V5H13.8982ZM11.4018 18.1H5.45789V19.9H11.4018V18.1ZM1.1614 5V15.8H2.9614V5H1.1614ZM5.45789 18.1C4.84945 18.1 4.44413 18.0994 4.13271 18.0754C3.83033 18.0521 3.69385 18.0109 3.60997 17.9707L2.83099 19.5934C3.2012 19.7711 3.58898 19.8389 3.99456 19.8701C4.39111 19.9006 4.87745 19.9 5.45789 19.9V18.1ZM1.1614 15.8C1.1614 16.3443 1.16062 16.81 1.19369 17.1914C1.22782 17.5849 1.30291 17.9696 1.50113 18.3361L3.08442 17.4799C3.05127 17.4186 3.01067 17.3093 2.98696 17.0358C2.96219 16.7502 2.9614 16.3758 2.9614 15.8H1.1614ZM3.60997 17.9707C3.37513 17.8579 3.19428 17.683 3.08442 17.4799L1.50113 18.3361C1.79832 18.8856 2.26696 19.3226 2.83099 19.5934L3.60997 17.9707ZM13.8982 15.8C13.8982 16.3758 13.8975 16.7502 13.8727 17.0358C13.849 17.3093 13.8084 17.4186 13.7752 17.4798L15.3585 18.3361C15.5567 17.9696 15.6318 17.5849 15.666 17.1914C15.699 16.81 15.6982 16.3443 15.6982 15.8H13.8982ZM11.4018 19.9C11.9822 19.9 12.4685 19.9006 12.8651 19.8701C13.2707 19.8389 13.6585 19.7711 14.0287 19.5934L13.2497 17.9707C13.1658 18.0109 13.0293 18.0521 12.7269 18.0754C12.4155 18.0994 12.0102 18.1 11.4018 18.1V19.9ZM13.7752 17.4799C13.6654 17.683 13.4845 17.8579 13.2497 17.9707L14.0287 19.5934C14.5927 19.3226 15.0613 18.8856 15.3585 18.3361L13.7752 17.4799ZM1 5.9H2.0614V4.1H1V5.9ZM2.0614 5.9H14.7982V4.1H2.0614V5.9ZM14.7982 5.9H15.8596V4.1H14.7982V5.9ZM5.61491 4.2C5.61491 3.05108 6.74448 1.9 8.42982 1.9V0.1C6.01179 0.1 3.81491 1.8143 3.81491 4.2H5.61491ZM8.42982 1.9C10.1152 1.9 11.2447 3.05108 11.2447 4.2H13.0447C13.0447 1.8143 10.8479 0.1 8.42982 0.1V1.9ZM3.81491 4.2V5H5.61491V4.2H3.81491ZM11.2447 4.2V5H13.0447V4.2H11.2447Z"
                                        fill="#4DBA4D"
                                      />
                                    </svg>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* <Pagination
                    setPageNo={setPageNo}
                    paginaionMeta={getUsersList}
                  /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.checkout_wrapper}>
                    <form className={styles.coupun_div}>
                      <h4>Discount Codes</h4>
                      <p>Enter your coupon code if you have one</p>
                      <div className={styles.send_message}>
                        <div className={styles.send_message_box}>
                          <input
                            type="text"
                            placeholder="Enter Code"
                            value={couponCode}
                            onChange={onCouponChange}
                          />
                          <div
                            className={styles.send_icon}
                            onClick={appleCouponCode}
                          >
                            <span>Apply coupon</span>
                          </div>
                        </div>
                      </div>

                      {appliescouponCodes?.couponCode && (
                        <div className={styles.removeApplyedTicket}>
                          <span>
                            {" "}
                            {appliescouponCodes?.couponCode}{" "}
                            <i
                              className="fa-solid fa-xmark"
                              onClick={handleRemoveCoupon}
                            ></i>
                          </span>

                          <p>
                            Coupon Discount is:
                            <b> ${appliescouponCodes?.couponDiscount}</b>
                          </p>
                        </div>
                      )}

                      <Link href={"/"}>
                        <div className={styles.conti_btn}>
                          <button>Continue Shopping</button>
                        </div>
                      </Link>
                    </form>
                    <div className={styles.checkout_btn}>
                      <div className={styles.pricings}>
                        <h4>Sub Total</h4>

                        <span>
                          {JSON.stringify(calculateSubTotalCrossed()) !==
                            JSON.stringify(calculateSubTotal()) && (
                            <span className={styles.subTot}>
                              <del>${calculateSubTotalCrossed()}</del>
                            </span>
                          )}{" "}
                          $
                          {isLoggedIn
                            ? cardDataList?.cartPaymentSummary?.subTotal
                            : calculateSubTotal()}
                        </span>
                      </div>
                      <div className={styles.pricings}>
                        <h4>Shipping</h4>
                        <span>
                          $
                          {isLoggedIn
                            ? cardDataList?.cartPaymentSummary?.deliveryCharge
                            : calculatewithShipping()}
                        </span>
                      </div>
                      {couponDiscounts ? (
                        <div className={styles.pricings}>
                          <h4>Discount</h4>
                          <span>${couponDiscounts}</span>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className={styles.pricings}>
                        <h4>Tax</h4>
                        <span>
                          $
                          {cardDataList?.cartPaymentSummary?.tax_1
                            ? cardDataList?.cartPaymentSummary?.tax_1
                            : 0}
                        </span>
                      </div>
                      <div className={styles.pricings}>
                        <h4>Grand Total</h4>
                        <span>
                          $
                          {isLoggedIn
                            ? cardDataList?.cartPaymentSummary?.total
                            : calculateShippingTotal()}
                        </span>
                      </div>
                      <hr />
                      {isLoggedIn ? (
                        <Link href="/checkout" className="text-decoration-none">
                          <div className={styles.check_btn}>
                            <button>Proceed to checkout</button>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className={styles.check_btn}
                          onClick={openLoginModal}
                        >
                          <button>Proceed to checkout</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Login
        open={loginOpen}
        onCloseModal={closeLoginModal}
        openLoginModal={openLoginModal}
        cartItemFromLocalstorage={cartItemFromLocalstorage}
      />
      {pageLoading && <Loading />}
    </>
  );
};

export default Cart;
