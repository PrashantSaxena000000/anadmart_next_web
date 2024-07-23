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
  SET_CURRENT_LOCATION,
  SET_DELETE_MY_CART_ITEM,
  SET_DISTRIBUTER_REGISTER,
  SET_EDIT_MY_ADDRESS,
  SET_FORGOT_PASSWORD_MAIL,
  SET_HEADER,
  SET_HOME_PAGE_DATA,
  SET_LOCATION,
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
  SET_FOOTER_ADDRESS,
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
} from "../types";

let userTokenFromLocalstorage;
let cartItemFromLocalstorage;

try {
  userTokenFromLocalstorage = localStorage.getItem("auth_token");
  cartItemFromLocalstorage = JSON.parse(
    localStorage.getItem("cartItemInLocalstorage")
  )
    ? JSON.parse(localStorage.getItem("cartItemInLocalstorage"))
    : [];
} catch (err) {
  userTokenFromLocalstorage = "default value";
  cartItemFromLocalstorage = "default value";
}

const initialState = {
  btnLoading: false,
  pageLoading: false,
  isLoggedIn: userTokenFromLocalstorage,
  cartItemFromLocalstorage: cartItemFromLocalstorage,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BTN_LOADING:
      return {
        ...state,
        btnLoading: action.payload,
      };
    case SET_PAGE_LOADING:
      return {
        ...state,
        pageLoading: action.payload,
      };
    case SET_HEADER:
      return {
        ...state,
        isHeader: action.payload,
      };
    case SET_SIGNED_UP_MAIL:
      return {
        ...state,
        registration: action.payload,
      };
    case SET_LOGIN_STATE:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_FORGOT_PASSWORD_MAIL:
      return {
        ...state,
        getForgotPasswordMail: action.payload,
      };
    case SET_ALL_CATEGORIES_DATA:
      return {
        ...state,
        myAllCategoriesData: action.payload,
      };
    case SET_ALL_SUBCATEGORIES_DATA:
      return {
        ...state,
        myAllSubCategoriesData: action.payload,
      };
    case SET_SUBCATEGORIES_DATA:
      return {
        ...state,
        mySubProductList: action.payload,
      };
    case SET_ADDRESS_LIST:
      return {
        ...state,
        myAddressListData: action.payload,
      };
    case SET_EDIT_MY_ADDRESS:
      return {
        ...state,
        myEditedAddress: action.payload,
      };
    case SET_REMOVE_MY_ADDRESS:
      return {
        ...state,
        removeMyAddressData: action.payload,
      };
    case SET_SINGLE_PRODUCT_DATA:
      return {
        ...state,
        singleproductData: action.payload,
      };
    case SET_MY_CART_DATA:
      return {
        ...state,
        cardDataList: action.payload,
      };
    case SET_CART_ITEMS_IN_LOCALSTORAGE:
      return {
        ...state,
        cartItemFromLocalstorage: action.payload,
      };
    case SET_ALL_ORDERS_LIST:
      return {
        ...state,
        myAllOrdersDataList: action.payload,
      };
    case SET_USER_PROFILE_DATA:
      return {
        ...state,
        userprofileData: action.payload,
      };
    case SET_MY_ADD_TO_CART:
      return {
        ...state,
        addToCartData: action.payload,
      };
    case SET_DELETE_MY_CART_ITEM:
      return {
        ...state,
        deleteMyCart: action.payload,
      };
    case SET_ADD_REMOVE_WISHLIST:
      return {
        ...state,
        addRemoveWishlistData: action.payload,
      };
    case SET_HOME_PAGE_DATA:
      return {
        ...state,
        myhopageData: action.payload,
      };
    case SET_UPDATE_MY_CART:
      return {
        ...state,
        myUpdatedCart: action.payload,
      };
    case SET_WISHLIST_DATA:
      return {
        ...state,
        wishListDataList: action.payload,
      };
    case SET_ADD_NEW_ADDRESS:
      return {
        ...state,
        addNewAddress: action.payload,
      };
    case SET_MY_CURRENT_DEFAULT_ADDRESS:
      return {
        ...state,
        mycurrendefaultAddress: action.payload,
      };
    case SET_MY_ORDER:
      return {
        ...state,
        myPlacedOrderData: action.payload,
      };

    case SET_CURRENT_LOCATION:
      return {
        ...state,
        updateMyCurrentLocation: action.payload,
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        newCartData: action.payload,
      };
    case SET_CART_PAYMENTS:
      return {
        ...state,
        newCartPaymentData: action.payload,
      };
    case SET_MY_ORDER_DETALS:
      return {
        ...state,
        mySelectedOrderDetails: action.payload,
      };
    case SET_CONTECTUS_REASONS_DETAILS:
      return {
        ...state,
        contactusReviewsDetails: action.payload,
      };
    case SET_UPDATE_MY_PROFILE_DATA:
      return {
        ...state,
        updatingMyprofileData: action.payload,
      };
    case SET_CONTACT_US:
      return {
        ...state,
        contactingWithUs: action.payload,
      };
    case SET_RE_ORDER:
      return {
        ...state,
        reOrderMyOrder: action.payload,
      };
    case SET_CANCEL_MY_ORDER:
      return {
        ...state,
        cancellingMyOrder: action.payload,
      };
    case SET_PRODUCTS_LIST:
      return {
        ...state,
        getProductsList: action.payload,
      };

    case SET_SEARCH_LIST:
      return {
        ...state,
        searchList: action.payload,
      };
    case SET_MY_PAGE_DATA:
      return {
        ...state,
        myAllPageData: action.payload,
      };
    case SET_THIS_MY_PERMANENT_DEFAULT_ADDRESS:
      return {
        ...state,
        myPermanentDefaultAddressList: action.payload,
      };
    case SET_MY_TEAM:
      return {
        ...state,
        myTeamData: action.payload,
      };
    case SET_TICKET_DETAILS:
      return {
        ...state,
        myTicketDetailsList: action.payload,
      };
    case SET_REQUEST_REASON:
      return {
        ...state,
        myRequestReason: action.payload,
      };
    case SET_MY_PRESENT_MESSAGE:
      return {
        ...state,
        myLatestChatData: action.payload,
      };
    case SET_MY_CHAT_LIST:
      return {
        ...state,
        myChatListMessages: action.payload,
      };
    case SET_USERS_COMMENTES:
      return {
        ...state,
        userCommentesListData: action.payload,
      };
    case SET_APPLY_COUPON:
      return {
        ...state,
        couponDataDetails: action.payload,
      };
    case SET_DISTRIBUTER_REGISTER:
      return {
        ...state,
        rigisterDitributerDetails: action.payload,
      };
    case SET_TEMSOF_USE:
      return {
        ...state,
        getTermsOfUseDetails: action.payload,
      };
    case SET_PRIVACY_POLICY:
      return {
        ...state,
        getPRivacyPolicyDetails: action.payload,
      };
    case SET_ASK_US_ANYTHING:
      return {
        ...state,
        getAskUsList: action.payload,
      };
    case SET_REMOVE_COUPON:
      return {
        ...state,
        removeCouponData: action.payload,
      };
    case SET_FOOTER_ADDRESS:
      return {
        ...state,
        getAddressContent: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
