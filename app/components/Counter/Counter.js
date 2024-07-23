import React, { useEffect, useState } from "react";

const Counter = ({ targetValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (targetValue) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === targetValue) {
            clearInterval(interval);
            return prevCount;
          } else {
            return prevCount + 1;
          }
        });
      }, 1);

      return () => clearInterval(interval);
    }
  }, [targetValue]);

  return <b>{count}+</b>;
};

export default Counter;
