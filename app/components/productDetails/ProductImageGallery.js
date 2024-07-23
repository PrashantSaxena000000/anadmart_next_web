"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./imagegallery.module.scss";
// import { Magnifier } from "@niklasmaki/react-image-magnifiers/dist/Magnifier";
// import { GlassMagnifier } from "@niklasmaki/react-image-magnifiers/dist/GlassMagnifier";

import { SideBySideMagnifier } from "react-image-magnifiers";
import ReactImageMagnify from "react-image-magnify";
import { Opacity } from "@mui/icons-material";

const ProductImageGallery = ({
  singleproductData,
  handleSelectImage,
  selectedImage,
  isLoggedIn,
  dispatch,
  addRemoveWishlist,
  openLoginModal,
  addDefaultImg,
  resizedUrls,
  selectedVariant,
}) => {
  const [windowWidth, setWindowWidth] = useState();

  const galleryRef = useRef();
  const magnifyRef = useRef(null);

  const scrollUp = () => {
    galleryRef.current.scrollTop -= 100;
  };

  const scrollDown = () => {
    galleryRef.current.scrollTop += 100;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    galleryRef.current.style.overflow = "auto";
  }, []);
  const wishlistClickHandler1 = (singleproductData) => {
    if (isLoggedIn) {
      dispatch(addRemoveWishlist({ product_id: singleproductData.id }));
    } else {
      openLoginModal();
    }
  };

  const modifiedData = singleproductData?.gallery_image?.map((item) => {
    const urlParts = item?.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_50x50.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");

    return resizedUrl;
  });

  const handleMouseEnter = () => {
    const lens = magnifyRef.current.querySelector(".magnify-lens");
    lens.style.backgroundImage = `url(${selectedImage})`;
    lens.style.opacity = 1;
    lens.style.transition = "opacity 300ms ease-in 0s";
  };

  return (
    <div className={styles["imagegallery_wrapper"]}>
      <div className={styles.galleryimage_thumbnails}>
        {modifiedData?.length > 4 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            top="10px"
            onClick={scrollUp}
            className={styles.gallery_circle}
          >
            <g filter="url(#filter0_d_1722_2145)">
              <circle cx="15.085" cy="15.085" r="12.085" />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.7123 17.1696C19.3914 17.3664 18.9329 17.3167 18.6882 17.0586L15.042 13.2118C14.9513 13.1635 14.8187 13.1635 14.728 13.2118L11.0818 17.0586C10.8371 17.3167 10.3786 17.3664 10.0577 17.1696C9.73679 16.9728 9.67499 16.604 9.91967 16.3458L13.5784 12.4858C13.6211 12.4407 13.6857 12.3784 13.7752 12.3188C14.4128 11.8937 15.3572 11.8937 15.9948 12.3188C16.0843 12.3784 16.1489 12.4407 16.1916 12.4858L19.8503 16.3458C20.095 16.604 20.0332 16.9728 19.7123 17.1696Z"
              fill="#4DBA4D"
            />
            <defs>
              <filter
                id="filter0_d_1722_2145"
                x="0.732041"
                y="0.732041"
                width="30.2178"
                height="30.2179"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="0.755986" dy="0.755986" />
                <feGaussianBlur stdDeviation="1.51197" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1722_2145"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1722_2145"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div className={styles.thumbnail_gallery} ref={galleryRef}>
          {modifiedData?.map((items, key) => (
            <div className={styles.product_thumbnail}>
              <img
                src={items}
                alt=""
                onError={(ev) => addDefaultImg(ev)}
                onClick={() => handleSelectImage(items)}
                key={key}
              />
            </div>
          ))}
        </div>

        {modifiedData?.length > 4 && (
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={scrollDown}
            className={styles.gallery_circle2}
          >
            <g filter="url(#filter0_d_1722_2148)">
              <circle
                cx="14.0849"
                cy="13.915"
                r="11.085"
                transform="rotate(180 14.0849 13.915)"
              />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.45763 11.8304C9.77856 11.6336 10.2371 11.6833 10.4817 11.9414L14.1279 15.7882C14.2187 15.8365 14.3512 15.8365 14.442 15.7882L18.0881 11.9414C18.3328 11.6833 18.7913 11.6336 19.1122 11.8304C19.4331 12.0272 19.4949 12.396 19.2503 12.6542L15.5915 16.5142C15.5489 16.5593 15.4842 16.6216 15.3947 16.6812C14.7571 17.1063 13.8127 17.1063 13.1751 16.6812C13.0856 16.6216 13.021 16.5593 12.9783 16.5142L9.31959 12.6542C9.07491 12.396 9.13671 12.0272 9.45763 11.8304Z"
              fill="#4dba4d"
            />
            <defs>
              <filter
                id="filter0_d_1722_2148"
                x="0.732041"
                y="0.562058"
                width="28.2178"
                height="28.2179"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="0.755986" dy="0.755986" />
                <feGaussianBlur stdDeviation="1.51197" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1722_2148"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1722_2148"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}
      </div>
      <div className={styles.product_image}>
        <div className={styles.discount_carddiv}>
          {selectedVariant?.discount_off !== "0% OFF" && (
            <button>{selectedVariant?.discount_off}</button>
          )}
        </div>
        <div className={styles.wishlistIcon}>
          {singleproductData?.whislist == true ? (
            <svg
              width="20"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => wishlistClickHandler1(singleproductData)}
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
              onClick={() => wishlistClickHandler1(singleproductData)}
            >
              <path
                d="M9.91667 1.16667C8.77407 1.16667 7.74113 1.63593 7 2.39223C6.25894 1.636 5.22593 1.16667 4.08333 1.16667C1.82819 1.16667 0 2.99486 0 5.25C0 7.50515 2.33333 9.33334 7 12.8333C11.6667 9.33334 14 7.50515 14 5.25C14 2.99486 12.1718 1.16667 9.91667 1.16667Z"
                stroke="#4DBA4D"
              />
            </svg>
          )}
        </div>
        <div style={{ position: "relative" }}>
          {windowWidth > 1024 ? (
            <ReactImageMagnify
              ref={magnifyRef}
              {...{
                smallImage: {
                  isFluidWidth: true,
                  src: selectedImage ? selectedImage : resizedUrls,
                },
                largeImage: {
                  src: selectedImage ? selectedImage : resizedUrls,
                  width: 1800,
                  height: 1800,
                },
                shouldUsePositiveSpaceLens: true,
                enlargedImageContainerStyle: {
                  zIndex: 9999,
                  marginLeft: "60px",
                  top: "-115px",
                  backgroundColor: "#fff",
                },
                lensStyle: {
                  // transition: "opacity 300ms ease-in 0s",
                  // className: "magnify_lens",
                },
                enlargedImageStyle: {
                  borderRadius: "8px",
                },
                enlargedImageContainerDimensions: {
                  width: "150%",
                  height: "157%",
                },
              }}
              onMouseEnter={handleMouseEnter}
            />
          ) : (
            <img
              src={selectedImage ? selectedImage : resizedUrls}
              alt="Small Image"
              style={{ width: "100%" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;

// import React from "react";
// import ImageGallery from "react-image-gallery";
// // import stylesheet if you're not already using CSS @import
// import "react-image-gallery/styles/css/image-gallery.css";

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];

// const ProductImageGallery = () => {
//   return (
//     <ImageGallery
//       items={images}
//       thumbnailPosition="left"
//       showBullets={false}
//       showPlayButton={false}
//       showFullscreenButton={false}
//       autoPlay={false}
//       showNav={false}
//       isRTL={true}
//     />
//   );
// };

// export default ProductImageGallery;
