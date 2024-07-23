import { toast } from "react-toastify";
import {
  SET_ADDRESS_LIST,
  SET_ADD_NEW_ADDRESS,
  SET_ADD_REMOVE_WISHLIST,
  SET_ALL_CATEGORIES_DATA,
  SET_ALL_ORDERS_LIST,
  SET_ALL_SUBCATEGORIES_DATA,
  SET_APPLY_COUPON,
  SET_ASK_US_ANYTHING,
  SET_BTN_LOADING,
  SET_CANCEL_MY_ORDER,
  SET_CART_ITEMS,
  SET_CART_ITEMS_IN_LOCALSTORAGE,
  SET_CART_PAYMENTS,
  SET_CONTACT_US,
  SET_CONTECTUS_REASONS_DETAILS,
  SET_CREATE_TICKET,
  SET_CURRENT_LOCATION,
  SET_DELETE_MY_CART_ITEM,
  SET_DISTRIBUTER_REGISTER,
  SET_EDIT_MY_ADDRESS,
  SET_FORGOT_PASSWORD_MAIL,
  SET_HEADER,
  SET_HOME_PAGE_DATA,
  SET_LOCATION_BY_SEARCH,
  SET_LOGIN_DATA,
  SET_LOGIN_STATE,
  SET_MY_ADD_TO_CART,
  SET_MY_CART_DATA,
  SET_MY_CHAT_LIST,
  SET_MY_CURRENT_DEFAULT_ADDRESS,
  SET_MY_ORDER,
  SET_MY_ORDER_DETALS,
  SET_MY_PAGE_DATA,
  SET_MY_PRESENT_MESSAGE,
  SET_MY_TEAM,
  SET_PAGE_LOADING,
  SET_PRIVACY_POLICY,
  SET_PRODUCTS_LIST,
  SET_REMOVE_COUPON,
  SET_REMOVE_MY_ADDRESS,
  SET_REQUEST_REASON,
  SET_RE_ORDER,
  SET_SEARCH_LIST,
  SET_SIGNED_UP_MAIL,
  SET_SINGLE_PRODUCT_DATA,
  SET_SUBCATEGORIES_DATA,
  SET_TEMSOF_USE,
  SET_THIS_MY_PERMANENT_DEFAULT_ADDRESS,
  SET_TICKET_DETAILS,
  SET_UPDATE_MY_CART,
  SET_UPDATE_MY_PROFILE_DATA,
  SET_USERS_COMMENTES,
  SET_USER_PROFILE_DATA,
  SET_WISHLIST_DATA,
  SET_FOOTER_ADDRESS,
} from "../types";

import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";
import { setTimeout } from "timers";

let token;
let zip_codeCoockie;

try {
  token = localStorage.getItem("auth_token");
  zip_codeCoockie = localStorage.getItem("currentZipCode");
  Cookies.set("zipcode", zip_codeCoockie);
} catch (err) {
  token = "default value";
}

const zipcode = Cookies.get("zipcode");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const setBtnLoading = (data) => (dispatch) => {
  dispatch({
    type: SET_BTN_LOADING,
    payload: data,
  });
};

export const setPageLoading = (data) => (dispatch) => {
  dispatch({
    type: SET_PAGE_LOADING,
    payload: data,
  });
};

export const setHeader = () => (dispatch) => {
  dispatch({
    type: SET_HEADER,
    payload: false,
  });
};

export const resetAuthToken = (data) => (dispatch) => {
  dispatch({
    type: SET_LOGIN_STATE,
    payload: false,
  });
};

export const setCartItems = (data) => (dispatch) => {
  dispatch({
    type: SET_CART_ITEMS,
    payload: data,
  });
};

export const homePageData = (searchParams) => (dispatch) => {
  dispatch(setPageLoading(true));

  axiosInstance.get(`/web-home?${searchParams}`, config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_HOME_PAGE_DATA,
        payload: res.data.data,
      });
      dispatch(setPageLoading(false));
    }
  });
};

export const onRegister =
  (data, closeRegisterModal, openLoginModal, setThrowError) => (dispatch) => {
    setThrowError(false);
    dispatch(setPageLoading(true));

    axiosInstance
      .post("/register", data)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          closeRegisterModal();
          openLoginModal();
          dispatch({
            type: SET_SIGNED_UP_MAIL,
            payload: data,
          });
          dispatch(setPageLoading(false));
        }
      })
      .catch((error) => {
        dispatch(setPageLoading(false));

        if (error.response) {
          setThrowError(error.response.data.message);
        }
      });
  };
