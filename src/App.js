import "./style/app.css";
import "bootstrap/dist/css/bootstrap.min.css";

// react router
import { Route, Routes, useLocation } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components
import Header from "./components/MainComp/header";
import GenderS from "./components/smallComp/genderS";
import CreateItem from "./components/CreateItem.com/createItemMain";
import TypeOftclohingErr from "./components/errorNotfound/typeOfClothingErr";

// import Footer1 from "./components/footer";
import InfoText from "./components/MainComp/info";
import ClothingTyleFilter from "./components/clothingTypeFilter";
import Item from "./components/itemComp";
// windows
import Window1 from "./components/window1";
import Window2 from "./components/window2";

//pictures
import malePic from "./images/article_aligned@2x.jpg";
import femalePic from "./images/photoFemale.jpeg";
import React, { useEffect, useState } from "react";

function App() {
  const [viewComp1] = useState(<Window1 fun1={selectClothingRout} />);
  const [viewComp2] = useState(<Window2 fun1={selectClothingRout} />);
  const [viewComp3, setViewComp3] = useState(<InfoText />);

  //err
  const [errRoute, setErrRoute] = useState(<></>);

  function handleClick(num) {
    switch (num) {
      case 1:
        setViewComp3(viewComp1);
        if (viewComp3 === viewComp1) {
          setViewComp3(<InfoText />);
        }
        break;
      case 2:
        setViewComp3(viewComp2);
        if (viewComp3 === viewComp2) {
          setViewComp3(<InfoText />);
        }
        break;
      default:
        console.log("number not found");
        break;
    }
  }

  let location = useLocation();

  const [routeLink, setRouteLink] = useState("/");
  const [ItemName, setItemName] = useState();

  function selectClothingRout(nameOfItems) {
    setRouteLink("/" + nameOfItems);
    setItemName(nameOfItems);
  }

  useEffect(() => {
    const parts = location.pathname.split("/");
    const lastUrlPart = parts.at(-1);

    const parts1 = location.pathname.split("/");
    const firstPartUrl = parts1.at(1);

    if (firstPartUrl === "lista") {
      setRouteLink(lastUrlPart);
      setItemName(lastUrlPart);
    } else if (firstPartUrl !== "lista") {
      setRouteLink(firstPartUrl);
      setItemName(lastUrlPart);
    } else {
      setErrRoute(<Route path="*" element={<TypeOftclohingErr />} />);
    }
  }, [location]);

  return (
    <div className="backG-Color">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="mainPage">
              <Container>
                <Row>
                  <Col>
                    <div
                      className="padding"
                      onClick={() => {
                        handleClick(1);
                      }}
                    >
                      <GenderS gender="1" picture={malePic} />
                    </div>
                  </Col>
                  <Col>
                    <div
                      className="padding"
                      onClick={() => {
                        handleClick(2);
                      }}
                    >
                      <GenderS gender="2" picture={femalePic} />
                    </div>
                  </Col>
                </Row>
                <div>{viewComp3}</div>
              </Container>
            </div>
          }
        ></Route>
        <Route
          exact
          path={"/lista/" + routeLink}
          element={
            <div>
              <ClothingTyleFilter
                functionGetRoute={selectClothingRout}
                items={ItemName}
              />
            </div>
          }
        ></Route>
        <Route
          path={"/" + routeLink + "/" + ItemName}
          element={<Item itemId={ItemName} clothingType={routeLink}></Item>}
        ></Route>
        <Route path="/CreateItems" element={<CreateItem />}></Route>
        {errRoute}
      </Routes>
    </div>
  );
}

export default App;
