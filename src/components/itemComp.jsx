import React from "react";

// comp
import ItemSize from "./ItemCizeComp";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "../style/cssForSwiper/Swiper.css";

function Item(props) {
  // --> problem broj je bio string umesto broj
  const mainItem = props.arr.find((item) => item.id === Number(props.itemId));

  return (
    <Container style={{ paddingLeft: 0, paddingRight: 0, overflow: "hidden" }}>
      <Row xs={1} sm={1} md={1} lg={2} xl={2}>
        <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="slideDiv">
            <Swiper
              scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img className="Img" src={mainItem.pic1} alt="picMain"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img className="Img" src={mainItem.pic2} alt="picMain"></img>
              </SwiperSlide>
              <SwiperSlide>
                <img className="Img" src={mainItem.pic3} alt="picMain"></img>
              </SwiperSlide>

              {mainItem.pic4 ? (
                <SwiperSlide>
                  <img className="Img" src={mainItem.pic4} alt="picMain"></img>
                </SwiperSlide>
              ) : (
                <></>
              )}

              {mainItem.pic5 ? (
                <SwiperSlide>
                  <img className="Img" src={mainItem.pic5} alt="picMain"></img>
                </SwiperSlide>
              ) : (
                <></>
              )}

              {mainItem.pic6 ? (
                <SwiperSlide>
                  <img className="Img" src={mainItem.pic6} alt="picMain"></img>
                </SwiperSlide>
              ) : (
                <></>
              )}
            </Swiper>
          </div>
        </Col>
        <Col className="centarItems">
          <div className="mainInfoDiv">
            <h2>{mainItem.name}</h2>
            <h2>{mainItem.price}.00 din</h2>
          </div>
          <div className="moreInfo">
            <p>{mainItem.info1}</p>
          </div>

          <div className="sizeValueDiv">
            <ItemSize sizeValue={mainItem.sizeS} sizeName="S" />
            <ItemSize sizeValue={mainItem.sizeM} sizeName="M" />
            <ItemSize sizeValue={mainItem.sizeL} sizeName="L" />
            <ItemSize sizeValue={mainItem.sizeXL} sizeName="XL" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Item;
