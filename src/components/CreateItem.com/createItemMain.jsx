import "../../style/createItemCSS/createItem.css";

import { useContext, useEffect, useReducer, useState } from "react";
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

    // Workaround // loop?
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

  const [buttonImg, setButtonImg] = useState("Add image");

  //images
  const [imagesState, dispatch] = useReducer(reducer, []);

  function reducer(state, action) {
    switch (action.type) {
      case "addImg":
        let imagesSort = [...state, { pic: action.picMain, num: action.num }];

        let itemsFound = [...state].find((obj) => obj.num === action.num);
        if (itemsFound !== undefined) {
          imagesSort.splice(itemsFound.num, 1);
        }

        let sortedImg = imagesSort.sort(function (a, b) {
          return a.num - b.num;
        });
        setButtonImg("add image");
        return sortedImg;

      default:
        return { errMsg: "action not found" };
    }
  }

  //confirmation screen
  const [comp, setComp] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    setRandomId(v4().toString().replaceAll("-", ""));
  }, []);

  // firebase
  const itemCollectionRef = collection(db, collectionName);

  const createItem = async () => {
    if (name === "" || imagesState.length === 0 || price === null) {
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

    function uploadPics() {
      let numChech = 0;

      imagesState.forEach((item) => {
        if (item.pic === undefined) {
          return;
        }
        uploadBytes(retImageRef(item.num), item.pic).then(() => {
          numChech++;
          if (numChech === imagesState.length) {
            navigate("/" + collectionName + "/" + randomId);
          }
        });
      });
    }
    uploadPics();
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
    if (document.getElementById("butMain").files.length === 0) {
      setButtonImg("fill empty inputs");
      return;
    }

    for (let num = 1; num < numImg; num++) {
      if (document.getElementById(num + "but")) {
        if (document.getElementById(num + "but").files.length === 0) {
          setButtonImg("fill empty inputs");
          return;
        }
      }
    }

    setNumImg(numImg + 1);

    if (numImg > 9) {
      return;
    }

    setAddImg((prev) => [
      ...prev,
      <div>
        <input
          id={numImg + "but"}
          className="inputFile"
          type="file"
          onChange={(event) => {
            dispatch({
              type: "addImg",
              picMain: event.target.files[0],
              num: Number(event.currentTarget.id.match(/\d+/g)),
            });
          }}
        />
      </div>,
    ]);
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
                      id={"butMain"}
                      className="inputFile"
                      type="file"
                      onChange={(event) => {
                        dispatch({
                          type: "addImg",
                          picMain: event.target.files[0],
                          num: 0,
                        });
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
