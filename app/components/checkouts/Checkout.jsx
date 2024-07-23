"use client";
import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { Col, Form, Row } from "react-bootstrap";
import Link from "next/link";
import PageHeading from "../../common/PageHeading/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import AddAddressModal from "./AddAddressModal";
import {
  addNewAddress,
  editMyAddress,
  makeDefaultMyAddress,
  placeMyOrder,
} from "../redux/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePlacesWidget } from "react-google-autocomplete";

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [openAddress, setOpenAddress] = useState(false);
  const [orderData, setOrderData] = useState();
  const [getAddress, setGetAddress] = useState();
  const [newAddress, setNewAddress] = useState({});

  const myAddressListData = useSelector(
    (state) => state?.home?.myAddressListData
  );

  const mycurrendefaultAddress = useSelector(
    (state) => state?.home?.mycurrendefaultAddress
  );

  const couponDiscounts = useSelector(
    (state) =>
      state?.home?.newCartPaymentData?.cartPaymentSummary?.couponDiscount
  );

  // const defaultAddressClickHandler = (item) => {
  //   dispatch(makeDefaultMyAddress({ address_id: item.id }));
  // };
  const [selectedAddress, setSelectedAddress] = useState(null);

  const defaultAddressClickHandler = (item) => {
    dispatch(makeDefaultMyAddress({ address_id: item.id }));
    setSelectedAddress(item.id);
  };

  useEffect(() => {
    if (mycurrendefaultAddress) {
      setGetAddress(mycurrendefaultAddress);
    }
  }, [mycurrendefaultAddress]);

  const cardDataList = useSelector((state) => state?.home?.cardDataList);

  const placeOrderClickHandler = () => {
    if (!orderData?.payment_type) {
      toast.error("Select Payment Type");
    } else if (!getAddress) {
      toast.error("Select Address First");
    } else {
      dispatch(placeMyOrder(orderData, router));
    }
  };

  const myorderChangeHandler = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const { ref: bootstrapRef } = usePlacesWidget({
    apiKey: "AIzaSyDDl-_JOy_bj4MyQhYbKbGkZ0sfpbTZDNU",
    onPlaceSelected: (place) =>
      setNewAddress({
        ...newAddress,
        address_1: place?.formatted_address,
        address_2: place?.formatted_address,
      }),
  });

  const addAddressChangeHandler = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const newAddressSubmitHandler = (e) => {
    e.preventDefault();

    if (!newAddress?.address_type || !newAddress?.address_type.trim()) {
      toast.error("Enter Address Type");
    } else if (!newAddress?.address_1 || !newAddress?.address_1.trim()) {
      toast.error("Enter Your First Address");
    } else if (!newAddress?.state || !newAddress?.state.trim()) {
      toast.error("Enter Your State");
    } else if (!newAddress?.city || !newAddress?.city.trim()) {
      toast.error("Enter Your City");
    } else if (!newAddress?.zip_code || !newAddress?.zip_code.trim()) {
      toast.error("Enter Your Zip Code");
    } else {
      const data = {
        address_1: newAddress?.address_1,
        address_2: newAddress?.address_2,
        city: newAddress?.city,
        state: newAddress?.state,
        zip_code: newAddress?.zip_code,
        address_type: newAddress?.address_type,
        other_instruction: newAddress?.other_instruction,
      };
      dispatch(
        addNewAddress(data, "check", false, setOpenAddress, setNewAddress)
      );
    }
  };

  const openModalHandler = () => {
    setOpenAddress(true);
  };

  const addressModalClose = () => {
    setOpenAddress(false);
  };

  return (
    <>
      <PageHeading pageName="Checkout" />

      <div className={styles["checkout_wrapper"]}>
        <div className="container">
          <div>
            <Row className={styles.selectAddressDiv}>
              {myAddressListData?.map((items, key) => (
                <Col
                  lg={4}
                  className={
                    items.id === selectedAddress
                      ? styles.selectedAddress
                      : items?.default_address === true
                      ? styles.mainAddDivActive
                      : styles.mainAddDiv
                  }
                  onClick={() => defaultAddressClickHandler(items)}
                >
                  <div className={styles.addSideLeft}>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="18"
                        fill="#4DBA4D"
                        fill-opacity="0.33"
                      />
                      <circle cx="18" cy="18" r="14" fill="#4DBA4D" />
                      <path
                        d="M18 25C18 25 23.25 20.1158 23.25 16.25C23.25 12.3842 20.8997 11 18 11C15.1003 11 12.75 12.3842 12.75 16.25C12.75 20.1158 18 25 18 25ZM15.375 15.375C15.375 13.9251 16.5501 12.75 18 12.75C19.4499 12.75 20.625 13.9251 20.625 15.375C20.625 16.8249 19.4499 18 18 18C16.5501 18 15.375 16.8249 15.375 15.375Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className={styles.addSideRight}>
                    <h5>{items?.address_type}</h5>
                    <p>
                      {items?.address_1},{items?.address_2}
                    </p>
                    <p>
                      {items?.city} {items?.state}, {items?.zip_code}
                    </p>
                  </div>
                  {/* <span className={styles.selectSpan}>Default Address</span> */}
                </Col>
              ))}
              <Col
                lg={4}
                className={styles.mainAddDivActive2}
                onClick={() => openModalHandler()}
              >
                <div className={styles.addBtnS}>
                  <div className={styles.addSideLeft}>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="18"
                        fill="#4DBA4D"
                        fill-opacity="0.33"
                      />
                      <circle cx="18" cy="18" r="14" fill="#4DBA4D" />
                      <path
                        d="M18 12.375V23.625"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.375 18H23.625"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <h5>Add New Address</h5>
                </div>
              </Col>
            </Row>
          </div>
          {/* <Row className={styles.check_row}>
            <Col lg={7} className={styles.check_col_1}>
              <h4>Add New Address</h4>
              <form>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>Address Type* </label>
                    <input type="text" placeholder="Home/Office/More" />
                  </div>
                </div>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>Flat, House No, Floor, Tower* </label>
                    <input type="text" placeholder="House No, Floor" />
                  </div>
                </div>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>Street, Society., Landmark* </label>
                    <input
                      type="text"
                      placeholder="Street, Society, Landmark"
                    />
                  </div>
                </div>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>Recipient’s Name* </label>
                    <input type="text" placeholder="Recipient’s Name" />
                  </div>
                </div>
                <button type="submit" className={styles.saveAddressBtbn}>
                  Save
                </button>
              </form>
            </Col>
          </Row> */}
          <Row className={styles.check_row}>
            {/* <Col lg={7} className={styles.check_col_1}>
              <h4>Add New Address</h4>
              <form onSubmit={(e) => newAddressSubmitHandler(e)}>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <Form.Group>
                      <Form.Label style={{ color: "black" }}>
                        Address 1*
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="address_1"
                        placeholder="Add your First Address"
                        // ref={bootstrapRef}
                        onChange={(e) => addAddressChangeHandler(e)}
                        className={styles.locationnInput}
                        // autoComplete={true}
                        value={newAddress?.address_1}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <Form.Group>
                      <Form.Label style={{ color: "black" }}>
                        Address 2*
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="address_2"
                        placeholder="Add your Second Address"
                        // ref={bootstrapRef}
                        onChange={(e) => addAddressChangeHandler(e)}
                        className={styles.locationnInput}
                        // autoComplete={true}
                        value={newAddress?.address_2}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>State* </label>
                    <input
                      name="state"
                      type="text"
                      placeholder="State"
                      onChange={(e) => addAddressChangeHandler(e)}
                      value={newAddress?.state}
                    />
                  </div>
                </div>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>city* </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      onChange={(e) => addAddressChangeHandler(e)}
                      value={newAddress?.city}
                    />
                  </div>
                </div>

                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>zip code* </label>
                    <input
                      name="zip_code"
                      type="text"
                      placeholder="zip code"
                      onChange={(e) => addAddressChangeHandler(e)}
                      value={newAddress?.zip_code}
                    />
                  </div>
                </div>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>Address Type* </label>
                    <input
                      name="address_type"
                      type="text"
                      placeholder="Home/Office/More"
                      onChange={(e) => addAddressChangeHandler(e)}
                      value={newAddress?.address_type}
                    />
                  </div>
                </div>
                <div className={styles.short_input_div}>
                  <div className={styles.label_div}>
                    <label>Other Instruction </label>
                    <input
                      name="other_instruction"
                      type="text"
                      placeholder="Other instructions"
                      onChange={(e) => addAddressChangeHandler(e)}
                      value={newAddress?.other_instruction}
                    />
                  </div>
                </div>
                <button type="submit" className={styles.saveAddressBtbn}>
                  Save
                </button>
                <button type="submit" className={styles.saveAddressBtbn2}>
                  Cancel
                </button> 
              </form>
            </Col> */}

            <Col lg={5} className={styles.check_col_2}>
              <h3>Order Summary</h3>
              {cardDataList?.cartItems?.map((items, key) => (
                <div className={styles.col2_div}>
                  <div className={styles.imgPrdctDiv}>
                    <img src={items.image} alt="" />
                  </div>

                  <div className={styles.checkout_values}>
                    <h2>
                      {items?.product_name} x {items?.cart_item_qty}
                      <span>
                        {items?.variant_qty} {items?.variant_qty_type}
                      </span>
                    </h2>
                    <p>${items?.cart_item_qty * items?.variant_price}</p>
                  </div>
                </div>
              ))}

              <div className={styles.col2_divdata}>
                <div className={styles.totaldiv}>
                  <h3>Subtotal</h3>
                  <p>${cardDataList?.cartPaymentSummary?.subTotal}</p>
                </div>
                <div className={styles.col2_divdata}>
                  <div className={styles.totaldiv}>
                    <h3>Tax</h3>
                    <p>
                      $
                      {cardDataList?.cartPaymentSummary?.tax_1
                        ? cardDataList?.cartPaymentSummary?.tax_1
                        : 0}
                    </p>
                  </div>
                </div>
                <div className={styles.totaldiv}>
                  <h3>Discount</h3>
                  <p>- ${couponDiscounts ? couponDiscounts : 0}</p>
                </div>
                <div className={styles.totaldiv}>
                  <h3>Shipping</h3>
                  <p>
                    {cardDataList?.cartPaymentSummary?.deliveryCharge == 0
                      ? "Free"
                      : ` $ ${cardDataList?.cartPaymentSummary?.deliveryCharge}`}
                  </p>
                </div>
              </div>

              <div className={styles.col2_divdata}>
                <div className={styles.totaldiv}>
                  <h3>Grand Total</h3>
                  <p>${cardDataList?.cartPaymentSummary?.total}</p>
                </div>
              </div>
            </Col>

            <Col lg={7} className={styles.pay_col}>
              <div className={styles.pay_method}>
                <h4 className={styles.pay_head}>Payment Method</h4>
                <div className={styles.icon_div}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="46"
                    viewBox="0 0 80 46"
                    fill="none"
                  >
                    <rect width="80" height="46" rx="8" fill="#F6F6F6" />
                    <path
                      d="M38.8539 22.0879V26.9405H37.3037V14.9566H41.4151C41.9058 14.9464 42.3938 15.0329 42.8507 15.2109C43.3076 15.389 43.7245 15.6552 44.0774 15.9941C44.4337 16.3124 44.7174 16.7028 44.9092 17.139C45.101 17.5753 45.1966 18.0472 45.1895 18.5232C45.1997 19.0017 45.1056 19.4767 44.9136 19.9157C44.7217 20.3548 44.4364 20.7474 44.0774 21.0666C43.3584 21.7475 42.471 22.0875 41.4151 22.0869H38.8539V22.0879ZM38.8539 16.432V20.6153H41.4536C41.7386 20.6237 42.0222 20.5729 42.2863 20.4663C42.5505 20.3596 42.7892 20.1993 42.9874 19.9957C43.1846 19.8054 43.3413 19.5777 43.4483 19.3262C43.5553 19.0747 43.6104 18.8044 43.6104 18.5313C43.6104 18.2583 43.5553 17.988 43.4483 17.7365C43.3413 17.4849 43.1846 17.2573 42.9874 17.0669C42.7917 16.8591 42.5538 16.6949 42.2893 16.5852C42.0249 16.4756 41.74 16.4231 41.4536 16.4311H38.8539V16.432Z"
                      fill="#5F6368"
                    />
                    <path
                      d="M48.7611 18.4736C49.9069 18.4736 50.8113 18.7777 51.4744 19.3858C52.1375 19.994 52.4687 20.8278 52.4681 21.8872V26.9407H50.9853V25.8028H50.9179C50.276 26.7399 49.4222 27.2084 48.3567 27.2084C47.4471 27.2084 46.6861 26.9407 46.0738 26.4052C45.7799 26.1594 45.5449 25.8517 45.386 25.5043C45.2271 25.1569 45.1483 24.7787 45.1552 24.3972C45.1552 23.5488 45.4781 22.874 46.1238 22.373C46.7696 21.8719 47.6317 21.6208 48.7101 21.6195C49.6305 21.6195 50.3886 21.7868 50.9843 22.1215V21.7696C50.9861 21.5095 50.9295 21.2523 50.8188 21.0167C50.708 20.781 50.5458 20.5728 50.344 20.407C49.9341 20.0397 49.3998 19.8393 48.8477 19.8458C47.9818 19.8458 47.2966 20.2085 46.7921 20.9339L45.4267 20.08C46.1778 19.0091 47.2892 18.4736 48.7611 18.4736ZM46.7555 24.4307C46.7544 24.6266 46.8005 24.8199 46.89 24.9946C46.9794 25.1692 47.1096 25.3201 47.2696 25.4347C47.6125 25.7025 48.038 25.8444 48.4742 25.8363C49.1283 25.8352 49.7554 25.5766 50.2179 25.1172C50.7314 24.6372 50.9882 24.074 50.9882 23.4276C50.5048 23.0452 49.8308 22.8539 48.9662 22.8539C48.3365 22.8539 47.8114 23.0047 47.3909 23.3062C46.9663 23.6122 46.7555 23.9841 46.7555 24.4307Z"
                      fill="#5F6368"
                    />
                    <path
                      d="M60.98 18.7412L55.8037 30.5549H54.2035L56.1244 26.4213L52.7207 18.7412H54.4057L56.8658 24.6313H56.8995L59.2922 18.7412H60.98Z"
                      fill="#5F6368"
                    />
                    <path
                      d="M32.5893 21.0419C32.5899 20.5728 32.5499 20.1045 32.4699 19.6421H25.9321V22.2936H29.6766C29.6 22.7171 29.4378 23.1208 29.1999 23.4803C28.9619 23.8399 28.6531 24.1479 28.2921 24.3857V26.1069H30.5268C31.8354 24.9088 32.5893 23.137 32.5893 21.0419Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M25.9323 27.7696C27.8031 27.7696 29.3783 27.1595 30.527 26.1077L28.2922 24.3866C27.6702 24.8054 26.8691 25.0444 25.9323 25.0444C24.1241 25.0444 22.5893 23.8339 22.0405 22.2026H19.7383V23.9764C20.3153 25.1166 21.2001 26.0751 22.2938 26.7449C23.3876 27.4148 24.6473 27.7695 25.9323 27.7696Z"
                      fill="#34A853"
                    />
                    <path
                      d="M22.0404 22.2027C21.7502 21.3479 21.7502 20.4222 22.0404 19.5674V17.7937H19.7382C19.2528 18.7529 19 19.8115 19 20.8851C19 21.9586 19.2528 23.0172 19.7382 23.9764L22.0404 22.2027Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M25.9323 16.7256C26.9209 16.7095 27.8762 17.0805 28.5917 17.7583L30.5703 15.7933C29.3157 14.623 27.6535 13.9805 25.9323 14.0005C24.6473 14.0005 23.3876 14.3552 22.2938 15.0251C21.2001 15.6949 20.3153 16.6534 19.7383 17.7936L22.0405 19.5674C22.5893 17.9361 24.1241 16.7256 25.9323 16.7256Z"
                      fill="#EA4335"
                    />
                  </svg>
                  <svg
                    width="80"
                    height="46"
                    viewBox="0 0 80 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="80" height="46" rx="8" fill="#F6F6F6" />
                    <path
                      d="M57.7207 17.1775H55.1784C54.4098 17.1775 53.8186 17.414 53.4638 18.1826L48.6157 29.2386H52.0449C52.0449 29.2386 52.6361 27.7605 52.7543 27.4058C53.1091 27.4058 56.4791 27.4058 56.9521 27.4058C57.0703 27.8196 57.3659 29.1795 57.3659 29.1795H60.4403L57.7207 17.1775ZM53.7003 24.9226C53.9959 24.2131 55.001 21.5526 55.001 21.5526C55.001 21.6117 55.2966 20.8431 55.4149 20.4293L55.6514 21.4935C55.6514 21.4935 56.3017 24.3905 56.42 24.9817H53.7003V24.9226Z"
                      fill="#3362AB"
                    />
                    <path
                      d="M48.8522 25.2772C48.8522 27.7604 46.6055 29.4158 43.1173 29.4158C41.6392 29.4158 40.2203 29.1202 39.4517 28.7655L39.9246 26.0458L40.3385 26.2232C41.4027 26.6962 42.1122 26.8736 43.4129 26.8736C44.3589 26.8736 45.364 26.5188 45.364 25.6911C45.364 25.159 44.9501 24.8042 43.6494 24.213C42.4078 23.6218 40.7524 22.6758 40.7524 20.9612C40.7524 18.5963 43.0582 17 46.3099 17C47.5515 17 48.6157 17.2365 49.2661 17.5321L48.7931 20.1335L48.5566 19.897C47.9654 19.6605 47.1968 19.424 46.0734 19.424C44.8319 19.4832 44.2406 20.0153 44.2406 20.4883C44.2406 21.0204 44.9501 21.4342 46.0734 21.9663C47.9654 22.8532 48.8522 23.8583 48.8522 25.2772Z"
                      fill="#3362AB"
                    />
                    <path
                      d="M20 17.2956L20.0591 17.0591H25.1437C25.8532 17.0591 26.3853 17.2956 26.5627 18.0642L27.686 23.3853C26.5627 20.5473 23.9612 18.2415 20 17.2956Z"
                      fill="#F9B50B"
                    />
                    <path
                      d="M34.8401 17.1773L29.6964 29.1793H26.2081L23.252 19.1283C25.3804 20.4882 27.1541 22.6166 27.8044 24.0947L28.1592 25.3363L31.3518 17.1182H34.8401V17.1773Z"
                      fill="#3362AB"
                    />
                    <path
                      d="M36.1997 17.1182H39.4514L37.3821 29.1793H34.1304L36.1997 17.1182Z"
                      fill="#3362AB"
                    />
                  </svg>
                  <svg
                    width="80"
                    height="46"
                    viewBox="0 0 80 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="80" height="46" rx="8" fill="#F6F6F6" />
                    <path
                      d="M33.7008 21.7031C33.56 22.7593 32.7151 22.7593 31.9406 22.7593H31.5181L31.8701 20.7174C31.8701 20.5766 32.011 20.5062 32.1518 20.5062H32.363C32.9263 20.5062 33.4192 20.5062 33.7008 20.7878C33.7008 21.0694 33.7008 21.3511 33.7008 21.7031ZM33.3488 18.8867H30.3211C30.1099 18.8867 29.9691 19.0275 29.8986 19.2388L28.7017 26.9839C28.7017 27.1248 28.7721 27.2656 28.9833 27.2656H30.3915C30.6028 27.2656 30.7436 27.1248 30.814 26.9135L31.166 24.8012C31.166 24.59 31.3773 24.4492 31.5885 24.4492H32.5742C34.5457 24.4492 35.6723 23.4634 36.0244 21.5623C36.1652 20.7174 36.0244 20.0837 35.6723 19.5908C35.109 19.1684 34.3345 18.8867 33.3488 18.8867Z"
                      fill="#263577"
                    />
                    <path
                      d="M40.319 24.5195C40.1782 25.3644 39.5445 25.9277 38.6996 25.9277C38.2771 25.9277 37.9251 25.7869 37.7138 25.5053C37.5026 25.2236 37.4322 24.8716 37.5026 24.5195C37.6434 23.6746 38.2771 23.1113 39.1221 23.1113C39.5445 23.1113 39.8966 23.2521 40.1078 23.5338C40.2486 23.745 40.3894 24.097 40.319 24.5195ZM42.2905 21.7031H40.8823C40.7415 21.7031 40.6711 21.7735 40.6007 21.9143L40.5303 22.3368L40.4599 22.196C40.1782 21.7735 39.4741 21.5623 38.77 21.5623C37.1506 21.5623 35.8128 22.7592 35.5311 24.4491C35.3903 25.294 35.6015 26.0685 36.0944 26.6318C36.5168 27.1247 37.1506 27.3359 37.9251 27.3359C39.1925 27.3359 39.8966 26.491 39.8966 26.491L39.8262 26.9135C39.8262 27.0543 39.8966 27.1951 40.1078 27.1951H41.3752C41.5864 27.1951 41.7272 27.0543 41.7977 26.8431L42.5722 21.9143C42.5722 21.8439 42.5018 21.7031 42.2905 21.7031Z"
                      fill="#263577"
                    />
                    <path
                      d="M49.9656 21.7031H48.4869C48.3461 21.7031 48.2053 21.7735 48.1349 21.9144L46.1634 24.8716L45.3184 22.0552C45.248 21.8439 45.1072 21.7735 44.896 21.7735H43.4878C43.3469 21.7735 43.2061 21.9144 43.2765 22.1256L44.896 26.7727L43.4173 28.885C43.2765 29.0258 43.4174 29.3075 43.6286 29.3075H45.1072C45.248 29.3075 45.3889 29.2371 45.4593 29.0962L50.2472 22.1256C50.3176 21.9144 50.1768 21.7031 49.9656 21.7031Z"
                      fill="#263577"
                    />
                    <path
                      d="M55.1051 21.7031C54.9643 22.7593 54.1194 22.7593 53.3449 22.7593H52.9224L53.2744 20.7174C53.2744 20.5766 53.4153 20.5062 53.5561 20.5062H53.7673C54.3306 20.5062 54.8235 20.5062 55.1051 20.7878C55.1755 21.0694 55.1755 21.3511 55.1051 21.7031ZM54.7531 18.8867H51.7254C51.5142 18.8867 51.3734 19.0275 51.3029 19.2388L50.106 26.9839C50.106 27.1248 50.1764 27.2656 50.3876 27.2656H51.9366C52.0775 27.2656 52.2183 27.1952 52.2183 26.9839L52.5703 24.8012C52.5703 24.59 52.7816 24.4492 52.9928 24.4492H53.9785C55.95 24.4492 57.0766 23.4634 57.4287 21.5623C57.5695 20.7174 57.4287 20.0837 57.0766 19.5908C56.5838 19.1684 55.8092 18.8867 54.7531 18.8867Z"
                      fill="#2199D6"
                    />
                    <path
                      d="M61.7946 24.5195C61.6538 25.3644 61.0201 25.9277 60.1752 25.9277C59.7527 25.9277 59.4007 25.7869 59.1894 25.5053C58.9782 25.2236 58.9078 24.8716 58.9782 24.5195C59.119 23.6746 59.7527 23.1113 60.5976 23.1113C61.0201 23.1113 61.3722 23.2521 61.5834 23.5338C61.7242 23.745 61.865 24.097 61.7946 24.5195ZM63.7661 21.7031H62.3579C62.2171 21.7031 62.1467 21.7735 62.0762 21.9143L62.0059 22.3368L61.9354 22.196C61.6538 21.7735 60.9497 21.5623 60.2456 21.5623C58.6261 21.5623 57.2883 22.7592 57.0067 24.4491C56.8659 25.294 57.0771 26.0685 57.57 26.6318C57.9924 27.1247 58.6261 27.3359 59.4007 27.3359C60.668 27.3359 61.3721 26.491 61.3721 26.491L61.3017 26.9135C61.3017 27.0543 61.3722 27.1951 61.5834 27.1951H62.8508C63.062 27.1951 63.2028 27.0543 63.2732 26.8431L64.0478 21.9143C64.0478 21.8439 63.9069 21.7031 63.7661 21.7031Z"
                      fill="#2199D6"
                    />
                    <path
                      d="M65.4559 19.098L64.1885 26.9839C64.1885 27.1248 64.2589 27.2656 64.4701 27.2656H65.7375C65.9488 27.2656 66.0896 27.1248 66.16 26.9135L67.357 19.1684C67.357 19.0275 67.2865 18.8867 67.0753 18.8867H65.6671C65.5967 18.8867 65.5263 19.0275 65.4559 19.098Z"
                      fill="#2199D6"
                    />
                    <path
                      d="M16.1679 28.7442L16.3791 27.2656H15.8862H13.4219L15.1117 16.4928C15.1117 16.4928 15.1117 16.4224 15.1821 16.4224H15.2526H19.4068C20.7446 16.4224 21.7303 16.704 22.2232 17.2673C22.4344 17.5489 22.5753 17.8306 22.6457 18.1122C22.7161 18.4643 22.7161 18.8163 22.6457 19.3092V19.5908L22.8569 19.7317C23.0681 19.8021 23.209 19.9429 23.3498 20.0837C23.561 20.2949 23.7018 20.5766 23.7018 20.9286C23.7722 21.2807 23.7722 21.7032 23.6314 22.196C23.4906 22.7593 23.3498 23.1818 23.1385 23.6042C22.9273 23.9563 22.6457 24.2379 22.364 24.5196C22.0824 24.7308 21.6599 24.8716 21.3079 25.0125C20.8854 25.0829 20.4629 25.1533 19.9701 25.1533H19.618C19.4068 25.1533 19.1956 25.2237 18.9843 25.3645C18.8435 25.5053 18.7027 25.7166 18.6323 25.9278V26.0686L18.2098 28.6738V28.7442V28.8146C18.2098 28.8146 18.2098 28.8146 18.1394 28.8146H16.1679V28.7442Z"
                      fill="#263577"
                    />
                    <path
                      d="M23.1387 19.3091C23.1387 19.3795 23.1387 19.4499 23.0683 19.5203C22.505 22.3367 20.6744 23.2521 18.2804 23.2521H17.0834C16.8018 23.2521 16.5201 23.4633 16.5201 23.745L15.8864 27.688L15.7456 28.8145C15.7456 29.0258 15.8864 29.1666 16.0272 29.1666H18.21C18.4916 29.1666 18.7029 28.9553 18.7029 28.7441V28.6033L19.1253 26.0685V25.9277C19.1957 25.646 19.407 25.5052 19.6182 25.5052H19.9702C22.0826 25.5052 23.702 24.6603 24.1245 22.1959C24.3357 21.1398 24.1949 20.2948 23.702 19.7315C23.5612 19.5907 23.35 19.4499 23.1387 19.3091Z"
                      fill="#2199D6"
                    />
                    <path
                      d="M22.5758 19.098C22.5054 19.098 22.435 19.0275 22.2942 19.0275C22.2238 19.0275 22.0829 18.9571 22.0125 18.9571C21.6605 18.8867 21.3084 18.8867 20.9564 18.8867H17.7175C17.6471 18.8867 17.5767 18.8867 17.5063 18.9571C17.3654 19.0275 17.2246 19.1684 17.2246 19.3092L16.5205 23.6746V23.8155C16.5909 23.5338 16.8021 23.3226 17.0838 23.3226H18.2808C20.6747 23.3226 22.5054 22.3368 23.0687 19.5908C23.0687 19.5204 23.0687 19.45 23.1391 19.3796C22.9983 19.3092 22.8575 19.2388 22.7166 19.1684C22.6462 19.098 22.5758 19.098 22.5758 19.098Z"
                      fill="#252C5E"
                    />
                    <path
                      d="M17.2246 19.3093C17.2246 19.1685 17.3655 19.0277 17.5063 18.9572C17.5767 18.9572 17.6471 18.8868 17.7175 18.8868H20.9564C21.3084 18.8868 21.7309 18.8868 22.0126 18.9572C22.083 18.9572 22.2238 18.9572 22.2942 19.0277C22.3646 19.0277 22.435 19.0981 22.5758 19.0981C22.6463 19.0981 22.6463 19.0981 22.7167 19.1685C22.8575 19.2389 22.9983 19.3093 23.1391 19.3797C23.28 18.3236 23.1391 17.6194 22.5758 16.9857C21.9421 16.2816 20.8156 16 19.4074 16H15.2531C14.9715 16 14.6899 16.2112 14.6899 16.4929L13 27.3361C13 27.5473 13.1408 27.7586 13.3521 27.7586H15.8868L16.5205 23.6748L17.2246 19.3093Z"
                      fill="#263577"
                    />
                  </svg>
                  <svg
                    width="80"
                    height="46"
                    viewBox="0 0 80 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="80" height="46" rx="8" fill="#F6F6F6" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.0004 21.6599C15.8903 21.9352 15.8352 22.2289 15.7618 22.5225C15.5783 23.4034 15.4315 24.3394 15.2296 25.2203C14.8258 25.2203 14.4037 25.2203 14 25.2203C14.4588 22.2472 15.303 19.3476 15.67 16.1543C16.0738 16.1543 16.4775 16.1543 16.8629 16.1543C16.8079 16.4479 16.7345 16.7232 16.6978 17.0169C16.6978 17.0352 16.6611 17.0536 16.6611 17.0903C17.2116 16.3745 18.0558 15.879 19.3955 16.0258C20.7169 16.1543 21.4326 17.2004 21.4877 18.43C21.6161 20.779 20.3682 22.9079 17.7989 22.7244C16.9547 22.6693 16.3124 22.3573 16.0004 21.6599ZM17.7255 17.2004C16.6427 17.7509 15.5966 20.2835 16.8262 21.3663C17.6337 22.082 18.9 21.6966 19.4322 21.036C20.0378 20.2835 20.5884 18.118 19.6708 17.3472C19.3588 17.0903 18.8633 16.9985 18.4045 17.0536C18.0742 17.0719 17.909 17.1086 17.7255 17.2004Z"
                      fill="#030000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.1586 22.5958C26.7732 22.5958 26.3878 22.5958 25.984 22.5958C26.0391 22.2288 26.1125 21.8801 26.1859 21.5314C25.8372 22.0452 25.2316 22.6325 24.3507 22.7243C23.0844 22.8527 21.9282 22.2104 21.8181 21.1643C21.7814 20.8157 21.7998 20.2467 22.0934 19.8063C22.8275 18.6501 24.7361 18.5767 26.6264 18.6318C27.1953 16.5396 24.1488 16.8516 23.1028 17.5306C23.1578 17.1269 23.2496 16.7415 23.3046 16.3377C25.1949 15.7505 27.7458 15.8973 27.8927 17.9344C27.9477 18.7419 27.7091 19.531 27.5623 20.3018C27.4155 21.0542 27.2687 21.7883 27.1586 22.5958ZM23.1578 20.9258C23.1945 21.458 23.7818 21.7516 24.2589 21.7516C25.5619 21.77 26.1859 20.6321 26.3878 19.5127C24.9196 19.4392 23.0661 19.6228 23.1578 20.9258Z"
                      fill="#030000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M29.9848 16.1726C30.2601 17.8794 30.5904 19.531 30.8474 21.2745C31.82 19.6045 32.7193 17.861 33.6736 16.1726C34.1141 16.1726 34.5545 16.1726 35.0133 16.1726C33.8388 18.3015 32.4624 20.6322 31.141 22.8711C30.7373 23.5685 30.3335 24.5045 29.7463 24.9633C29.2324 25.367 28.2414 25.4588 27.4155 25.2936C27.4339 24.9266 27.5623 24.6513 27.5807 24.3026C27.7459 24.2843 27.9477 24.3944 28.1496 24.3944C29.0489 24.3944 29.5444 23.5685 29.8747 22.9262C29.4893 20.7056 29.0672 18.5033 28.6818 16.2644C28.6451 16.2277 28.6635 16.2093 28.6818 16.1726C29.1223 16.1726 29.5627 16.1726 29.9848 16.1726Z"
                      fill="#030000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M35.5453 26.358C35.27 27.918 34.9213 29.3861 34.646 30.9461C33.7835 30.9461 32.9209 30.9461 32.04 30.9461C32.4438 29.0374 32.7925 27.1472 33.1779 25.2569C33.5633 23.385 34.0221 21.5131 34.2423 19.531C34.9397 19.476 35.8756 19.476 36.573 19.531C36.5547 19.9715 36.4445 20.3385 36.4078 20.7606C37.0869 20.0816 37.821 19.1823 39.3809 19.3292C40.8674 19.476 41.6933 20.7239 41.8034 22.3022C42.0052 25.0183 40.6839 27.6794 38.2981 27.8629C36.8116 27.973 36.1142 27.294 35.5453 26.358ZM36.5914 22.3022C35.9857 23.1648 35.7839 24.8164 36.5547 25.4588C37.0318 25.8625 37.9127 25.6606 38.3165 25.3303C38.8303 24.9082 39.1974 24.1007 39.179 23.0913C39.1607 22.1737 38.7569 21.4029 37.7843 21.5314C37.2153 21.6048 36.8666 21.8985 36.5914 22.3022Z"
                      fill="#009651"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M48.9423 27.6978C48.2632 27.6794 47.4924 27.7345 46.8685 27.6611C46.9419 27.294 46.9419 26.8352 46.9969 26.4682C46.7951 26.6701 46.6482 26.9637 46.3913 27.2023C45.5471 27.9731 43.6568 28.1382 42.7209 27.3674C41.7115 26.5232 41.8767 24.5045 42.7209 23.642C43.6935 22.6326 45.5288 22.3757 47.419 22.5775C47.6025 21.8067 47.0887 21.3296 46.4464 21.2378C45.5104 21.1094 44.2625 21.5131 43.7119 21.8434C43.822 21.1828 43.8587 20.467 43.9872 19.8064C44.6479 19.5678 45.2718 19.3843 46.061 19.3476C48.2449 19.2007 49.7497 19.9348 49.8966 21.8067C49.97 22.7978 49.6763 23.8255 49.4561 24.7981C49.2542 25.7524 49.1074 26.7251 48.9423 27.6978ZM46.3179 24.0273C45.5288 24.0457 44.6662 24.3026 44.4827 24.8899C44.3359 25.4038 44.7029 25.8809 45.0883 25.9543C46.2995 26.2112 47.1254 25.0184 47.2171 24.064C46.9419 24.009 46.5381 24.0273 46.3179 24.0273Z"
                      fill="#009651"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M56.9441 19.8063C56.8156 20.467 56.577 21.0175 56.4486 21.6782C55.8062 21.458 55.0354 21.1276 54.0261 21.2377C53.6223 21.2928 53.2186 21.4947 53.2186 21.8984C53.2369 22.3939 53.9894 22.5775 54.4482 22.761C55.0905 23.0363 55.8613 23.4033 56.1733 23.9539C56.7055 24.9082 56.1733 26.3029 55.6044 26.8902C55.1272 27.3857 54.228 27.7895 53.3103 27.8629C52.1175 27.9546 50.8695 27.7344 49.8418 27.4591C49.9886 26.7801 50.1538 26.1561 50.3373 25.5321C51.0163 25.8074 51.7871 26.0644 52.8332 25.9726C53.3287 25.9175 53.8793 25.7524 53.8059 25.1651C53.7508 24.6879 53.0351 24.5228 52.5029 24.3026C51.5118 23.8988 50.7778 23.3849 50.7778 22.0452C50.7778 19.2924 54.595 18.8336 56.9441 19.8063Z"
                      fill="#009651"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M63.4409 19.8063C63.2941 20.4486 63.0922 21.0543 62.9087 21.6782C62.3031 21.4397 61.514 21.1277 60.5046 21.2378C60.1009 21.2745 59.6971 21.4764 59.6971 21.8985C59.7155 22.4123 60.6331 22.6876 61.0552 22.8711C61.9177 23.2382 62.7436 23.6419 62.8537 24.6329C62.9638 25.6056 62.56 26.3947 61.9911 26.9269C61.4589 27.4408 60.6698 27.7895 59.7889 27.8629C58.5776 27.9547 57.4031 27.7344 56.3203 27.4592C56.4304 26.7618 56.6507 26.1929 56.7791 25.5322C57.2746 25.679 57.7518 25.9176 58.339 25.9726C59.1649 26.046 60.2844 25.991 60.266 25.2752C60.2477 24.5045 58.651 24.3393 58.0271 23.8438C57.348 23.3116 56.9259 22.0086 57.4581 20.9441C58.339 19.2925 61.3672 18.9254 63.4409 19.8063Z"
                      fill="#009651"
                    />
                    <path
                      d="M64.4133 20.6504H64.083L64.1014 20.522H64.9089L64.8905 20.6504H64.5602L64.3766 21.6598H64.2298L64.4133 20.6504Z"
                      fill="#009651"
                    />
                    <path
                      d="M65.7713 21.6598L65.8447 21.0542C65.863 20.9441 65.8814 20.7789 65.8998 20.6688C65.8447 20.7789 65.7896 20.9257 65.7162 21.0358L65.3859 21.6598H65.2758L65.184 21.0542C65.1657 20.9257 65.1473 20.7973 65.1473 20.6688C65.129 20.7789 65.0923 20.9441 65.0556 21.0542L64.9087 21.6598H64.7803L65.0739 20.522H65.2574L65.3492 21.1643C65.3675 21.2561 65.3675 21.3662 65.3675 21.4579C65.4042 21.3662 65.4593 21.2744 65.496 21.1827L65.8447 20.522H66.0282L65.8814 21.6598H65.7713Z"
                      fill="#009651"
                    />
                  </svg>
                </div>
                <div className={styles.pay_input_div}>
                  <div className={styles.input_div}>
                    <label htmlFor="">Card Number</label>
                    <input
                      type="number"
                      className={styles.form_wrapperInput}
                      placeholder="9874-6541-3210"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">Card Name</label>
                    <input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="HDFC Card"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">Expiration Date</label>
                    <input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="10/26"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">CVV</label>
                    <input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="852"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.cashonDilevery}>
                <input
                  type="radio"
                  onChange={(e) => myorderChangeHandler(e)}
                  name="payment_type"
                  value="cod"
                />
                <div className={styles.cashonDilevery_div}>
                  <h2>Cash on delivery</h2>
                  <p>Pay with cash upon delivery.</p>
                </div>
              </div>

              <button
                className={styles.btn_of_payment}
                onClick={placeOrderClickHandler}
              >
                Continue to Payment
              </button>
            </Col>
          </Row>
          <Row className={styles.pay_row}>
            {/* <Col lg={7} className={styles.pay_col}>
              <div className={styles.pay_method}>
                <h4 className={styles.pay_head}>Payment Method</h4>
                <div className={styles.icon_div}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="46"
                    viewBox="0 0 80 46"
                    fill="none"
                  >
                    <rect width="80" height="46" rx="8" fill="#F6F6F6" />
                    <path
                      d="M38.8539 22.0879V26.9405H37.3037V14.9566H41.4151C41.9058 14.9464 42.3938 15.0329 42.8507 15.2109C43.3076 15.389 43.7245 15.6552 44.0774 15.9941C44.4337 16.3124 44.7174 16.7028 44.9092 17.139C45.101 17.5753 45.1966 18.0472 45.1895 18.5232C45.1997 19.0017 45.1056 19.4767 44.9136 19.9157C44.7217 20.3548 44.4364 20.7474 44.0774 21.0666C43.3584 21.7475 42.471 22.0875 41.4151 22.0869H38.8539V22.0879ZM38.8539 16.432V20.6153H41.4536C41.7386 20.6237 42.0222 20.5729 42.2863 20.4663C42.5505 20.3596 42.7892 20.1993 42.9874 19.9957C43.1846 19.8054 43.3413 19.5777 43.4483 19.3262C43.5553 19.0747 43.6104 18.8044 43.6104 18.5313C43.6104 18.2583 43.5553 17.988 43.4483 17.7365C43.3413 17.4849 43.1846 17.2573 42.9874 17.0669C42.7917 16.8591 42.5538 16.6949 42.2893 16.5852C42.0249 16.4756 41.74 16.4231 41.4536 16.4311H38.8539V16.432Z"
                      fill="#5F6368"
                    />
                    <path
                      d="M48.7611 18.4736C49.9069 18.4736 50.8113 18.7777 51.4744 19.3858C52.1375 19.994 52.4687 20.8278 52.4681 21.8872V26.9407H50.9853V25.8028H50.9179C50.276 26.7399 49.4222 27.2084 48.3567 27.2084C47.4471 27.2084 46.6861 26.9407 46.0738 26.4052C45.7799 26.1594 45.5449 25.8517 45.386 25.5043C45.2271 25.1569 45.1483 24.7787 45.1552 24.3972C45.1552 23.5488 45.4781 22.874 46.1238 22.373C46.7696 21.8719 47.6317 21.6208 48.7101 21.6195C49.6305 21.6195 50.3886 21.7868 50.9843 22.1215V21.7696C50.9861 21.5095 50.9295 21.2523 50.8188 21.0167C50.708 20.781 50.5458 20.5728 50.344 20.407C49.9341 20.0397 49.3998 19.8393 48.8477 19.8458C47.9818 19.8458 47.2966 20.2085 46.7921 20.9339L45.4267 20.08C46.1778 19.0091 47.2892 18.4736 48.7611 18.4736ZM46.7555 24.4307C46.7544 24.6266 46.8005 24.8199 46.89 24.9946C46.9794 25.1692 47.1096 25.3201 47.2696 25.4347C47.6125 25.7025 48.038 25.8444 48.4742 25.8363C49.1283 25.8352 49.7554 25.5766 50.2179 25.1172C50.7314 24.6372 50.9882 24.074 50.9882 23.4276C50.5048 23.0452 49.8308 22.8539 48.9662 22.8539C48.3365 22.8539 47.8114 23.0047 47.3909 23.3062C46.9663 23.6122 46.7555 23.9841 46.7555 24.4307Z"
                      fill="#5F6368"
                    />
                    <path
                      d="M60.98 18.7412L55.8037 30.5549H54.2035L56.1244 26.4213L52.7207 18.7412H54.4057L56.8658 24.6313H56.8995L59.2922 18.7412H60.98Z"
                      fill="#5F6368"
                    />
                    <path
                      d="M32.5893 21.0419C32.5899 20.5728 32.5499 20.1045 32.4699 19.6421H25.9321V22.2936H29.6766C29.6 22.7171 29.4378 23.1208 29.1999 23.4803C28.9619 23.8399 28.6531 24.1479 28.2921 24.3857V26.1069H30.5268C31.8354 24.9088 32.5893 23.137 32.5893 21.0419Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M25.9323 27.7696C27.8031 27.7696 29.3783 27.1595 30.527 26.1077L28.2922 24.3866C27.6702 24.8054 26.8691 25.0444 25.9323 25.0444C24.1241 25.0444 22.5893 23.8339 22.0405 22.2026H19.7383V23.9764C20.3153 25.1166 21.2001 26.0751 22.2938 26.7449C23.3876 27.4148 24.6473 27.7695 25.9323 27.7696Z"
                      fill="#34A853"
                    />
                    <path
                      d="M22.0404 22.2027C21.7502 21.3479 21.7502 20.4222 22.0404 19.5674V17.7937H19.7382C19.2528 18.7529 19 19.8115 19 20.8851C19 21.9586 19.2528 23.0172 19.7382 23.9764L22.0404 22.2027Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M25.9323 16.7256C26.9209 16.7095 27.8762 17.0805 28.5917 17.7583L30.5703 15.7933C29.3157 14.623 27.6535 13.9805 25.9323 14.0005C24.6473 14.0005 23.3876 14.3552 22.2938 15.0251C21.2001 15.6949 20.3153 16.6534 19.7383 17.7936L22.0405 19.5674C22.5893 17.9361 24.1241 16.7256 25.9323 16.7256Z"
                      fill="#EA4335"
                    />
                  </svg>
                  <svg
                    width="80"
                    height="46"
                    viewBox="0 0 80 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="80" height="46" rx="8" fill="#F6F6F6" />
                    <path
                      d="M57.7207 17.1775H55.1784C54.4098 17.1775 53.8186 17.414 53.4638 18.1826L48.6157 29.2386H52.0449C52.0449 29.2386 52.6361 27.7605 52.7543 27.4058C53.1091 27.4058 56.4791 27.4058 56.9521 27.4058C57.0703 27.8196 57.3659 29.1795 57.3659 29.1795H60.4403L57.7207 17.1775ZM53.7003 24.9226C53.9959 24.2131 55.001 21.5526 55.001 21.5526C55.001 21.6117 55.2966 20.8431 55.4149 20.4293L55.6514 21.4935C55.6514 21.4935 56.3017 24.3905 56.42 24.9817H53.7003V24.9226Z"
                      fill="#3362AB"
                    />
                    <path
                      d="M48.8522 25.2772C48.8522 27.7604 46.6055 29.4158 43.1173 29.4158C41.6392 29.4158 40.2203 29.1202 39.4517 28.7655L39.9246 26.0458L40.3385 26.2232C41.4027 26.6962 42.1122 26.8736 43.4129 26.8736C44.3589 26.8736 45.364 26.5188 45.364 25.6911C45.364 25.159 44.9501 24.8042 43.6494 24.213C42.4078 23.6218 40.7524 22.6758 40.7524 20.9612C40.7524 18.5963 43.0582 17 46.3099 17C47.5515 17 48.6157 17.2365 49.2661 17.5321L48.7931 20.1335L48.5566 19.897C47.9654 19.6605 47.1968 19.424 46.0734 19.424C44.8319 19.4832 44.2406 20.0153 44.2406 20.4883C44.2406 21.0204 44.9501 21.4342 46.0734 21.9663C47.9654 22.8532 48.8522 23.8583 48.8522 25.2772Z"
                      fill="#3362AB"
                    />
                    <path
                      d="M20 17.2956L20.0591 17.0591H25.1437C25.8532 17.0591 26.3853 17.2956 26.5627 18.0642L27.686 23.3853C26.5627 20.5473 23.9612 18.2415 20 17.2956Z"
                      fill="#F9B50B"
                    />
                    <path
                      d="M34.8401 17.1773L29.6964 29.1793H26.2081L23.252 19.1283C25.3804 20.4882 27.1541 22.6166 27.8044 24.0947L28.1592 25.3363L31.3518 17.1182H34.8401V17.1773Z"
                      fill="#3362AB"
                    />
                    <path
                      d="M36.1997 17.1182H39.4514L37.3821 29.1793H34.1304L36.1997 17.1182Z"
                      fill="#3362AB"
                    />
                  </svg>
                  <svg
                    width="80"
                    height="46"
                    viewBox="0 0 80 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="80" height="46" rx="8" fill="#F6F6F6" />
                    <path
                      d="M33.7008 21.7031C33.56 22.7593 32.7151 22.7593 31.9406 22.7593H31.5181L31.8701 20.7174C31.8701 20.5766 32.011 20.5062 32.1518 20.5062H32.363C32.9263 20.5062 33.4192 20.5062 33.7008 20.7878C33.7008 21.0694 33.7008 21.3511 33.7008 21.7031ZM33.3488 18.8867H30.3211C30.1099 18.8867 29.9691 19.0275 29.8986 19.2388L28.7017 26.9839C28.7017 27.1248 28.7721 27.2656 28.9833 27.2656H30.3915C30.6028 27.2656 30.7436 27.1248 30.814 26.9135L31.166 24.8012C31.166 24.59 31.3773 24.4492 31.5885 24.4492H32.5742C34.5457 24.4492 35.6723 23.4634 36.0244 21.5623C36.1652 20.7174 36.0244 20.0837 35.6723 19.5908C35.109 19.1684 34.3345 18.8867 33.3488 18.8867Z"
                      fill="#263577"
                    />
                    <path
                      d="M40.319 24.5195C40.1782 25.3644 39.5445 25.9277 38.6996 25.9277C38.2771 25.9277 37.9251 25.7869 37.7138 25.5053C37.5026 25.2236 37.4322 24.8716 37.5026 24.5195C37.6434 23.6746 38.2771 23.1113 39.1221 23.1113C39.5445 23.1113 39.8966 23.2521 40.1078 23.5338C40.2486 23.745 40.3894 24.097 40.319 24.5195ZM42.2905 21.7031H40.8823C40.7415 21.7031 40.6711 21.7735 40.6007 21.9143L40.5303 22.3368L40.4599 22.196C40.1782 21.7735 39.4741 21.5623 38.77 21.5623C37.1506 21.5623 35.8128 22.7592 35.5311 24.4491C35.3903 25.294 35.6015 26.0685 36.0944 26.6318C36.5168 27.1247 37.1506 27.3359 37.9251 27.3359C39.1925 27.3359 39.8966 26.491 39.8966 26.491L39.8262 26.9135C39.8262 27.0543 39.8966 27.1951 40.1078 27.1951H41.3752C41.5864 27.1951 41.7272 27.0543 41.7977 26.8431L42.5722 21.9143C42.5722 21.8439 42.5018 21.7031 42.2905 21.7031Z"
                      fill="#263577"
                    />
                    <path
                      d="M49.9656 21.7031H48.4869C48.3461 21.7031 48.2053 21.7735 48.1349 21.9144L46.1634 24.8716L45.3184 22.0552C45.248 21.8439 45.1072 21.7735 44.896 21.7735H43.4878C43.3469 21.7735 43.2061 21.9144 43.2765 22.1256L44.896 26.7727L43.4173 28.885C43.2765 29.0258 43.4174 29.3075 43.6286 29.3075H45.1072C45.248 29.3075 45.3889 29.2371 45.4593 29.0962L50.2472 22.1256C50.3176 21.9144 50.1768 21.7031 49.9656 21.7031Z"
                      fill="#263577"
                    />
                    <path
                      d="M55.1051 21.7031C54.9643 22.7593 54.1194 22.7593 53.3449 22.7593H52.9224L53.2744 20.7174C53.2744 20.5766 53.4153 20.5062 53.5561 20.5062H53.7673C54.3306 20.5062 54.8235 20.5062 55.1051 20.7878C55.1755 21.0694 55.1755 21.3511 55.1051 21.7031ZM54.7531 18.8867H51.7254C51.5142 18.8867 51.3734 19.0275 51.3029 19.2388L50.106 26.9839C50.106 27.1248 50.1764 27.2656 50.3876 27.2656H51.9366C52.0775 27.2656 52.2183 27.1952 52.2183 26.9839L52.5703 24.8012C52.5703 24.59 52.7816 24.4492 52.9928 24.4492H53.9785C55.95 24.4492 57.0766 23.4634 57.4287 21.5623C57.5695 20.7174 57.4287 20.0837 57.0766 19.5908C56.5838 19.1684 55.8092 18.8867 54.7531 18.8867Z"
                      fill="#2199D6"
                    />
                    <path
                      d="M61.7946 24.5195C61.6538 25.3644 61.0201 25.9277 60.1752 25.9277C59.7527 25.9277 59.4007 25.7869 59.1894 25.5053C58.9782 25.2236 58.9078 24.8716 58.9782 24.5195C59.119 23.6746 59.7527 23.1113 60.5976 23.1113C61.0201 23.1113 61.3722 23.2521 61.5834 23.5338C61.7242 23.745 61.865 24.097 61.7946 24.5195ZM63.7661 21.7031H62.3579C62.2171 21.7031 62.1467 21.7735 62.0762 21.9143L62.0059 22.3368L61.9354 22.196C61.6538 21.7735 60.9497 21.5623 60.2456 21.5623C58.6261 21.5623 57.2883 22.7592 57.0067 24.4491C56.8659 25.294 57.0771 26.0685 57.57 26.6318C57.9924 27.1247 58.6261 27.3359 59.4007 27.3359C60.668 27.3359 61.3721 26.491 61.3721 26.491L61.3017 26.9135C61.3017 27.0543 61.3722 27.1951 61.5834 27.1951H62.8508C63.062 27.1951 63.2028 27.0543 63.2732 26.8431L64.0478 21.9143C64.0478 21.8439 63.9069 21.7031 63.7661 21.7031Z"
                      fill="#2199D6"
                    />
                    <path
                      d="M65.4559 19.098L64.1885 26.9839C64.1885 27.1248 64.2589 27.2656 64.4701 27.2656H65.7375C65.9488 27.2656 66.0896 27.1248 66.16 26.9135L67.357 19.1684C67.357 19.0275 67.2865 18.8867 67.0753 18.8867H65.6671C65.5967 18.8867 65.5263 19.0275 65.4559 19.098Z"
                      fill="#2199D6"
                    />
                    <path
                      d="M16.1679 28.7442L16.3791 27.2656H15.8862H13.4219L15.1117 16.4928C15.1117 16.4928 15.1117 16.4224 15.1821 16.4224H15.2526H19.4068C20.7446 16.4224 21.7303 16.704 22.2232 17.2673C22.4344 17.5489 22.5753 17.8306 22.6457 18.1122C22.7161 18.4643 22.7161 18.8163 22.6457 19.3092V19.5908L22.8569 19.7317C23.0681 19.8021 23.209 19.9429 23.3498 20.0837C23.561 20.2949 23.7018 20.5766 23.7018 20.9286C23.7722 21.2807 23.7722 21.7032 23.6314 22.196C23.4906 22.7593 23.3498 23.1818 23.1385 23.6042C22.9273 23.9563 22.6457 24.2379 22.364 24.5196C22.0824 24.7308 21.6599 24.8716 21.3079 25.0125C20.8854 25.0829 20.4629 25.1533 19.9701 25.1533H19.618C19.4068 25.1533 19.1956 25.2237 18.9843 25.3645C18.8435 25.5053 18.7027 25.7166 18.6323 25.9278V26.0686L18.2098 28.6738V28.7442V28.8146C18.2098 28.8146 18.2098 28.8146 18.1394 28.8146H16.1679V28.7442Z"
                      fill="#263577"
                    />
                    <path
                      d="M23.1387 19.3091C23.1387 19.3795 23.1387 19.4499 23.0683 19.5203C22.505 22.3367 20.6744 23.2521 18.2804 23.2521H17.0834C16.8018 23.2521 16.5201 23.4633 16.5201 23.745L15.8864 27.688L15.7456 28.8145C15.7456 29.0258 15.8864 29.1666 16.0272 29.1666H18.21C18.4916 29.1666 18.7029 28.9553 18.7029 28.7441V28.6033L19.1253 26.0685V25.9277C19.1957 25.646 19.407 25.5052 19.6182 25.5052H19.9702C22.0826 25.5052 23.702 24.6603 24.1245 22.1959C24.3357 21.1398 24.1949 20.2948 23.702 19.7315C23.5612 19.5907 23.35 19.4499 23.1387 19.3091Z"
                      fill="#2199D6"
                    />
                    <path
                      d="M22.5758 19.098C22.5054 19.098 22.435 19.0275 22.2942 19.0275C22.2238 19.0275 22.0829 18.9571 22.0125 18.9571C21.6605 18.8867 21.3084 18.8867 20.9564 18.8867H17.7175C17.6471 18.8867 17.5767 18.8867 17.5063 18.9571C17.3654 19.0275 17.2246 19.1684 17.2246 19.3092L16.5205 23.6746V23.8155C16.5909 23.5338 16.8021 23.3226 17.0838 23.3226H18.2808C20.6747 23.3226 22.5054 22.3368 23.0687 19.5908C23.0687 19.5204 23.0687 19.45 23.1391 19.3796C22.9983 19.3092 22.8575 19.2388 22.7166 19.1684C22.6462 19.098 22.5758 19.098 22.5758 19.098Z"
                      fill="#252C5E"
                    />
                    <path
                      d="M17.2246 19.3093C17.2246 19.1685 17.3655 19.0277 17.5063 18.9572C17.5767 18.9572 17.6471 18.8868 17.7175 18.8868H20.9564C21.3084 18.8868 21.7309 18.8868 22.0126 18.9572C22.083 18.9572 22.2238 18.9572 22.2942 19.0277C22.3646 19.0277 22.435 19.0981 22.5758 19.0981C22.6463 19.0981 22.6463 19.0981 22.7167 19.1685C22.8575 19.2389 22.9983 19.3093 23.1391 19.3797C23.28 18.3236 23.1391 17.6194 22.5758 16.9857C21.9421 16.2816 20.8156 16 19.4074 16H15.2531C14.9715 16 14.6899 16.2112 14.6899 16.4929L13 27.3361C13 27.5473 13.1408 27.7586 13.3521 27.7586H15.8868L16.5205 23.6748L17.2246 19.3093Z"
                      fill="#263577"
                    />
                  </svg>
                  <svg
                    width="80"
                    height="46"
                    viewBox="0 0 80 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="80" height="46" rx="8" fill="#F6F6F6" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.0004 21.6599C15.8903 21.9352 15.8352 22.2289 15.7618 22.5225C15.5783 23.4034 15.4315 24.3394 15.2296 25.2203C14.8258 25.2203 14.4037 25.2203 14 25.2203C14.4588 22.2472 15.303 19.3476 15.67 16.1543C16.0738 16.1543 16.4775 16.1543 16.8629 16.1543C16.8079 16.4479 16.7345 16.7232 16.6978 17.0169C16.6978 17.0352 16.6611 17.0536 16.6611 17.0903C17.2116 16.3745 18.0558 15.879 19.3955 16.0258C20.7169 16.1543 21.4326 17.2004 21.4877 18.43C21.6161 20.779 20.3682 22.9079 17.7989 22.7244C16.9547 22.6693 16.3124 22.3573 16.0004 21.6599ZM17.7255 17.2004C16.6427 17.7509 15.5966 20.2835 16.8262 21.3663C17.6337 22.082 18.9 21.6966 19.4322 21.036C20.0378 20.2835 20.5884 18.118 19.6708 17.3472C19.3588 17.0903 18.8633 16.9985 18.4045 17.0536C18.0742 17.0719 17.909 17.1086 17.7255 17.2004Z"
                      fill="#030000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.1586 22.5958C26.7732 22.5958 26.3878 22.5958 25.984 22.5958C26.0391 22.2288 26.1125 21.8801 26.1859 21.5314C25.8372 22.0452 25.2316 22.6325 24.3507 22.7243C23.0844 22.8527 21.9282 22.2104 21.8181 21.1643C21.7814 20.8157 21.7998 20.2467 22.0934 19.8063C22.8275 18.6501 24.7361 18.5767 26.6264 18.6318C27.1953 16.5396 24.1488 16.8516 23.1028 17.5306C23.1578 17.1269 23.2496 16.7415 23.3046 16.3377C25.1949 15.7505 27.7458 15.8973 27.8927 17.9344C27.9477 18.7419 27.7091 19.531 27.5623 20.3018C27.4155 21.0542 27.2687 21.7883 27.1586 22.5958ZM23.1578 20.9258C23.1945 21.458 23.7818 21.7516 24.2589 21.7516C25.5619 21.77 26.1859 20.6321 26.3878 19.5127C24.9196 19.4392 23.0661 19.6228 23.1578 20.9258Z"
                      fill="#030000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M29.9848 16.1726C30.2601 17.8794 30.5904 19.531 30.8474 21.2745C31.82 19.6045 32.7193 17.861 33.6736 16.1726C34.1141 16.1726 34.5545 16.1726 35.0133 16.1726C33.8388 18.3015 32.4624 20.6322 31.141 22.8711C30.7373 23.5685 30.3335 24.5045 29.7463 24.9633C29.2324 25.367 28.2414 25.4588 27.4155 25.2936C27.4339 24.9266 27.5623 24.6513 27.5807 24.3026C27.7459 24.2843 27.9477 24.3944 28.1496 24.3944C29.0489 24.3944 29.5444 23.5685 29.8747 22.9262C29.4893 20.7056 29.0672 18.5033 28.6818 16.2644C28.6451 16.2277 28.6635 16.2093 28.6818 16.1726C29.1223 16.1726 29.5627 16.1726 29.9848 16.1726Z"
                      fill="#030000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M35.5453 26.358C35.27 27.918 34.9213 29.3861 34.646 30.9461C33.7835 30.9461 32.9209 30.9461 32.04 30.9461C32.4438 29.0374 32.7925 27.1472 33.1779 25.2569C33.5633 23.385 34.0221 21.5131 34.2423 19.531C34.9397 19.476 35.8756 19.476 36.573 19.531C36.5547 19.9715 36.4445 20.3385 36.4078 20.7606C37.0869 20.0816 37.821 19.1823 39.3809 19.3292C40.8674 19.476 41.6933 20.7239 41.8034 22.3022C42.0052 25.0183 40.6839 27.6794 38.2981 27.8629C36.8116 27.973 36.1142 27.294 35.5453 26.358ZM36.5914 22.3022C35.9857 23.1648 35.7839 24.8164 36.5547 25.4588C37.0318 25.8625 37.9127 25.6606 38.3165 25.3303C38.8303 24.9082 39.1974 24.1007 39.179 23.0913C39.1607 22.1737 38.7569 21.4029 37.7843 21.5314C37.2153 21.6048 36.8666 21.8985 36.5914 22.3022Z"
                      fill="#009651"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M48.9423 27.6978C48.2632 27.6794 47.4924 27.7345 46.8685 27.6611C46.9419 27.294 46.9419 26.8352 46.9969 26.4682C46.7951 26.6701 46.6482 26.9637 46.3913 27.2023C45.5471 27.9731 43.6568 28.1382 42.7209 27.3674C41.7115 26.5232 41.8767 24.5045 42.7209 23.642C43.6935 22.6326 45.5288 22.3757 47.419 22.5775C47.6025 21.8067 47.0887 21.3296 46.4464 21.2378C45.5104 21.1094 44.2625 21.5131 43.7119 21.8434C43.822 21.1828 43.8587 20.467 43.9872 19.8064C44.6479 19.5678 45.2718 19.3843 46.061 19.3476C48.2449 19.2007 49.7497 19.9348 49.8966 21.8067C49.97 22.7978 49.6763 23.8255 49.4561 24.7981C49.2542 25.7524 49.1074 26.7251 48.9423 27.6978ZM46.3179 24.0273C45.5288 24.0457 44.6662 24.3026 44.4827 24.8899C44.3359 25.4038 44.7029 25.8809 45.0883 25.9543C46.2995 26.2112 47.1254 25.0184 47.2171 24.064C46.9419 24.009 46.5381 24.0273 46.3179 24.0273Z"
                      fill="#009651"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M56.9441 19.8063C56.8156 20.467 56.577 21.0175 56.4486 21.6782C55.8062 21.458 55.0354 21.1276 54.0261 21.2377C53.6223 21.2928 53.2186 21.4947 53.2186 21.8984C53.2369 22.3939 53.9894 22.5775 54.4482 22.761C55.0905 23.0363 55.8613 23.4033 56.1733 23.9539C56.7055 24.9082 56.1733 26.3029 55.6044 26.8902C55.1272 27.3857 54.228 27.7895 53.3103 27.8629C52.1175 27.9546 50.8695 27.7344 49.8418 27.4591C49.9886 26.7801 50.1538 26.1561 50.3373 25.5321C51.0163 25.8074 51.7871 26.0644 52.8332 25.9726C53.3287 25.9175 53.8793 25.7524 53.8059 25.1651C53.7508 24.6879 53.0351 24.5228 52.5029 24.3026C51.5118 23.8988 50.7778 23.3849 50.7778 22.0452C50.7778 19.2924 54.595 18.8336 56.9441 19.8063Z"
                      fill="#009651"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M63.4409 19.8063C63.2941 20.4486 63.0922 21.0543 62.9087 21.6782C62.3031 21.4397 61.514 21.1277 60.5046 21.2378C60.1009 21.2745 59.6971 21.4764 59.6971 21.8985C59.7155 22.4123 60.6331 22.6876 61.0552 22.8711C61.9177 23.2382 62.7436 23.6419 62.8537 24.6329C62.9638 25.6056 62.56 26.3947 61.9911 26.9269C61.4589 27.4408 60.6698 27.7895 59.7889 27.8629C58.5776 27.9547 57.4031 27.7344 56.3203 27.4592C56.4304 26.7618 56.6507 26.1929 56.7791 25.5322C57.2746 25.679 57.7518 25.9176 58.339 25.9726C59.1649 26.046 60.2844 25.991 60.266 25.2752C60.2477 24.5045 58.651 24.3393 58.0271 23.8438C57.348 23.3116 56.9259 22.0086 57.4581 20.9441C58.339 19.2925 61.3672 18.9254 63.4409 19.8063Z"
                      fill="#009651"
                    />
                    <path
                      d="M64.4133 20.6504H64.083L64.1014 20.522H64.9089L64.8905 20.6504H64.5602L64.3766 21.6598H64.2298L64.4133 20.6504Z"
                      fill="#009651"
                    />
                    <path
                      d="M65.7713 21.6598L65.8447 21.0542C65.863 20.9441 65.8814 20.7789 65.8998 20.6688C65.8447 20.7789 65.7896 20.9257 65.7162 21.0358L65.3859 21.6598H65.2758L65.184 21.0542C65.1657 20.9257 65.1473 20.7973 65.1473 20.6688C65.129 20.7789 65.0923 20.9441 65.0556 21.0542L64.9087 21.6598H64.7803L65.0739 20.522H65.2574L65.3492 21.1643C65.3675 21.2561 65.3675 21.3662 65.3675 21.4579C65.4042 21.3662 65.4593 21.2744 65.496 21.1827L65.8447 20.522H66.0282L65.8814 21.6598H65.7713Z"
                      fill="#009651"
                    />
                  </svg>
                </div>
                <div className={styles.pay_input_div}>
                  <div className={styles.input_div}>
                    <label htmlFor="">Card Number</label>
                    <input
                      type="number"
                      className={styles.form_wrapperInput}
                      placeholder="9874-6541-3210"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">Card Name</label>
                    <input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="HDFC Card"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">Expiration Date</label>
                    <input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="10/26"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">CVV</label>
                    <input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="852"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.cashonDilevery}>
                <input
                  type="radio"
                  onChange={(e) => myorderChangeHandler(e)}
                  name="payment_type"
                  value="cod"
                />
                <div className={styles.cashonDilevery_div}>
                  <h2>Cash on delivery</h2>
                  <p>Pay with cash upon delivery.</p>
                </div>
              </div>

              <button
                className={styles.btn_of_payment}
                onClick={placeOrderClickHandler}
              >
                Continue to Payment
              </button>
            </Col> */}
            <Col lg={5} className={styles.pay_col2}></Col>
          </Row>
        </div>
      </div>

      {
        <AddAddressModal
          openAddress={openAddress}
          getAddress={getAddress}
          newAddress={newAddress}
          addressModalClose={addressModalClose}
          newAddressSubmitHandler={newAddressSubmitHandler}
          addAddressChangeHandler={addAddressChangeHandler}
        />
      }
    </>
  );
};

export default Checkout;
