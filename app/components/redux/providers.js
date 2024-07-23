"use client";
import MainPage from "../../MainPage";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import TostifyContainer from "../../common/ToastifyContainer/ToastifyContainer";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <TostifyContainer />
      <MainPage children={children} />
    </Provider>
  );
};

export default Providers;
