"use client";

import React from "react";
import { useState } from "react";

const UnderNav = ({ item, id }: { item: string; id: number }) => {
  const [active, setactive] = useState(0);

  const handleClick = (num: number) => {
    setactive(num);
  };

  return (
    <div>
      <div
        className={active === id ? "text-decoration-line: underline-offset-8" : ""}
        onClick={() => handleClick(id)}
      >
        {item}
      </div>
    </div>
  );
};

export default UnderNav;
