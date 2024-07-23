"use client";
import React, { useEffect, useState } from "react";
import styles from "./askus.module.scss";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { createTicket, requestReason } from "../redux/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateTicket = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [errors, setErrors] = useState({});
  const [optionvalue, setOptionValue] = useState([]);
  const [content, setContent] = useState({});

  const myRequestReason = useSelector(
    (state) => state?.home?.myRequestReason?.data
  );

  const onContentChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  useEffect(() => {
    dispatch(requestReason());
  }, []);

  useEffect(() => {
    if (myRequestReason) {
      let value = myRequestReason.map((item) => {
        return { value: item?.id, label: item?.name };
      });
      setOptionValue(value);
    }
  }, [myRequestReason]);

  const submitMyTickethandler = (e) => {
    e.preventDefault();

    let errorExist = false;
    let errorsObject = {};

    if (
      content?.message === "" ||
      content?.message === null ||
      content?.message === undefined
    ) {
      toast.error("Enter you Message");
      errorExist = true;
    }

    if (errorExist) {
      setErrors(errorsObject);
      return false;
    }

    const data = {
      contact_reason_id: selectedOption?.value,
      message: content?.message,
    };
    dispatch(createTicket(data, router));
  };

  return (
    <>
      <div className="container">
        <div className={styles.ticketWrapper}>
          <h4>Add New Requests</h4>

          <div>
            <ReactSelect
              defaultValue={selectedOption?.id}
              onChange={setSelectedOption}
              options={optionvalue}
              className={styles.selectBox}
              placeholder="Select Reason"
            />
          </div>
          <div className={styles.textContent}>
            <label>Content</label>
            <textarea
              onChange={onContentChange}
              name="message"
              value={content?.message}
            ></textarea>
          </div>
          <button onClick={submitMyTickethandler}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default CreateTicket;
