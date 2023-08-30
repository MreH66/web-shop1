import "./style/app.css";
import "bootstrap/dist/css/bootstrap.min.css";

// react router
import { Route, Routes, useLocation } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components
import Header from "./components/header";
import GenderS from "./components/genderS";
import Footer1 from "./components/footer";
import InfoText from "./components/info";
import ClothingTyleFilter from "./components/clothingTypeFilter";
import Item from "./components/itemComp";
// windows
import Window1 from "./components/window1";
import Window2 from "./components/window2";

//pictures
import malePic from "./images/article_aligned@2x.jpg";
import femalePic from "./images/photoFemale.jpeg";
import React, { useState } from "react";

function App() {
  const [viewComp1] = useState(<Window1 fun1={selectClothingRout} />);
  const [viewComp2] = useState(<Window2 fun1={selectClothingRout} />); //!!! ovde mogu da korstim isti comp samo sa drugacijim props
  const [viewComp3, setViewComp3] = useState(<InfoText />);

  function handleClick(num) {
    switch (num) {
      case 1:
        // console.log("1");
        setViewComp3(viewComp1);
        if (viewComp3 === viewComp1) {
          setViewComp3(<InfoText />);
        }
        break;
      case 2:
        // console.log("2");
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

  let location = useLocation(); // dobijam rutu

  // sa pojedinacni item

  const [itemId, setItemId] = useState();
  const [typeClothing, setTypeClothing] = useState();

  function getItemsID(idOfItem, TypeOfitem) {
    setItemId(idOfItem); // id ajtema
    setTypeClothing(TypeOfitem); // vrsta itema
    // console.log("/" + TypeOfitem + "/" + idOfItem);
  }

  React.useEffect(() => {}, [itemId, typeClothing]);

  // za array iteme

  const [routeLink, setRouteLink] = useState("/");
  const [ItemName, setItemName] = useState();

  function selectClothingRout(nameOfItems) {
    // console.log(nameOfItems);
    // console.log("/" + nameOfItems);
    setRouteLink("/" + nameOfItems);
    setItemName(nameOfItems);
  }

  React.useEffect(() => {
    //  console.log(location.pathname);

    setRouteLink(location.pathname);
    const replaceToNormalName = location.pathname.replace(/[^a-z0-9]/gi, "");
    setItemName(replaceToNormalName);
  }, [routeLink, ItemName]); // zasto je ovde err?

  // log
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]); // zasto je ovde err?

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
                      <GenderS gender="Accessories & more" picture={malePic} />
                    </div>
                  </Col>
                  <Col>
                    <div
                      className="padding"
                      onClick={() => {
                        handleClick(2);
                      }}
                    >
                      <GenderS gender="Zene" picture={femalePic} />
                    </div>
                  </Col>
                </Row>
                <div>{viewComp3}</div>
              </Container>
            </div>
          }
        ></Route>

        <Route
          path={routeLink}
          element={
            <ClothingTyleFilter
              functionGetRoute={getItemsID}
              items={ItemName}
            />
          }
        ></Route>

        <Route
          path={"/" + typeClothing + "/" + itemId}
          element={<Item itemId={itemId} clothingType={typeClothing} />}
        ></Route>
      </Routes>

      <Footer1 />
    </div>
  );
}

export default App;

//  <Route path={() => {}} element={}></Route>