// closeModal, openModal;

export const onRegisterDistibuter = (formData, navigate) => (dispatch) => {
  axiosInstance
    .post("/request-for-distributor", formData)
    .then((res) => {
      if (res.data.status === true) {
        toast.success(res.data.message);
        navigate.push("/");
        dispatch({
          type: SET_DISTRIBUTER_REGISTER,
          payload: data,
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("some thing went wrong");
      }
    });
};
export const onLogin =
  (data, onCloseModal, cartItemFromLocalstorage, setThrowError, router) =>
  (dispatch) => {
    setThrowError(false);
    axiosInstance
      .post("/login", data)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res);
          toast.success(res.data.message);
          localStorage.setItem("auth_token", res.data.auth_token);
          localStorage.setItem(
            "currentZipCode",
            res?.data?.data?.user_data?.current_location
          );
          localStorage.setItem(
            "currentLocation",
            res?.data?.data?.user_data?.current_location_address
          );
          setThrowError(false);
          onCloseModal();

          if (res?.data?.data?.user_data?.is_profile_complete === false) {
            router.push("/dashboard/information/");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          setThrowError(error.response.data.message);
        }
      });
  };
export const onForgotPassword = (data, navigate) => (dispatch) => {
  axiosInstance
    .post("/forgot-password", data)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: SET_FORGOT_PASSWORD_MAIL,
          payload: data,
        });
        toast.success(res.data.message);
        navigate.push("/verify-otp");
        dispatch(setPageLoading(false));
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((error) => {
      dispatch(setPageLoading(false));
      toast.error(error?.response.data.message);
    });
};

export const passwordVerifyOtp =
  (data, navigate, setPageLoading) => (dispatch) => {
    axiosInstance
      .post("/verify-otp", data)
      .then((res) => {
        if (res.data.status === true) {
          toast.success(res.data.message);
          navigate.push("/change-password");
        }
        setPageLoading(false);
      })
      .catch((error) => {
        if (error) {
          toast.error(error.response.data.message);
        }
      });
  };

export const onResendVerifyOtp = (data) => (dispatch) => {
  axiosInstance
    .post("/resend-otp", data)
    .then((res) => {
      if (res.data.status === true) {
        toast.success(res.data.message);
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
};

export const changeMyPassword = (data, navigate) => (dispatch) => {
  axiosInstance
    .post("/reset-password", data)
    .then((res) => {
      if (res.data.status === true) {
        toast.success(res.data.message);
        navigate.push("/");
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
};
export const updateMyPassword = (data, onCloseModal) => (dispatch) => {
  axiosInstance
    .post("/change-password", data, config)
    .then((res) => {
      if (res.data.status === true) {
        toast.success(res.data.message);
        onCloseModal();
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    });
};

export const allCategoriesData = () => (dispatch) => {
  axiosInstance.get("/all-categories-list", config).then((res) => {
    if (res.data.status === true) {
      dispatch({
        type: SET_ALL_CATEGORIES_DATA,
        payload: res.data.data,
      });
    } else {
      toast.error(res.data.message);
    }
  });
};

export const allSubCategoriesData = (id, searchParams) => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance
    .get(`/sub-categories/${id}?${searchParams}`, config)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: SET_ALL_SUBCATEGORIES_DATA,
          payload: res.data.data,
        });
        // dispatch(setPageLoading(false));
      } else {
        toast.error(res.data.message);
      }
    });
};

export const myshopPageData = (data, searchParams, filter) => (dispatch) => {
  // dispatch(setPageLoading(true));

  if (data?.id) {
    axiosInstance
      .get(
        `/category/${data?.id}?page=${
          data?.pageNo ? data?.pageNo : 1
        }&pagination=${
          data?.pagination ? data?.pagination : 5
        }&${searchParams}&filter=${filter}`,
        config
      )
      .then((res) => {
        if (res.data.status === true) {
          dispatch({
            type: SET_SUBCATEGORIES_DATA,
            payload: res,
          });
          setTimeout(() => {
            dispatch(setPageLoading(false));
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      });
  }
};

export const mySingleProductData = (id, searchParams, router) => (dispatch) => {
  dispatch(setPageLoading(true));

  axiosInstance
    .get(`/product/${id}?${searchParams}`, config)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: SET_SINGLE_PRODUCT_DATA,
          payload: res.data.data,
        });
        dispatch(setPageLoading(false));
      }
    })
    .catch((error) => {
      router.push("/error");
      // toast.error(error?.message);
    });
};

