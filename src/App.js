import React from "react";

import MinMax from "./MinMax";
import Pinger from "./Pinger";

const style = {
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "80%",
  height: "80vh",
  margin: "0 auto"
};

const handleOnHover = e => {
  document.activeElement === e.target
    ? null
    : (e.target.style.backgroundColor = "#d3d3d3");
};

const handleNotHover = e => {
  document.activeElement === e.target
    ? null
    : (e.target.style.backgroundColor = "#fff");
};

const App = () => {
  return (
    <section style={style}>
      <MinMax
        baseStyle={{ border: "1px solid #000" }}
        handleOnHover={handleOnHover}
        handleNotHover={handleNotHover}
      />

      <hr />

      <Pinger
        baseStyle={{ border: "1px solid #000" }}
        handleOnHover={handleOnHover}
        handleNotHover={handleNotHover}
      />
    </section>
  );
};

export default App;
