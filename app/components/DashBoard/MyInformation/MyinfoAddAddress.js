import React from "react";
import styles from "./myinfo.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";
import { usePlacesWidget } from "react-google-autocomplete";

const MyinfoAddAddress = ({
  addAddressChangeHandler,
  newAddressSubmitHandler,
  newAddress,
  setNewAddress,
  handleChangeTab,
  handletab,
  setCurrentTab,
}) => {
  const { ref: bootstrapRef } = usePlacesWidget({
    apiKey: "AIzaSyDDl-_JOy_bj4MyQhYbKbGkZ0sfpbTZDNU",
    onPlaceSelected: (place) =>
      setNewAddress({
        ...newAddress,
        address_1: place?.formatted_address,
        address_2: place?.formatted_address,
      }),
  });
  return (
    <>
      <div className={styles["myinfoAddAddress_wrapper"]}>
        <div className={styles.company_info}>
          <h4
            onClick={() => {
              handleChangeTab("information", "back");
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6665 5L7.2558 9.41074C6.93036 9.73618 6.93036 10.2638 7.2558 10.5893L11.6665 15"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>{" "}
            My Info
          </h4>

          <Row className={styles.check_row}>
            <Col lg={7} className={styles.check_col_1}>
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
                        Address 2
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
                    <label>City* </label>
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
                    <label>Zip Code* </label>
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
                <div className={styles.btnDivs}>
                  <button type="submit" className={styles.saveAddressBtbn}>
                    Save
                  </button>
                  <div className={styles.saveAddressBtbn2} onClick={handletab}>
                    Cancel
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default MyinfoAddAddress;
