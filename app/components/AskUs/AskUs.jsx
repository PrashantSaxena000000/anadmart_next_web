"use client";

import styles from "./askus.module.scss";
import AskCard from "./AskCard";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAskusAnything,
  setPageLoading,
} from "../redux/actions/authActions";
import Loading from "../Loading/Loading";
import Select from "react-select";
import { Navbar } from "react-bootstrap";
import { SET_FAQ_SEARCH_LIST } from "../redux/types";

const AskUs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const getAskUsList = useSelector((state) => state.home.getAskUsList?.data);
  const pageLoading = useSelector((state) => state?.home?.pageLoading);

  const [search, setSearch] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [selectsearch, setSelectSearch] = useState();

  const sendToRequests = () => {
    router.push("/my-request");
  };
  const sendToOrder = () => {
    router.push("/dashboard/my-orders");
  };

  const customStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? "#eceff0"
          : undefined,
        color: isDisabled ? "green" : "black",
        fontSize: isDisabled ? "16px" : "16px",
        fontWeight: isDisabled ? "500" : "500",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : "#eceff0"
            : undefined,
        },
      };
    },
  };

  const searchbarmain = () => {
    if (!selectsearch) {
      toast.error("Enter something to search");
    } else {
      dispatch(setPageLoading(true));
      dispatch({
        type: SET_FAQ_SEARCH_LIST,
        payload:
          getAskUsList &&
          getAskUsList.filter((filtprod) =>
            filtprod?.question
              .toLowerCase()
              .includes(selectsearch.toLowerCase())
          ),
      });
      router.push(`/search/?search=${selectsearch}`);
    }
  };

  useEffect(() => {
    dispatch(fetchAskusAnything());
  }, []);

  return (
    <>
      <div className={styles.askus_wrapper}>
        <div className={styles.upper_div}>
          <div className="container">
            <div className={styles.div_of_asks}>
              <h4>ask us any thing shouldn't be under Shop by Department</h4>
              <h6> Have any questions? We're here to assist you.</h6>
              <div className={styles.asksinputs}>
                <input type="text" placeholder="Search here..." />
                <Navbar.Collapse
                  id="responsive-navbar-nav"
                  className={styles.collaps}
                >
                  <Select
                    placeholder="Search Product"
                    styles={customStyles}
                    className={styles.inputfor}
                    menuIsOpen={search ? true : false}
                    hideSelectedOptions
                    name="option-select"
                    noOptionsMessage={() => <div>No Products Available</div>}
                    inputValue={search}
                    value={search}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        keypressedEnter.current = e.key;
                      } else {
                        keypressedEnter.current = "";
                      }
                      if (e.key != "Enter") {
                        keypressed.current = e.key;
                      } else if (e.key == "Enter") {
                        dispatch(setPageLoading(true));
                        dispatch({
                          type: SET_FAQ_SEARCH_LIST,
                          payload:
                            getAskUsList &&
                            getAskUsList.filter((filtprod) =>
                              filtprod?.question
                                .toLowerCase()
                                .includes(e?.target?.value?.toLowerCase())
                            ),
                        });

                        router.push(`/search/?search=${e.target.value}`);
                      }
                    }}
                    onInputChange={(e) => {
                      setSearch(e);
                      if (e) {
                        setSelectSearch(e);
                      }
                    }}
                    onChange={(e, action) => {
                      id.current = e.value;
                      if (
                        keypressed.current == "ArrowUp" ||
                        keypressed.current == "ArrowDown"
                      ) {
                        productHandler(e.value);
                      } else if (keypressedEnter.current == "") {
                        productHandler(e.value);
                      }
                    }}
                    options={searchedProducts}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    onClick={searchbarmain}
                  >
                    <path
                      d="M12.8685 12.872L10.2025 10.206M11.6428 6.74334C11.6428 9.45116 9.44766 11.6463 6.73985 11.6463C4.03203 11.6463 1.83691 9.45116 1.83691 6.74334C1.83691 4.03553 4.03203 1.84041 6.73985 1.84041C9.44766 1.84041 11.6428 4.03553 11.6428 6.74334Z"
                      stroke="#53686A"
                      strokeWidth="1.22573"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                </Navbar.Collapse>
              </div>
              <div className={styles.tab_disvs}>
                <ul>
                  <li onClick={sendToRequests}>My Requests</li>
                  <li onClick={sendToOrder}>Orders</li>
                  <li>Account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cards_divs}>
          <div className={`container ${styles.cardsss}`}>
            {getAskUsList?.map((items, key) => (
              <AskCard
                imgsvg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                  >
                    <path
                      d="M17.0066 5.23991C17.0066 4.43092 16.3448 3.76903 15.5358 3.76903H3.76873C2.95975 3.76903 2.29785 4.43092 2.29785 5.23991M17.0066 5.23991V14.0652C17.0066 14.8742 16.3448 15.5361 15.5358 15.5361H3.76873C2.95975 15.5361 2.29785 14.8742 2.29785 14.0652V5.23991M17.0066 5.23991L9.65225 10.388L2.29785 5.23991"
                      stroke="#4DBA4D"
                      strokeWidth="1.47088"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                items={items}
                key={key}
              />
            ))}
          </div>
        </div>
      </div>
      {pageLoading && <Loading />}
    </>
  );
};

export default AskUs;
