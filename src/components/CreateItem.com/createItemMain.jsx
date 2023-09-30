import "../../style/createItemCSS/createItem.css";

import { useState } from "react";

// MDB
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

// firebase
import { db } from "../../sing-in/fireBase/fireBaseUtils";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import ItemSize from "../ItemCizeComp";

function CreateItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [textInfo, setTextInfo] = useState("");

  const [sizeState1, setSizeState1] = useState(false);
  const [sizeState2, setSizeState2] = useState(false);
  const [sizeState3, setSizeState3] = useState(false);
  const [sizeState4, setSizeState4] = useState(false);

  const [collectionName, setCollectionName] = useState("suknja");

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

  const itemCollectionRefSuknja = collection(db, collectionName);

  const createItem = async () => {
    await addDoc(itemCollectionRefSuknja, {
      name: name,
      price: Number(price),
      sizeS: sizeState1,
      sizeM: sizeState2,
      sizeL: sizeState3,
      sizeXL: sizeState4,
      info1: textInfo,
    });
  };

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
        <label>
          Nesto o artiklu:
          <textarea
            onChange={(event) => {
              setTextInfo(event.target.value);
            }}
            name="postContent"
            rows={4}
            cols={40}
          />
        </label>
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

        <button onClick={createItem}>Add item</button>
      </div>
    </div>
  );
}

export default CreateItem;
