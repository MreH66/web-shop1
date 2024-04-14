import "../../style/createItemCSS/createItem.css";

import { useContext, useEffect, useState } from "react";
import React from "react";

// router
import { useNavigate } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
import ErrorPage from "../errorNotfound/ErrPage";
import { UserContext } from "../Context/user.contest";

function CreateItem() {
  // info item
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [textInfo, setTextInfo] = useState("");

  // Context
  const { currenUser, loadingDone } = useContext(UserContext);

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

  function retImageRef(num) {
    return ref(storage, `${collectionName}/${randomId}/:${num}:${v4()}`);
  }

  // collection name
  const [collectionName, setCollectionName] = useState("dress");

  //id
  const [randomId, setRandomId] = useState(null);

  //image
  const [image1, setImage1] = useState(undefined);
  const [image2, setImage2] = useState(undefined);
  const [image3, setImage3] = useState(undefined);
  const [image4, setImage4] = useState(undefined);
  const [image5, setImage5] = useState(undefined);
  const [image6, setImage6] = useState(undefined);

  //ConfiramtionScreen
  const [comp, setComp] = useState(2);

  const [buttonImg, setButtonImg] = useState("Add image");

  const navigate = useNavigate();

  useEffect(() => {
    setRandomId(v4().toString().replaceAll("-", ""));
  }, []);

  // firebase
  const itemCollectionRef = collection(db, collectionName);

  const createItem = async () => {
    if (name === "" || image1 === undefined || price === null) {
      alert("something is missing");
      return;
    }

    uploadProggres();

    const date = new Date();

    const time1 =
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
      sizeS: sizeStates[0].available,
      sizeM: sizeStates[1].available,
      sizeL: sizeStates[2].available,
      sizeXL: sizeStates[3].available,
      info1: textInfo,
      date: time1,
    }).then(() => randomId);

    const arrValues = [false, false, false, false, false, false];

    function upLoadAllPic() {
      if (image1 !== undefined) {
        uploadBytes(retImageRef(0), image1).then(() => {
          arrValues[0] = true;
          isEverythingDownloaded();
        });
      } else {
        arrValues[0] = true;
      }

      if (image2 !== undefined) {
        uploadBytes(retImageRef(1), image2).then(() => {
          arrValues[1] = true;
          isEverythingDownloaded();
        });
      } else {
        arrValues[1] = true;
      }

      if (image3 !== undefined) {
        uploadBytes(retImageRef(2), image3).then(() => {
          arrValues[2] = true;
          isEverythingDownloaded();
        });
      } else {
        arrValues[2] = true;
      }

      if (image4 !== undefined) {
        uploadBytes(retImageRef(3), image4).then(() => {
          arrValues[3] = true;
          isEverythingDownloaded();
        });
      } else {
        arrValues[3] = true;
      }

      if (image5 !== undefined) {
        uploadBytes(retImageRef(4), image5).then(() => {
          arrValues[4] = true;
          isEverythingDownloaded();
        });
      } else {
        arrValues[4] = true;
      }

      if (image6 !== undefined) {
        uploadBytes(retImageRef(5), image6).then(() => {
          arrValues[5] = true;
          isEverythingDownloaded();
        });
      } else {
        arrValues[5] = true;
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
    setComp(3);
  }

  let [addImg, setAddImg] = useState([]);
  let [numImg, setNumImg] = useState(1);

  useEffect(() => {
    if (numImg === 10) {
      setButtonImg("Image limit reached");
    }
  }, [numImg]);

  function AddPic() {
    setNumImg(numImg + 1);

    if (numImg > 9) {
      return;
    }

    setAddImg((prev) => [
      ...prev,
      <div>
        <input
          id={numImg}
          className="inputFile"
          type="file"
          onChange={(event) => {
            setImg(event.target.files[0], event.currentTarget.id);
          }}
        />
      </div>,
    ]);
  }

  function setImg(img, idFromButton) {
    switch (Number(idFromButton)) {
      case 1:
        setImage2(img);
        break;

      case 2:
        setImage3(img);
        break;

      case 3:
        setImage4(img);
        break;

      case 4:
        setImage5(img);
        break;

      case 5:
        setImage6(img);
        break;

      default:
        console.log("img not found");
    }
  }

  if (currenUser === null || currenUser === false) {
    return (
      <>
        {loadingDone ? null : (
          <>
            <ErrorPage type="Admin" />
          </>
        )}
      </>
    );
  } else if (comp === 2) {
    return (
      <div>
        <div className="dropD">
          <MDBDropdown>
            <MDBDropdownToggle tag="a" className="btn btn1122">
              current collection: {collectionName}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem
                link
                onClick={() => {
                  setCollectionName("dress");
                }}
              >
                dress
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                onClick={() => {
                  setCollectionName("pants");
                }}
              >
                pants
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                onClick={() => {
                  setCollectionName("skirt");
                }}
              >
                skirt
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
                <div>
                  {addImg.map((Item) => {
                    return <li>{Item}</li>;
                  })}
                </div>
                <div className="centarItems centarButton ">
                  <button className="button-23" onClick={AddPic}>
                    {buttonImg}
                  </button>
                </div>
              </ol>
            </div>

            <div>
              <div className="allInfoDiv centarItems">
                <>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control
                      style={{ height: "50px" }}
                      className="floating111"
                      type="string"
                      placeholder="Name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="Price" label="Price">
                    <Form.Control
                      style={{ height: "50px" }}
                      className="floating111"
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                      type="number"
                      placeholder="Price"
                    />
                  </FloatingLabel>
                </>

                <div className="textAr">
                  <FloatingLabel controlId="floatingTextarea2" label="Comment">
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
              </div>
            </div>
          </Row>
        </Container>
        <div className="centarItems butt1">
          <button className="button-23" onClick={createItem}>
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
          <div className="lds-facebook">
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
