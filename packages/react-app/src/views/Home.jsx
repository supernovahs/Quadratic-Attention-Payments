import { useContractReader } from "eth-hooks";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Input, List, Card } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { parseEther } from "@ethersproject/units";
import { format } from "prettier";

const { ethers } = require("ethers");

function Home({ yourLocalBalance, readContracts, writeContracts, tx, blockExplorer, address }) {
  const [val, setval] = useState();
  const [string, setstring] = useState([]);
  const noofads = useContractReader(readContracts, "YourContract", "NoOfAds");
  const [cost, setcost] = useState();
  const [costForValue, setcostForValue] = useState();

  useEffect(() => {
    const updateAd = async () => {
      if (!readContracts["YourContract"]?.adslength()) {
        return;
      }
      const AdCall = await readContracts["YourContract"].adslength();
      console.log(AdCall);
      const numAdCall = ethers.BigNumber.from(AdCall).toNumber();
      console.log(numAdCall);
      const arrAds = [];
      for (let i = 0; i < numAdCall; i++) {
        const Adlink = await readContracts["YourContract"].ads(i);
        console.log(Adlink);
        console.log(Adlink.id);
        arrAds.push({ id: Adlink.id, link: Adlink.link });
      }
      setstring(arrAds);
    };
    updateAd();
  }, [noofads]);

  console.log(string);
  console.log(typeof string);
  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 15, margin: "auto", width: 500 }}>
        <h1>Budweiser</h1>
        <div style={{ margin: 10 }}>
          <Input
            onChange={e => {
              setval(e.target.value);
            }}
            placeholder="https link"
          ></Input>
        </div>
        <div style={{ margin: 15 }}>
          <Button
            onClick={async () => {
              await tx(writeContracts["YourContract"].NewAd(val));
            }}
          >
            Insert Link of your Ad
          </Button>
        </div>

        {/* <div style={{ border: "1px solid #cccccc", padding: 15, margin: "auto", width: 400 }}>
          <img src="{string}" height={200} width={200} alt="" />
        </div> */}
      </div>
      <div style={{ width: 820, margin: "auto", paddingBottom: 256 }}>
        List
        <List
          bordered
          dataSource={string}
          renderItem={item => {
            const ids = item.id;
            console.log(ids);
            const Id = Number(ids);
            console.log(Id);
            if (!item) {
              return <div></div>;
            }
            console.log(item);
            return (
              <List.Item key={Id}>
                <Card
                  title={
                    <div>
                      <span style={{ fontSize: 20, margin: 5 }}>{Id}</span>
                    </div>
                  }
                >
                  <img height={300} width={300} src={item.link} alt="" />
                </Card>

                <div>
                  <Button
                    onClick={async () => {
                      const Cost = await readContracts["YourContract"].calculator(address, Id, 1);
                      const formatCost = ethers.BigNumber.from(Cost).toNumber();
                      setcostForValue(formatCost);
                      const newcost = (formatCost / 10 ** 18).toFixed(4);
                      setcost(newcost);
                    }}
                  >
                    Calculate Cost for another Minute
                  </Button>
                  {cost && (
                    <div>
                      <h3> {cost} ETH</h3>
                    </div>
                  )}
                  <Button
                    marginRight={200}
                    onClick={async () => {
                      console.log(Id);
                      console.log(costForValue);
                      await writeContracts["YourContract"].Pay(Id, 1, { value: costForValue });
                    }}
                  >
                    Fund Another Minute
                  </Button>

                  <Button
                    onClick={async () => {
                      await writeContracts["YourContract"].AdOff(Id);
                    }}
                  >
                    Remove Ad
                  </Button>
                </div>
              </List.Item>
            );
          }}
        ></List>
      </div>
    </div>
  );
}

export default Home;
