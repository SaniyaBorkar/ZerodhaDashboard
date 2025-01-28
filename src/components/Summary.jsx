import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import SummaryContext from "./SummaryContext"
const Summary = () => {

  const {userId, username} = useContext(AuthContext);
  const { refreshTrigger } = useContext(SummaryContext);

  const [summaryData, setSummaryData] = useState({
    totalInvestment: 0,
    currentValue: 0,
    profitLoss: 0,
    marginAvailable: 0,
    marginsUsed: 0,
    openingBalance: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      
      console.log(userId);
      try {
        const response = await axios.get(`${import.meta.env.api}/investments/${userId}`);
        setSummaryData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if(userId) { fetchData(); }
  }, [userId, refreshTrigger]);  // Runs whenever `userId` changes

  const {
    totalInvestment,
    currentValue,
    profitLoss,
    marginAvailable,
    marginsUsed,
    openingBalance,
  } = summaryData;

  
  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{marginAvailable.toFixed(2)}k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{marginsUsed.toFixed(2)}k</span>{" "}
            </p>
            <p>
              Opening balance <span>{openingBalance.toFixed(2)}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {profitLoss.toFixed(2)}k <small>{((profitLoss / totalInvestment) * 100).toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{currentValue.toFixed(2)}k</span>{" "}
            </p>
            <p>
              Investment <span>{totalInvestment.toFixed(2)}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
