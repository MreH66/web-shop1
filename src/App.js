import "./style/app.css";
import "bootstrap/dist/css/bootstrap.min.css";

// react router
import { Route, Routes } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components
import Header from "./components/MainComp/header";
import GenderS from "./components/smallComp/genderS";
import CreateItem from "./components/CreateItem.com/createItemMain";
import ErrorPage from "./components/errorNotfound/ErrPage";

// import Footer1 from "./components/footer";
import InfoText from "./components/MainComp/info";
import ClothingTyleFilter from "./components/clothingTypeFilter";
import Item from "./components/itemComp";
// windows
import Window1 from "./components/window1";

//pictures
import malePic from "./images/article_aligned@2x.jpg";
import femalePic from "./images/photoFemale.jpeg";
import React, { useState } from "react";

const ArrayOfClothing1 = ["dress", "pants", "skirt", "heels", "more"];
const ArrayOfClothing2 = ["jacket", "jacket", "jacket", "jacket", "jacket"];

function App() {
  const [viewComp1] = useState(<Window1 items={ArrayOfClothing1} />);
  const [viewComp2] = useState(<Window1 items={ArrayOfClothing2} />);
  const [viewComp3, setViewComp3] = useState(<InfoText />);

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
        return;
    }
  }

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
          path={"/list/:routeLink"}
          element={
            <div>
              <ClothingTyleFilter />
            </div>
          }
        ></Route>
        <Route path={"/:routeLink/:id"} element={<Item></Item>}></Route>
        <Route path="/CreateItems" element={<CreateItem />}></Route>
        <Route path="*" element={<ErrorPage type="mainErr" />} />
      </Routes>
    </div>
  );
}

export default App;
