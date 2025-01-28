import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import { AuthContext } from "./context/AuthContext";
import SummaryContext from "./SummaryContext";

import "./BuyActionWindow.css";

const FundsWindow = () => {
  
  const { refreshSummary } = useContext(SummaryContext);

  const { userId } = useContext(AuthContext);
  const {closeFundsWindow} = useContext(GeneralContext);

  const [amount, setAmount] = useState(0);
  const amountNumber = parseFloat(amount);

  const handleAddFundsClick = () => {
    axios.post(`${import.meta.env.VITE_API}/addfunds`, {
      amount: amountNumber,
      userId: userId,
    });
    console.log("came back");
    
    refreshSummary();
    GeneralContext.closeFundsWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeFundsWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Amount</legend>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleAddFundsClick}>
            Add
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FundsWindow;
