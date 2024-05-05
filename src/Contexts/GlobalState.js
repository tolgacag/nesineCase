import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [basketData, setBasketData] = useState([]);

  const addRemoveBasketData = (newItem) => {
    // Check data for dublicate record
    const checkExistData = basketData.filter(
      (item) => item.NID === newItem.NID
    );

    if (checkExistData.length === 0) {
      setBasketData((prevState) => [newItem, ...prevState]);
    } else if (checkExistData.length > 0) {
      setBasketData(basketData.filter((item) => item.NID !== newItem.NID));
      if (
        checkExistData.length > 0 &&
        checkExistData[0]?.Oran !== newItem?.Oran
      ) {
        setBasketData((prevState) => [newItem, ...prevState]);
      }
    }
  };
  return (
    <GlobalContext.Provider
      value={{ basketData, setBasketData, addRemoveBasketData }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
