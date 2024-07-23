import React, { useState, useRef, useEffect } from "react";
import styles from "./responsiveheader.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Link from "next/link";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { SET_SEARCH_LIST } from "../redux/types";

const ResponsiveHeader = ({
  showNavbar,
  handleShowMenu,
  setLoginOpen,
  setShowNavbar,
  openLoginModal,
  isLoggedIn,
  userprofileData,
  cartItemFromLocalstorage,
  newCartData,
  dispatch,
  setPageLoading,
  searchbarmain,
  getProductsList,
  productHandler,
  searchedProducts,
  setSearchedProducts,
  customStyles,
  setSelectSearch,
  id,
}) => {
  useEffect(() => {
    const clone =
      getProductsList &&
      getProductsList.map((item) => {
        return { value: item?.name, label: item?.name };
      });
    setSearchedProducts(clone);
  }, [getProductsList && getProductsList.length]);

  const keypressed = useRef("");
  const keypressedEnter = useRef("");
  const router = useRouter();
  const [showCat, setShowCat] = useState(false);
  const [search, setSearch] = useState("");

  const catOpenClickHandler = () => {
    setShowCat(!showCat);
    handleShowMenu();
  };
  const moveTocart = () => {
    if (isLoggedIn) {
      router.push("/dashboard/my-orders");
      setShowNavbar(false);
    } else {
      setLoginOpen(true);
      setShowNavbar(false);
    }
  };

  const forWishList = () => {
    if (!isLoggedIn) {
      openLoginModal();
    } else {
      router.push("/dashboard/wishlist");
      handleShowMenu();
    }
  };

  return (
    <div
      className={`${styles.mobile_wrapper} ${
        showNavbar && styles.active_navbar
      }`}
    >
      <div className={styles.logo_header}>
        <div className={styles.logo_div}>
          <Image src={Images.anadmartLogo} alt="" />
        </div>

        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={handleShowMenu}
        ></i>
      </div>
      <div className={styles.searchDiv}>
        {/* <input type="text" placeholder="Search here..." /> */}
        <Select
          placeholder="Search here..."
          styles={customStyles}
          className={styles.search_select}
          menuIsOpen={search ? true : false}
          hideSelectedOptions
          name="option-select"
          noOptionsMessage={() => <div>No Product Available</div>}
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
                type: SET_SEARCH_LIST,
                payload:
                  getProductsList &&
                  getProductsList.filter((filtprod) =>
                    filtprod?.name
                      .toLowerCase()
                      .includes(e?.target?.value?.toLowerCase())
                  ),
              });

              router.push(`/search/?search=${e.target.value}`);
              handleShowMenu();
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
        <Button className={styles.search_btn} onClick={searchbarmain}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M24.1394 22.9856L18.8581 17.7044H18.8012C20.4291 15.785 21.2517 13.3106 21.097 10.7987C20.9423 8.28679 19.8223 5.93198 17.9713 4.22686C16.1203 2.52174 13.6817 1.5984 11.1656 1.64998C8.64942 1.70157 6.25068 2.72409 4.47113 4.50365C2.69157 6.2832 1.66906 8.68194 1.61747 11.1981C1.56588 13.7142 2.48922 16.1529 4.19434 18.0039C5.89946 19.8549 8.25427 20.9748 10.7662 21.1295C13.2781 21.2842 15.7525 20.4616 17.6719 18.8337C17.6719 18.8337 17.6719 18.8744 17.6719 18.8906L22.9531 24.1719C23.0286 24.248 23.1185 24.3085 23.2175 24.3497C23.3165 24.391 23.4227 24.4122 23.53 24.4122C23.6372 24.4122 23.7434 24.391 23.8425 24.3497C23.9415 24.3085 24.0313 24.248 24.1069 24.1719C24.1902 24.0981 24.2574 24.008 24.3045 23.9072C24.3516 23.8064 24.3774 23.697 24.3805 23.5858C24.3835 23.4746 24.3637 23.3639 24.3222 23.2607C24.2807 23.1574 24.2185 23.0638 24.1394 22.9856ZM11.375 19.5C9.76801 19.5 8.19713 19.0235 6.86098 18.1307C5.52483 17.2379 4.48342 15.969 3.86846 14.4843C3.2535 12.9997 3.0926 11.366 3.4061 9.78989C3.71961 8.2138 4.49344 6.76606 5.62974 5.62976C6.76604 4.49346 8.21378 3.71962 9.78988 3.40612C11.366 3.09261 12.9996 3.25352 14.4843 3.86848C15.9689 4.48344 17.2379 5.52484 18.1307 6.86099C19.0235 8.19714 19.5 9.76803 19.5 11.375C19.5 12.442 19.2898 13.4985 18.8815 14.4843C18.4732 15.4701 17.8747 16.3658 17.1202 17.1202C16.3658 17.8747 15.4701 18.4732 14.4843 18.8815C13.4985 19.2898 12.442 19.5 11.375 19.5Z"
              fill="white"
            />
          </svg>
        </Button>
      </div>
      <ul>
        <li>
          <Link href="/" onClick={handleShowMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/shop/?item=1" onClick={handleShowMenu}>
            Shop
          </Link>
        </li>
        <li>
          <Link href="/aboutus" onClick={handleShowMenu}>
            About Us
          </Link>
        </li>

        <li>
          <Link href="/contact-us" onClick={handleShowMenu}>
            Contact Us
          </Link>
        </li>
      </ul>{" "}
      <div className={styles.header_icons}>
        <div className={styles.wishlist_number}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={forWishList}
          >
            <path
              d="M15.775 26.0125C15.35 26.1625 14.65 26.1625 14.225 26.0125C10.6 24.775 2.5 19.6125 2.5 10.8625C2.5 7 5.6125 3.875 9.45 3.875C11.725 3.875 13.7375 4.975 15 6.675C16.2625 4.975 18.2875 3.875 20.55 3.875C24.3875 3.875 27.5 7 27.5 10.8625C27.5 19.6125 19.4 24.775 15.775 26.0125Z"
              stroke="#1A1A1A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isLoggedIn ? (
            <div className={styles.wishlist_counter}>
              <span>{userprofileData?.wishlist_count || 0}</span>
            </div>
          ) : (
            <div className={styles.wishlist_counter}>
              <span>0</span>
            </div>
          )}
        </div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={moveTocart}
        >
          <path
            d="M15.2001 13.5875C15.0751 13.575 14.9251 13.575 14.7876 13.5875C11.8126 13.4875 9.45007 11.05 9.45007 8.05C9.45007 4.9875 11.9251 2.5 15.0001 2.5C18.0626 2.5 20.5501 4.9875 20.5501 8.05C20.5376 11.05 18.1751 13.4875 15.2001 13.5875Z"
            stroke="#1A1A1A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.94996 18.2C5.92496 20.225 5.92496 23.525 8.94996 25.5375C12.3875 27.8375 18.025 27.8375 21.4625 25.5375C24.4875 23.5125 24.4875 20.2125 21.4625 18.2C18.0375 15.9125 12.4 15.9125 8.94996 18.2Z"
            stroke="#1A1A1A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className={styles.cart_div}>
          <Link href="/cart" onClick={handleShowMenu}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 2.5H4.67501C6.02501 2.5 7.0875 3.6625 6.975 5L5.9375 17.45C5.7625 19.4875 7.37499 21.2375 9.42499 21.2375H22.7375C24.5375 21.2375 26.1125 19.7625 26.25 17.975L26.925 8.60001C27.075 6.52501 25.5 4.83749 23.4125 4.83749H7.27501"
                stroke="black"
                strokeWidth="1.8"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.3125 27.5C21.1754 27.5 21.875 26.8004 21.875 25.9375C21.875 25.0746 21.1754 24.375 20.3125 24.375C19.4496 24.375 18.75 25.0746 18.75 25.9375C18.75 26.8004 19.4496 27.5 20.3125 27.5Z"
                stroke="black"
                strokeWidth="1.8"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.3125 27.5C11.1754 27.5 11.875 26.8004 11.875 25.9375C11.875 25.0746 11.1754 24.375 10.3125 24.375C9.44956 24.375 8.75 25.0746 8.75 25.9375C8.75 26.8004 9.44956 27.5 10.3125 27.5Z"
                stroke="black"
                strokeWidth="1.8"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.25 10H26.25"
                stroke="black"
                strokeWidth="1.8"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isLoggedIn ? (
              <div className={styles.cart_counter}>
                <span>{newCartData?.length || 0}</span>
              </div>
            ) : (
              <div className={styles.cart_counter}>
                <span>{cartItemFromLocalstorage?.length || 0}</span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveHeader;
