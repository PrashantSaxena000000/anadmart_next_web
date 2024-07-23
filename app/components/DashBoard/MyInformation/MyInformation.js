import React, { useEffect, useState } from "react";
import styles from "./myinfo.module.scss";
import ChangePasswordPopup from "./ChangePasswordPopup";

import { Button } from "react-bootstrap";
import SmallAddressCard from "../smallAddressCard/SmallAddressCard";
import {
  makePermanentDefaultAdress,
  myUserData,
  removeMyAddress,
  updateUserData,
} from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import Login from "../../Popups/Login/Login";
import { toast } from "react-toastify";
import Images from "../../Images/Images";
import Image from "next/image";

const MyInformation = ({
  handleChangeTab,
  userprofileData,
  myAddressListData,
  setCurrentTab,
  setNewAddress,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState();
  const [openModal, setOpenModal] = useState();
  const [sendImage, setSendImage] = useState(false);

  const pageLoading = useSelector((state) => state?.home?.pageLoading);
  const isLoggedIn = useSelector((state) => state?.home?.isLoggedIn);

  useEffect(() => {
    if (userprofileData) {
      setValues({ ...values, isChange: false, ...userprofileData });
    }
  }, [userprofileData]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(myUserData());
    }
  }, []);

  const updateProfileClickHandler = (e) => {
    e.preventDefault();
    if (values?.isChange === true) {
      if (!values?.first_name || !values?.first_name.trim()) {
        toast.error("Enter Your First Name");
        return;
      } else if (!values?.middle_name || !values?.middle_name.trim()) {
        toast.error("Enter your Middle Name");
        return;
      } else if (!values?.last_name || !values?.last_name.trim()) {
        toast.error("Enter Your Last Name");
        return;
      } else if (!values?.phone || !values?.phone.trim()) {
        toast.error("Enter Your Phone Number");
        return;
      } else {
        const formData = new FormData();

        formData.append("first_name", values?.first_name);
        formData.append("middle_name", values?.middle_name);
        formData.append("last_name", values?.last_name);
        formData.append("phone", values?.phone);
        if (sendImage) {
          formData.append("profile_image", values?.profile_image);
        }

        dispatch(updateUserData(formData, setValues, values, setSendImage));
      }
    }
  };

  const addDefaultImg = (ev) => {
    ev.currentTarget.src = "../../../assets/account.png";
  };

  const inputChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value, isChange: true });
    if (e.target.name === "profile_image") {
      if (!e.target.files[0].name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        toast.error("Select 'jpeg' 'jpg' 'png'  File Only.");
      } else {
        setValues({
          ...values,
          [e.target.name]: e.target.files[0],
          show_img: URL.createObjectURL(e.target.files[0]),
          isChange: true,
        });
        setSendImage(true);
      }
    }
  };

  const editAddressClickHandler = (item) => {
    const data = {
      ...item,
      isChange: false,
    };
    setNewAddress(data);
    setCurrentTab("addaddress");
  };

  const deleteAddressClickHandler = (item) => {
    const data = {
      address_id: item.id,
    };
    dispatch(removeMyAddress(data));
  };

  const defaultAddressClickHandler = (item) => {
    dispatch(makePermanentDefaultAdress({ address_id: item.id }));
  };

  const openHandler = () => {
    setOpenModal(true);
  };
  const closeHandler = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className={styles["info_wrapper"]}>
        <div className={styles.company_info}>
          <div className={styles.profileHead}>
            <h4>My Info</h4>
            <div className={styles.profileMainDiv}>
              <label htmlFor="upload">
                <div className={styles.profilediv}>
                  <input
                    type="file"
                    id="upload"
                    hidden
                    onChange={inputChangeHandler}
                    name="profile_image"
                  />
                  <img
                    src={
                      values?.show_img
                        ? values?.show_img
                        : values?.profile_image
                    }
                    alt=""
                    onError={(ev) => addDefaultImg(ev)}
                  />
                  <span>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="9.40594"
                        cy="9.1557"
                        r="8.87543"
                        fill="#4DBA4D"
                      />
                      <path
                        d="M9.40581 10.898C10.0049 10.898 10.4906 10.4124 10.4906 9.81328C10.4906 9.21418 10.0049 8.72852 9.40581 8.72852C8.80671 8.72852 8.32104 9.21418 8.32104 9.81328C8.32104 10.4124 8.80671 10.898 9.40581 10.898Z"
                        fill="white"
                      />
                      <path
                        d="M12.2987 6.92044H11.1525L10.7041 6.4323C10.6368 6.35831 10.5547 6.2992 10.4632 6.25873C10.3716 6.21826 10.2727 6.19733 10.1726 6.19727H8.63947C8.43698 6.19727 8.24173 6.28405 8.10432 6.4323L7.65957 6.92044H6.51334C6.11559 6.92044 5.79016 7.24587 5.79016 7.64362V11.9827C5.79016 12.3804 6.11559 12.7058 6.51334 12.7058H12.2987C12.6965 12.7058 13.0219 12.3804 13.0219 11.9827V7.64362C13.0219 7.24587 12.6965 6.92044 12.2987 6.92044ZM9.40604 11.6211C8.40806 11.6211 7.5981 10.8111 7.5981 9.81314C7.5981 8.81516 8.40806 8.00521 9.40604 8.00521C10.404 8.00521 11.214 8.81516 11.214 9.81314C11.214 10.8111 10.404 11.6211 9.40604 11.6211Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              </label>
            </div>
          </div>
          <>
            <form onSubmit={updateProfileClickHandler}>
              <div className={styles.label_div}>
                <label>First Name</label>
                <div className={styles.field_div}>
                  <input
                    type="text"
                    value={values?.first_name}
                    onChange={(e) => inputChangeHandler(e)}
                    name="first_name"
                  />
                  {/* <h4 onClick={updateProfileClickHandler}>Change</h4> */}
                </div>
              </div>
              <div className={styles.label_div}>
                <label>Middle Name</label>
                <div className={styles.field_div}>
                  <input
                    type="text"
                    value={values?.middle_name}
                    onChange={(e) => inputChangeHandler(e)}
                    name="middle_name"
                  />
                  {/* <h4 onClick={updateProfileClickHandler}>Change</h4> */}
                </div>
              </div>
              <div className={styles.label_div}>
                <label>Last Name</label>
                <div className={styles.field_div}>
                  <input
                    type="text"
                    value={values?.last_name}
                    onChange={(e) => inputChangeHandler(e)}
                    name="last_name"
                  />
                  {/* <h4 onClick={updateProfileClickHandler}>Change</h4> */}
                </div>
              </div>
              <div className={styles.label_div}>
                <label>Email Address</label>
                <div className={styles.field_div}>
                  <input
                    type="email"
                    value={values?.email}
                    name="email"
                    disabled
                    // onChange={(e) => inputChangeHandler(e)}
                  />
                  {/* <h4 onClick={updateProfileClickHandler}>Change</h4> */}
                </div>
              </div>
              <div className={styles.label_div}>
                <label>Phone Number</label>
                <div className={styles.field_div}>
                  <input
                    type="text"
                    value={values?.phone}
                    name="phone"
                    onChange={(e) => inputChangeHandler(e)}
                  />
                  {/* <h4 onClick={updateProfileClickHandler}>Change</h4> */}
                </div>
              </div>

              <div style={{ gap: "20px", display: "flex" }}>
                <Button
                  type="submit"
                  className={styles.dataSaveBtn}
                  disabled={values?.isChange === false}
                >
                  Save
                </Button>

                <Button className={styles.dataSaveBtn2} onClick={openHandler}>
                  Change Password
                </Button>
              </div>
            </form>
            {/* <div className={styles.label_div}>
              <label>Password</label>
              <div className={styles.field_div}>
                <input type="text" placeholder="****************" />
                
              </div>
            </div> */}
            <div className={styles.member_div}>
              <h3>Address</h3>
              <Button onClick={() => handleChangeTab("addaddress")}>
                Add New
              </Button>
            </div>
            <div className={styles.addrsscard}>
              {myAddressListData?.map((items, key) => (
                <SmallAddressCard
                  items={items}
                  key={key}
                  deleteAddressClickHandler={deleteAddressClickHandler}
                  editAddressClickHandler={editAddressClickHandler}
                  defaultAddressClickHandler={defaultAddressClickHandler}
                  userprofileData={userprofileData}
                />
              ))}
            </div>
          </>
        </div>
      </div>

      <ChangePasswordPopup
        open={openModal}
        onCloseModal={closeHandler}
        openLoginModal={openHandler}
      />
    </>
  );
};

export default MyInformation;
