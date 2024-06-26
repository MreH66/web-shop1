import React, { useEffect, useState, useContext } from "react";

//css
import "../style/itemComp.css";

// router
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
import { v4 } from "uuid";

function Item() {
  const [mainItem, setFillterdArr] = useState();

  const [imagelist, setImagelist] = useState([]);

  const [listUpDate, setListUpDate] = useState(true);

  // state Info upDate
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [textInfo, setTextInfo] = useState("");

  // size
  const [sizeStates, setSizeStates] = useState([
    { size: "S", available: false },
    { size: "M", available: false },
    { size: "L", available: false },
    { size: "XL", available: false },
  ]);

  function handleSizeClick(size) {
    const arrNew = [...sizeStates];

    switch (size) {
      case "S":
        arrNew[0].available = !arrNew[0].available;
        break;
      case "M":
        arrNew[1].available = !arrNew[1].available;
        break;
      case "L":
        arrNew[2].available = !arrNew[2].available;
        break;
      case "XL":
        arrNew[3].available = !arrNew[3].available;
        break;

      default:
        console.log("size not found");
    }

    setSizeStates(arrNew);
  }

  const [ArrImg, setArrImg] = useState([]);
  let [numberChange1, setNumberChnage1] = useState(0);

  // Context
  const { currenUser } = useContext(UserContext);

  const navigate = useNavigate();
  const { routeLink, id } = useParams();

  // info set
  useEffect(() => {
    async function findItem() {
      const itemRef = collection(db, routeLink);
      const data = await getDocs(itemRef);
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const itemMain = items.find((item) => item.id === id);

      if (itemMain === undefined) {
        setFillterdArr(false);
        return;
      }

      const { name, price, info1 } = itemMain;

      // setters
      setName(name);
      setPrice(price);
      setTextInfo(info1);

      setFillterdArr(itemMain);
    }
    findItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // img set
  useEffect(() => {
    const imageRef = ref(storage, `${routeLink}/${id}`);
    listAll(imageRef).then((res) => {
      setState1(res.items.length);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImagelist((prev) => [...prev, url]);
        });
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let [state1, setState1] = useState(null);

  useEffect(() => {
    if (imagelist.length === state1) {
      imagelist.forEach((item) => {
        repeat(item);
      });
    }

    function repeat(item) {
      if (!ArrImg.includes(item)) {
        function rep() {
          if (item.includes(`%3A${numberChange1}%`)) {
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
  }, [imagelist, numberChange1]); // eslint-disable-line react-hooks/exhaustive-deps

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
              navigate("/list/" + collection);
            })
            .catch((err) => console.log(err));
        });
      });
    });
  }

  async function upDate() {
    const itemDoc = doc(db, routeLink, id);

    const newFields = {
      name: name,
      price: Number(price),
      sizeS: sizeStates[0].available,
      sizeM: sizeStates[1].available,
      sizeL: sizeStates[2].available,
      sizeXL: sizeStates[3].available,
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
                    <SwiperSlide key={v4()}>
                      <img
                        key={v4()}
                        className="Img"
                        src={url}
                        alt="picMain"
                      ></img>
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
                  <h2 className="middle1">{name}</h2>
                  <h2 className="middle1">
                    {new Intl.NumberFormat("en-DE").format(price)} din
                  </h2>
                </div>
                <div className="moreInfo">
                  <p>{textInfo}</p>
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
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control
                      value={name}
                      style={{ height: "50px" }}
                      className="floating111"
                      type="string"
                      placeholder="Name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="price" label="price">
                    <Form.Control
                      value={price}
                      style={{ height: "50px" }}
                      className="floating111"
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                      type="number"
                      placeholder="price"
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
                      handleSizeClick("S");
                    }}
                  >
                    <ItemSize
                      sizeValue={sizeStates[0].available}
                      sizeName={"S"}
                    />
                  </div>

                  <div
                    className="sizeClickDiv"
                    onClick={() => {
                      handleSizeClick("M");
                    }}
                  >
                    <ItemSize
                      sizeValue={sizeStates[1].available}
                      sizeName={"M"}
                    />
                  </div>

                  <div
                    className="sizeClickDiv"
                    onClick={() => {
                      handleSizeClick("L");
                    }}
                  >
                    <ItemSize
                      sizeValue={sizeStates[2].available}
                      sizeName={"L"}
                    />
                  </div>

                  <div
                    className="sizeClickDiv"
                    onClick={() => {
                      handleSizeClick("XL");
                    }}
                  >
                    <ItemSize
                      sizeValue={sizeStates[3].available}
                      sizeName={"XL"}
                    />
                  </div>
                </div>
                <div className="buttonDiv">
                  <button className="button-23" onClick={upDate}>
                    Confirm
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
                        deleteItem(routeLink, id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="button-23"
                      onClick={() => {
                        setListUpDate(!listUpDate);
                      }}
                    >
                      Update
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
