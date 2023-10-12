import React, { useEffect, useState } from "react";

//css
import "../style/itemComp.css";

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
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref, deleteObject } from "firebase/storage";
import { v4 } from "uuid";

function Item(props) {
  const [mainItem, setFillterdArr] = useState();
  const [promiseFinsihed, setPromiseFinish] = useState(false);

  const [imagelist, setImagelist] = useState([]);

  const [listUpDate, setListUpDate] = useState(true);

  // state Info upDate
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [textInfo, setTextInfo] = useState("");
  // sizeState
  const [sizeState1, setSizeState1] = useState(false);
  const [sizeState2, setSizeState2] = useState(false);
  const [sizeState3, setSizeState3] = useState(false);
  const [sizeState4, setSizeState4] = useState(false);

  // info set
  useEffect(() => {
    async function findItem() {
      const itemRef = collection(db, props.clothingType);
      const data = await getDocs(itemRef);
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const itemMain = items.find((item) => item.id === props.itemId);
      const { name, price, info1 } = itemMain;
      setName(name);
      setPrice(price);
      setTextInfo(info1);

      //
      setFillterdArr(itemMain);
      setPromiseFinish(true);
    }
    findItem();
  }, []);

  // img set
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

  
  async function deleteItem(collection, id) {
    // firestore
    const itemDoc = doc(db, collection, id);
    await deleteDoc(itemDoc);

    // storage
    const imageRef = ref(storage, `${collection}/${id}`);
    listAll(imageRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          const itemRef = ref(storage, url);
          deleteObject(itemRef)
            .then(() => {
              console.log("item deleted");
            })
            .catch((err) => console.log(err));
        });
      });
    });
  }

  async function upDate() {
    const itemDoc = doc(db, props.clothingType, props.itemId);

    const newFields = {
      name: name,
      price: Number(price),
      sizeS: sizeState1,
      sizeM: sizeState2,
      sizeL: sizeState3,
      sizeXL: sizeState4,
      info1: textInfo,
    };

    await updateDoc(itemDoc, newFields).then(console.log("Azuriranje uspesno"));
  }

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
                        <SwiperSlide key={v4}>
                          <img className="Img" src={url} alt="picMain"></img>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </Col>
              <Col className="centarItems">
                {listUpDate ? (
                  <div>
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
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="labelMain">Ime</label>
                      <input
                        value={name}
                        type="string"
                        placeholder="Name..."
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                      ></input>
                      <label className="labelMain">cena</label>
                      <input
                        value={price}
                        type="number"
                        placeholder="Price..."
                        onChange={(event) => {
                          setPrice(event.target.value);
                        }}
                      ></input>
                    </div>

                    <div>
                      <p>Add info</p>
                      <textarea
                        value={textInfo}
                        onChange={(event) => {
                          setTextInfo(event.target.value);
                        }}
                        name="postContent"
                        rows={4}
                        cols={40}
                      />
                    </div>

                    <div>
                      <div
                        className="sizeClickDiv"
                        onClick={() => {
                          setSizeState1(!sizeState1);
                        }}
                      >
                        <ItemSize sizeValue={sizeState1} sizeName={"S"} />
                      </div>

                      <div
                        className="sizeClickDiv"
                        onClick={() => {
                          setSizeState2(!sizeState2);
                        }}
                      >
                        <ItemSize sizeValue={sizeState2} sizeName={"M"} />
                      </div>

                      <div
                        className="sizeClickDiv"
                        onClick={() => {
                          setSizeState3(!sizeState3);
                        }}
                      >
                        <ItemSize sizeValue={sizeState3} sizeName={"L"} />
                      </div>

                      <div
                        className="sizeClickDiv"
                        onClick={() => {
                          setSizeState4(!sizeState4);
                        }}
                      >
                        <ItemSize sizeValue={sizeState4} sizeName={"XL"} />
                      </div>
                    </div>
                    <div className="buttonDiv">
                      <button className="button-23" onClick={upDate}>
                        Potvrdi
                      </button>
                    </div>
                  </>
                )}

                <div>
                  <div className="buttonDiv">
                    <button
                      className="button-23"
                      onClick={() => {
                        deleteItem(props.clothingType, props.itemId);
                      }}
                    >
                      izbrisi
                    </button>
                    <button
                      className="button-23"
                      onClick={() => {
                        setListUpDate(!listUpDate);
                      }}
                    >
                      azuriraj
                    </button>
                  </div>
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
