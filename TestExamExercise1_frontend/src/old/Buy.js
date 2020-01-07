import React, { } from "react";

function Buy({ showBuyImage, ticketURL }) {
  console.log("Buy");
  console.log("Buy showBuyImage", showBuyImage);
  console.log("Buy ticketURL", ticketURL);

  if (ticketURL) {
    return (
      <div style={{ textAlign: "center", backgroundColor: "lightblue" }}>
        <a href={ticketURL.textContent}>
          <img
            src={require("../images/buy.png")}
            style={{ 'height': "100%" }}
            alt="buybutton" />
        </a>
      </div>
    )
  } else {
    return (
      <div style={{ textAlign: "center", backgroundColor: "rgb(241, 236, 237)" }}>
        <img
          src={require("../images/buy_background.png")}
          style={{ 'height': "100%" }}
          alt="buybutton" />
      </div>
    )
  }
}

// src={showBuyImage ? require("../images/buy.png") : require("../images/buy_background.png")}

export default Buy;
