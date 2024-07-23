import React, { useEffect, useState } from "react";
import styles from "./productComments.module.scss";
import { Modal } from "react-responsive-modal";
import Paginations from "../../common/pagination/Pagination";
import { fetchUserCommentesData } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Images from "../Images/Images";
import Image from "next/image";

const ProductComments = ({ singleproductData }) => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [currentSection, SetCurrentSection] = useState();
  const [feedBackList, SetFeedBackList] = useState();
  const [modelOpen, setModelOpen] = useState(false);

  const userCommentesListData = useSelector(
    (state) => state?.home?.userCommentesListData?.data
  );
  const myPagination = useSelector(
    (state) => state?.home?.userCommentesListData?.data?.meta
  );

  useEffect(() => {
    if (singleproductData?.id || myPagination) {
      const data = {
        id: singleproductData?.id,
        pageNo: myPagination?.current_page,
        pagination: myPagination?.per_page,
      };
      dispatch(fetchUserCommentesData({ data }));
    } else {
      const data = {
        id: currentSection?.id,
      };
      dispatch(fetchUserCommentesData({ data }));
    }
  }, [currentSection?.id, myPagination?.current_page, singleproductData?.id]);

  useEffect(() => {
    if (userCommentesListData?.data) {
      SetFeedBackList(userCommentesListData?.data);
      SetCurrentSection({
        ...currentSection,
        data: userCommentesListData?.data,
      });
    }
  }, [userCommentesListData?.data]);

  const openCommentsModal = () => {
    setModelOpen(true);
    // onCloseModal();
  };
  const closeCommentsModal = () => setModelOpen(false);

  return (
    <>
      <div className={styles.comment_main_wrapper}>
        {feedBackList &&
          feedBackList?.comments?.slice(0, 2).map((items, key) => (
            <div className={styles.comment_wrapper}>
              <div className={styles.userImg_div}>
                <Image
                  src={!items?.user_image ? Images.accounts : items?.user_image}
                  alt=""
                  srcset=""
                  width={0}
                  height={0}
                />
              </div>
              <div className={styles.userDetails_wrapper}>
                <div className={styles.userDetails}>
                  <div className={styles.reviewsDetails}>
                    <h1>
                      {items?.first_name} {items?.last_name}
                    </h1>
                    <span>
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
                            stroke: star <= items?.rating ? "" : "gray",
                            fill: star <= items?.rating ? "gold" : "",
                          }}
                        >
                          <path d="M22.4213 9.39C22.245 8.862 21.7995 8.48325 21.2595 8.40075L15.7778 7.5795L13.3103 2.3415C13.065 1.8225 12.5633 1.5 12 1.5C11.4368 1.5 10.935 1.8225 10.6898 2.3415L8.25826 7.56075L2.74051 8.40075C2.20051 8.48325 1.75576 8.862 1.57876 9.39C1.39801 9.93225 1.53151 10.5203 1.92751 10.9245L5.91826 15.009L4.97551 20.766C4.88176 21.3412 5.11426 21.9045 5.58376 22.2352C6.03526 22.5555 6.61576 22.587 7.09876 22.3207L11.9655 19.6027L16.9013 22.3207C17.3858 22.587 17.9648 22.554 18.4163 22.2352C18.8858 21.9045 19.119 21.3412 19.0245 20.766L18.0803 15.0015L22.0725 10.9245C22.4685 10.5203 22.602 9.93225 22.4213 9.39Z" />
                        </svg>
                      ))}
                    </span>{" "}
                  </div>

                  <p>{items?.date}</p>
                </div>
                <p>{items?.review}</p>
              </div>
            </div>
          ))}
        <hr />
        <div className={styles.review}>
          <h5 onClick={openCommentsModal}>
            See All {singleproductData?.review_count} Reviews
          </h5>
        </div>

        {singleproductData?.review_count === "0" && "no comments found"}
      </div>
      <Modal
        open={modelOpen}
        onClose={closeCommentsModal}
        classNames={{ modal: "signup-popup-modal" }}
        center
      >
        <div className={styles.inner_container_login}>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.text_top}>
                <h4 style={{ borderBottom: "20px" }}>All Reviews</h4>
              </div>
              <div className={styles.comment_main_wrapper}>
                {feedBackList &&
                  feedBackList?.comments?.map((items, key) => (
                    <>
                      <div className={styles.comment_wrapper}>
                        <div className={styles.userImg_div}>
                          <Image
                            src={
                              !items?.user_image
                                ? Images.accounts
                                : items?.user_image
                            }
                            alt=""
                            srcset=""
                            width={0}
                            height={0}
                          />
                        </div>
                        <div className={styles.userDetails_wrapper}>
                          <div className={styles.userDetails}>
                            <div className={styles.reviewsDetails}>
                              <h1>
                                {items?.first_name} {items?.last_name}
                              </h1>
                              <span>
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
                                      stroke:
                                        star <= items?.rating ? "" : "gray",
                                      fill: star <= items?.rating ? "gold" : "",
                                    }}
                                  >
                                    <path d="M22.4213 9.39C22.245 8.862 21.7995 8.48325 21.2595 8.40075L15.7778 7.5795L13.3103 2.3415C13.065 1.8225 12.5633 1.5 12 1.5C11.4368 1.5 10.935 1.8225 10.6898 2.3415L8.25826 7.56075L2.74051 8.40075C2.20051 8.48325 1.75576 8.862 1.57876 9.39C1.39801 9.93225 1.53151 10.5203 1.92751 10.9245L5.91826 15.009L4.97551 20.766C4.88176 21.3412 5.11426 21.9045 5.58376 22.2352C6.03526 22.5555 6.61576 22.587 7.09876 22.3207L11.9655 19.6027L16.9013 22.3207C17.3858 22.587 17.9648 22.554 18.4163 22.2352C18.8858 21.9045 19.119 21.3412 19.0245 20.766L18.0803 15.0015L22.0725 10.9245C22.4685 10.5203 22.602 9.93225 22.4213 9.39Z" />
                                  </svg>
                                ))}
                              </span>{" "}
                            </div>

                            <p>{items?.date}</p>
                          </div>
                          <p>{items?.review}</p>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}{" "}
                {singleproductData?.review_count === "0" && "no comments found"}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {singleproductData?.review_count === 10 ? (
        <Paginations
          paginaionMeta={userCommentesListData?.meta}
          setPageNo={setPageNo}
          total_page={userCommentesListData?.meta?.total_page}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductComments;
