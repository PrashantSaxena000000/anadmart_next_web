"use client";
import React, { useEffect, useState } from "react";
import styles from "./askus.module.scss";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { myChatListData, myCurrentChat } from "../redux/actions/authActions";

const Messages = () => {
  const dispatch = useDispatch();

  const [url, setUrl] = useState();
  const [values, setValues] = useState({});

  var params = new URLSearchParams(url);

  let ticketId = params.get("item");

  const myChatListMessages = useSelector(
    (state) => state?.home?.myChatListMessages
  );
  const myLatestChatData = useSelector(
    (state) => state?.home?.myLatestChatData
  );

  const inputChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      setUrl(window.location.search);
    }
  }, [ticketId, params, url]);

  useEffect(() => {
    if (ticketId) {
      dispatch(myChatListData(ticketId));
    }
  }, [ticketId, myLatestChatData]);

  const submitMyChat = (e) => {
    e.preventDefault();
    const data = {
      service_ticket_id: ticketId,
      message: values?.message,
    };
    dispatch(myCurrentChat(data));
    setValues({});
  };

  return (
    <>
      <div className="container">
        <div className={styles.messg_wrapper}>
          <h4>My Account</h4>
          <div className={styles.msgshead}>
            {myChatListMessages?.map((items, key) => (
              <>
                <div className={styles.msgSctn_wrapper} key={key}>
                  <label>{!items?.user_id ? "Admin" : "You"}</label>
                  <div className={styles.myMsg}>{items?.message}</div>
                </div>
              </>
            ))}

            <form action="" onSubmit={submitMyChat}>
              <div className={styles.sendmsgOPtnDiv}>
                <div className={styles.inputdiv}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.svg_1}
                  >
                    <path
                      d="M13.0598 10.94C15.3098 13.19 15.3098 16.83 13.0598 19.07C10.8098 21.31 7.16985 21.32 4.92985 19.07C2.68985 16.82 2.67985 13.18 4.92985 10.94"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.59 13.41C8.24996 11.07 8.24996 7.27001 10.59 4.92001C12.93 2.57001 16.73 2.58001 19.08 4.92001C21.43 7.26001 21.42 11.06 19.08 13.41"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.svg_2}
                  >
                    <path
                      d="M8.24967 20.1666H13.7497C18.333 20.1666 20.1663 18.3333 20.1663 13.7499V8.24992C20.1663 3.66659 18.333 1.83325 13.7497 1.83325H8.24967C3.66634 1.83325 1.83301 3.66659 1.83301 8.24992V13.7499C1.83301 18.3333 3.66634 20.1666 8.24967 20.1666Z"
                      stroke="#292D32"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.25033 9.16667C9.26285 9.16667 10.0837 8.34586 10.0837 7.33333C10.0837 6.32081 9.26285 5.5 8.25033 5.5C7.2378 5.5 6.41699 6.32081 6.41699 7.33333C6.41699 8.34586 7.2378 9.16667 8.25033 9.16667Z"
                      stroke="#292D32"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.44727 17.3708L6.96643 14.3367C7.6906 13.8508 8.7356 13.9058 9.38643 14.465L9.68893 14.7308C10.4039 15.345 11.5589 15.345 12.2739 14.7308L16.0873 11.4583C16.8023 10.8442 17.9573 10.8442 18.6723 11.4583L20.1664 12.7417"
                      stroke="#292D32"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Write a massage..."
                    onChange={inputChangeHandler}
                    name="message"
                    value={values?.message || " "}
                  />
                </div>
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
