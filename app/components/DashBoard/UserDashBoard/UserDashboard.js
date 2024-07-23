"use client";
import React, { useEffect, useRef, useState } from "react";
import SideDashboard from "../SideDashboard/SideDashboard";
import styles from "./userdashboard.module.scss";
import Tracking from "../Tracking/Tracking";
import MyInformation from "../MyInformation/MyInformation";
import Favourite from "../Favourite/Favourite";
import MyinfoAddAddress from "../MyInformation/MyinfoAddAddress";
import TrackYourOrder from "../Tracking/TrackYourOrder/TrackYourOrder";
import Rewards from "../rewards/Rewards";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  editMyAddress,
  resetAuthToken,
} from "../../redux/actions/authActions";

import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const UserDashboard = ({ slug }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState();
  const [newAddress, setNewAddress] = useState();
  const [trackingTab, setTrackingTab] = useState();

  const userprofileData = useSelector(
    (state) => state?.home?.userprofileData?.user_data
  );

  const {
    pageLoading,
    myAddressListData,
    myAllOrdersDataList,
    mySelectedOrderDetails,
  } = useSelector((state) => state?.home);

  const wishListDataList = useSelector(
    (state) => state?.home?.wishListDataList?.wishlist
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTrackingTab(localStorage.getItem("orderTab"));
    }
  }, []);

  useEffect(() => {
    if (trackingTab) {
      localStorage.setItem("orderTab", trackingTab);
    }
  }, [trackingTab]);

  useEffect(() => {
    if (slug) {
      setCurrentTab(slug);
    }
  }, [slug]);

  const addAddressChangeHandler = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
      isChange: true,
    });
  };

  const newAddressSubmitHandler = (e) => {
    e.preventDefault();

    let data;

    data = {
      id: newAddress?.id ? newAddress?.id : "",
      address_1: newAddress?.address_1,
      address_2: newAddress?.address_2,
      city: newAddress?.city,
      state: newAddress?.state,
      zip_code: newAddress?.zip_code,
      address_type: newAddress?.address_type,
      other_instruction: newAddress?.other_instruction,
    };

    if (!newAddress?.address_1 || !newAddress?.address_1.trim()) {
      toast.error("Enter Your First Address");
      return;
    } else if (!newAddress?.address_type || !newAddress?.address_type.trim()) {
      toast.error("Enter Address Type");
      return;
    } else if (!newAddress?.city || !newAddress?.city.trim()) {
      toast.error("Enter Your City");
      return;
    } else if (!newAddress?.state || !newAddress?.state.trim()) {
      toast.error("Enter Your State");
      return;
    } else if (
      !newAddress?.zip_code ||
      !newAddress?.zip_code.toString().trim()
    ) {
      toast.error("Enter Your Zip Code");
      return;
    }

    if (newAddress?.isChange) {
      if (newAddress?.id) {
        dispatch(editMyAddress(data, router, setCurrentTab));
      } else {
        dispatch(addNewAddress(data, "dashboard", setCurrentTab, false, false));
      }
    } else {
      toast.error("Make Changes First");
    }
  };

  const handleChangeTab = (tab, data) => {
    if (data) {
      router.push(`/dashboard/${tab}`);
      setCurrentTab("information");
    } else {
      router.push(`/dashboard/${tab}`);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    toast.success("Signout Successfully!");
    dispatch(resetAuthToken());
    const randomNumber = Math.random();
    setTimeout(() => {
      router.push(`/?refresh=${randomNumber}`);
    }, 1000);
  };

  const handletab = () => {
    setCurrentTab("information");
  };

  return (
    <>
      <div className={styles["user_dashboard_wrap"]}>
        <div className="container">
          <section className={styles.dashboard_section}>
            <div className={styles.section_left}>
              <SideDashboard
                currentTab={currentTab}
                handleChangeTab={handleChangeTab}
                logoutHandler={logoutHandler}
                userprofileData={userprofileData}
                router={router}
              />
            </div>
            <div className={styles.section_right}>
              {currentTab === "my-orders" && (
                <Tracking
                  handleChangeTab={handleChangeTab}
                  myAllOrdersDataList={myAllOrdersDataList}
                  trackingTab={trackingTab}
                  setTrackingTab={setTrackingTab}
                />
              )}

              {currentTab === "information" && (
                <MyInformation
                  handleChangeTab={handleChangeTab}
                  userprofileData={userprofileData}
                  myAddressListData={myAddressListData}
                  setCurrentTab={setCurrentTab}
                  setNewAddress={setNewAddress}
                />
              )}
              {currentTab === "wishlist" && (
                <Favourite wishListDataList={wishListDataList} />
              )}
              {currentTab === "tracksDetail" && (
                <TrackYourOrder
                  handleChangeTab={handleChangeTab}
                  mySelectedOrderDetails={mySelectedOrderDetails}
                  // prevCount={prevCount}
                  // setTrackingTab={setTrackingTab}
                />
              )}

              {currentTab === "addaddress" && (
                <MyinfoAddAddress
                  handleChangeTab={handleChangeTab}
                  addAddressChangeHandler={addAddressChangeHandler}
                  newAddressSubmitHandler={newAddressSubmitHandler}
                  setNewAddress={setNewAddress}
                  newAddress={newAddress}
                  handletab={handletab}
                />
              )}
              {currentTab === "reward" && (
                <Rewards setCurrentTab={setCurrentTab} />
              )}
            </div>
          </section>
        </div>
      </div>
      {pageLoading && <Loading />}
    </>
  );
};

export default UserDashboard;
