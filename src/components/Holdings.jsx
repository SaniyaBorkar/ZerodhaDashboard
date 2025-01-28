import React, { useState, useEffect, useContext } from "react";
import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { AuthContext } from "./context/AuthContext";
import SummaryContext from "./SummaryContext"


// import { holdings } from "../data/data";

const Holdings = () => {
  const { userId } = useContext(AuthContext);

  const [allHoldings, setAllHoldings] = useState([]);
  const [error, setError] = useState(null);
  
  const { refreshTrigger } = useContext(SummaryContext);

  const [summaryData, setSummaryData] = useState({
      totalInvestment: 0,
      currentValue: 0,
      profitLoss: 0,
    });

  useEffect(() => {
    const fetchAllHoldings = async () => {
      try {
        const response = await axios.post(`${import.meta.env.api}/allHoldings`, {
          userId: userId, // Pass the userId in the body
        });
        setAllHoldings(response.data); // Assuming the holdings are returned in the response
      } catch (err) {
        console.error("Error fetching holdings:", err);
        setError(err.message);
      }
    };

    if (userId) {
      fetchAllHoldings();
    }

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

  }, [userId, refreshTrigger]);

  if (error) {
    return <p>Error: {error}</p>;
  }
  const {
    totalInvestment,
    currentValue,
    profitLoss,
  } = summaryData;



  // const labels = ['January', 'February', 'eMarch', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
          {totalInvestment.toFixed(2)}k
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
          {currentValue.toFixed(2)}k
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{profitLoss.toFixed(2)}k <small>{((profitLoss / totalInvestment) * 100).toFixed(2)}%</small>{" "}</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;