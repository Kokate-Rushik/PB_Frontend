import React from "react";
import loading from "./Funnel.gif";

const spinner = () => {
  return (
    <div className="text-center" style={{ margin: "50px" }}>
      <img src={loading} alt="loading..." />
    </div>
  );
};

export default spinner;