export const getProductsData = (searchParams) => (dispatch) => {
  axiosInstance.get(`/products?${searchParams}`, config).then((res) => {
    dispatch({
      type: SET_PRODUCTS_LIST,
      payload: res.data.data,
    });
  });
};
export const addToCart = (data) => (dispatch) => {
  axiosInstance
    .post("/add-cart", data, config)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: SET_MY_ADD_TO_CART,
          payload: res.data,
        });
        toast.success(res.data.message);
        localStorage?.getItem("cartItemInLocalstorage")
          ? localStorage?.removeItem("cartItemInLocalstorage")
          : null;
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
};

export const myCartData = () => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.get("/my-cart", config).then((res) => {
    if (res.data.status === true) {
      dispatch({
        type: SET_MY_CART_DATA,
        payload: res.data.data,
      });
      dispatch({
        type: SET_CART_ITEMS,
        payload: res.data.data.cartItems,
      });
      dispatch({
        type: SET_CART_PAYMENTS,
        payload: res.data.data,
      });
      dispatch(setPageLoading(false));
    } else {
      toast.error(res.data.message);
    }
  });
};

export const setCartItemsInLocalStorage = (data) => (dispatch) => {
  dispatch({
    type: SET_CART_ITEMS_IN_LOCALSTORAGE,
    payload: data,
  });
  localStorage.setItem("cartItemInLocalstorage", JSON.stringify(data));
};

export const updateMyCart = (data) => (dispatch) => {
  dispatch(setPageLoading(true));

  axiosInstance
    .post("/update-cart", data, config)
    .then((res) => {
      if (res.data.status === true) {
        toast.success(res.data.message);
        dispatch({
          type: SET_UPDATE_MY_CART,
          payload: res.data.data,
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
};

export const deleteMyCartData = (data) => (dispatch) => {
  dispatch(setPageLoading(true));

  axiosInstance
    .post("/remove-cart-item", data, config)
    .then((res) => {
      if (res.data.status === true) {
        dispatch({
          type: SET_DELETE_MY_CART_ITEM,
          payload: res.data.data,
        });
        toast.success(res.data.message);
      }
    })
    .catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
};

export const addRemoveWishlist = (data) => (dispatch) => {
  axiosInstance.post("/add-remove-wishlist", data, config).then((res) => {
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch({
        type: SET_ADD_REMOVE_WISHLIST,
        payload: res,
      });
    } else {
      toast.error(res.data.message);
    }
  });
};
export const addRemoveCartWishlist = (data) => (dispatch) => {
  axiosInstance.post("/add-remove-wishlist", data, config).then((res) => {
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch({
        type: SET_ADD_REMOVE_WISHLIST,
        payload: res,
      });
      dispatch(myCartData());
    } else {
      toast.error(res.data.message);
    }
  });
};
export const updateMyCurentLocation =
  (data, fcm_token, router) => (dispatch) => {
    dispatch(setPageLoading(true));
    axiosInstance
      .post("/update-location", data, config)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("currentLocation", res?.data?.data?.address);
          dispatch({
            type: SET_CURRENT_LOCATION,
            payload: res.data.data,
          });
          dispatch(setPageLoading(false));
          localStorage.setItem("currentZipCode", data?.zip);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(res.data.message);
        }
        dispatch(setPageLoading(false));
      });
  };
export const setMySearchLocation = (data, Popup) => (dispatch) => {
  localStorage.setItem("currentLocation", data);

  dispatch({
    type: SET_CURRENT_LOCATION,
    payload: data,
  });
  Popup();
};

export const myUserData = () => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.get(`/user-profile`, config).then((res) => {
    if (res.data.status) {
      // toast.success(res.data.message);
      dispatch({
        type: SET_USER_PROFILE_DATA,
        payload: res.data.data,
      });
      dispatch(setPageLoading(false));
    } else {
      toast.error(res.data.message);
    }
  });
};

export const myWishlistData = () => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.get(`/list`, config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_WISHLIST_DATA,
        payload: res.data.data,
      });
      dispatch(setPageLoading(false));
    }
  });
};

export const addNewAddress =
  (data, type, setCurrentTab, setOpenAddress, setNewAddress) => (dispatch) => {
    axiosInstance.post("/add-address", data, config).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        if (type === "check") {
          setOpenAddress(false);
          setNewAddress();
        } else {
          setCurrentTab("information");
        }
        dispatch({
          type: SET_ADD_NEW_ADDRESS,
          payload: res.data,
        });

        // router.push("/dashboard/information");
      } else {
        toast.error(res.data.message);
      }
    });
  };
