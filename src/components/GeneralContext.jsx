import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import FundsWindow from "./FundsWindow"
import WithdrawWindow from "./WithdrawWindow"

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openCloseWindow: (uid) => {},
  closeCloseWindow: () => {},
  openFundsWindow: () => {},
  closeFundsWindow: () => {},
  openWithdrawWindow: () => {},
  closeWithdrawWindow: () => {}
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [isWithdrawWindowOpen, setIsWithdrawWindowOpen] = useState(false);
  const [isFundsWindowOpen, setIsFundsWindowOpen] = useState(false);
  


  const handleOpenBuyWindow = (uid) => {
    
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenFundsWindow = () =>{
    setIsFundsWindowOpen(true);
  }

  const handleCloseFundsWindow = () =>{
    setIsFundsWindowOpen(false);
  }

  const handleOpenWithdrawWindow = () =>{
    setIsWithdrawWindowOpen(true);
  }

  const handleCloseWithdrawWindow = () =>{
    setIsWithdrawWindowOpen(false);
  }

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        openFundsWindow: handleOpenFundsWindow,
        closeFundsWindow: handleCloseFundsWindow,
        openWithdrawWindow: handleOpenWithdrawWindow,
        closeWithdrawWindow: handleCloseWithdrawWindow
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
      {isFundsWindowOpen && <FundsWindow/>}
      {isWithdrawWindowOpen && <WithdrawWindow/>}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
