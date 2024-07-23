"use client";
import React, { useEffect } from "react";
import ThirdHeader from "./components/Header/ThirdHeader";
import HeaderBar from "./components/Header/HeaderBar";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { SET_HEADER } from "./components/redux/types";

const MainPage = ({ children }) => {
  const dispatch = useDispatch();
  const isHeader = useSelector((state) => state.home.isHeader);

  useEffect(() => {
    dispatch({
      type: SET_HEADER,
      payload: false,
    });
  }, []);

  return (
    <>
      {/* <HeaderBar /> */}
      <Header />
      {isHeader === false || undefined ? <ThirdHeader /> : null}
      {children}
      <Footer />
    </>
  );
};

export default MainPage;
