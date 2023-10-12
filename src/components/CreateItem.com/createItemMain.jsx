import "../../style/createItemCSS/createItem.css";

import { useEffect, useState } from "react";

import exitIMG from "../../images/x-mark.png";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

import ItemSize from "../ItemCizeComp";

function CreateItem() {
  // info item
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [textInfo, setTextInfo] = useState("");

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
  const [comp, setComp] = useState(false);

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
      setComp(false);
      return;
    }

    await setDoc(doc(itemCollectionRef, randomId), {
      name: name,
      price: Number(price),
      sizeS: sizeState1,
      sizeM: sizeState2,
      sizeL: sizeState3,
      sizeXL: sizeState4,
      info1: textInfo,
      date: new Date(),
    }).then(() => randomId);

    const imageRef = ref(
      storage,
      `${collectionName}/${randomId}/first:${v4()}`
    );
    const imageRe2 = ref(
      storage,
      `${collectionName}/${randomId}/second:${v4()}`
    );
    const imageRe3 = ref(
      storage,
      `${collectionName}/${randomId}/third:${v4()}`
    );
    const imageRe4 = ref(
      storage,
      `${collectionName}/${randomId}/fourth:${v4()}`
    );
    const imageRe5 = ref(
      storage,
      `${collectionName}/${randomId}/fifth:${v4()}`
    );
    const imageRe6 = ref(
      storage,
      `${collectionName}/${randomId}/sixth:${v4()}`
    );

    if (image1 !== null) {
      uploadBytes(imageRef, image1).then(() => {
        console.log("pic1", image1);
      });
    } else {
      return;
    }

    if (image2 !== null) {
      uploadBytes(imageRe2, image2).then(() => {
        console.log("pic2");
      });
    } else {
      return;
    }

    if (image3 !== null) {
      uploadBytes(imageRe3, image3).then(() => {
        console.log("pic3");
      });
    } else {
      return;
    }

    if (image4 !== null) {
      uploadBytes(imageRe4, image4).then(() => {
        console.log("pic4", imageRe4);
      });
    } else {
      return;
    }

    if (image5 !== null) {
      uploadBytes(imageRe5, image5).then(() => {
        console.log("pic5", imageRe5);
      });
    } else {
      return;
    }

    if (image6 !== null) {
      uploadBytes(imageRe6, image6).then(() => {
        console.log("pic6", imageRe6);
      });
    } else {
      return;
    }
  };

  function showConfirmation() {
    setComp(
      <>
        <div className="confirmation">
          <h2>potrvda</h2>
          <div>
            <h3>Ime</h3>
            <p>{name}</p>
          </div>
          <div>
            <h3>Cena</h3>
            <p>{price}</p>
          </div>
          <div>
            <button className="button-23" onClick={createItem}>
              Add item
            </button>
          </div>
        </div>
      </>
    );
  }

  /*
<div className="confirmation">
          <div className="ButtonX">
            <img className="img1" src={exitIMG}></img>
          </div>
          <h2>potrvda</h2>
          <div>
            <h3>Ime</h3>
            <p>{name}</p>
          </div>
          <div>
            <h3>Cena</h3>
            <p>{price}</p>
          </div>
          <div>
            <button className="button-23" onClick={createItem}>
              Add item
            </button>
          </div>
        </div>
*/

  if (comp) {
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
                      <button className="button-23" onClick={createItem}>
                        potvrdi
                      </button>
                      <button
                        onClick={() => {
                          setComp(false);
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
  } else {
    return (
      <div>
        <div className="dropD">
          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="btn btn-primary">
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
          <Row sm={1} md={2} lg={2} xl={2}>
            <div className="inputsBox centarItems">
              <div>
                <p>Main img</p>
                <input
                  className="inputFile"
                  type="file"
                  onChange={(event) => {
                    setImage1(event.target.files[0]);
                  }}
                />
                <br />
              </div>

              <input
                className="inputFile"
                type="file"
                onChange={(event) => {
                  setImage2(event.target.files[0]);
                }}
              />
              <input
                className="inputFile"
                type="file"
                onChange={(event) => {
                  setImage3(event.target.files[0]);
                }}
              />
              <input
                className="inputFile"
                type="file"
                onChange={(event) => {
                  setImage4(event.target.files[0]);
                }}
              />
              <input
                className="inputFile"
                type="file"
                onChange={(event) => {
                  setImage5(event.target.files[0]);
                }}
              />
              <input
                className="inputFile"
                type="file"
                onChange={(event) => {
                  setImage6(event.target.files[0]);
                }}
              />
            </div>
            <div>
              <div className="allInfoDiv centarItems">
                <div>
                  <input
                    type="string"
                    placeholder="Name..."
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  ></input>
                  <input
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
        {comp}
        <div className="centarItems">
          <button className="button-23" onClick={showConfirmation}>
            Add item
          </button>
        </div>
      </div>
    );
  }
}

export default CreateItem;

// <button onClick={uploadimg}>upload images</button>

/*
 <>
        <div className="confirmation">
          <h2>potrvda</h2>
          <ol>
            <li>{name}</li>
            <li>{price}</li>
            <li>{textInfo}</li>
          </ol>
          <div>
            <button onClick={createItem}>Add item</button>
          </div>
        </div>
      </>
*/
