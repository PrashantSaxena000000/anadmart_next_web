"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./askus.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ticketDetails } from "../redux/actions/authActions";
import Link from "next/link";

const MyRequests = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [btnColor, setBtnColor] = useState();
  const handleChangeTab = () => {
    router.push("/support-chat");
  };
  const myTicketDetailsList = useSelector(
    (state) => state?.home?.myTicketDetailsList?.data?.support_ticket_data
  );

  useEffect(() => {
    dispatch(ticketDetails());
  }, []);

  const buttonColors = () => {
    if (items?.status === "status") {
      setBtnColor("#FFAB07");
    } else if (items?.status === "solved") {
      setBtnColor("#4DBA4D");
    } else if (items?.status === "cancel") {
      setBtnColor("#E42525");
    }
  };

  return (
    <>
      <div className="container">
        <div className={styles.headSctions}>
          <h4>my requests</h4>
          <button onClick={() => router.push("/create-ticket")}>Add New</button>
        </div>
        <div className={styles.request_wrapper}>
          <table>
            {myTicketDetailsList?.map((items, key) => (
              <>
                <tr key={key}>
                  <td className={styles.head}>{items?.contact_reason}</td>
                  <td className={styles.head_no}>#0000{items?.id}</td>
                  <td className={styles.head_date}>{items?.created_at}</td>
                  <td className={styles.head_btn}>
                    <Link
                      href={{
                        pathname: "/support-chat",
                        query: { item: items.id },
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor:
                            items?.status === "Cancel"
                              ? "#ff0000"
                              : items?.status === "Pending"
                              ? "#FFAB07"
                              : items?.status === "Solved"
                              ? "#4DBA4D"
                              : "#4DBA4D",
                        }}
                      >
                        {items?.status}
                      </Button>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default MyRequests;
