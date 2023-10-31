import React, { useEffect, useState, useContext } from "react";

//css
import "../style/itemComp.css";

// router
import { useNavigate } from "react-router-dom";

// comp
import ItemSize from "./smallComp/ItemCizeComp";
import ErrorPage from "./errorNotfound/ErrPage";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

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

import { UserContext } from "./Context/user.contest";

function Item(props) {
  const [mainItem, setFillterdArr] = useState();

  const [imagelist, setImagelist] = useState([]);

  const [arrayLen, setArrLen] = useState();

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

  const [ArrImg, setArrImg] = useState([]);
  let [numberChange1, setNumberChnage1] = useState(0);

  // Context
  const { currenUser } = useContext(UserContext);

  const navigate = useNavigate();

  // info set
  useEffect(() => {
    async function findItem() {
      const itemRef = collection(db, props.clothingType);
      const data = await getDocs(itemRef);
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const itemMain = items.find((item) => item.id === props.itemId);

      if (itemMain === undefined) {
        setFillterdArr(false);
        return;
      }

      const { name, price, info1 } = itemMain;

      // setters
      setName(name);
      // format
      setPrice(price);
      setTextInfo(info1);

      //
      setFillterdArr(itemMain);
    }
    findItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // img set
  useEffect(() => {
    const imageRef = ref(storage, `${props.clothingType}/${props.itemId}`);
    listAll(imageRef).then((res) => {
      setArrLen(res.items.length);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          // console.log(url);
          setImagelist((prev) => [...prev, url]);
        });
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    imagelist.forEach((item) => {
      repeat(item);
    });

    function repeat(item) {
      // ako artikl koji je unutar item ne postoji jos uvek u arr dodaj
      if (!ArrImg.includes(item)) {
        console.log(item);

        function rep() {
          if (item.includes(`%3A${numberChange1}%`)) {
            console.log(numberChange1);

            setArrImg((prev) => [...prev, item]);
          } else {
            if (numberChange1 !== 10) {
              setNumberChnage1(numberChange1 + 1);
            }
          }
        }

        rep();
      }
    }
  }, [imagelist, numberChange1]);

  // itame Delete
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
              navigate("/lista/" + collection);
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

    await updateDoc(itemDoc, newFields)
      .then(alert("update successful"))
      .then(
        setTimeout(() => {
          navigate(0);
        }, 500)
      )
      .catch((err) => console.log(err));
  }

  if (mainItem) {
    return (
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
                {ArrImg.map((url) => {
                  return (
                    <SwiperSlide key={Math.random()}>
                      <img className="Img" src={url} alt="picMain"></img>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </Col>
          <Col className="centarItems111">
            {listUpDate ? (
              <div>
                <div className="mainInfoDiv">
                  <h2 className="middle1">{mainItem.name}</h2>
                  <h2 className="middle1">{mainItem.price}.00 din</h2>
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
              <div className="azuriranjeDiv1">
                <div>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Ime"
                    className="mb-3"
                  >
                    <Form.Control
                      value={name}
                      style={{ height: "50px" }}
                      className="floating111"
                      type="string"
                      placeholder="ime"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="Cena" label="Cena">
                    <Form.Control
                      value={price}
                      style={{ height: "50px" }}
                      className="floating111"
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                      type="number"
                      placeholder="cena"
                    />
                  </FloatingLabel>
                </div>

                <div>
                  <p>Add info</p>

                  <Form.Control
                    value={textInfo}
                    onChange={(event) => {
                      setTextInfo(event.target.value);
                    }}
                    as="textarea"
                    placeholder="info"
                    style={{ height: "20vh" }}
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
              </div>
            )}

            <div>
              {currenUser ? (
                <div className="buttonUpdateDel">
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
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else if (mainItem === false) {
    return (
      <>
        <ErrorPage type="ItemNotFound" />
      </>
    );
  }
}

export default Item;
// add zoom on img
