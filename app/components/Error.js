import Image from "next/image";
import React from "react";
import Images from "../components/Images/Images";
import { Button } from "react-bootstrap";
import Link from "next/link";
const Error = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 0px",
          flexDirection: "column",
        }}
      >
        <Image src={Images.error_1} alt="" width={500}></Image>
        <a href="/">
          <Button
            style={{
              width: "200px",
              backgroundColor: "#4dba4d",
              border: "none",
              marginTop: "20px",
            }}
          >
            Go To Homepage
          </Button>
        </a>
      </div>
    </>
  );
};

export default Error;
