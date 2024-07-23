import React from "react";
import Link from "next/link";

const Error = ({ statusCode }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>404 page not found</p>
      <Link href={"/"}>
        <button>home</button>
      </Link>

      <div>
        <h1>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </h1>
      </div>
    </div>
  );
};

export default Error;
