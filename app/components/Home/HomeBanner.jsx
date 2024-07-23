import React, { useEffect, useState } from "react";
import styles from "./banner.module.scss";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeBanner = ({ myhopageData, isLoading, setIsLoading }) => {
  // const modifyImageUrlForObject1 = (url) => {
  //   if (!url) return "";

  //   const urlParts = url.split("/");
  //   const fileName = urlParts[urlParts.length - 1];
  //   const fileNameParts = fileName.split(".");
  //   const fileExtension = fileNameParts.pop();
  //   const baseFileName = fileNameParts.join(".");
  //   const resizedFileName = `${baseFileName}_230x230.${fileExtension}`;
  //   const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
  //   return resizedUrl;
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const modifyImageUrlForObject1 = (url) => {
    if (!url) return "";
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_230.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
    return resizedUrl;
  };

  const modifyImageUrlForObject2 = (url) => {
    if (!url) return "";

    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_805.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
    return resizedUrl;
  };
  const modifyImageUrlForObject3 = (url) => {
    if (!url) return "";

    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_230.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
    return resizedUrl;
  };
  const modifyImageUrlForObject4 = (url) => {
    if (!url) return "";

    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_230.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
    return resizedUrl;
  };
  const modifyImageUrlForObject5 = (url) => {
    if (!url) return "";

    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_230.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");
    return resizedUrl;
  };

  const leftTop = modifyImageUrlForObject1(
    myhopageData?.upper_left_binner_image
  );

  const addDefaultImg = (ev) => {
    ev.currentTarget.src = "/defaults.png";
  };
  const leftBottom = modifyImageUrlForObject3(
    myhopageData?.lower_left_binner_image
  );
  const middle = modifyImageUrlForObject2(myhopageData?.upper_iamge_middle);

  const rightTop = modifyImageUrlForObject4(
    myhopageData?.upper_right_binner_image
  );
  const rightBottom = modifyImageUrlForObject5(
    myhopageData?.lower_right_binner_image
  );

  return (
    // <>
    //   <div className={styles.home_banner}>
    //     <div className="container">
    //       <div className={styles.home_allsectn}>
    //         <div className={styles.left_side}>
    //           <a
    //             href={
    //               myhopageData?.upper_left_binner_id
    //                 ? `${
    //                     myhopageData?.upper_left_binner_type === "Category"
    //                       ? "/shop"
    //                       : "/product-details"
    //                   }?item=${myhopageData?.upper_left_binner_id}`
    //                 : "#"
    //             }
    //           >
    //             <img src={leftTop} alt="" onError={(ev) => addDefaultImg(ev)} />
    //           </a>
    //           <a
    //             href={
    //               myhopageData?.lower_left_binner_id
    //                 ? `${
    //                     myhopageData?.lower_left_binner_type === "Category"
    //                       ? "/shop"
    //                       : "/product-details"
    //                   }?item=${myhopageData?.lower_left_binner_id}`
    //                 : "#"
    //             }
    //           >
    //             <img
    //               src={leftBottom}
    //               alt=""
    //               onError={(ev) => addDefaultImg(ev)}
    //             />
    //           </a>
    //         </div>
    //         <div className={styles.mid_side}>
    //           {/* <Link
    //             href={
    //               myhopageData?.upper_iamge_middle === true
    //                 ? {
    //                     pathname:
    //                       myhopageData?.upper_left_binner_type == "Category"
    //                         ? "/shop"
    //                         : "/product-details",
    //                     query: { item: myhopageData?.upper_iamge_middle },
    //                   }
    //                 : "#"
    //             }
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //             }}
    //           >
    //             <img src={myhopageData?.upper_iamge_middle} alt=""  onError={(ev) => addDefaultImg(ev)}/>
    //           </Link> */}

    //           <a
    //             href={
    //               myhopageData?.upper_middle_type_id
    //                 ? `${
    //                     myhopageData?.upper_left_binner_type === "Category"
    //                       ? "/shop"
    //                       : "/product-details"
    //                   }?item=${myhopageData?.upper_middle_type_id}`
    //                 : "#"
    //             }
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //             }}
    //           >
    //             <img src={middle} alt="" onError={(ev) => addDefaultImg(ev)} />
    //           </a>
    //           {/* <div className={styles.midpartText}>
    //             <h4>YOUR LUXURY VAPING EXPERIENCE</h4>
    //             <h2>LUXE II</h2>
    //             <button>Shop Now</button>
    //           </div> */}
    //         </div>
    //         <div className={styles.right_side}>
    //           <a
    //             href={
    //               myhopageData?.upper_right_binner_id
    //                 ? `${
    //                     myhopageData?.upper_right_binner_type === "Category"
    //                       ? "/shop"
    //                       : "/product-details"
    //                   }?item=${myhopageData?.upper_right_binner_id}`
    //                 : "#"
    //             }
    //           >
    //             <img
    //               src={rightTop}
    //               alt=""
    //               onError={(ev) => addDefaultImg(ev)}
    //             />
    //           </a>
    //           <a
    //             href={
    //               myhopageData?.lower_right_binner_id
    //                 ? `${
    //                     myhopageData?.lower_right_binner_type === "Category"
    //                       ? "/shop"
    //                       : "/product-details"
    //                   }?item=${myhopageData?.lower_right_binner_id}`
    //                 : "#"
    //             }
    //           >
    //             <img
    //               src={rightBottom}
    //               alt=""
    //               onError={(ev) => addDefaultImg(ev)}
    //             />
    //           </a>
    //         </div>
    //         <div className={styles.webStart}>
    //           <img
    //             src={myhopageData?.upper_iamge_1}
    //             alt=""
    //             onError={addDefaultImg}
    //           />
    //           <img
    //             src={myhopageData?.upper_iamge_2}
    //             alt=""
    //             onError={addDefaultImg}
    //           />
    //           <img
    //             src={myhopageData?.upper_iamge_3}
    //             alt=""
    //             onError={addDefaultImg}
    //           />
    //           <img
    //             src={myhopageData?.upper_iamge_4}
    //             alt=""
    //             onError={addDefaultImg}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>

    <>
      <div className={styles.home_banner}>
        <div className="container">
          <div className={styles.home_allsectn}>
            <div className={styles.left_side}>
              <a
                href={
                  myhopageData?.upper_left_binner_id
                    ? `${
                        myhopageData?.upper_left_binner_type === "Category"
                          ? "/shop"
                          : "/product-details"
                      }?item=${myhopageData?.upper_left_binner_id}`
                    : "#"
                }
              >
                {isLoading ? (
                  <Skeleton height={200} width={200} />
                ) : (
                  <img
                    src={leftTop}
                    alt=""
                    onError={(ev) => addDefaultImg(ev)}
                  />
                )}
              </a>
              <a
                href={
                  myhopageData?.lower_left_binner_id
                    ? `${
                        myhopageData?.lower_left_binner_type === "Category"
                          ? "/shop"
                          : "/product-details"
                      }?item=${myhopageData?.lower_left_binner_id}`
                    : "#"
                }
              >
                {isLoading ? (
                  <Skeleton height={200} />
                ) : (
                  <img
                    src={leftBottom}
                    alt=""
                    onError={(ev) => addDefaultImg(ev)}
                  />
                )}
              </a>
            </div>
            <div className={styles.mid_side}>
              <a
                href={
                  myhopageData?.upper_middle_type_id
                    ? `${
                        myhopageData?.upper_left_binner_type === "Category"
                          ? "/shop"
                          : "/product-details"
                      }?item=${myhopageData?.upper_middle_type_id}`
                    : "#"
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <Skeleton height={400} width={600} />
                ) : (
                  <img
                    src={middle}
                    alt=""
                    onError={(ev) => addDefaultImg(ev)}
                  />
                )}
              </a>
              {/* <div className={styles.midpartText}>
              <h4>YOUR LUXURY VAPING EXPERIENCE</h4>
              <h2>LUXE II</h2>
              <button>Shop Now</button>
            </div> */}
            </div>
            <div className={styles.right_side}>
              <a
                href={
                  myhopageData?.upper_right_binner_id
                    ? `${
                        myhopageData?.upper_right_binner_type === "Category"
                          ? "/shop"
                          : "/product-details"
                      }?item=${myhopageData?.upper_right_binner_id}`
                    : "#"
                }
              >
                {isLoading ? (
                  <Skeleton height={200} width={200} />
                ) : (
                  <img
                    src={rightTop}
                    alt=""
                    onError={(ev) => addDefaultImg(ev)}
                  />
                )}
              </a>
              <a
                href={
                  myhopageData?.lower_right_binner_id
                    ? `${
                        myhopageData?.lower_right_binner_type === "Category"
                          ? "/shop"
                          : "/product-details"
                      }?item=${myhopageData?.lower_right_binner_id}`
                    : "#"
                }
              >
                {isLoading ? (
                  <Skeleton height={200} />
                ) : (
                  <img
                    src={rightBottom}
                    alt=""
                    onError={(ev) => addDefaultImg(ev)}
                  />
                )}
              </a>
            </div>
            <div className={styles.webStart}>
              {isLoading ? (
                <>
                  <Skeleton height={200} width={200} />
                  <Skeleton height={200} width={200} />
                  <Skeleton height={200} width={200} />
                  <Skeleton height={200} width={200} />
                </>
              ) : (
                <>
                  <img
                    src={myhopageData?.upper_iamge_1}
                    alt=""
                    onError={addDefaultImg}
                  />
                  <img
                    src={myhopageData?.upper_iamge_2}
                    alt=""
                    onError={addDefaultImg}
                  />
                  <img
                    src={myhopageData?.upper_iamge_3}
                    alt=""
                    onError={addDefaultImg}
                  />
                  <img
                    src={myhopageData?.upper_iamge_4}
                    alt=""
                    onError={addDefaultImg}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
