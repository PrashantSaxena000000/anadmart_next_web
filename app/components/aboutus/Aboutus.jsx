"use client";
import React, { useEffect, useState } from "react";
import styles from "./aboutus.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import Image from "next/image";
import Images from "../Images/Images";
import TeamCard from "./TeamCard";
import PageHeading from "../../common/PageHeading/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  myPageData,
  newsLetterSubscribe,
  ourTeam,
} from "../redux/actions/authActions";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

const Aboutus = () => {
  const dispatch = useDispatch();
  const [newsLetter, setNewsLetter] = useState({});
  const [error, setError] = useState("");

  const pageLoading = useSelector((state) => state?.home?.pageLoading);
  const myTeamData = useSelector((state) => state?.home?.myTeamData?.ourteam);

  useEffect(() => {
    dispatch(myPageData("about-us"));
    dispatch(ourTeam());
  }, []);

  const onChangeHandler = (e) => {
    setNewsLetter({ ...newsLetter, [e.target.name]: e.target.value });
  };

  const newsLetterSubmitHandler = (e) => {
    e.preventDefault();
    if (!newsLetter?.email) {
      setError("Please enter your email.");
      toast.error("Enter Your Email");
    } else if (!validateEmail(newsLetter.email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      dispatch(newsLetterSubscribe({ newsLetter, setNewsLetter }));
    }
  };
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  return (
    <>
      <div className={styles.about_us_Wrapper}>
        <PageHeading pageName="About Us" />

        <div className="container">
          <div className={styles.historyPart}>
            <div className={styles.historyleft}>
              <div className={styles.greenback}>
                <Image src={Images.anad_about_upper} alt="" />
              </div>
            </div>
            <div className={styles.historyRight}>
              <h5>Our HISTORY</h5>
              <h4>Creative and renovate Grocery trends</h4>
              <p>
                Collaboratively administrate empowered markets via plug-and-play
                maintain networks. Dynamically usable procrastinate B2B users
                after installed base benefits. Dramatically visualize customer
                directed convergence without revolutionary ROI.
              </p>
              <div className={styles.yearExp_main}>
                <div className={styles.yearExp}>
                  <h6>15</h6>
                  <p>Years Experience</p>
                </div>
                <div className={styles.yearExp}>
                  <h6>25k</h6>
                  <p>Happy Customers</p>
                </div>
                <div className={styles.yearExp}>
                  <h6>100%</h6>
                  <p>Clients Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.visionPart}>
            <div className={styles.visionRight}>
              <h5>Our vision</h5>
              <h4>We are market press</h4>
              <p>
                Collaboratively administrate empowered markets via plug-and-play
                maintain networks. Dynamically usable procrastinate B2B users
                after installed base benefits.
              </p>
              <div className={styles.tick_para}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="25"
                  viewBox="0 0 23 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_66_1654)">
                    <path
                      d="M19.0349 1.55127H3.17248C1.42018 1.55127 0 2.94012 0 4.65377V20.1663C0 21.8799 1.42018 23.2688 3.17248 23.2688H19.0349C20.7872 23.2688 22.2074 21.8799 22.2074 20.1663V4.65377C22.2074 2.94012 20.7847 1.55127 19.0349 1.55127ZM16.8439 10.2674L10.4989 16.4724C10.2263 16.739 9.87435 16.8699 9.51744 16.8699C9.16054 16.8699 8.80661 16.7381 8.53546 16.4729L5.36298 13.3704C4.82217 12.8401 4.82217 11.9796 5.36298 11.4493C5.90528 10.919 6.78514 10.919 7.32744 11.4493L9.51744 13.5928L14.8809 8.34768C15.4232 7.81735 16.3031 7.81735 16.8454 8.34768C17.3842 8.87608 17.3842 9.73896 16.8439 10.2674Z"
                      fill="#4DBA4D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_66_1654">
                      <rect width="22.2074" height="24.82" fill="white" />
                    </clipPath>
                  </defs>
                </svg>{" "}
                <p>Credibly innovate granular internal</p>
              </div>
              <div className={styles.tick_para}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="25"
                  viewBox="0 0 23 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_66_1654)">
                    <path
                      d="M19.0349 1.55127H3.17248C1.42018 1.55127 0 2.94012 0 4.65377V20.1663C0 21.8799 1.42018 23.2688 3.17248 23.2688H19.0349C20.7872 23.2688 22.2074 21.8799 22.2074 20.1663V4.65377C22.2074 2.94012 20.7847 1.55127 19.0349 1.55127ZM16.8439 10.2674L10.4989 16.4724C10.2263 16.739 9.87435 16.8699 9.51744 16.8699C9.16054 16.8699 8.80661 16.7381 8.53546 16.4729L5.36298 13.3704C4.82217 12.8401 4.82217 11.9796 5.36298 11.4493C5.90528 10.919 6.78514 10.919 7.32744 11.4493L9.51744 13.5928L14.8809 8.34768C15.4232 7.81735 16.3031 7.81735 16.8454 8.34768C17.3842 8.87608 17.3842 9.73896 16.8439 10.2674Z"
                      fill="#4DBA4D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_66_1654">
                      <rect width="22.2074" height="24.82" fill="white" />
                    </clipPath>
                  </defs>
                </svg>{" "}
                <p>Grantedly underconstructions reloaded</p>
              </div>
              <div className={styles.tick_para}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="25"
                  viewBox="0 0 23 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_66_1654)">
                    <path
                      d="M19.0349 1.55127H3.17248C1.42018 1.55127 0 2.94012 0 4.65377V20.1663C0 21.8799 1.42018 23.2688 3.17248 23.2688H19.0349C20.7872 23.2688 22.2074 21.8799 22.2074 20.1663V4.65377C22.2074 2.94012 20.7847 1.55127 19.0349 1.55127ZM16.8439 10.2674L10.4989 16.4724C10.2263 16.739 9.87435 16.8699 9.51744 16.8699C9.16054 16.8699 8.80661 16.7381 8.53546 16.4729L5.36298 13.3704C4.82217 12.8401 4.82217 11.9796 5.36298 11.4493C5.90528 10.919 6.78514 10.919 7.32744 11.4493L9.51744 13.5928L14.8809 8.34768C15.4232 7.81735 16.3031 7.81735 16.8454 8.34768C17.3842 8.87608 17.3842 9.73896 16.8439 10.2674Z"
                      fill="#4DBA4D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_66_1654">
                      <rect width="22.2074" height="24.82" fill="white" />
                    </clipPath>
                  </defs>
                </svg>{" "}
                <p>Interactively procrastinate high-payoff</p>
              </div>
              <div className={styles.tick_para}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="25"
                  viewBox="0 0 23 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_66_1654)">
                    <path
                      d="M19.0349 1.55127H3.17248C1.42018 1.55127 0 2.94012 0 4.65377V20.1663C0 21.8799 1.42018 23.2688 3.17248 23.2688H19.0349C20.7872 23.2688 22.2074 21.8799 22.2074 20.1663V4.65377C22.2074 2.94012 20.7847 1.55127 19.0349 1.55127ZM16.8439 10.2674L10.4989 16.4724C10.2263 16.739 9.87435 16.8699 9.51744 16.8699C9.16054 16.8699 8.80661 16.7381 8.53546 16.4729L5.36298 13.3704C4.82217 12.8401 4.82217 11.9796 5.36298 11.4493C5.90528 10.919 6.78514 10.919 7.32744 11.4493L9.51744 13.5928L14.8809 8.34768C15.4232 7.81735 16.3031 7.81735 16.8454 8.34768C17.3842 8.87608 17.3842 9.73896 16.8439 10.2674Z"
                      fill="#4DBA4D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_66_1654">
                      <rect width="22.2074" height="24.82" fill="white" />
                    </clipPath>
                  </defs>
                </svg>{" "}
                <p>Completely synergize resource taxing relationships</p>
              </div>
            </div>
            <div className={styles.visionleft}>
              <div className={styles.greenback}>
                <Image
                  src={Images.anad_about_lower}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className={styles.team}>
            <h2>Meet with our Team</h2>
            <div className={styles.team_cards}>
              {myTeamData?.map((items, key) => (
                <TeamCard items={items} key={key} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.newsLetter}>
          <div className="container">
            <div className={styles.newsLetter_div}>
              <div className={styles.newsHead}>
                <h4>Newsletter & Get Updates</h4>
                <p>Sign up for our newsletter to get up-to-date from us</p>
              </div>
              <div className={styles.newsSearch}>
                <form onSubmit={newsLetterSubmitHandler}>
                  <input
                    name="email"
                    type="text"
                    placeholder="Enter Your Email..."
                    onChange={onChangeHandler}
                    value={newsLetter?.email}
                  />
                  {error && <p className={styles.error}>{error}</p>}

                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pageLoading && <Loading />}
    </>
  );
};

export default Aboutus;
