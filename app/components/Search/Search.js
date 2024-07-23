"use client";
import React, { useEffect, useState } from "react";
import styles from "./search.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import {
  addRemoveWishlist,
  addToCart,
  deleteMyCartData,
  onSearch,
  setCartItems,
  setCartItemsInLocalStorage,
  updateMyCart,
} from "../redux/actions/authActions";
import Login from "../Popups/Login/Login";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";

const Search = () => {
  const [url, setUrl] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [moreVariant, setMoreVariant] = useState();
  const [open, setOpen] = useState(false);

  var urlParams = new URLSearchParams(url);

  var searchValues = urlParams.get("search");

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      setUrl(window.location.search);
    }
  }, [urlParams, url, searchValues]);

  const openLoginModal = () => setLoginOpen(true);

  const closeLoginModal = () => setLoginOpen(false);

  const searchList = useSelector((state) => state?.home?.searchList);
  let newCartData = useSelector((state) => state?.home?.newCartData);
  const isLoggedIn = useSelector((state) => state?.home?.isLoggedIn);
  const pageLoading = useSelector((state) => state?.home?.pageLoading);
  const addRemoveWishlistData = useSelector(
    (state) => state?.home?.addRemoveWishlistData
  );

  let cartItemFromLocalstorage = useSelector(
    (state) => state?.home?.cartItemFromLocalstorage
  );
  useEffect(() => {
    const zip_code = localStorage.getItem("currentZipCode");

    const searchParams = new URLSearchParams();
    searchParams.append("zipcode", zip_code);
    if (searchValues) {
      dispatch(onSearch(searchValues, searchParams));
    }
  }, [searchValues, addRemoveWishlistData]);

  const wishlistClickHandler = (item) => {
    if (isLoggedIn) {
      dispatch(addRemoveWishlist({ product_id: item.id }));
    } else {
      openLoginModal();
    }
  };

  const closeModal = () => setOpen(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const selectSizeHandler = (item) => {
    setMoreVariant(item);
    if (!isMobile) {
      setOpen(true);
    } else {
      toggleDrawer();
    }
  };
  const handleAddCart = (data) => {
    if (isLoggedIn) {
      setAdd({ ...add, [data.id]: open[data.id] ? false : true });
      const firstVariant = data?.variants?.[0].id ?? null;

      if (data.variants.length === 1) {
        const newdata = {
          variant_id: firstVariant,
          product_id: data.id,
          qty: 1,
          warehouse_distributor_variant_id: data?.variants[0]?.availability?.id,
          // thumbnail_image: data?.thumbnail_image,
        };
        dispatch(addToCart(newdata));
      } else {
        setMoreVariant(data);
        if (!isMobile) {
          setOpen(true);
        } else {
          toggleDrawer();
        }
      }
    } else if (data.variants.length === 1) {
      if (
        cartItemFromLocalstorage.find((ele) => {
          return ele.id == data?.variants?.[0]?.id;
        }) === undefined
      ) {
        const firstVariant = data?.variants?.[0] ?? null;

        dispatch(
          setCartItemsInLocalStorage([
            ...cartItemFromLocalstorage,
            {
              ...firstVariant,
              variant_id: firstVariant?.id,
              cart_item_qty: 1,
              product_name: data.name,
              product_id: data.id,
              product_image: data.image,
              warehouse_distributor_variant_id:
                data?.variants[0]?.availability?.id,
            },
          ])
        );
      }
    } else {
      setMoreVariant(data);
      if (!isMobile) {
        setOpen(true);
      } else {
        toggleDrawer();
      }
    }
  };

  const removeQty2 = (data) => {
    if (isLoggedIn) {
      newCartData = newCartData?.map((item) => {
        if (item.variant_id === data.id) {
          return {
            ...item,
            cart_item_qty: item.cart_item_qty - 1,
          };
        } else {
          return item;
        }
      });

      const updatedata = {
        cart_id: data.id,
        qty: data.cart_item_qty - 1,
      };

      dispatch(updateMyCart(updatedata));
      dispatch(setCartItems(newCartData));
    } else {
      cartItemFromLocalstorage = cartItemFromLocalstorage?.map((item) => {
        if (item.id === data.id) {
          if (item.cart_item_qty === "1") {
            return item;
          } else {
            return {
              ...item,
              cart_item_qty: item.cart_item_qty - 1,
            };
          }
        } else {
          return item;
        }
      });

      dispatch(setCartItemsInLocalStorage(cartItemFromLocalstorage));
    }
  };
  const addQty2 = (data) => {
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
      if (data.cart_item_qty < data.availability.quantity) {
        cartItemFromLocalstorage = cartItemFromLocalstorage?.map((item) =>
          item.id === data.id
            ? {
                ...item,
                cart_item_qty: item.cart_item_qty + 1,
              }
            : item
        );

        dispatch(setCartItemsInLocalStorage(cartItemFromLocalstorage));
      } else {
        toast.error("Quantity can't be exceeds for item");
      }
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
  const optionsHandler = (data, productName, thumbnail, product_img) => {
    if (isLoggedIn) {
      const newdata = {
        variant_id: data.id,
        product_id: data.vendor_product_id,
        qty: 1,
        warehouse_distributor_variant_id: data?.availability?.id,
      };
      dispatch(addToCart(newdata));
    } else {
      if (
        cartItemFromLocalstorage.find((ele) => {
          return ele.id == data.id;
        }) === undefined
      ) {
        dispatch(
          setCartItemsInLocalStorage([
            ...cartItemFromLocalstorage,
            {
              ...data,
              variant_id: data.id,
              cart_item_qty: 1,
              product_name: productName,
              product_id: data.vendor_product_id,
              product_image: product_img,
              thumbnail_image: thumbnail,
              warehouse_distributor_variant_id: data.availability.id,
            },
          ])
        );
      }
    }
  };

  const modifiedData = searchList?.map((item) => {
    const urlParts = item?.image.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_150x150.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");

    return {
      ...item,
      image: resizedUrl,
    };
  });

  return (
    <>
      {/* <>
        <div className={styles.discount_tag}>
          {items?.variants[0]?.discount_off !== "0% OFF" && (
            <button>{items?.variants[0]?.discount_off}</button>
          )}
        </div>
      </> */}
      <div className={styles.searchWrapper}>
        <div className="container">
          <h4>Showing results For "{searchValues}"</h4>
          <div className={styles.CardScn}>
            {searchList?.length === 0 ? (
              <>
                <div className={styles.noDataFound}>
                  <h3>No Products Found</h3>
                  <p>
                    You will find a lot of interesting products on our "shop"
                    page.
                  </p>

                  <button
                    className={styles.buttonNodata}
                    onClick={() => router.push("/shop/?item=1")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            ) : (
              modifiedData?.map((items, key) => (
                <>
                  <div className={styles.div_of_card} key={key}>
                    <div className={styles.card_main_div}>
                      <Link
                        href={{
                          pathname: "/product-details",
                          query: { item: items.id, slug: "home" },
                        }}
                      >
                        <div className={styles.carddiv}>
                          <img src={items?.image} alt="" />
                        </div>
                      </Link>
                      <div className={styles.discount_search}>
                        {items?.variants[0]?.discount_off !== "0% OFF" && (
                          <button>{items?.variants[0]?.discount_off}</button>
                        )}
                      </div>
                      <div className={styles.wishlistIcon}>
                        {items?.whislist == true ? (
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => wishlistClickHandler(items)}
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
                            onClick={() => wishlistClickHandler(items)}
                          >
                            <path
                              d="M16.22 5.59001C15.8368 5.03611 15.3239 4.58434 14.726 4.27409C14.1282 3.96384 13.4635 3.80451 12.79 3.81001C12.2673 3.79998 11.7484 3.90085 11.2675 4.10597C10.7866 4.31109 10.3546 4.61579 10 5.00001C9.64503 4.6163 9.21299 4.31193 8.73217 4.10685C8.25136 3.90178 7.73264 3.80062 7.21 3.81001C6.53647 3.80451 5.87182 3.96384 5.27398 4.27409C4.67613 4.58434 4.16324 5.03611 3.78 5.59001C3.38922 6.21098 3.16708 6.92311 3.13551 7.65613C3.10395 8.38915 3.26404 9.11774 3.6 9.77001C4.10981 10.9147 4.81729 11.9607 5.69 12.86C6.67825 13.8967 7.75944 14.8407 8.92 15.68C9.23408 15.9077 9.61208 16.0303 10 16.0303C10.3879 16.0303 10.7659 15.9077 11.08 15.68C12.2408 14.841 13.3221 13.897 14.31 12.86C15.1827 11.9607 15.8902 10.9147 16.4 9.77001C16.736 9.11774 16.8961 8.38915 16.8645 7.65613C16.8329 6.92311 16.6108 6.21098 16.22 5.59001ZM15.56 9.42001C15.0863 10.463 14.4368 11.4169 13.64 12.24C12.6904 13.2318 11.6528 14.1355 10.54 14.94C10.3842 15.0568 10.1947 15.12 10 15.12C9.80527 15.12 9.61579 15.0568 9.46 14.94C8.34748 14.1352 7.30993 13.2315 6.36 12.24C5.55925 11.4202 4.9093 10.4655 4.44 9.42001C4.16765 8.90358 4.03371 8.32541 4.05124 7.74183C4.06876 7.15825 4.23715 6.58916 4.54 6.09001C4.84088 5.66326 5.24131 5.31634 5.70658 5.07935C6.17185 4.84236 6.68791 4.72245 7.21 4.73001C7.63479 4.71575 8.05724 4.79838 8.44534 4.97164C8.83345 5.1449 9.17701 5.40425 9.45 5.73001C9.60076 5.87426 9.80136 5.95477 10.01 5.95477C10.2187 5.95477 10.4193 5.87426 10.57 5.73001C10.8409 5.40694 11.1812 5.14922 11.5656 4.97607C11.95 4.80291 12.3686 4.7188 12.79 4.73001C13.3121 4.72245 13.8282 4.84236 14.2934 5.07935C14.7587 5.31634 15.1591 5.66326 15.46 6.09001C15.7629 6.58916 15.9312 7.15825 15.9488 7.74183C15.9663 8.32541 15.8324 8.90358 15.56 9.42001Z"
                              fill="#4DBA4D"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {isLoggedIn ? (
                      newCartData?.find(
                        (rtrt) => rtrt?.product_id === items?.id
                      ) ? (
                        <>
                          <div className={styles.addbtndiv}>
                            <button
                              onClick={() => selectSizeHandler(items)}
                              style={{
                                background: "#65afdb",
                                outline: "none",
                              }}
                            >
                              Added
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {items?.variants[0]?.availability?.is_available ===
                          false ? (
                            <p className={styles?.notAvil}>Not Available</p>
                          ) : (
                            <div className={styles.addbtndiv}>
                              <button onClick={() => handleAddCart(items)}>
                                Add
                              </button>
                            </div>
                          )}
                        </>
                      )
                    ) : cartItemFromLocalstorage &&
                      cartItemFromLocalstorage?.find(
                        (rtrt) => rtrt?.product_id === items?.id
                      ) ? (
                      <>
                        <div className={styles.addbtndiv}>
                          <button
                            onClick={() => selectSizeHandler(items)}
                            style={{
                              background: "#65afdb",
                              outline: "none",
                            }}
                          >
                            Added
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {items?.variants[0]?.availability?.is_available ===
                        false ? (
                          <p className={styles?.notAvil}>Not Available</p>
                        ) : (
                          <div className={styles.addbtndiv}>
                            <button onClick={() => handleAddCart(items)}>
                              Add
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    <h6>
                      {items?.name}{" "}
                      <span>
                        {items?.variants?.length === 1
                          ? `(${
                              items?.variants[0]?.variant_qty +
                              items?.variants[0]?.variant_qty_type
                            })`
                          : null}
                      </span>
                    </h6>
                    <div style={{ display: "flex" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            cursor: "pointer",
                            // stroke: star <= items?.avg_rating ? "" : "gray",
                            fill:
                              star <= items?.avg_rating ? "#FFAB07" : "#D9D9D9",
                          }}
                        >
                          <path d="M22.4213 9.39C22.245 8.862 21.7995 8.48325 21.2595 8.40075L15.7778 7.5795L13.3103 2.3415C13.065 1.8225 12.5633 1.5 12 1.5C11.4368 1.5 10.935 1.8225 10.6898 2.3415L8.25826 7.56075L2.74051 8.40075C2.20051 8.48325 1.75576 8.862 1.57876 9.39C1.39801 9.93225 1.53151 10.5203 1.92751 10.9245L5.91826 15.009L4.97551 20.766C4.88176 21.3412 5.11426 21.9045 5.58376 22.2352C6.03526 22.5555 6.61576 22.587 7.09876 22.3207L11.9655 19.6027L16.9013 22.3207C17.3858 22.587 17.9648 22.554 18.4163 22.2352C18.8858 21.9045 19.119 21.3412 19.0245 20.766L18.0803 15.0015L22.0725 10.9245C22.4685 10.5203 22.602 9.93225 22.4213 9.39Z" />
                        </svg>
                      ))}
                    </div>
                    <div className={styles.priceAddQunty}>
                      {/* <div className={styles.onlyQuantity}></div> */}
                      <div className={styles.priceAndAdd}>
                        {items?.variants[0]?.availability?.is_available ===
                        false ? (
                          /* <p className={styles?.notAvil}>
                              {items?.is_available}
                            </p> */
                          ""
                        ) : (
                          <p>
                            {items?.variants[0]?.market_price !==
                              items?.variants[0]?.price && (
                              <del>${items?.variants[0]?.market_price}</del>
                            )}{" "}
                            ${items?.variants[0]?.price}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
      {!isMobile ? (
        <div className={styles.modalOpenDiv}>
          <Modal
            open={open}
            onClose={closeModal}
            className={styles.addQuanity}
            id="addQuanity"
            center
          >
            <div className={styles.mainone}>
              <h4>{moreVariant?.name}</h4>
              {moreVariant?.variants?.map((items, key) => (
                <>
                  <div className={styles.products}>
                    <div className={styles.discount_div}>
                      {items.discount_off !== "0% OFF" && (
                        <button>{items.discount_off}</button>
                      )}
                      <img
                        alt=""
                        src={
                          moreVariant?.image
                            ? moreVariant?.image
                            : moreVariant?.thumbnail_image
                        }
                      />
                    </div>
                    <h6>
                      {items.variant_qty}
                      {items.variant_qty_type}
                    </h6>
                    <p>
                      {items.price !== items.market_price && (
                        <del>${items.market_price}</del>
                      )}{" "}
                      ${items.price}
                    </p>
                    {isLoggedIn ? (
                      newCartData?.find(
                        (rtrt) => rtrt.variant_id === items.id
                      ) ? (
                        newCartData
                          ?.filter((ytyt) => ytyt.variant_id === items.id)
                          .map((item) => (
                            <>
                              <div className={styles.product_qty}>
                                <button
                                  onClick={() => removeQty2(item)}
                                  disabled={item.cart_item_qty === 1}
                                >
                                  -
                                </button>
                                <span>{item.cart_item_qty}</span>

                                <button onClick={() => addQty2(item)}>+</button>
                              </div>

                              <svg
                                width="17"
                                height="20"
                                viewBox="0 0 17 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => deleteCartItem(item)}
                              >
                                <path
                                  d="M7.20702 8C7.20702 7.50294 6.80407 7.1 6.30702 7.1C5.80996 7.1 5.40702 7.50294 5.40702 8H7.20702ZM5.40702 16C5.40702 16.4971 5.80996 16.9 6.30702 16.9C6.80407 16.9 7.20702 16.4971 7.20702 16H5.40702ZM11.4526 8C11.4526 7.50294 11.0497 7.1 10.5526 7.1C10.0556 7.1 9.65263 7.50294 9.65263 8H11.4526ZM9.65263 16C9.65263 16.4971 10.0556 16.9 10.5526 16.9C11.0497 16.9 11.4526 16.4971 11.4526 16H9.65263ZM3.22048 18.782L3.60997 17.9707L3.22048 18.782ZM2.29278 17.908L3.08442 17.4799H3.08442L2.29278 17.908ZM14.5669 17.908L13.7752 17.4798V17.4799L14.5669 17.908ZM13.6392 18.782L13.2497 17.9707H13.2497L13.6392 18.782ZM1 4.1C0.502944 4.1 0.1 4.50294 0.1 5C0.1 5.49706 0.502944 5.9 1 5.9V4.1ZM15.8596 5.9C16.3567 5.9 16.7596 5.49706 16.7596 5C16.7596 4.50294 16.3567 4.1 15.8596 4.1V5.9ZM3.81491 5C3.81491 5.49706 4.21786 5.9 4.71491 5.9C5.21197 5.9 5.61491 5.49706 5.61491 5H3.81491ZM11.2447 5C11.2447 5.49706 11.6477 5.9 12.1447 5.9C12.6418 5.9 13.0447 5.49706 13.0447 5H11.2447ZM5.40702 8V16H7.20702V8H5.40702ZM9.65263 8V16H11.4526V8H9.65263ZM13.8982 5V15.8H15.6982V5H13.8982ZM11.4018 18.1H5.45789V19.9H11.4018V18.1ZM1.1614 5V15.8H2.9614V5H1.1614ZM5.45789 18.1C4.84945 18.1 4.44413 18.0994 4.13271 18.0754C3.83033 18.0521 3.69385 18.0109 3.60997 17.9707L2.83099 19.5934C3.2012 19.7711 3.58898 19.8389 3.99456 19.8701C4.39111 19.9006 4.87745 19.9 5.45789 19.9V18.1ZM1.1614 15.8C1.1614 16.3443 1.16062 16.81 1.19369 17.1914C1.22782 17.5849 1.30291 17.9696 1.50113 18.3361L3.08442 17.4799C3.05127 17.4186 3.01067 17.3093 2.98696 17.0358C2.96219 16.7502 2.9614 16.3758 2.9614 15.8H1.1614ZM3.60997 17.9707C3.37513 17.8579 3.19428 17.683 3.08442 17.4799L1.50113 18.3361C1.79832 18.8856 2.26696 19.3226 2.83099 19.5934L3.60997 17.9707ZM13.8982 15.8C13.8982 16.3758 13.8975 16.7502 13.8727 17.0358C13.849 17.3093 13.8084 17.4186 13.7752 17.4798L15.3585 18.3361C15.5567 17.9696 15.6318 17.5849 15.666 17.1914C15.699 16.81 15.6982 16.3443 15.6982 15.8H13.8982ZM11.4018 19.9C11.9822 19.9 12.4685 19.9006 12.8651 19.8701C13.2707 19.8389 13.6585 19.7711 14.0287 19.5934L13.2497 17.9707C13.1658 18.0109 13.0293 18.0521 12.7269 18.0754C12.4155 18.0994 12.0102 18.1 11.4018 18.1V19.9ZM13.7752 17.4799C13.6654 17.683 13.4845 17.8579 13.2497 17.9707L14.0287 19.5934C14.5927 19.3226 15.0613 18.8856 15.3585 18.3361L13.7752 17.4799ZM1 5.9H2.0614V4.1H1V5.9ZM2.0614 5.9H14.7982V4.1H2.0614V5.9ZM14.7982 5.9H15.8596V4.1H14.7982V5.9ZM5.61491 4.2C5.61491 3.05108 6.74448 1.9 8.42982 1.9V0.1C6.01179 0.1 3.81491 1.8143 3.81491 4.2H5.61491ZM8.42982 1.9C10.1152 1.9 11.2447 3.05108 11.2447 4.2H13.0447C13.0447 1.8143 10.8479 0.1 8.42982 0.1V1.9ZM3.81491 4.2V5H5.61491V4.2H3.81491ZM11.2447 4.2V5H13.0447V4.2H11.2447Z"
                                  fill="#4DBA4D"
                                />
                              </svg>
                            </>
                          ))
                      ) : (
                        <button
                          className={styles.addbtns}
                          onClick={() => optionsHandler(items)}
                        >
                          Add
                        </button>
                      )
                    ) : cartItemFromLocalstorage?.find(
                        (rtrt) => rtrt.variant_id === items.id
                      ) ? (
                      cartItemFromLocalstorage
                        ?.filter((ytyt) => ytyt.variant_id === items.id)
                        .map((item) => (
                          <>
                            <div className={styles.product_qty}>
                              <button
                                onClick={() => removeQty2(item)}
                                disabled={item.cart_item_qty === 1}
                              >
                                -
                              </button>
                              <span>{item.cart_item_qty}</span>
                              <button onClick={() => addQty2(item)}>+</button>
                            </div>

                            <svg
                              width="17"
                              height="20"
                              viewBox="0 0 17 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() => deleteCartItem(item)}
                            >
                              <path
                                d="M7.20702 8C7.20702 7.50294 6.80407 7.1 6.30702 7.1C5.80996 7.1 5.40702 7.50294 5.40702 8H7.20702ZM5.40702 16C5.40702 16.4971 5.80996 16.9 6.30702 16.9C6.80407 16.9 7.20702 16.4971 7.20702 16H5.40702ZM11.4526 8C11.4526 7.50294 11.0497 7.1 10.5526 7.1C10.0556 7.1 9.65263 7.50294 9.65263 8H11.4526ZM9.65263 16C9.65263 16.4971 10.0556 16.9 10.5526 16.9C11.0497 16.9 11.4526 16.4971 11.4526 16H9.65263ZM3.22048 18.782L3.60997 17.9707L3.22048 18.782ZM2.29278 17.908L3.08442 17.4799H3.08442L2.29278 17.908ZM14.5669 17.908L13.7752 17.4798V17.4799L14.5669 17.908ZM13.6392 18.782L13.2497 17.9707H13.2497L13.6392 18.782ZM1 4.1C0.502944 4.1 0.1 4.50294 0.1 5C0.1 5.49706 0.502944 5.9 1 5.9V4.1ZM15.8596 5.9C16.3567 5.9 16.7596 5.49706 16.7596 5C16.7596 4.50294 16.3567 4.1 15.8596 4.1V5.9ZM3.81491 5C3.81491 5.49706 4.21786 5.9 4.71491 5.9C5.21197 5.9 5.61491 5.49706 5.61491 5H3.81491ZM11.2447 5C11.2447 5.49706 11.6477 5.9 12.1447 5.9C12.6418 5.9 13.0447 5.49706 13.0447 5H11.2447ZM5.40702 8V16H7.20702V8H5.40702ZM9.65263 8V16H11.4526V8H9.65263ZM13.8982 5V15.8H15.6982V5H13.8982ZM11.4018 18.1H5.45789V19.9H11.4018V18.1ZM1.1614 5V15.8H2.9614V5H1.1614ZM5.45789 18.1C4.84945 18.1 4.44413 18.0994 4.13271 18.0754C3.83033 18.0521 3.69385 18.0109 3.60997 17.9707L2.83099 19.5934C3.2012 19.7711 3.58898 19.8389 3.99456 19.8701C4.39111 19.9006 4.87745 19.9 5.45789 19.9V18.1ZM1.1614 15.8C1.1614 16.3443 1.16062 16.81 1.19369 17.1914C1.22782 17.5849 1.30291 17.9696 1.50113 18.3361L3.08442 17.4799C3.05127 17.4186 3.01067 17.3093 2.98696 17.0358C2.96219 16.7502 2.9614 16.3758 2.9614 15.8H1.1614ZM3.60997 17.9707C3.37513 17.8579 3.19428 17.683 3.08442 17.4799L1.50113 18.3361C1.79832 18.8856 2.26696 19.3226 2.83099 19.5934L3.60997 17.9707ZM13.8982 15.8C13.8982 16.3758 13.8975 16.7502 13.8727 17.0358C13.849 17.3093 13.8084 17.4186 13.7752 17.4798L15.3585 18.3361C15.5567 17.9696 15.6318 17.5849 15.666 17.1914C15.699 16.81 15.6982 16.3443 15.6982 15.8H13.8982ZM11.4018 19.9C11.9822 19.9 12.4685 19.9006 12.8651 19.8701C13.2707 19.8389 13.6585 19.7711 14.0287 19.5934L13.2497 17.9707C13.1658 18.0109 13.0293 18.0521 12.7269 18.0754C12.4155 18.0994 12.0102 18.1 11.4018 18.1V19.9ZM13.7752 17.4799C13.6654 17.683 13.4845 17.8579 13.2497 17.9707L14.0287 19.5934C14.5927 19.3226 15.0613 18.8856 15.3585 18.3361L13.7752 17.4799ZM1 5.9H2.0614V4.1H1V5.9ZM2.0614 5.9H14.7982V4.1H2.0614V5.9ZM14.7982 5.9H15.8596V4.1H14.7982V5.9ZM5.61491 4.2C5.61491 3.05108 6.74448 1.9 8.42982 1.9V0.1C6.01179 0.1 3.81491 1.8143 3.81491 4.2H5.61491ZM8.42982 1.9C10.1152 1.9 11.2447 3.05108 11.2447 4.2H13.0447C13.0447 1.8143 10.8479 0.1 8.42982 0.1V1.9ZM3.81491 4.2V5H5.61491V4.2H3.81491ZM11.2447 4.2V5H13.0447V4.2H11.2447Z"
                                fill="#4DBA4D"
                              />
                            </svg>
                          </>
                        ))
                    ) : (
                      <button
                        className={styles.addbtns}
                        onClick={() =>
                          optionsHandler(
                            items,
                            moreVariant?.name,
                            moreVariant?.thumbnail_image,
                            moreVariant?.image
                          )
                        }
                      >
                        Add
                      </button>
                    )}
                  </div>
                </>
              ))}
            </div>
          </Modal>
        </div>
      ) : (
        <div className={styles.drawerMainDiv}>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="bottom"
            className="bla bla bla"
          >
            <div className={styles.drawerMain}>
              <div className={styles.mainone}>
                <h4>{moreVariant?.name}</h4>
                <div className={styles.productMainDiv}>
                  {moreVariant?.variants?.map((items, key) => (
                    <>
                      <div className={styles.products}>
                        <div className={styles.discount_div}>
                          {items.discount_off !== "0% OFF" && (
                            <button>{items.discount_off}</button>
                          )}
                          <img
                            alt=""
                            src={
                              moreVariant?.image
                                ? moreVariant?.image
                                : moreVariant?.thumbnail_image
                            }
                          />
                        </div>
                        <h6>
                          {items.variant_qty}
                          {items.variant_qty_type}
                        </h6>
                        <p>
                          {items.price !== items.market_price && (
                            <del>${items.market_price}</del>
                          )}{" "}
                          ${items.price}
                        </p>
                        {isLoggedIn ? (
                          newCartData?.find(
                            (rtrt) => rtrt.variant_id === items.id
                          ) ? (
                            newCartData
                              ?.filter((ytyt) => ytyt.variant_id === items.id)
                              .map((item) => (
                                <>
                                  <div className={styles.product_qty}>
                                    <button
                                      onClick={() => removeQty2(item)}
                                      disabled={item.cart_item_qty === 1}
                                    >
                                      -
                                    </button>
                                    <span>{item.cart_item_qty}</span>

                                    <button onClick={() => addQty2(item)}>
                                      +
                                    </button>
                                  </div>

                                  <svg
                                    width="17"
                                    height="20"
                                    viewBox="0 0 17 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => deleteCartItem(item)}
                                  >
                                    <path
                                      d="M7.20702 8C7.20702 7.50294 6.80407 7.1 6.30702 7.1C5.80996 7.1 5.40702 7.50294 5.40702 8H7.20702ZM5.40702 16C5.40702 16.4971 5.80996 16.9 6.30702 16.9C6.80407 16.9 7.20702 16.4971 7.20702 16H5.40702ZM11.4526 8C11.4526 7.50294 11.0497 7.1 10.5526 7.1C10.0556 7.1 9.65263 7.50294 9.65263 8H11.4526ZM9.65263 16C9.65263 16.4971 10.0556 16.9 10.5526 16.9C11.0497 16.9 11.4526 16.4971 11.4526 16H9.65263ZM3.22048 18.782L3.60997 17.9707L3.22048 18.782ZM2.29278 17.908L3.08442 17.4799H3.08442L2.29278 17.908ZM14.5669 17.908L13.7752 17.4798V17.4799L14.5669 17.908ZM13.6392 18.782L13.2497 17.9707H13.2497L13.6392 18.782ZM1 4.1C0.502944 4.1 0.1 4.50294 0.1 5C0.1 5.49706 0.502944 5.9 1 5.9V4.1ZM15.8596 5.9C16.3567 5.9 16.7596 5.49706 16.7596 5C16.7596 4.50294 16.3567 4.1 15.8596 4.1V5.9ZM3.81491 5C3.81491 5.49706 4.21786 5.9 4.71491 5.9C5.21197 5.9 5.61491 5.49706 5.61491 5H3.81491ZM11.2447 5C11.2447 5.49706 11.6477 5.9 12.1447 5.9C12.6418 5.9 13.0447 5.49706 13.0447 5H11.2447ZM5.40702 8V16H7.20702V8H5.40702ZM9.65263 8V16H11.4526V8H9.65263ZM13.8982 5V15.8H15.6982V5H13.8982ZM11.4018 18.1H5.45789V19.9H11.4018V18.1ZM1.1614 5V15.8H2.9614V5H1.1614ZM5.45789 18.1C4.84945 18.1 4.44413 18.0994 4.13271 18.0754C3.83033 18.0521 3.69385 18.0109 3.60997 17.9707L2.83099 19.5934C3.2012 19.7711 3.58898 19.8389 3.99456 19.8701C4.39111 19.9006 4.87745 19.9 5.45789 19.9V18.1ZM1.1614 15.8C1.1614 16.3443 1.16062 16.81 1.19369 17.1914C1.22782 17.5849 1.30291 17.9696 1.50113 18.3361L3.08442 17.4799C3.05127 17.4186 3.01067 17.3093 2.98696 17.0358C2.96219 16.7502 2.9614 16.3758 2.9614 15.8H1.1614ZM3.60997 17.9707C3.37513 17.8579 3.19428 17.683 3.08442 17.4799L1.50113 18.3361C1.79832 18.8856 2.26696 19.3226 2.83099 19.5934L3.60997 17.9707ZM13.8982 15.8C13.8982 16.3758 13.8975 16.7502 13.8727 17.0358C13.849 17.3093 13.8084 17.4186 13.7752 17.4798L15.3585 18.3361C15.5567 17.9696 15.6318 17.5849 15.666 17.1914C15.699 16.81 15.6982 16.3443 15.6982 15.8H13.8982ZM11.4018 19.9C11.9822 19.9 12.4685 19.9006 12.8651 19.8701C13.2707 19.8389 13.6585 19.7711 14.0287 19.5934L13.2497 17.9707C13.1658 18.0109 13.0293 18.0521 12.7269 18.0754C12.4155 18.0994 12.0102 18.1 11.4018 18.1V19.9ZM13.7752 17.4799C13.6654 17.683 13.4845 17.8579 13.2497 17.9707L14.0287 19.5934C14.5927 19.3226 15.0613 18.8856 15.3585 18.3361L13.7752 17.4799ZM1 5.9H2.0614V4.1H1V5.9ZM2.0614 5.9H14.7982V4.1H2.0614V5.9ZM14.7982 5.9H15.8596V4.1H14.7982V5.9ZM5.61491 4.2C5.61491 3.05108 6.74448 1.9 8.42982 1.9V0.1C6.01179 0.1 3.81491 1.8143 3.81491 4.2H5.61491ZM8.42982 1.9C10.1152 1.9 11.2447 3.05108 11.2447 4.2H13.0447C13.0447 1.8143 10.8479 0.1 8.42982 0.1V1.9ZM3.81491 4.2V5H5.61491V4.2H3.81491ZM11.2447 4.2V5H13.0447V4.2H11.2447Z"
                                      fill="#4DBA4D"
                                    />
                                  </svg>
                                </>
                              ))
                          ) : (
                            <button
                              className={styles.addbtns}
                              onClick={() => optionsHandler(items)}
                            >
                              Add
                            </button>
                          )
                        ) : cartItemFromLocalstorage?.find(
                            (rtrt) => rtrt.variant_id === items.id
                          ) ? (
                          cartItemFromLocalstorage
                            ?.filter((ytyt) => ytyt.variant_id === items.id)
                            .map((item) => (
                              <>
                                <div className={styles.product_qty}>
                                  <button
                                    onClick={() => removeQty2(item)}
                                    disabled={item.cart_item_qty === 1}
                                  >
                                    -
                                  </button>
                                  <span>{item.cart_item_qty}</span>
                                  <button onClick={() => addQty2(item)}>
                                    +
                                  </button>
                                </div>

                                <svg
                                  width="17"
                                  height="20"
                                  viewBox="0 0 17 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => deleteCartItem(item)}
                                >
                                  <path
                                    d="M7.20702 8C7.20702 7.50294 6.80407 7.1 6.30702 7.1C5.80996 7.1 5.40702 7.50294 5.40702 8H7.20702ZM5.40702 16C5.40702 16.4971 5.80996 16.9 6.30702 16.9C6.80407 16.9 7.20702 16.4971 7.20702 16H5.40702ZM11.4526 8C11.4526 7.50294 11.0497 7.1 10.5526 7.1C10.0556 7.1 9.65263 7.50294 9.65263 8H11.4526ZM9.65263 16C9.65263 16.4971 10.0556 16.9 10.5526 16.9C11.0497 16.9 11.4526 16.4971 11.4526 16H9.65263ZM3.22048 18.782L3.60997 17.9707L3.22048 18.782ZM2.29278 17.908L3.08442 17.4799H3.08442L2.29278 17.908ZM14.5669 17.908L13.7752 17.4798V17.4799L14.5669 17.908ZM13.6392 18.782L13.2497 17.9707H13.2497L13.6392 18.782ZM1 4.1C0.502944 4.1 0.1 4.50294 0.1 5C0.1 5.49706 0.502944 5.9 1 5.9V4.1ZM15.8596 5.9C16.3567 5.9 16.7596 5.49706 16.7596 5C16.7596 4.50294 16.3567 4.1 15.8596 4.1V5.9ZM3.81491 5C3.81491 5.49706 4.21786 5.9 4.71491 5.9C5.21197 5.9 5.61491 5.49706 5.61491 5H3.81491ZM11.2447 5C11.2447 5.49706 11.6477 5.9 12.1447 5.9C12.6418 5.9 13.0447 5.49706 13.0447 5H11.2447ZM5.40702 8V16H7.20702V8H5.40702ZM9.65263 8V16H11.4526V8H9.65263ZM13.8982 5V15.8H15.6982V5H13.8982ZM11.4018 18.1H5.45789V19.9H11.4018V18.1ZM1.1614 5V15.8H2.9614V5H1.1614ZM5.45789 18.1C4.84945 18.1 4.44413 18.0994 4.13271 18.0754C3.83033 18.0521 3.69385 18.0109 3.60997 17.9707L2.83099 19.5934C3.2012 19.7711 3.58898 19.8389 3.99456 19.8701C4.39111 19.9006 4.87745 19.9 5.45789 19.9V18.1ZM1.1614 15.8C1.1614 16.3443 1.16062 16.81 1.19369 17.1914C1.22782 17.5849 1.30291 17.9696 1.50113 18.3361L3.08442 17.4799C3.05127 17.4186 3.01067 17.3093 2.98696 17.0358C2.96219 16.7502 2.9614 16.3758 2.9614 15.8H1.1614ZM3.60997 17.9707C3.37513 17.8579 3.19428 17.683 3.08442 17.4799L1.50113 18.3361C1.79832 18.8856 2.26696 19.3226 2.83099 19.5934L3.60997 17.9707ZM13.8982 15.8C13.8982 16.3758 13.8975 16.7502 13.8727 17.0358C13.849 17.3093 13.8084 17.4186 13.7752 17.4798L15.3585 18.3361C15.5567 17.9696 15.6318 17.5849 15.666 17.1914C15.699 16.81 15.6982 16.3443 15.6982 15.8H13.8982ZM11.4018 19.9C11.9822 19.9 12.4685 19.9006 12.8651 19.8701C13.2707 19.8389 13.6585 19.7711 14.0287 19.5934L13.2497 17.9707C13.1658 18.0109 13.0293 18.0521 12.7269 18.0754C12.4155 18.0994 12.0102 18.1 11.4018 18.1V19.9ZM13.7752 17.4799C13.6654 17.683 13.4845 17.8579 13.2497 17.9707L14.0287 19.5934C14.5927 19.3226 15.0613 18.8856 15.3585 18.3361L13.7752 17.4799ZM1 5.9H2.0614V4.1H1V5.9ZM2.0614 5.9H14.7982V4.1H2.0614V5.9ZM14.7982 5.9H15.8596V4.1H14.7982V5.9ZM5.61491 4.2C5.61491 3.05108 6.74448 1.9 8.42982 1.9V0.1C6.01179 0.1 3.81491 1.8143 3.81491 4.2H5.61491ZM8.42982 1.9C10.1152 1.9 11.2447 3.05108 11.2447 4.2H13.0447C13.0447 1.8143 10.8479 0.1 8.42982 0.1V1.9ZM3.81491 4.2V5H5.61491V4.2H3.81491ZM11.2447 4.2V5H13.0447V4.2H11.2447Z"
                                    fill="#4DBA4D"
                                  />
                                </svg>
                              </>
                            ))
                        ) : (
                          <button
                            className={styles.addbtns}
                            onClick={() =>
                              optionsHandler(
                                items,
                                moreVariant?.name,
                                moreVariant?.thumbnail_image,
                                moreVariant?.image
                              )
                            }
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      )}
      <Login
        open={loginOpen}
        onCloseModal={closeLoginModal}
        openLoginModal={openLoginModal}
      />
      {pageLoading && <Loading />}
    </>
  );
};

export default Search;