export const editMyAddress = (data, router, setCurrentTab) => (dispatch) => {
  axiosInstance.post("/edit-address", data, config).then((res) => {
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch({
        type: SET_EDIT_MY_ADDRESS,
        payload: res.data.data,
      });
      router.push("/dashboard/information");
      setCurrentTab("information");
    } else {
      toast.error(res.data.message);
    }
  });
};
export const removeMyAddress = (data) => (dispatch) => {
  axiosInstance.post("/remove-address", data, config).then((res) => {
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch({
        type: SET_REMOVE_MY_ADDRESS,
        payload: res.data.data,
      });
    } else {
      toast.error(res.data.message);
    }
  });
};

export const makeDefaultMyAddress = (data) => (dispatch) => {
  axiosInstance
    .post("/choose-order-address", data, config)
    .then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        dispatch({
          type: SET_MY_CURRENT_DEFAULT_ADDRESS,
          payload: res.data.data,
        });
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const myAddressList = () => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.get(`/my-address`, config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_ADDRESS_LIST,
        payload: res.data.data,
      });
      dispatch(setPageLoading(false));
    }
  });
};

export const myAllOrders = (status) => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance
    .get(`/my-orders?status=${status}&pagination=4`, config)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: SET_ALL_ORDERS_LIST,
          payload: res.data.data,
        });
        dispatch(setPageLoading(false));
      }
    });
};

export const myOrderDetails = (id) => (dispatch) => {
  dispatch(setPageLoading(true));

  axiosInstance.get(`/order-details?order_id=${id}`, config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_MY_ORDER_DETALS,
        payload: res.data.data,
      });
      dispatch(setPageLoading(false));
    }
  });
};

export const contactusReasons = (id) => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.get(`/contact-us-reason`, config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_CONTECTUS_REASONS_DETAILS,
        payload: res.data.data,
      });
      // dispatch(setPageLoading(false));
    }
  });
};

export const placeMyOrder = (data, router) => (dispatch) => {
  axiosInstance.post("/order", data, config).then((res) => {
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch({
        type: SET_MY_ORDER,
        payload: res.data.data,
      });
      router.push("/confirm-order");
    } else {
      toast.error(res.data.message);
    }
  });
};
export const updateUserData =
  (data, setValues, values, setSendImage) => (dispatch) => {
    axiosInstance.post("/update-profile", data, config).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        dispatch({
          type: SET_UPDATE_MY_PROFILE_DATA,
          payload: res.data.data,
        });
        setValues({ ...values, isChange: false });
        setSendImage(false);
      } else {
        toast.error(res.data.message);
      }
    });
  };

export const contactUs = (data) => (dispatch) => {
  axiosInstance.post("/contact-us", data, config).then((res) => {
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch({
        type: SET_CONTACT_US,
        payload: res.data.data,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.error(res.data.message);
    }
  });
};
export const cancelMyOrder = (data, setOpen) => (dispatch) => {
  axiosInstance.post("/order-status-change", data, config).then((res) => {
    dispatch(setPageLoading(true));

    if (res.data.status) {
      toast.success(res.data.message);
      dispatch({
        type: SET_CANCEL_MY_ORDER,
        payload: res.data,
      });
      dispatch(setPageLoading(false));

      setOpen(false);
    } else {
      toast.error(res.data.message);
    }
  });
};
export const reOrder = (id, data) => (dispatch) => {
  axiosInstance.post(`/re-order/${id}`, data, config).then((res) => {
    dispatch(setPageLoading(true));
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch({
        type: SET_RE_ORDER,
        payload: res.data.data,
      });
      dispatch(setPageLoading(false));
    } else {
      toast.error(res.data.message);
    }
  });
};

export const onSearch = (searchValue, searchParams) => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance
    .get(`/search?keyword=${searchValue}&${searchParams}`, config)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: SET_SEARCH_LIST,
          payload: res.data.data,
        });
        dispatch(setPageLoading(false));
      }
    });
};

export const myPageData = (pageName) => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.get(`/pages?slug=${pageName}`, config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_MY_PAGE_DATA,
        payload: res.data.data,
      });
      dispatch(setPageLoading(false));
    }
  });
};

export const makePermanentDefaultAdress = (data) => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.post("/default-address", data, config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_THIS_MY_PERMANENT_DEFAULT_ADDRESS,
        payload: res.data,
      });
      dispatch(setPageLoading(false));
    }
  });
};

