import React from "react";
import styles from "./categories.module.scss";
import CardCategory from "./CardCategory";
import Link from "next/link";

const Categories = ({ myCategoriesList }) => {
  const modifiedData = myCategoriesList?.map((item) => {
    const urlParts = item?.image.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileExtension = fileNameParts.pop();
    const baseFileName = fileNameParts.join(".");
    const resizedFileName = `${baseFileName}_100x100.${fileExtension}`;
    const resizedUrl = [...urlParts.slice(0, -1), resizedFileName].join("/");

    return {
      ...item,
      image: resizedUrl,
    };
  });
  return (
    <>
      <div className={styles.cate_wrappers}>
        <div className="container">
          <div className={styles.cate_head}>
            <h4>Categories</h4>
          </div>
          <div className={styles.cadMain}>
            {modifiedData ? (
              modifiedData?.map((items, key) => (
                <Link
                  href={{
                    pathname: "/shop",
                    query: { item: items.id },
                  }}
                >
                  <CardCategory img={items.image} name={items.name} key={key} />
                </Link>
              ))
            ) : (
              <span style={{ color: "red" }}> No data found</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
