import React, { useEffect, useState } from "react";
import styles from "../popup.module.scss";
import { useDispatch } from "react-redux";
import {
  setMySearchLocation,
  updateMyCurentLocation,
} from "../../redux/actions/authActions";

import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";

const LocationPopup = ({ Popup }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [zipData, setZipData] = useState();

  // const detectLocation = () => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     const locData = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     };
  //   });
  // };

  // const { ref: bootstrapRef } = usePlacesWidget({
  //   apiKey: "AIzaSyDDl-_JOy_bj4MyQhYbKbGkZ0sfpbTZDNU",
  //   onPlaceSelected: (place) =>
  //     dispatch(setMySearchLocation(place && place?.formatted_address, Popup)),
  // });

  //

  const changeZipHandler = (e) => {
    setZipData({ ...zipData, [e.target.name]: e.target.value });
  };

  const fcm_token = localStorage.getItem("fcm_token");

  const submitZipHandler = (e) => {
    e.preventDefault();
    const data = {
      zip: zipData?.zip,
      fcm_token: fcm_token,
    };
    dispatch(updateMyCurentLocation(data, router));
  };

  return (
    <div className={styles["bg_wrapper_popup_new"]}>
      <div
        className={`${styles["popup_box_bpn"]} ${styles["profile_nceqoi_popup"]} ${styles["pb-4"]}`}
      >
        <div className={`${styles["popup_header"]} ${styles["pb-0"]}`}>
          <div
            className={`${styles.p_header_hding} ${styles.view_user_list_head}`}
          >
            Change Location
          </div>
          {!localStorage.getItem("currentLocation") ? null : (
            <div className={styles["close_pp_btn"]} onClick={() => Popup()}>
              <i className="fa fa-remove"></i>
            </div>
          )}
        </div>
        <div className={styles.locationMainDiv}>
          {/* <button
            className={styles.btnOfDetectLocation}
            onClick={detectLocation}
          >
            Detect my location
          </button> */}
          {/* <div className={styles.orDiv}>OR</div> */}
          {/* <input type="text" placeholder="Search delivery location" /> */}
          <Form onSubmit={submitZipHandler} style={{ width: "100%" }}>
            <Form.Label style={{ color: "black" }}>
              Enter Your Zipcode
            </Form.Label>

            <div className={styles.forminput_wrapper}>
              <Form.Control
                type="number"
                name="zip"
                // ref={bootstrapRef}
                className={styles.inputs}
                onChange={changeZipHandler}
                min={0}
                onWheel={(e) => e.target.blur()}
              />
              <button className={styles.submit_btn} type="submit">
                Go
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;