export const newsLetterSubscribe = (data) => (dispatch) => {
  // dispatch(setPageLoading(true));
  axiosInstance.post("/newsletter-subscription", data, config).then((res) => {
    if (res.data.status) {
      toast.success(res.data.message);
      // dispatch(setPageLoading(false));
      window.location.reload();
    }
  });
};

export const ourTeam = () => (dispatch) => {
  axiosInstance.get("/our-team").then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_MY_TEAM,
        payload: res.data.data,
      });
    }
  });
};

export const requestReason = () => (dispatch) => {
  axiosInstance.get("/contact-reason", config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_REQUEST_REASON,
        payload: res.data,
      });
    }
  });
};
export const ticketDetails = () => (dispatch) => {
  axiosInstance.get("/ask-us-anything-my-detail", config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_TICKET_DETAILS,
        payload: res.data,
      });
    }
  });
};

export const feedback = (data, setOpen) => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.post("/feedback", data, config).then((res) => {
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch(setPageLoading(false));
      setOpen();
      window.location.reload();
    }
  });
};

export const myChatListData = (id) => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.get(`/chat?service_ticket_id=${id}`, config).then((res) => {
    if (res.data.status) {
      dispatch(setPageLoading(false));
      dispatch({
        type: SET_MY_CHAT_LIST,
        payload: res.data.data,
      });
    }
  });
};

export const createTicket = (data, router) => (dispatch) => {
  axiosInstance
    .post("/ask-us-anything", data, config)
    .then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        dispatch({
          type: SET_CREATE_TICKET,
          payload: res.data,
        });
        router.push("/my-request");
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export const myCurrentChat = (data) => (dispatch) => {
  axiosInstance.post("/chat-save", data, config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_MY_PRESENT_MESSAGE,
        payload: res.data,
      });
    }
  });
};

export const fetchUserCommentesData =
  ({ data }) =>
  (dispatch) => {
    dispatch(setPageLoading(true));

    // if (data?.id) {

    axiosInstance
      .get(
        `/feedback/${data?.id}?pagination=${
          data?.pagination ? data?.pagination : 5
        }`,
        config
      )
      .then((res) => {
        if (res.data.status === true) {
          dispatch({
            type: SET_USERS_COMMENTES,
            payload: res,
          });
          dispatch(setPageLoading(false));
        } else {
          toast.error(res.data.message);
        }
      });
    // }
  };

// APPLY COUPON //

export const onApplyCoupon = (data) => (dispatch) => {
  axiosInstance.post("/coupon-apply", data, config).then((res) => {
    if (res.data.status === true) {
      toast.success(res.data.message);
      dispatch({
        type: SET_APPLY_COUPON,
        payload: res.data,
      });
      window.location.reload();
      dispatch(setBtnLoading(false));
    } else {
      dispatch(setBtnLoading(false));
      toast.error(res.data.message);
    }
  });
};

// REMOVE TOKEN //

export const removeCoupon = () => (dispatch) => {
  axiosInstance.get("/remove-coupon", config).then((res) => {
    if (res.data.status === true) {
      toast.success(res.data.message);
      dispatch({
        type: SET_REMOVE_COUPON,
        payload: res.data,
      });
      window.location.reload();
      dispatch(setBtnLoading(false));
    } else {
      dispatch(setBtnLoading(false));
      toast.error(res.data.message);
    }
  });
};

export const fetchTermsOfUseData = () => (dispatch) => {
  axiosInstance.get("pages?slug=terms-condition", config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_TEMSOF_USE,
        payload: res.data,
      });
    }
  });
};

export const fetchPrivacyPolicyData = () => (dispatch) => {
  axiosInstance.get("pages?slug=privacy-policy", config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_PRIVACY_POLICY,
        payload: res.data,
      });
    }
  });
};

export const fetchAskusAnything = () => (dispatch) => {
  dispatch(setPageLoading(true));
  axiosInstance.get("faq-list", config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: SET_ASK_US_ANYTHING,
        payload: res.data,
      });
      dispatch(setPageLoading(false));
    }
  });
};
export const FooterData = () => (dispatch) => {
  axiosInstance.get("footer-details", config).then((res) => {
    if (res.data.status === true) {
      toast.success(res);
      dispatch({
        type: SET_FOOTER_ADDRESS,
        payload: res.data,
      });
      dispatch(setBtnLoading(false));
    }
  });
};
