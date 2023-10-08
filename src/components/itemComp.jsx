import React, { useEffect, useState } from "react";

// comp
import ItemSize from "./ItemCizeComp";
import TypeOftclohingErr from "./errorNotfound/typeOfClothingErr";

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

// Firebase
import { db, storage } from "../sing-in/fireBase/fireBaseUtils";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";

function Item(props) {
  const [mainItem, setFillterdArr] = useState();
  const [promiseFinsihed, setPromiseFinish] = useState(false);

  const [imagelist, setImagelist] = useState([]);

  useEffect(() => {
    async function findItem() {
      const itemRef = collection(db, props.clothingType);
      const data = await getDocs(itemRef);
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // console.log(items.find((item) => item.id === props.itemId));
      const itemMain = items.find((item) => item.id === props.itemId);
      setFillterdArr(itemMain);
      setPromiseFinish(true);
    }
    findItem();
  }, []);

  useEffect(() => {
    const imageRef = ref(storage, `${props.clothingType}/${props.itemId}`);
    listAll(imageRef).then((res) => {
      res.items.forEach((item) => {
        console.log(item);
        getDownloadURL(item).then((url) => {
          setImagelist((prev) => [...prev, url]);
        });
      });
    });

    console.log(props.itemId);
    console.log(props.clothingType);
  }, []);

  return (
    <div>
      {promiseFinsihed ? (
        mainItem ? (
          <Container
            style={{ paddingLeft: 0, paddingRight: 0, overflow: "hidden" }}
          >
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
                    {imagelist.map((url) => {
                      return (
                        <SwiperSlide>
                          <img className="Img" src={url} alt="picMain"></img>
                        </SwiperSlide>
                      );
                    })}
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
        ) : (
          <>
            <TypeOftclohingErr />
          </>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default Item;
// add zoom on img
