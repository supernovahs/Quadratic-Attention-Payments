import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";

function Home({ yourLocalBalance, readContracts }) {
  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 15, margin: "auto", width: 500 }}>
        <h1>Budweiser</h1>

        <div style={{ border: "1px solid #cccccc", padding: 15, margin: "auto", width: 400 }}>
          {/* <img src="../antelope.jpg" alt="" /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
