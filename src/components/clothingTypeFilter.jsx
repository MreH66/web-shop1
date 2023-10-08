import "../style/clothingTypePage.css";

// react-dom
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// fireStore
import { db, storage } from "../sing-in/fireBase/fireBaseUtils";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { v4 } from "uuid";
// imports
import ClothingItem from "./clothingItems";
import TypeOftclohingErr from "./errorNotfound/typeOfClothingErr";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// storgae
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { First } from "react-bootstrap/esm/PageItem";

function ClothingTyleFilter(props) {
  const [itemId, setItemID] = useState();
  const [items, setItems] = useState([]);
  const [imageArr, setImgArr] = useState([]);

  // path
  let location = useLocation();
  const parts = location.pathname.split("/");
  const lastUrlPart = parts.at(-1);

  const itemCollection = collection(db, lastUrlPart);

  useEffect(() => {
    const getItemID = async () => {
      const data = await getDocs(itemCollection);
      const finalDataID = data.docs.map((doc) => doc.id);
      if (finalDataID.length === 0) {
        setItems(undefined);
      }
      setItemID(finalDataID);
    };
    getItemID();
  }, []);

  useEffect(() => {
    if (itemId === undefined) {
      return;
    }
    itemId.forEach((element) => {
      const getitem = async () => {
        // info from dataBase
        const itemRef = doc(db, props.items, element);
        const docSnap = await getDoc(itemRef);

        // storage
        const imageRef = ref(storage, `${props.items}/${element}`);

        if (docSnap.exists()) {
          // console.log(docSnap.data());
          listAll(imageRef).then((res) => {
            const imgItem = res.items[0];

            console.log("+++++");
            console.log(imgItem);

            getDownloadURL(imgItem).then((url) => {
              // console.log(url);
              const itemFromdb = docSnap.data();
              const { name, price } = itemFromdb;
              setItems((prev) => [...prev, { name, price, url, element }]);
            });
          });
        } else {
          console.log("No such document!");
        }
      };
      getitem();
    });
  }, [itemId]);

  useEffect(() => {
    /* const itemImg = imageArr.find(
      (element) =>
        element ===
        "suknja/8085ed6b69874121a15c5e373c1656d9/fifth:aa9a8a7c-e18e-406a-abcd-26376f177833"
    );
    console.log(itemImg); */
    console.log(imageArr);
  }, [imageArr]);

  return (
    <div>
      <div>
        <h2 className="mainItemName">{props.items}</h2>

        <div className="itemsContainer">
          <Container fluid>
            <Row sm={12} md={2} lg={3} xl={4}>
              {items ? (
                items.map((obj) => (
                  <div className="boxItem" key={v4()}>
                    <Link
                      onClick={() => {
                        props.functionGetRoute(obj.element, props.items);
                      }}
                      to={"/" + props.items + "/" + obj.element}
                    >
                      <ClothingItem
                        name={obj.name}
                        price={obj.price}
                        MainPicture={obj.url}
                      />
                    </Link>
                  </div>
                ))
              ) : (
                <TypeOftclohingErr />
              )}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default ClothingTyleFilter;

/*
 const [info1, name, price, sizeL, sizeS, sizeM, sizeXL] = itemFromdb;
*/

/*
  {promiseFinished ? (
        <div>
          <h2 className="mainItemName">{props.items}</h2>

          <div className="itemsContainer">
            <Container fluid>
              <Row sm={12} md={2} lg={3} xl={4}>
                {array1 ? (
                  array1.map((obj) => (
                    <div className="boxItem" key={v4()}>
                      <Link
                        onClick={() => {
                          props.functionGetRoute(obj.id, props.items);
                        }}
                        to={"/" + props.items + "/" + obj.id}
                      >
                        <ClothingItem
                          name={obj.name}
                          price={obj.price}
                          MainPicture={obj.pic1}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <TypeOftclohingErr />
                )}
              </Row>
            </Container>
          </div>
        </div>
      ) : (
        <></>
      )}
*/

/*
 imageArr.find(
      (element) =>
        element ===
        "suknja/8085ed6b69874121a15c5e373c1656d9/fifth:aa9a8a7c-e18e-406a-abcd-26376f177833"
    );
*/
