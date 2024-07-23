"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./productdetails.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import ProductImageGallery from "./ProductImageGallery";
import newstyle from "../Home/dailyDeals.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import ProductDescription from "../productDescription/ProductDescription";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import {
  addRemoveWishlist,
  addToCart,
  deleteMyCartData,
  mySingleProductData,
  setCartItems,
  setCartItemsInLocalStorage,
  updateMyCart,
} from "../redux/actions/authActions";
import Login from "../Popups/Login/Login";
import Loading from "../Loading/Loading";
import { Button, Row } from "react-bootstrap";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProductDetails = ({ slug, zipcode }) => {
  const [url, setUrl] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [noOfItemsCount, setNoOfItemsCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState();
  const [add, setAdd] = useState(false);
  const [moreVariant, setMoreVariant] = useState();
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [selectSubcription, setSelectSubcription] = useState();
  const [productData, setProductData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isLoggedIn = useSelector((state) => state?.home?.isLoggedIn);
  let cartItemFromLocalstorage = useSelector(
    (state) => state?.home?.cartItemFromLocalstorage
  );

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

  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();

  const openLoginModal = () => setLoginOpen(true);
  const slideRef = useRef();
  const closeLoginModal = () => setLoginOpen(false);
  const closeModal = () => setOpen(false);
  let newCartData = useSelector((state) => state?.home?.newCartData);
  const dispatch = useDispatch();

  const productRoute = "home";
  const params = new URLSearchParams(url?.split("?")[1]);

  const product_id = +params.get("item");

  const singleproductData = useSelector(
    (state) => state?.home?.singleproductData
  );
  const pageLoading = useSelector((state) => state?.home?.pageLoading);
  const addRemoveWishlistData = useSelector(
    (state) => state?.home?.addRemoveWishlistData
  );

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

  useEffect(() => {
    if (isLoggedIn && selectedVariant) {
      const data2 = newCartData?.find(
        (rtrt) => rtrt?.variant_id === selectedVariant?.id
      );
      if (data2) {
        setNoOfItemsCount(data2.cart_item_qty);
      } else {
        setNoOfItemsCount(1);
      }
    } else {
      const data2 = cartItemFromLocalstorage?.find(
        (rtrt) => rtrt?.variant_id === selectedVariant?.id
      );
      if (data2) {
        setNoOfItemsCount(data2.cart_item_qty);
      } else {
        setNoOfItemsCount(1);
      }
    }
  }, [isLoggedIn, selectedVariant, newCartData, cartItemFromLocalstorage]);

  const wishlistClickHandler = (item) => {
    if (isLoggedIn) {
      dispatch(addRemoveWishlist({ product_id: item.id }));
    } else {
      openLoginModal();
    }
  };

  const addDefaultImg = (ev) => {
    ev.currentTarget.src = "/defaults.png";
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setUrl(window.location.href);
    }
  }, [product_id, params]);

  useEffect(() => {
    const zip_code = localStorage.getItem("currentZipCode");
    const searchParams = new URLSearchParams();
    searchParams.append("zipcode", zip_code);
    if (product_id) {
      dispatch(mySingleProductData(product_id, searchParams, router));
      setSelectedImage();
    }
  }, [product_id, addRemoveWishlistData]);

  useEffect(() => {
    if (singleproductData) {
      const firstVariant = singleproductData?.variants?.[0] ?? null;
      setSelectedVariant(firstVariant);
      setProductData(singleproductData);
    }
  }, [singleproductData]);

  const modifyImageUrl = (url, newWidth, newHeight) => {
    if (!url) return "";
    const urlParts = url.split("/");
    const fileName = urlParts.pop();
    const [originalBaseFileName, dimensions, fileExtension] =
      fileName.split(/_(.*)\.(.*)/);
    const resizedFileName = `${originalBaseFileName}_${newWidth}x${newHeight}.${fileExtension}`;
    urlParts.push(resizedFileName);
    return urlParts.join("/");
  };

  const modifyImageUrlForObject1 = (url) => {
    if (!url) return "";
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_400x400.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
    return resizedUrl;
  };

  const resizedUrls = modifyImageUrlForObject1(singleproductData?.image);

  const modifiedData = singleproductData?.related_product?.map((item) => {
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

  const handleSelectImage = (item) => {
    const resizedUrl = modifyImageUrl(item, 400, 400);
    setSelectedImage(resizedUrl);
  };

  const selectVariantHandler = (item) => {
    setSelectedVariant(item);
  };

  const subClickHandler = () => {
    if (noOfItemsCount > 1) {
      if (isLoggedIn) {
        const data2 = newCartData?.find(
          (rtrt) => rtrt?.variant_id === selectedVariant?.id
        );
        if (
          newCartData?.find((rtrt) => rtrt?.variant_id === selectedVariant?.id)
        ) {
          newCartData = newCartData?.map((item) =>
            item.variant_id === selectedVariant.id
              ? {
                  ...item,
                  cart_item_qty: item.cart_item_qty - 1,
                }
              : item
          );

          if (noOfItemsCount > 1) {
            const updatedata = {
              cart_id: data2.id,
              qty: data2.cart_item_qty - 1,
            };
            dispatch(updateMyCart(updatedata));
            dispatch(setCartItems(newCartData));
          }
        } else {
          if (noOfItemsCount > 1) {
            setNoOfItemsCount(noOfItemsCount - 1);
          }
        }
      } else if (
        cartItemFromLocalstorage?.find(
          (rtrt) => rtrt?.variant_id === selectedVariant?.id
        )
      ) {
        {
          cartItemFromLocalstorage = cartItemFromLocalstorage?.map((item) =>
            item.id === selectedVariant.id
              ? {
                  ...item,
                  cart_item_qty: item.cart_item_qty - 1,
                }
              : item
          );

          dispatch(setCartItemsInLocalStorage(cartItemFromLocalstorage));
        }
      } else {
        if (noOfItemsCount > 1) {
          setNoOfItemsCount(noOfItemsCount - 1);
        }
      }
    }
  };

  const addClickHandler = () => {
    const dataNew = cartItemFromLocalstorage?.find(
      (rtrt) => rtrt?.variant_id === selectedVariant?.id
    );
    if (isLoggedIn) {
      const data2 = newCartData?.find(
        (rtrt) => rtrt?.variant_id === selectedVariant?.id
      );
      if (
        newCartData?.find((rtrt) => rtrt?.variant_id === selectedVariant?.id)
      ) {
        newCartData = newCartData?.map((item) =>
          item.variant_id === selectedVariant.id
            ? {
                ...item,
                cart_item_qty: item.cart_item_qty + 1,
              }
            : item
        );

        if (data2.cart_item_qty < selectedVariant?.availability?.quantity) {
          const updatedata = {
            cart_id: data2.id,
            qty: data2.cart_item_qty + 1,
          };
          dispatch(updateMyCart(updatedata));
          dispatch(setCartItems(newCartData));
        } else {
          toast.error(
            "Quantity can't exceed the available quantity for this item"
          );
        }
      } else {
        if (noOfItemsCount + 1 <= selectedVariant?.availability?.quantity) {
          setNoOfItemsCount(noOfItemsCount + 1);
        } else {
          toast.error(
            "Quantity can't exceed the available quantity for this item"
          );
        }
      }
    } else {
      if (dataNew?.cart_item_qty < selectedVariant?.availability?.quantity) {
        cartItemFromLocalstorage = cartItemFromLocalstorage?.map((item) =>
          item.id === selectedVariant.id
            ? {
                ...item,
                cart_item_qty: item.cart_item_qty + 1,
              }
            : item
        );

        dispatch(setCartItemsInLocalStorage(cartItemFromLocalstorage));
      } else {
        if (noOfItemsCount + 1 <= selectedVariant?.availability?.quantity) {
          setNoOfItemsCount(noOfItemsCount + 1);
        } else {
          toast.error(
            "Quantity can't exceed the available quantity for this item"
          );
        }
      }
    }
  };
  const handleCheckboxChange = (selectedId) => {
    if (!selectedId) {
      setSelectSubcription(data);
    } else {
      setSelectSubcription("");
    }
  };

  const addToCartHandler = (data) => {
    if (isLoggedIn) {
      if (product_id) {
        const data = {
          variant_id: selectedVariant?.id,
          product_id: product_id,
          qty: noOfItemsCount,
          warehouse_distributor_variant_id:
            singleproductData?.variants[0]?.availability?.id,
        };
        dispatch(addToCart(data));
      }
    } else {
      if (
        cartItemFromLocalstorage.find((ele) => {
          return ele.id == singleproductData.id;
        }) === undefined
      ) {
        dispatch(
          setCartItemsInLocalStorage([
            ...cartItemFromLocalstorage,
            {
              ...selectedVariant,
              variant_id: selectedVariant?.id,
              cart_item_qty: noOfItemsCount,
              product_name: singleproductData?.product_name,
              product_id: selectedVariant?.vendor_product_id,
              product_image: singleproductData?.image,
              warehouse_distributor_variant_id:
                selectedVariant?.availability.id,
            },
          ])
        );
      }
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

  const settings = {
    dots: false,
    infinite: singleproductData?.related_product > 5 ? true : false,
    // infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={styles["light_productdetails"]}>
        <div className="container">
          <div className={styles.productdetails_main}>
            <div className={styles.product_image_gallery}>
              <ProductImageGallery
                singleproductData={singleproductData}
                handleSelectImage={handleSelectImage}
                selectedImage={selectedImage}
                isLoggedIn={isLoggedIn}
                dispatch={dispatch}
                addRemoveWishlist={addRemoveWishlist}
                openLoginModal={openLoginModal}
                addDefaultImg={addDefaultImg}
                resizedUrls={resizedUrls}
                selectedVariant={selectedVariant}
              />
            </div>
            <div className={styles.product_info_wrapper}>
              <div className={styles.product_breadcrumbs}>
                <span>
                  {productRoute === "home" ? (
                    <Link href={"/"}>Home</Link>
                  ) : (
                    <Link
                      href={`/shop/?item=${singleproductData?.category?.id}`}
                    >
                      Shop
                    </Link>
                  )}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5"
                  height="11"
                  viewBox="0 0 5 11"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.157568 10.8643C-0.0436482 10.6752 -0.0534543 10.3588 0.135666 10.1576L3.92592 6.12489C4.02469 6.0198 4.02469 5.83734 3.92592 5.73226L0.135667 1.69957C-0.0534536 1.49836 -0.0436474 1.18193 0.157569 0.992807C0.358786 0.803687 0.675216 0.813492 0.864336 1.01471L4.65459 5.04739C5.11514 5.53739 5.11514 6.31975 4.65459 6.80975L0.864336 10.8424C0.675215 11.0436 0.358785 11.0535 0.157568 10.8643Z"
                    fill="#807D7E"
                  />
                </svg>
                <span>
                  <Link href={`/shop/?item=${singleproductData?.category?.id}`}>
                    {singleproductData?.category?.name}
                  </Link>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5"
                  height="11"
                  viewBox="0 0 5 11"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.157568 10.8643C-0.0436482 10.6752 -0.0534543 10.3588 0.135666 10.1576L3.92592 6.12489C4.02469 6.0198 4.02469 5.83734 3.92592 5.73226L0.135667 1.69957C-0.0534536 1.49836 -0.0436474 1.18193 0.157569 0.992807C0.358786 0.803687 0.675216 0.813492 0.864336 1.01471L4.65459 5.04739C5.11514 5.53739 5.11514 6.31975 4.65459 6.80975L0.864336 10.8424C0.675215 11.0436 0.358785 11.0535 0.157568 10.8643Z"
                    fill="#807D7E"
                  />
                </svg>
                <span>
                  {singleproductData?.sub_category?.name
                    ? singleproductData?.sub_category?.name
                    : singleproductData?.name}
                </span>
              </div>
              <h4 className={styles.product_title}>
                {singleproductData?.name}
              </h4>
              <div className={styles.product_ratings}>
                <div className={styles.product_rating_start_div}>
                  {[1, 2, 3, 4, 5].map((star, items) => (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          cursor: "pointer",

                          fill:
                            star <= singleproductData?.avg_rating
                              ? "#EDD146"
                              : "#D9D9D9",
                        }}
                      >
                        <path
                          d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z"
                          fill=""
                        />
                      </svg>
                    </>
                  ))}
                </div>
                <span>{singleproductData?.avg_rating} </span>
                <span className={styles.comment_count}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 5.25C6.58579 5.25 6.25 5.58579 6.25 6C6.25 6.41421 6.58579 6.75 7 6.75V5.25ZM15 6.75C15.4142 6.75 15.75 6.41421 15.75 6C15.75 5.58579 15.4142 5.25 15 5.25V6.75ZM7 9.25C6.58579 9.25 6.25 9.58579 6.25 10C6.25 10.4142 6.58579 10.75 7 10.75V9.25ZM11 10.75C11.4142 10.75 11.75 10.4142 11.75 10C11.75 9.58579 11.4142 9.25 11 9.25V10.75ZM20.782 13.908L21.4503 14.2485V14.2485L20.782 13.908ZM19.908 14.782L20.2485 15.4503L19.908 14.782ZM19.908 1.21799L20.2485 0.549732L20.2485 0.549732L19.908 1.21799ZM20.782 2.09202L21.4503 1.75153V1.75152L20.782 2.09202ZM2.09202 1.21799L2.43251 1.88624L2.43251 1.88624L2.09202 1.21799ZM1.21799 2.09202L1.88624 2.43251L1.88624 2.43251L1.21799 2.09202ZM2.20734 18.3861L2.64003 18.9987L2.64011 18.9986L2.20734 18.3861ZM6.16989 15.5865L5.73712 14.9739H5.73712L6.16989 15.5865ZM1.09027 18.4776L1.70486 18.0477H1.70486L1.09027 18.4776ZM2.10335 18.4483L1.7683 17.7773L1.76829 17.7773L2.10335 18.4483ZM1.42692 18.6856L1.3173 19.4276H1.3173L1.42692 18.6856ZM2.16983 18.412L1.76547 17.7803L1.76536 17.7804L2.16983 18.412ZM2.14376 18.4276L1.7785 17.7725L1.77845 17.7725L2.14376 18.4276ZM7.26828 15.034L7.40589 15.7712L7.40589 15.7712L7.26828 15.034ZM6.80048 15.1825L7.11351 15.8641L7.11352 15.8641L6.80048 15.1825ZM7 6.75H15V5.25H7V6.75ZM7 10.75H11V9.25H7V10.75ZM4.2 1.75H17.8V0.25H4.2V1.75ZM20.25 4.2V11.8H21.75V4.2H20.25ZM20.25 11.8C20.25 12.3724 20.2494 12.7566 20.2252 13.0525C20.2018 13.3396 20.1599 13.4769 20.1138 13.5675L21.4503 14.2485C21.6221 13.9112 21.6892 13.5546 21.7203 13.1747C21.7506 12.8035 21.75 12.3477 21.75 11.8H20.25ZM17.8 15.75C18.3477 15.75 18.8035 15.7506 19.1747 15.7203C19.5546 15.6892 19.9112 15.6221 20.2485 15.4503L19.5675 14.1138C19.4769 14.1599 19.3396 14.2018 19.0525 14.2252C18.7566 14.2494 18.3724 14.25 17.8 14.25V15.75ZM20.1138 13.5675C19.9939 13.8027 19.8027 13.9939 19.5675 14.1138L20.2485 15.4503C20.7659 15.1866 21.1866 14.7659 21.4503 14.2485L20.1138 13.5675ZM17.8 1.75C18.3724 1.75 18.7566 1.75058 19.0525 1.77476C19.3396 1.79822 19.4769 1.8401 19.5675 1.88624L20.2485 0.549732C19.9112 0.377888 19.5546 0.310777 19.1747 0.279739C18.8035 0.249417 18.3477 0.25 17.8 0.25V1.75ZM21.75 4.2C21.75 3.65232 21.7506 3.19646 21.7203 2.82533C21.6892 2.44545 21.6221 2.08879 21.4503 1.75153L20.1138 2.43251C20.1599 2.52307 20.2018 2.66035 20.2252 2.94748C20.2494 3.24336 20.25 3.62757 20.25 4.2H21.75ZM19.5675 1.88624C19.8027 2.00608 19.9939 2.19731 20.1138 2.43251L21.4503 1.75152C21.1866 1.23408 20.7659 0.813385 20.2485 0.549732L19.5675 1.88624ZM4.2 0.25C3.65232 0.25 3.19646 0.249417 2.82533 0.279739C2.44544 0.310777 2.08879 0.377888 1.75153 0.549732L2.43251 1.88624C2.52307 1.8401 2.66035 1.79822 2.94748 1.77476C3.24336 1.75058 3.62757 1.75 4.2 1.75V0.25ZM1.75 4.2C1.75 3.62757 1.75058 3.24336 1.77476 2.94748C1.79822 2.66035 1.8401 2.52307 1.88624 2.43251L0.549732 1.75153C0.377888 2.08879 0.310777 2.44545 0.279739 2.82533C0.249417 3.19646 0.25 3.65232 0.25 4.2H1.75ZM1.75153 0.549732C1.23408 0.813384 0.813384 1.23408 0.549732 1.75153L1.88624 2.43251C2.00608 2.19731 2.19731 2.00608 2.43251 1.88624L1.75153 0.549732ZM17.8 14.25H8.01639V15.75H17.8V14.25ZM2.64011 18.9986L6.60267 16.199L5.73712 14.9739L1.77457 17.7736L2.64011 18.9986ZM0.25 17.7056C0.25 17.9052 0.249252 18.1067 0.264406 18.2723C0.27946 18.4367 0.317386 18.6811 0.47568 18.9074L1.70486 18.0477C1.77289 18.145 1.76568 18.2176 1.75816 18.1355C1.75499 18.1009 1.75258 18.051 1.7513 17.976C1.75002 17.9014 1.75 17.8146 1.75 17.7056H0.25ZM1.76829 17.7773C1.68118 17.8208 1.61175 17.8552 1.5523 17.8832C1.49244 17.9114 1.4529 17.9283 1.42597 17.9384C1.36294 17.9622 1.42374 17.927 1.53654 17.9437L1.3173 19.4276C1.57835 19.4661 1.80366 19.3991 1.95491 19.3421C2.1054 19.2854 2.27432 19.2013 2.43841 19.1193L1.76829 17.7773ZM0.475679 18.9074C0.672743 19.1892 0.977163 19.3773 1.3173 19.4276L1.53654 17.9437C1.60457 17.9537 1.66545 17.9913 1.70486 18.0477L0.475679 18.9074ZM1.75 17.7056V4.2H0.25V17.7056H1.75ZM1.77465 17.7735C1.76983 17.7769 1.76637 17.7793 1.76338 17.7814C1.76043 17.7835 1.75887 17.7846 1.75804 17.7852C1.75672 17.7861 1.76002 17.7838 1.76547 17.7803L2.5742 19.0436C2.60147 19.0262 2.62688 19.008 2.64003 18.9987L1.77465 17.7735ZM2.4384 19.1193C2.45307 19.112 2.4808 19.0983 2.50907 19.0826L1.77845 17.7725C1.78396 17.7695 1.78751 17.7677 1.78623 17.7683C1.78538 17.7688 1.78372 17.7696 1.78053 17.7712C1.77732 17.7728 1.77354 17.7747 1.7683 17.7773L2.4384 19.1193ZM1.76536 17.7804C1.76971 17.7776 1.77403 17.775 1.7785 17.7725L2.50902 19.0826C2.53112 19.0703 2.55295 19.0572 2.5743 19.0435L1.76536 17.7804ZM8.01639 14.25C7.66604 14.25 7.3965 14.2471 7.13067 14.2967L7.40589 15.7712C7.50388 15.7529 7.6118 15.75 8.01639 15.75V14.25ZM6.60266 16.199C6.9331 15.9656 7.02294 15.9057 7.11351 15.8641L6.48745 14.501C6.2417 14.6139 6.02325 14.7718 5.73712 14.9739L6.60266 16.199ZM7.13067 14.2967C6.90869 14.3381 6.69265 14.4067 6.48745 14.501L7.11352 15.8641C7.20679 15.8212 7.30499 15.7901 7.40589 15.7712L7.13067 14.2967Z"
                      fill="#4DBA4D"
                    />
                  </svg>
                  <h6>
                    <Link
                      style={{ color: "#000" }}
                      href="#productComments"
                      scroll={true}
                      onClick={() => setCurrentTab(1)}
                    >
                      {singleproductData?.review_count} comment
                    </Link>
                  </h6>
                </span>
              </div>
              <div className={styles.product_sizes}>
                <h6 className={styles.product_sizes_title}>Select Size</h6>
                <div className={styles.sizediv}>
                  {singleproductData?.variants?.map((items, key) => (
                    <div
                      className={
                        selectedVariant?.id == items.id ||
                        selectedVariant == items.id
                          ? styles.sizePriceDivActive
                          : styles.sizePriceDiv
                      }
                      onClick={() => selectVariantHandler(items)}
                    >
                      <p>
                        {items?.variant_qty} {items?.variant_qty_type}
                      </p>

                      <span>
                        {" "}
                        <del></del>$ {items?.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.product_prizes}>
                {singleproductData?.availability?.is_available === false ? (
                  ""
                ) : (
                  <>
                    <h6 className={styles.product_prize}>
                      {selectedVariant?.discount_off !== "0% OFF" && (
                        <del>${selectedVariant?.market_price}</del>
                      )}{" "}
                      ${selectedVariant?.price}
                    </h6>
                    <div className={styles.product_qty}>
                      <button onClick={subClickHandler}>-</button>
                      <span>{noOfItemsCount}</span>
                      <button onClick={addClickHandler}>+</button>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.product_buttons}>
                {isLoggedIn ? (
                  newCartData?.find(
                    (rtrt) => rtrt?.variant_id === selectedVariant?.id
                  ) ? (
                    <>
                      <div className={styles.addbtndiv}>
                        <button
                          // onClick={() => selectSizeHandler(items)}
                          style={{
                            background: "#65afdb",
                            outline: "none",
                          }}
                        >
                          Added
                        </button>
                      </div>
                    </>
                  ) : selectedVariant?.availability?.is_available === false ? (
                    <p className={styles.notAvil}>Not Available</p>
                  ) : (
                    <button onClick={addToCartHandler}>Add to Cart</button>
                  )
                ) : cartItemFromLocalstorage?.find(
                    (rtrt) => rtrt?.variant_id === selectedVariant?.id
                  ) ? (
                  <>
                    <div className={styles.addbtndiv}>
                      <button
                        style={{
                          background: "#65afdb",
                          outline: "none",
                        }}
                      >
                        Added
                      </button>
                    </div>
                  </>
                ) : singleproductData?.availability?.is_available === false ? (
                  <p className={styles.notAvil}>Not Available</p>
                ) : (
                  <button onClick={addToCartHandler}>Add to Cart</button>
                )}
              </div>
              <div className={styles.product_line}></div>
              {singleproductData?.subscriptionplan?.length > 0 && (
                <div className={styles.subscription_div}>
                  <h1>Select Subscription Plan</h1>
                  <div className={styles.wrap_subscription}>
                    {singleproductData?.subscriptionplan &&
                      singleproductData?.subscriptionplan.map((items, key) => (
                        <div className={styles.subscription_button}>
                          <div className={styles.inputLabel}>
                            {items.name}
                            <input
                              type="radio"
                              name="subscriptionPlan"
                              value={items.id}
                              checked={selectedId}
                              onChange={() => {
                                handleCheckboxChange(items?.id);
                              }}
                            />
                            {/* </label> */}
                            <span
                              className={`${styles.checkmark} ${
                                selectedId === items?.id ? styles.checked : ""
                              }`}
                            ></span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <ul className={styles.product_shipping_type}>
                <li>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22" cy="22" r="22" fill="#f6f6f6" />
                    <path
                      d="M15 18.75H30M18 26.25H21M24 26.25H27M17.4 30H27.6C28.4401 30 28.8601 30 29.181 29.7956C29.4632 29.6159 29.6927 29.329 29.8365 28.9762C30 28.5751 30 28.0501 30 27V18C30 16.9499 30 16.4249 29.8365 16.0238C29.6927 15.671 29.4632 15.3841 29.181 15.2044C28.8601 15 28.4401 15 27.6 15H17.4C16.5599 15 16.1399 15 15.819 15.2044C15.5368 15.3841 15.3073 15.671 15.1635 16.0238C15 16.4249 15 16.9499 15 18V27C15 28.0501 15 28.5751 15.1635 28.9762C15.3073 29.329 15.5368 29.6159 15.819 29.7956C16.1399 30 16.5599 30 17.4 30Z"
                      stroke="black"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Secure payment</span>
                </li>
                <li>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22" cy="22" r="22" fill="#F6F6F6" />
                    <path
                      d="M25.6349 30H18.3651C17.3613 30 16.5476 29.2007 16.5476 28.2147V21.5796C16.5476 21.0634 15.9122 20.8049 15.5406 21.1699C15.2014 21.5032 14.6205 21.3203 14.5417 20.8555L14.0248 17.8091C13.9021 17.0857 14.2422 16.3621 14.8825 15.9847L18.1965 14.0315C18.293 13.9746 18.4175 13.9966 18.4878 14.0829C20.2884 16.2938 23.7116 16.2938 25.5122 14.0829C25.5825 13.9966 25.707 13.9746 25.8035 14.0315L29.1175 15.9847C29.7578 16.3621 30.0979 17.0857 29.9752 17.8091L29.4583 20.8555C29.3795 21.3203 28.7986 21.5032 28.4594 21.1699C28.0878 20.8049 27.4524 21.0634 27.4524 21.5796V28.2147C27.4524 29.2007 26.6387 30 25.6349 30Z"
                      stroke="#3C4242"
                      stroke-width="1.1"
                    />
                  </svg>

                  <span>Size & Fit</span>
                </li>
                <li>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22" cy="22" r="22" fill="#f6f6f6" />
                    <path
                      d="M23.8 26.6667V15.4667C23.8 15.2089 23.5985 15 23.35 15H13.45C13.2015 15 13 15.2089 13 15.4667V26.6667C13 26.9244 13.2015 27.1333 13.45 27.1333H14.8M23.8 26.6667C23.8 26.9244 23.5985 27.1333 23.35 27.1333H18.4M23.8 26.6667V18.2667C23.8 18.0089 24.0015 17.8 24.25 17.8H27.2136C27.333 17.8 27.4474 17.8492 27.5318 17.9367L30.8682 21.3967C30.9526 21.4842 31 21.6029 31 21.7266V26.6667C31 26.9244 30.7985 27.1333 30.55 27.1333H29.2M23.8 26.6667C23.8 26.9244 24.0015 27.1333 24.25 27.1333H25.6M14.8 27.1333C14.8 28.1643 15.6059 29 16.6 29C17.5941 29 18.4 28.1643 18.4 27.1333M14.8 27.1333C14.8 26.1024 15.6059 25.2667 16.6 25.2667C17.5941 25.2667 18.4 26.1024 18.4 27.1333M25.6 27.1333C25.6 28.1643 26.4059 29 27.4 29C28.3941 29 29.2 28.1643 29.2 27.1333M25.6 27.1333C25.6 26.1024 26.4059 25.2667 27.4 25.2667C28.3941 25.2667 29.2 26.1024 29.2 27.1333"
                      stroke="black"
                      strokeWidth="1.1"
                    />
                  </svg>

                  <span>Free shipping</span>
                </li>
                <li>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22" cy="22" r="22" fill="#f6f6f6" />
                    <path
                      d="M18.4444 28.2222C18.4444 29.2041 17.6485 30 16.6667 30C15.6848 30 14.8889 29.2041 14.8889 28.2222C14.8889 27.2404 15.6848 26.4444 16.6667 26.4444C17.6485 26.4444 18.4444 27.2404 18.4444 28.2222ZM18.4444 28.2222H25.5556C26.5374 28.2222 27.3333 27.4263 27.3333 26.4444V22.8889M25.5556 15.7778C25.5556 16.7596 26.3515 17.5556 27.3333 17.5556C28.3152 17.5556 29.1111 16.7596 29.1111 15.7778C29.1111 14.7959 28.3152 14 27.3333 14C26.3515 14 25.5556 14.7959 25.5556 15.7778ZM25.5556 15.7778H18.4444C17.4626 15.7778 16.6667 16.5737 16.6667 17.5556V21.1111M30 24.6667L27.6476 22.1398C27.474 21.9534 27.1926 21.9534 27.0191 22.1398L24.6667 24.6667M19.3333 19.3333L16.9809 21.8602C16.8074 22.0466 16.526 22.0466 16.3524 21.8602L14 19.3333"
                      stroke="black"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span>Free Shipping & Return</span>
                </li>
              </ul>
            </div>
          </div>
          <ProductDescription
            singleproductData={singleproductData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            resizedUrls={resizedUrls}
          />
          <div className={styles.related_products}>
            {singleproductData?.related_product?.length > 0 && (
              <h1 className={styles.related_title}>Related Products</h1>
            )}
            <div className={styles.whole_slider}>
              {singleproductData?.related_product?.length > 5 && (
                <div className={styles.Buttons}>
                  <Button
                    className={styles.btn_cat_1}
                    onClick={() => slideRef.current.slickPrev()}
                  >
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 14 24"
                      fill="#4DBA4D"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.btnsvg}
                    >
                      <path d="M14 1.41458L12.4906 0L0 11.6667L12.4906 23.3333L14 21.926L3.02604 11.6667L14 1.41458Z" />
                    </svg>
                  </Button>
                </div>
              )}

              <Row className={styles.Cardrow}>
                <Slider {...settings} ref={slideRef}>
                  {singleproductData?.related_product &&
                    modifiedData?.map((items, key) => (
                      <div className={styles.div_of_card}>
                        <div className={styles.card_main_div}>
                          <Link
                            href={{
                              pathname: "/product-details",
                              query: { item: items.id },
                            }}
                          >
                            <div className={styles.carddiv}>
                              <img
                                src={items?.image}
                                alt=""
                                onError={(ev) => addDefaultImg(ev)}
                              />
                            </div>
                          </Link>
                          <div className={styles.discount_carddiv}>
                            {items?.variants[0]?.discount_off !== "0% OFF" && (
                              <button>
                                {items?.variants[0]?.discount_off}
                              </button>
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
                                width="20"
                                height="18"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => wishlistClickHandler(items)}
                              >
                                <path
                                  d="M9.91667 1.16667C8.77407 1.16667 7.74113 1.63593 7 2.39223C6.25894 1.636 5.22593 1.16667 4.08333 1.16667C1.82819 1.16667 0 2.99486 0 5.25C0 7.50515 2.33333 9.33334 7 12.8333C11.6667 9.33334 14 7.50515 14 5.25C14 2.99486 12.1718 1.16667 9.91667 1.16667Z"
                                  stroke="#4DBA4D"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        {isLoggedIn ? (
                          newCartData?.find(
                            (rtrt) => rtrt.product_id === items.id
                          ) ? (
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
                          ) : (
                            <>
                              {items?.availability?.is_available === false ? (
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
                        ) : cartItemFromLocalstorage?.find(
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

                                fill:
                                  star <= singleproductData?.avg_rating
                                    ? "gold"
                                    : "#D9D9D9",
                              }}
                            >
                              <path d="M22.4213 9.39C22.245 8.862 21.7995 8.48325 21.2595 8.40075L15.7778 7.5795L13.3103 2.3415C13.065 1.8225 12.5633 1.5 12 1.5C11.4368 1.5 10.935 1.8225 10.6898 2.3415L8.25826 7.56075L2.74051 8.40075C2.20051 8.48325 1.75576 8.862 1.57876 9.39C1.39801 9.93225 1.53151 10.5203 1.92751 10.9245L5.91826 15.009L4.97551 20.766C4.88176 21.3412 5.11426 21.9045 5.58376 22.2352C6.03526 22.5555 6.61576 22.587 7.09876 22.3207L11.9655 19.6027L16.9013 22.3207C17.3858 22.587 17.9648 22.554 18.4163 22.2352C18.8858 21.9045 19.119 21.3412 19.0245 20.766L18.0803 15.0015L22.0725 10.9245C22.4685 10.5203 22.602 9.93225 22.4213 9.39Z" />
                            </svg>
                          ))}
                        </div>
                        <div className={styles.priceAddQunty}>
                          {/* <div className={styles.onlyQuantity}></div> */}
                          <div className={styles.priceAndAdd}>
                            {items?.availability?.is_available === false ? (
                              /* <p className={styles?.notAvil}>
                              {items?.is_available}
                            </p> */
                              ""
                            ) : (
                              <p>
                                {" "}
                                {items?.variants[0]?.market_price !==
                                  items?.variants[0]?.price && (
                                  <del>${items?.variants[0]?.market_price}</del>
                                )}{" "}
                                ${items?.variants[0]?.price}{" "}
                              </p>
                            )}
                          </div>{" "}
                        </div>
                      </div>
                    ))}
                </Slider>
              </Row>
              {singleproductData?.related_product?.length > 5 && (
                <div className={styles.Buttons}>
                  <Button
                    className={styles.btn_cat_2}
                    onClick={() => slideRef.current.slickNext()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="16"
                      viewBox="0 0 14 24"
                      fill="#4DBA4D"
                      className={styles.btnsvg}
                    >
                      <path d="M0 1.41458L1.50937 0L14 11.6667L1.50937 23.3333L0 21.926L10.974 11.6667L0 1.41458Z" />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
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
                        onError={(ev) => addDefaultImg(ev)}
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
                            onError={(ev) => addDefaultImg(ev)}
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

export default ProductDetails;
