import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import styles from "./checkout.module.scss";

const AddAddressModal = ({
  openAddress,
  addressModalClose,
  getAddress,
  newAddress,
  newAddressSubmitHandler,
  addAddressChangeHandler,
}) => {
  return (
    <>
      <Modal open={openAddress} onClose={addressModalClose} center>
        <Row className={styles.mainModal}>
          <Col lg={7} className={styles.check_col_1}>
            <h4>Add New Address</h4>
            <form onSubmit={(e) => newAddressSubmitHandler(e)}>
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
                  <Form.Group>
                    <Form.Label style={{ color: "black" }}>
                      Address 1*
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address_1"
                      placeholder="Add Your First Address"
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
                      placeholder="Add Your Second Address"
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
                    type="number"
                    placeholder="Zip Code"
                    onChange={(e) => addAddressChangeHandler(e)}
                    value={newAddress?.zip_code}
                  />
                </div>
              </div>

              <div className={styles.short_input_div}>
                <div className={styles.label_div}>
                  <label>Other Instruction </label>
                  <input
                    name="other_instruction"
                    type="text"
                    placeholder="Other Instructions"
                    onChange={(e) => addAddressChangeHandler(e)}
                    value={newAddress?.other_instruction}
                  />
                </div>
              </div>
              <button type="submit" className={styles.saveAddressBtbn}>
                Save
              </button>
              {/* <button type="submit" className={styles.saveAddressBtbn2}>
                Cancel
              </button> */}
            </form>
          </Col>{" "}
        </Row>
      </Modal>
    </>
  );
};

export default AddAddressModal;
