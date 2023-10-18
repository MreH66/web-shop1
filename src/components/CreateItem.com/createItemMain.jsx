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
  const [comp, setComp] = useState(false);

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

    const imageRef = ref(storage, `${collectionName}/${randomId}/:0:${v4()}`);
    const imageRe2 = ref(storage, `${collectionName}/${randomId}/:1:${v4()}`);
    const imageRe3 = ref(storage, `${collectionName}/${randomId}/:2:${v4()}`);
    const imageRe4 = ref(storage, `${collectionName}/${randomId}/:3:${v4()}`);
    const imageRe5 = ref(storage, `${collectionName}/${randomId}/:4:${v4()}`);
    const imageRe6 = ref(storage, `${collectionName}/${randomId}/:5:${v4()}`);

    function upLoadAllPic() {
      if (image1 !== null) {
        uploadBytes(imageRef, image1).then(() => {
          console.log("Upload uspesan", image1);
        });
      }

      if (image2 !== null) {
        uploadBytes(imageRe2, image2).then(() => {
          console.log("Upload uspesan", imageRe2);
        });
      }

      if (image3 !== null) {
        uploadBytes(imageRe3, image3).then(() => {
          console.log("Upload uspesan", imageRe3);
        });
      }

      if (image4 !== null) {
        uploadBytes(imageRe4, image4).then(() => {
          console.log("Upload uspesan", imageRe4);
        });
      }

      if (image5 !== null) {
        uploadBytes(imageRe5, image5).then(() => {
          console.log("Upload uspesan", imageRe5);
        });
      }

      if (image6 !== null) {
        uploadBytes(imageRe6, image6).then(() => {
          console.log("Upload uspesan", imageRe6);
        });
      }
    }

    upLoadAllPic();
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
  } else if (currenUser === null) {
    return (
      <>
        <AdminNotFound />
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
        {comp}
        <div className="centarItems butt1">
          <button className="button-23" onClick={showConfirmation}>
            Add item
          </button>
        </div>
      </div>
    );
  }
}

export default CreateItem;
// da imam nacin da se vidi kada je upload gotov
