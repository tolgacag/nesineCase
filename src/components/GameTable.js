import { GlobalContext } from "../Contexts/GlobalState";
import { useState, useEffect, useContext, Fragment } from "react";
import "../styles/GameTable.css";
import Loading from "./Loading";

const PAGE_COUNT = 40;

function GameTable() {
  const [slicedData, setSlicedData] = useState([]);
  const [wholeData, setWholeData] = useState([]);
  const [loadCount, setLoadCount] = useState(PAGE_COUNT);
  const [scrolledY, setScrolledY] = useState(0);

  const { addRemoveBasketData } = useContext(GlobalContext);

  const getBetData = async () => {
    try {
      const response = await fetch(
        "https://nesine-case-study.onrender.com/bets"
      );
      const data = await response.json();

      setWholeData(data);
      setSlicedData(data.slice(0, PAGE_COUNT));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBetData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEnd);
    return () => {
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, [scrolledY]);

  const handleTableDisplayCount = () => {
    setLoadCount(loadCount + PAGE_COUNT);
    setSlicedData(wholeData.slice(0, loadCount));
  };

  const handleScrollEnd = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollY = window.scrollY;
    setScrolledY(scrollY);
    const documentHeight = document.body.offsetHeight;
    if (scrollPosition >= documentHeight - 10) {
      handleTableDisplayCount();
    }
  };

  const toggleButtonColor = (e) => {
    const cell = e.target;

    if (cell.style.backgroundColor === "yellow") {
      cell.style.backgroundColor = "";
    } else {
      // Clean the clicked rows style
      const getChilds = cell.parentElement.children;
      for (let index = 0; index < getChilds.length; index++) {
        getChilds[index].style.backgroundColor = "";
      }

      cell.style.backgroundColor = "yellow";
    }
  };

  const handleCellClick = (item, e) => {
    const cell = e.target;
    if (cell.className !== "title" && cell.textContent !== "") {
      const cellValue = e.target.textContent;
      toggleButtonColor(e);
      const basketData = {
        NID: item.NID,
        MBS: item.OCG["1"].MBS,
        C: item.C,
        N: item.N,
        Oran: cellValue,
      };
      addRemoveBasketData(basketData);
    }
  };

  return (
    <div>
      {slicedData.length > 0 ? (
        <table className="gameTable" key={"header"}>
          <tbody>
            <tr>
              <th>Event Count: {slicedData.length}</th>
              <th>Yorumlar</th>
              <th></th>
              <th>1</th>
              <th>x</th>
              <th>2</th>
              <th>Alt</th>
              <th>Üst</th>
              <th>H1</th>
              <th>1</th>
              <th>x</th>
              <th>2</th>
              <th>H2</th>
              <th>1-X</th>
              <th>1-2</th>
              <th>x-2</th>
              <th>Var</th>
              <th>Yok</th>
              <th>+99</th>
            </tr>
            {slicedData.map((item, index) => (
              <Fragment key={item.NID}>
                <tr id={`${index}-h`}>
                  <td>{`${item.D} ${item.DAY} ${item.LN}`}</td>
                  <td>Yorumlar</td>
                  <td></td>
                  <td>{item.OCG["1"].OC["0"].N}</td>
                  <td>{item.OCG["1"].OC["1"].N}</td>
                  <td>2</td>
                  <td>{item.OCG["5"].OC["25"].N}</td>
                  <td>{item.OCG["5"].OC["26"].N}</td>
                  <td>H1</td>
                  <td>1</td>
                  <td>x</td>
                  <td>2</td>
                  <td>H2</td>
                  <td>{item.OCG["2"].OC["3"].N}</td>
                  <td>{item.OCG["2"].OC["4"].N}</td>
                  <td>{item.OCG["2"].OC["5"].N}</td>
                  <td>Var</td>
                  <td>Yok</td>
                  <td>+99</td>
                </tr>
                <tr id={`${index}-d`} onClick={(e) => handleCellClick(item, e)}>
                  <td width={350} className="title">
                    <b>{item.C}</b>
                    {` ${item.T} ${item.N}`}
                  </td>
                  <td className="title">Yorumlar</td>
                  <td className="title">{item.OCG["1"].MBS}</td>
                  <td>{item.OCG["1"].OC["0"].O}</td>
                  <td>{item.OCG["1"].OC["1"].O}</td>
                  <td></td>
                  <td>{item.OCG["5"].OC["25"].O}</td>
                  <td>{item.OCG["5"].OC["26"].O}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{item.OCG["2"].OC["3"].O}</td>
                  <td>{item.OCG["2"].OC["4"].O}</td>
                  <td>{item.OCG["2"].OC["5"].O}</td>
                  <td></td>
                  <td></td>
                  <td>3</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default GameTable;
