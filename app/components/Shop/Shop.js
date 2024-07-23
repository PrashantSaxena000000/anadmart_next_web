"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./shop.module.scss";
import newStyles from "../../components/aboutus/aboutus.module.scss";
import LeftSection from "./LeftSection";
import Images from "../Images/Images";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { SET_HEADER } from "../redux/types";
import Link from "next/link";
import { Modal } from "react-responsive-modal";
import ShopHeader from "./ShopHeader";
import Loading from "../Loading/Loading";
import CheckBox from "../../components/Shop/CheckBox";
import Paginations from "../../common/pagination/Pagination";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Select from "react-select";
import {
  addRemoveWishlist,
  addToCart,
  allCategoriesData,
  allSubCategoriesData,
  deleteMyCartData,
  myshopPageData,
  setCartItems,
  setCartItemsInLocalStorage,
  updateMyCart,
} from "../redux/actions/authActions";
import Login from "../Popups/Login/Login";
import { toast } from "react-toastify";
import { BorderColor } from "@mui/icons-material";

const Shop = ({ slug }) => {
  const dispatch = useDispatch();
  const newRef = useRef(false);
  const [ProductList, SetProductList] = useState();
  const [currentSection, SetCurrentSection] = useState();
  const [currentSectionName, SetCurrentSectionName] = useState();
  const [categorySectionName, setCategorySectionName] = useState();
  const [moreOption, setMoreOption] = useState();
  const [open, setOpen] = useState(false);
  const [moreVariant, setMoreVariant] = useState();
  const [loginOpen, setLoginOpen] = useState(false);
  const [subCatData, setSubCatData] = useState();
  const [url, setUrl] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    value: "",
    label: "Relevance",
  });

  const openLoginModal = () => setLoginOpen(true);
  const closeLoginModal = () => setLoginOpen(false);
  // const params = new URLSearchParams(url?.split("?")[1]);

  var params = new URLSearchParams(url);

  let cat_id = params.get("item");

  useEffect(() => {
    if (typeof window !== undefined) {
      setUrl(window.location.search);
    }
  }, [cat_id, params, url]);

  let newCartData = useSelector((state) => state?.home?.newCartData);

  let cartItemFromLocalstorage = useSelector(
    (state) => state?.home?.cartItemFromLocalstorage
  );

  const myAllShopData = useSelector(
    (state) => state?.home?.myAllCategoriesData?.categories
  );

  const myAllSubCatData = useSelector(
    (state) => state?.home?.myAllSubCategoriesData
  );
  const mySubProductList = useSelector(
    (state) => state?.home?.mySubProductList?.data
  );
  const myPagination = useSelector(
    (state) => state?.home?.mySubProductList?.data?.meta
  );

  const deleteMyCart = useSelector((state) => state?.home?.deleteMyCart);

  const pageLoading = useSelector((state) => state?.home?.pageLoading);

  const isLoggedIn = useSelector((state) => state?.home?.isLoggedIn);
  const addRemoveWishlistData = useSelector(
    (state) => state?.home?.addRemoveWishlistData
  );

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeModal = () => setOpen(false);

  useEffect(() => {
    dispatch({
      type: SET_HEADER,
      payload: true,
    });
  }, []);

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
    const zip_code = localStorage.getItem("currentZipCode");

    const searchParams = new URLSearchParams();
    searchParams.append("zipcode", zip_code);

    if (myAllShopData && cat_id !== 0) {
      if (cat_id == 1) {
        const mainCat = myAllShopData && myAllShopData[0];
        setCategorySectionName(mainCat?.name);
        dispatch(allSubCategoriesData(mainCat?.id, searchParams));
      } else {
        for (let i = 0; i < myAllShopData.length; i++) {
          if (myAllShopData[i].id == cat_id) {
            setCategorySectionName(myAllShopData[i]?.name);
            if (myAllShopData[i]?.subcategory === true) {
              dispatch(
                allSubCategoriesData(myAllShopData[i]?.id, searchParams)
              );
            } else {
              dispatch(myshopPageData(cat_id, searchParams));
            }
          }
        }
      }
    }
  }, [cat_id, myAllShopData, addRemoveWishlistData]);

  useEffect(() => {
    if (myAllSubCatData) {
      setSubCatData(myAllSubCatData);
    }
  }, [myAllSubCatData]);

  useEffect(() => {
    if (myAllSubCatData?.sub_category?.length > 0) {
      const concatenatedIds = myAllSubCatData.sub_category?.slice(0, 1);

      console.log(concatenatedIds);
      // .map((element) => element.id.toString())
      // .join(",");
      // SetCurrentSection({ id: concatenatedIds });
    }
  }, [myAllSubCatData]);

  useEffect(() => {
    if (mySubProductList?.data) {
      SetProductList(mySubProductList?.data);
      SetCurrentSection({
        ...currentSection,
        data: mySubProductList?.data,
      });
    }
  }, [mySubProductList?.data]);

  useEffect(() => {
    const zip_code = localStorage.getItem("currentZipCode");

    const searchParams = new URLSearchParams();
    searchParams.append("zipcode", zip_code);

    if (currentSection?.id && myPagination) {
      const data = {
        id: currentSection?.id,
        pageNo: myPagination?.current_page,
        pagination: myPagination?.per_page,
      };
      dispatch(myshopPageData(data, searchParams, selectedFilter?.value));
    } else {
      const data = {
        id: currentSection?.id,
      };
      dispatch(myshopPageData(data, searchParams, selectedFilter?.value));
    }
  }, [
    currentSection?.id,
    addRemoveWishlistData,
    myPagination?.current_page,
    selectedFilter?.value,
  ]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const selectSizeHandler = (item) => {
    setMoreVariant(item);
    if (!isMobile) {
      setOpen(true);
    } else {
      toggleDrawer();
    }
  };

  const customStylesData = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#fff",
      borderRadius: "5px",
      width: "312px",
      border: "1px solid #DCDCDC",
      minHeight: "30px",
      fontSize: "14px",
      color: "#0c831f",
      borderColor: "#DCDCDC",
      boxShadow: "none",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#fff",
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused ? "rgb(213 215 219 / 56%)" : "#fff",
      color: isFocused ? "#12bb2d" : "black",
      cursor: "pointer",
      fontWeight: 500,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#0c831f",
      fontWeight: 400,
    }),
    input: (styles) => ({
      ...styles,
      color: "#0c831f",
      fontWeight: 500,
    }),
  };

  const options = [
    { value: "", label: "Relevance" },
    { value: "price_asc", label: "Price (Low to High)" },
    { value: "price_desc", label: "Price (High to Low) " },
    { value: "discount_desc", label: "Discount (High to Low)" },
    { value: "discount_asc", label: "Discount (Low to High)" },
    // { value: "name_asc", label: "Name (A to Z)" },
    // { value: "name_desc", label: "Name (Z to A)" },
  ];

  const changeTabHAndler = (item) => {
    SetCurrentSection({ id: item.id });
    dispatch(myshopPageData(item.id));
  };

  const categoryDataHandler = (item) => {
    const zip_code = localStorage.getItem("currentZipCode");
    const searchParams = new URLSearchParams();
    searchParams.append("zipcode", zip_code);
    SetCurrentSection({ id: item.id });
    SetCurrentSectionName(item);
    setMoreOption(false);
    setSubCatData();
    dispatch(allSubCategoriesData(item.id, searchParams));
  };

  const handleAddCart = (data) => {
    if (isLoggedIn) {
      const firstVariant = data?.variants?.[0].id ?? null;
      if (data.variants.length === 1) {
        const newdata = {
          variant_id: firstVariant,
          product_id: data.id,
          qty: 1,
          warehouse_distributor_variant_id: data?.variants[0]?.availability?.id,
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

  // const removeQty2 = (data) => {
  //   newCartData = newCartData?.map((item) =>
  //     item.variant_id === data.id
  //       ? {
  //           ...item,
  //           cart_item_qty: item.cart_item_qty - 1,
  //         }
  //       : item
  //   );

  //   const updatedata = {
  //     cart_id: data.id,
  //     qty: data.cart_item_qty - 1,
  //   };

  //   dispatch(updateMyCart(updatedata));
  //   dispatch(setCartItems(newCartData));
  // };

  const removeQty2 = (data) => {
    if (isLoggedIn) {
      newCartData = newCartData?.map((item) =>
        item.variant_id === data.id
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

  // const addQty2 = (data) => {
  //   newCartData = newCartData?.map((item) =>
  //     item.variant_id === data.id
  //       ? {
  //           ...item,
  //           cart_item_qty: item.cart_item_qty + 1,
  //         }
  //       : item
  //   );
  //   const updatedata = {
  //     cart_id: data.id,
  //     qty: data.cart_item_qty + 1,
  //   };
  //   dispatch(updateMyCart(updatedata));
  //   dispatch(setCartItems(newCartData));
  // };

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
        warehouse_distributor_variant_id: data.availability.id,
      };
      dispatch(addToCart(newdata));
    } else {
      // openLoginModal();

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

  const modifiedData = ProductList?.products?.map((item) => {
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

  // const optionsHandler = (data) => {
  //   if (isLoggedIn) {
  //     const newdata = {
  //       variant_id: data.id,
  //       product_id: data.vendor_product_id,
  //       qty: 1,
  //     };
  //     dispatch(addToCart(newdata));
  //   } else {
  //     openLoginModal();
  //   }
  // };

  // const deleteCartItem = (data) => {
  //   dispatch(deleteMyCartData({ cart_item_id: data.id }));
  // };
  const wishlistClickHandler = (item) => {
    if (isLoggedIn) {
      dispatch(addRemoveWishlist({ product_id: item.id }));
    } else {
      openLoginModal();
    }
  };

  const openMoreOptionHandler = () => {
    setMoreOption(!moreOption);
  };

  const handleOutsideClick = (e) => {
    // if (newRef.current && !newRef.current.contains(e.target)) {
    // setMoreOption(!moreOption);
    // }
  };

  return (
    <>
      <ShopHeader
        categoryDataHandler={categoryDataHandler}
        myAllShopData={myAllShopData}
        currentSectionName={currentSectionName}
        openMoreOptionHandler={openMoreOptionHandler}
        moreOption={moreOption}
        newRef={newRef}
        categorySectionName={categorySectionName}
      />

      <div className="container shopPageContainer">
        <>
          <div className={styles.main_div_of_Shop}>
            <div className={styles.left_side}>
              <LeftSection
                changeTabHAndler={changeTabHAndler}
                currentSection={currentSection}
                myAllSubCatData={subCatData}
              />
            </div>
            <div className={styles.right_side}>
              <div className={styles.headSction}>
                <div className={styles.heading}>
                  <h4>
                    Buy{" "}
                    {currentSectionName?.name
                      ? currentSectionName?.name
                      : categorySectionName}
                  </h4>
                </div>
                <div className={styles.filter}>
                  <h6>Sort By</h6>
                  <div>
                    <Select
                      options={options}
                      name="colors"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={setSelectedFilter}
                      styles={customStylesData}
                      value={selectedFilter}
                    />
                  </div>
                </div>
              </div>
              {ProductList?.products?.length === 0 ? (
                <div className={styles.no_product_available}>
                  No Products Available
                </div>
              ) : (
                <>
                  <div className={styles.CardScn}>
                    {modifiedData?.map((data, key) => (
                      <>
                        <div className={styles.div_of_card}>
                          <div className={styles.card_main_div}>
                            <div className={styles.discount_bar}>
                              {data.variants[0]?.discount_off !== "0% OFF" && (
                                <button>
                                  {data?.variants[0]?.discount_off}
                                </button>
                              )}
                            </div>
                            <Link
                              href={{
                                pathname: "/product-details",
                                query: { item: data.id },
                              }}
                            >
                              <div className={styles.carddiv}>
                                <img src={data.image} alt="" />
                              </div>
                            </Link>
                            <div className={styles.wishlistIcon}>
                              {data.whislist === true ? (
                                <svg
                                  width="20"
                                  height="18"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => wishlistClickHandler(data)}
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
                                  onClick={() => wishlistClickHandler(data)}
                                >
                                  <path
                                    d="M16.22 5.59001C15.8368 5.03611 15.3239 4.58434 14.726 4.27409C14.1282 3.96384 13.4635 3.80451 12.79 3.81001C12.2673 3.79998 11.7484 3.90085 11.2675 4.10597C10.7866 4.31109 10.3546 4.61579 10 5.00001C9.64503 4.6163 9.21299 4.31193 8.73217 4.10685C8.25136 3.90178 7.73264 3.80062 7.21 3.81001C6.53647 3.80451 5.87182 3.96384 5.27398 4.27409C4.67613 4.58434 4.16324 5.03611 3.78 5.59001C3.38922 6.21098 3.16708 6.92311 3.13551 7.65613C3.10395 8.38915 3.26404 9.11774 3.6 9.77001C4.10981 10.9147 4.81729 11.9607 5.69 12.86C6.67825 13.8967 7.75944 14.8407 8.92 15.68C9.23408 15.9077 9.61208 16.0303 10 16.0303C10.3879 16.0303 10.7659 15.9077 11.08 15.68C12.2408 14.841 13.3221 13.897 14.31 12.86C15.1827 11.9607 15.8902 10.9147 16.4 9.77001C16.736 9.11774 16.8961 8.38915 16.8645 7.65613C16.8329 6.92311 16.6108 6.21098 16.22 5.59001ZM15.56 9.42001C15.0863 10.463 14.4368 11.4169 13.64 12.24C12.6904 13.2318 11.6528 14.1355 10.54 14.94C10.3842 15.0568 10.1947 15.12 10 15.12C9.80527 15.12 9.61579 15.0568 9.46 14.94C8.34748 14.1352 7.30993 13.2315 6.36 12.24C5.55925 11.4202 4.9093 10.4655 4.44 9.42001C4.16765 8.90358 4.03371 8.32541 4.05124 7.74183C4.06876 7.15825 4.23715 6.58916 4.54 6.09001C4.84088 5.66326 5.24131 5.31634 5.70658 5.07935C6.17185 4.84236 6.68791 4.72245 7.21 4.73001C7.63479 4.71575 8.05724 4.79838 8.44534 4.97164C8.83345 5.1449 9.17701 5.40425 9.45 5.73001C9.60076 5.87426 9.80136 5.95477 10.01 5.95477C10.2187 5.95477 10.4193 5.87426 10.57 5.73001C10.8409 5.40694 11.1812 5.14922 11.5656 4.97607C11.95 4.80291 12.3686 4.7188 12.79 4.73001C13.3121 4.72245 13.8282 4.84236 14.2934 5.07935C14.7587 5.31634 15.1591 5.66326 15.46 6.09001C15.7629 6.58916 15.9312 7.15825 15.9488 7.74183C15.9663 8.32541 15.8324 8.90358 15.56 9.42001Z"
                                    fill="#4DBA4D"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className={styles.sizeAndCart}>
                            {/* <p

                        // onClick={() => selectSizeHandler(data)}
                        >
                          Size{" "}
                          <span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.943 5.625L14.625 6.35273L9 12.375L3.375 6.35273L4.05352 5.625L9 10.916L13.943 5.625Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </p> */}

                            {isLoggedIn ? (
                              newCartData?.find(
                                (rtrt) => rtrt?.product_id === data?.id
                              ) ? (
                                <>
                                  <div className={styles.addbtndiv}>
                                    <button
                                      onClick={() => selectSizeHandler(data)}
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
                                  {data?.variants[0]?.availability
                                    ?.is_available === false ? (
                                    <p className={styles?.notAvil}>
                                      Not Available
                                    </p>
                                  ) : (
                                    <div className={styles.addbtndiv}>
                                      <button
                                        onClick={() => handleAddCart(data)}
                                      >
                                        Add
                                      </button>
                                    </div>
                                  )}
                                </>
                              )
                            ) : cartItemFromLocalstorage?.find(
                                (rtrt) => rtrt?.product_id === data?.id
                              ) ? (
                              <>
                                <div className={styles.addbtndiv}>
                                  <button
                                    onClick={() => selectSizeHandler(data)}
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
                                {data?.variants[0]?.availability
                                  ?.is_available === false ? (
                                  <p className={styles?.notAvil}>
                                    Not Available
                                  </p>
                                ) : (
                                  <div className={styles.addbtndiv}>
                                    <button onClick={() => handleAddCart(data)}>
                                      Add
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                            {/* {newCartData?.find(
                      (rtrt) => rtrt.product_id === data.id
                    ) ? (
                      <div className={styles.addcQtydiv}>
                        <button
                          className={styles.addcQtyminus}
                          onClick={() => removeQty(data)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="2"
                            viewBox="0 0 12 2"
                            fill="none"
                          >
                            <path
                              d="M10.24 1L1 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <span>1</span>

                        <button
                          className={styles.addcQtyPlus}
                          onClick={() => addQty(data)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M5.62 1V10.24M10.24 5.62L1 5.62"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className={styles.addbtndiv}>
                        <button onClick={() => handleAddCart(data)}>Add</button>
                      </div>
                    )} */}
                            {/* {add[data?.id] ? (
                      <div className={styles.addcQtydiv}>
                        <button
                          className={styles.addcQtyminus}
                          onClick={() => removeQty(data)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="2"
                            viewBox="0 0 12 2"
                            fill="none"
                          >
                            <path
                              d="M10.24 1L1 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <span>1</span>

                        <button
                          className={styles.addcQtyPlus}
                          onClick={() => addQty(data)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M5.62 1V10.24M10.24 5.62L1 5.62"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className={styles.addbtndiv}>
                        <button onClick={() => handleAddCart(data)}>Add</button>
                      </div>
                    )} */}
                          </div>
                          <h6>
                            {data?.name}{" "}
                            <span>
                              {data?.variants?.length === 1
                                ? `(${
                                    data?.variants[0]?.variant_qty +
                                    data?.variants[0]?.variant_qty_type
                                  })`
                                : null}
                            </span>
                          </h6>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="76"
                            height="11"
                            viewBox="0 0 76 11"
                            fill="none"
                          >
                            <path
                              d="M9.21559 6.8427C9.06565 6.988 8.99676 7.19815 9.03092 7.40424L9.54557 10.2525C9.58899 10.4939 9.4871 10.7382 9.28506 10.8777C9.08707 11.0224 8.82367 11.0398 8.60774 10.924L6.04375 9.58673C5.95459 9.53926 5.8556 9.51378 5.75429 9.51089H5.59741C5.54299 9.51899 5.48973 9.53636 5.4411 9.56299L2.87653 10.9066C2.74975 10.9703 2.60618 10.9929 2.4655 10.9703C2.12279 10.9055 1.89412 10.579 1.95027 10.2345L2.4655 7.38629C2.49966 7.17846 2.43077 6.96716 2.28083 6.81954L0.190389 4.79336C0.0155586 4.62374 -0.0452268 4.36902 0.0346627 4.1392C0.112237 3.90995 0.310223 3.74265 0.549313 3.70502L3.42649 3.28763C3.64532 3.26505 3.83752 3.1319 3.93593 2.93507L5.20375 0.335767C5.23385 0.277877 5.27264 0.224617 5.31953 0.179462L5.37163 0.138938C5.39884 0.108835 5.4301 0.0839419 5.46484 0.0636801L5.52794 0.0405237L5.62635 0H5.87007C6.08774 0.0225775 6.27936 0.152832 6.37951 0.347346L7.66411 2.93507C7.75674 3.12437 7.93678 3.25579 8.14461 3.28763L11.0218 3.70502C11.2649 3.73975 11.4681 3.90764 11.5486 4.1392C11.6244 4.37133 11.559 4.62605 11.3807 4.79336L9.21559 6.8427Z"
                              fill="#FFAB07"
                            />
                            <path
                              d="M25.2156 6.8427C25.0657 6.988 24.9968 7.19815 25.0309 7.40424L25.5456 10.2525C25.589 10.4939 25.4871 10.7382 25.2851 10.8777C25.0871 11.0224 24.8237 11.0398 24.6077 10.924L22.0437 9.58673C21.9546 9.53926 21.8556 9.51378 21.7543 9.51089H21.5974C21.543 9.51899 21.4897 9.53636 21.4411 9.56299L18.8765 10.9066C18.7497 10.9703 18.6062 10.9929 18.4655 10.9703C18.1228 10.9055 17.8941 10.579 17.9503 10.2345L18.4655 7.38629C18.4997 7.17846 18.4308 6.96716 18.2808 6.81954L16.1904 4.79336C16.0156 4.62374 15.9548 4.36902 16.0347 4.1392C16.1122 3.90995 16.3102 3.74265 16.5493 3.70502L19.4265 3.28763C19.6453 3.26505 19.8375 3.1319 19.9359 2.93507L21.2037 0.335767C21.2339 0.277877 21.2726 0.224617 21.3195 0.179462L21.3716 0.138938C21.3988 0.108835 21.4301 0.0839419 21.4648 0.0636801L21.5279 0.0405237L21.6264 0H21.8701C22.0877 0.0225775 22.2794 0.152832 22.3795 0.347346L23.6641 2.93507C23.7567 3.12437 23.9368 3.25579 24.1446 3.28763L27.0218 3.70502C27.2649 3.73975 27.4681 3.90764 27.5486 4.1392C27.6244 4.37133 27.559 4.62605 27.3807 4.79336L25.2156 6.8427Z"
                              fill="#FFAB07"
                            />
                            <path
                              d="M41.2156 6.8427C41.0657 6.988 40.9968 7.19815 41.0309 7.40424L41.5456 10.2525C41.589 10.4939 41.4871 10.7382 41.2851 10.8777C41.0871 11.0224 40.8237 11.0398 40.6077 10.924L38.0437 9.58673C37.9546 9.53926 37.8556 9.51378 37.7543 9.51089H37.5974C37.543 9.51899 37.4897 9.53636 37.4411 9.56299L34.8765 10.9066C34.7497 10.9703 34.6062 10.9929 34.4655 10.9703C34.1228 10.9055 33.8941 10.579 33.9503 10.2345L34.4655 7.38629C34.4997 7.17846 34.4308 6.96716 34.2808 6.81954L32.1904 4.79336C32.0156 4.62374 31.9548 4.36902 32.0347 4.1392C32.1122 3.90995 32.3102 3.74265 32.5493 3.70502L35.4265 3.28763C35.6453 3.26505 35.8375 3.1319 35.9359 2.93507L37.2037 0.335767C37.2339 0.277877 37.2726 0.224617 37.3195 0.179462L37.3716 0.138938C37.3988 0.108835 37.4301 0.0839419 37.4648 0.0636801L37.5279 0.0405237L37.6264 0H37.8701C38.0877 0.0225775 38.2794 0.152832 38.3795 0.347346L39.6641 2.93507C39.7567 3.12437 39.9368 3.25579 40.1446 3.28763L43.0218 3.70502C43.2649 3.73975 43.4681 3.90764 43.5486 4.1392C43.6244 4.37133 43.559 4.62605 43.3807 4.79336L41.2156 6.8427Z"
                              fill="#FFAB07"
                            />
                            <path
                              d="M57.2156 6.8427C57.0657 6.988 56.9968 7.19815 57.0309 7.40424L57.5456 10.2525C57.589 10.4939 57.4871 10.7382 57.2851 10.8777C57.0871 11.0224 56.8237 11.0398 56.6077 10.924L54.0437 9.58673C53.9546 9.53926 53.8556 9.51378 53.7543 9.51089H53.5974C53.543 9.51899 53.4897 9.53636 53.4411 9.56299L50.8765 10.9066C50.7497 10.9703 50.6062 10.9929 50.4655 10.9703C50.1228 10.9055 49.8941 10.579 49.9503 10.2345L50.4655 7.38629C50.4997 7.17846 50.4308 6.96716 50.2808 6.81954L48.1904 4.79336C48.0156 4.62374 47.9548 4.36902 48.0347 4.1392C48.1122 3.90995 48.3102 3.74265 48.5493 3.70502L51.4265 3.28763C51.6453 3.26505 51.8375 3.1319 51.9359 2.93507L53.2037 0.335767C53.2339 0.277877 53.2726 0.224617 53.3195 0.179462L53.3716 0.138938C53.3988 0.108835 53.4301 0.0839419 53.4648 0.0636801L53.5279 0.0405237L53.6264 0H53.8701C54.0877 0.0225775 54.2794 0.152832 54.3795 0.347346L55.6641 2.93507C55.7567 3.12437 55.9368 3.25579 56.1446 3.28763L59.0218 3.70502C59.2649 3.73975 59.4681 3.90764 59.5486 4.1392C59.6244 4.37133 59.559 4.62605 59.3807 4.79336L57.2156 6.8427Z"
                              fill="#D9D9D9"
                            />
                            <path
                              d="M73.2156 6.8427C73.0657 6.988 72.9968 7.19815 73.0309 7.40424L73.5456 10.2525C73.589 10.4939 73.4871 10.7382 73.2851 10.8777C73.0871 11.0224 72.8237 11.0398 72.6077 10.924L70.0437 9.58673C69.9546 9.53926 69.8556 9.51378 69.7543 9.51089H69.5974C69.543 9.51899 69.4897 9.53636 69.4411 9.56299L66.8765 10.9066C66.7497 10.9703 66.6062 10.9929 66.4655 10.9703C66.1228 10.9055 65.8941 10.579 65.9503 10.2345L66.4655 7.38629C66.4997 7.17846 66.4308 6.96716 66.2808 6.81954L64.1904 4.79336C64.0156 4.62374 63.9548 4.36902 64.0347 4.1392C64.1122 3.90995 64.3102 3.74265 64.5493 3.70502L67.4265 3.28763C67.6453 3.26505 67.8375 3.1319 67.9359 2.93507L69.2037 0.335767C69.2339 0.277877 69.2726 0.224617 69.3195 0.179462L69.3716 0.138938C69.3988 0.108835 69.4301 0.0839419 69.4648 0.0636801L69.5279 0.0405237L69.6264 0H69.8701C70.0877 0.0225775 70.2794 0.152832 70.3795 0.347346L71.6641 2.93507C71.7567 3.12437 71.9368 3.25579 72.1446 3.28763L75.0218 3.70502C75.2649 3.73975 75.4681 3.90764 75.5486 4.1392C75.6244 4.37133 75.559 4.62605 75.3807 4.79336L73.2156 6.8427Z"
                              fill="#D9D9D9"
                            />
                          </svg>{" "}
                          <div className={styles.priceAddQunty}>
                            <div className={styles.onlyQuantity}></div>
                            <div className={styles.priceAndAdd}>
                              {data?.availability?.is_available === false ? (
                                <p></p>
                              ) : (
                                <p>
                                  {data?.variants[0]?.market_price !==
                                    data?.variants[0]?.price && (
                                    <del>
                                      ${data?.variants[0]?.market_price}
                                    </del>
                                  )}{" "}
                                  ${data?.variants[0]?.price}
                                </p>
                              )}
                            </div>{" "}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <Paginations
                    paginaionMeta={mySubProductList?.meta}
                    setPageNo={setPageNo}
                    total_page={mySubProductList?.meta?.total_page}
                  />
                </>
              )}
            </div>
          </div>
        </>

        <div>
          <div className="container">
            <div className={newStyles.visionPart}>
              <div className={newStyles.visionRight}>
                <h5>Our Shop</h5>
                <h4>We are market press</h4>
                <p>
                  Collaboratively administrate empowered markets via
                  plug-and-play maintain networks. Dynamically usable
                  procrastinate B2B users after installed base benefits.
                </p>
                <p>
                  Collaboratively administrate empowered markets via
                  plug-and-play maintain networks. Dynamically usable
                  procrastinate B2B users after installed base benefits.
                </p>
                <div className={newStyles.learnMore}>
                  <button>
                    Learn More{" "}
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.5 9C3.5 8.58579 3.83579 8.25 4.25 8.25H14.75C15.1642 8.25 15.5 8.58579 15.5 9C15.5 9.41421 15.1642 9.75 14.75 9.75H4.25C3.83579 9.75 3.5 9.41421 3.5 9Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.96967 3.21967C9.26256 2.92678 9.73744 2.92678 10.0303 3.21967L15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L10.0303 14.7803C9.73744 15.0732 9.26256 15.0732 8.96967 14.7803C8.67678 14.4874 8.67678 14.0126 8.96967 13.7197L13.6893 9L8.96967 4.28033C8.67678 3.98744 8.67678 3.51256 8.96967 3.21967Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className={newStyles.visionleft}>
                <div className={newStyles.greenback}>
                  <Image
                    src={Images.anad_about_lower}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal open={open} onClose={closeModal} className={["addQuanity"]} center>
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
                  newCartData?.find((rtrt) => rtrt.variant_id === items.id) ? (
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
                    (rtrt) => rtrt.id === items.id
                  ) ? (
                  cartItemFromLocalstorage
                    ?.filter((ytyt) => ytyt.id === items.id)
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
      </Modal> */}

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

export default Shop;
