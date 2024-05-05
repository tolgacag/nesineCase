import { useContext, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalState";
import "../styles/Basket.css";
function Basket() {
  const { basketData } = useContext(GlobalContext);

  const [betMultiplier, setBetMultiplier] = useState(1);
  let totalCouponFee = 0;

  return (
    <>
      <div className="basketMain">
        {basketData.map((item) => {
          if (totalCouponFee !== 0) {
            totalCouponFee = totalCouponFee * item.Oran;
          } else {
            totalCouponFee = item.Oran * betMultiplier;
          }
          return (
            <div className="basketItem" key={item.C}>
              {`${item.MBS} Kod: ${item.C} Maç: ${item.N}`}{" "}
              <b>{`Oran : ${item.Oran}`}</b>
            </div>
          );
        })}
        <div className="betMultiplier">
          Bahis tutari :{" "}
          <input
            value={betMultiplier}
            onChange={(e) => setBetMultiplier(e.target.value)}
          />{" "}
          TL
        </div>
        <div className="totalCount">
          Toplam : {Number(totalCouponFee * betMultiplier).toFixed(2)} TL
        </div>
      </div>
    </>
  );
}

export default Basket;
