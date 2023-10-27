import "../../style/createItemCSS/createItem.css";

import { useContext, useEffect, useState } from "react";

// router
import { useNavigate } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

// MDB
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

// firebase
import { db } from "../../sing-in/fireBase/fireBaseUtils";
import { collection, setDoc, doc } from "firebase/firestore";
// firebase storage
import { storage } from "../../sing-in/fireBase/fireBaseUtils";
import { ref, uploadBytes } from "firebase/storage";
// uuid
import { v4 } from "uuid";

import ItemSize from "../smallComp/ItemCizeComp";
import AdminNotFound from "../errorNotfound/adminNotFound";
import { UserContext } from "../Context/user.contest";
import { Prev } from "react-bootstrap/esm/PageItem";

function CreateItem() {
  // info item
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [textInfo, setTextInfo] = useState("");

  // Context
  const { currenUser } = useContext(UserContext);

  // sizeState
  const [sizeState1, setSizeState1] = useState(false);
  const [sizeState2, setSizeState2] = useState(false);
  const [sizeState3, setSizeState3] = useState(false);
  const [sizeState4, setSizeState4] = useState(false);

  // collection name
  const [collectionName, setCollectionName] = useState("suknja");

  //id
  const [randomId, setRandomId] = useState(null);

  //image
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);

  //ConfiramtionScreen
  const [comp, setComp] = useState(2);

  // setter if all images are uploaded
  const arrValues = [];

  const navigate = useNavigate();

  useEffect(() => {
    setRandomId(v4().toString().replaceAll("-", ""));
  }, []);

  useEffect(() => {
    // console.log(randomId);
  }, [randomId]);

  function sizeState(size) {
    switch (size) {
      case 1:
        setSizeState1(!sizeState1);
        break;
      case 2:
        setSizeState2(!sizeState2);
        break;
      case 3:
        setSizeState3(!sizeState3);
        break;
      case 4:
        setSizeState4(!sizeState4);
        break;

      default:
        console.log("size not found");
    }
  }

  // firebase
  const itemCollectionRef = collection(db, collectionName);

  const createItem = async () => {
    if (name === "" || image1 === null || price === null) {
      alert("jedno od polja je prazno");
      setComp(2);
      return;
    }

    const date = new Date();

    const time111 =
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "," +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    await setDoc(doc(itemCollectionRef, randomId), {
      name: name,
      price: Number(price),
      sizeS: sizeState1,
      sizeM: sizeState2,
      sizeL: sizeState3,
      sizeXL: sizeState4,
      info1: textInfo,
      date: time111,
    }).then(() => randomId);

    const imageRef = ref(storage, `${collectionName}/${randomId}/:0:${v4()}`);
    const imageRe2 = ref(storage, `${collectionName}/${randomId}/:1:${v4()}`);
    const imageRe3 = ref(storage, `${collectionName}/${randomId}/:2:${v4()}`);
    const imageRe4 = ref(storage, `${collectionName}/${randomId}/:3:${v4()}`);
    const imageRe5 = ref(storage, `${collectionName}/${randomId}/:4:${v4()}`);
    const imageRe6 = ref(storage, `${collectionName}/${randomId}/:5:${v4()}`);

    function upLoadAllPic() {
      if (image1 !== null) {
        arrValues.push(false);
        uploadBytes(imageRef, image1).then(() => {
          arrValues[0] = true;
          isEverythingDownloaded();
        });
      }

      if (image2 !== null) {
        arrValues.push(false);
        uploadBytes(imageRe2, image2).then(() => {
          arrValues[1] = true;
          isEverythingDownloaded();
        });
      }

      if (image3 !== null) {
        arrValues.push(false);
        uploadBytes(imageRe3, image3).then(() => {
          arrValues[2] = true;
          isEverythingDownloaded();
        });
      }

      if (image4 !== null) {
        arrValues.push(false);
        uploadBytes(imageRe4, image4).then(() => {
          arrValues[3] = true;
          isEverythingDownloaded();
        });
      }

      if (image5 !== null) {
        arrValues.push(false);
        uploadBytes(imageRe5, image5).then(() => {
          arrValues[4] = true;
          isEverythingDownloaded();
        });
      }

      if (image6 !== null) {
        arrValues.push(false);
        uploadBytes(imageRe6, image6).then(() => {
          arrValues[5] = true;
          isEverythingDownloaded();
        });
      }

      function isEverythingDownloaded() {
        const allTrue = arrValues.every((element) => element === true);

        if (allTrue) {
          setTimeout(() => {
            navigate("/" + collectionName + "/" + randomId);
          }, "100");
        }
      }
    }
    upLoadAllPic();
  };

  function uploadProggres() {
    createItem();
    setComp(3);
  }

  function showConfirmation() {
    setComp(1);
  }

  if (comp === 1) {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <div class="containerCreateItem">
                <div class="plate">
                  <div className="confirmation">
                    <div>
                      <h3 className="text1111">Ime</h3>
                      {name === "" ? (
                        <h2>ime nije upisano</h2>
                      ) : (
                        <h2>{name}</h2>
                      )}
                      <h2>{name}</h2>
                    </div>
                    <div>
                      <h3 className="text1111">Cena</h3>
                      {price === null ? (
                        <h2>cena nije upisana</h2>
                      ) : (
                        <h2>{price}.00 Din</h2>
                      )}
                    </div>
                    <div>
                      <button className="button-23" onClick={uploadProggres}>
                        potvrdi
                      </button>
                      <button
                        onClick={() => {
                          setComp(2);
                        }}
                        className="button-23"
                      >
                        Nazad
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else if (currenUser === null) {
    return (
      <>
        <AdminNotFound />
      </>
    );
  } else if (comp === 2) {
    return (
      <div>
        <div className="dropD">
          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="btn btn1122">
              trenutna kolekcija ={collectionName}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem
                link
                onClick={() => {
                  setCollectionName("haljina");
                }}
              >
                haljina
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                onClick={() => {
                  setCollectionName("pantalone");
                }}
              >
                pantalone
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                onClick={() => {
                  setCollectionName("suknja");
                }}
              >
                suknja
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>
        <Container fluid>
          <Row sm={1} md={1} lg={2} xl={2}>
            <div className="inputsBox centarItems">
              <ol className="lista">
                <p>Main img</p>
                <li>
                  <div>
                    <input
                      className="inputFile"
                      type="file"
                      onChange={(event) => {
                        setImage1(event.target.files[0]);
                      }}
                    />
                    <br />
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      className="inputFile"
                      type="file"
                      onChange={(event) => {
                        setImage2(event.target.files[0]);
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      className="inputFile"
                      type="file"
                      onChange={(event) => {
                        setImage3(event.target.files[0]);
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      className="inputFile"
                      type="file"
                      onChange={(event) => {
                        setImage4(event.target.files[0]);
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      className="inputFile"
                      type="file"
                      onChange={(event) => {
                        setImage5(event.target.files[0]);
                      }}
                    />
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      className="inputFile"
                      type="file"
                      onChange={(event) => {
                        setImage6(event.target.files[0]);
                      }}
                    />
                  </div>
                </li>
              </ol>
            </div>
            <div>
              <div className="allInfoDiv centarItems">
                <>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Ime"
                    className="mb-3"
                  >
                    <Form.Control
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
                      style={{ height: "50px" }}
                      className="floating111"
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                      type="number"
                      placeholder="cena"
                    />
                  </FloatingLabel>
                </>

                <div className="textAr">
                  <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                      onChange={(event) => {
                        setTextInfo(event.target.value);
                      }}
                      as="textarea"
                      placeholder="info"
                      style={{ height: "20vh" }}
                    />
                  </FloatingLabel>
                </div>

                <div className="sizesDiv1111">
                  <div
                    className="sizeClickDiv"
                    onClick={() => {
                      sizeState(1);
                    }}
                  >
                    <ItemSize sizeValue={sizeState1} sizeName={"S"} />
                  </div>

                  <div
                    className="sizeClickDiv"
                    onClick={() => {
                      sizeState(2);
                    }}
                  >
                    <ItemSize sizeValue={sizeState2} sizeName={"M"} />
                  </div>

                  <div
                    className="sizeClickDiv"
                    onClick={() => {
                      sizeState(3);
                    }}
                  >
                    <ItemSize sizeValue={sizeState3} sizeName={"L"} />
                  </div>

                  <div
                    className="sizeClickDiv"
                    onClick={() => {
                      sizeState(4);
                    }}
                  >
                    <ItemSize sizeValue={sizeState4} sizeName={"XL"} />
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
        <div className="centarItems butt1">
          <button className="button-23" onClick={showConfirmation}>
            Add item
          </button>
        </div>
      </div>
    );
  } else if (comp === 3) {
    return (
      <>
        <div className="loadingDiv1 centarItems">
          <h2>uploading</h2>
          <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateItem;
