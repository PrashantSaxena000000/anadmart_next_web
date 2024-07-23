import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import HomeBanner from "./HomeBanner";
import DailyDeals from "./DailyDeals";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Delivery from "./Delivery";
import KeyPointers from "./KeyPointers";
import Categories from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import { homePageData } from "../redux/actions/authActions";
import Loading from "../Loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const myhopageData = useSelector((state) => state?.home?.myhopageData);
  const pageLoading = useSelector((state) => state?.home?.pageLoading);

  const myCategoriesList = useSelector(
    (state) => state?.home?.myAllCategoriesData?.categories
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refreshParam = urlParams.get("refresh");
    if (refreshParam) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className={styles.homeWrapper}>
        <HomeBanner myhopageData={myhopageData} isLoading={isLoading} setIsLoading={setIsLoading}/>
        <Categories myCategoriesList={myhopageData?.category} />
        <DailyDeals head="Daily deals" mydata={myhopageData?.dailydeals} />
        <DailyDeals
          head="Latest products"
          mydata={myhopageData?.lastestProduct}
        />
        <DailyDeals
          head="recommendations"
          mydata={myhopageData?.recommendations}
        />

        <Delivery mydata={myhopageData} />
        {/* <HotDeals /> */}
        <KeyPointers />
      </div>

      {pageLoading && <Loading />}
    </>
  );
};

export default Home;
