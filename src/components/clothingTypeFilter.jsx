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
import ClothingItem from "./smallComp/clothingItems";
import ErrorPage from "./errorNotfound/ErrPage";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// storgae
import { getDownloadURL, listAll, ref } from "firebase/storage";

function ClothingTyleFilter(props) {
  const [itemId, setItemID] = useState();
  const [items, setItems] = useState([]);

  const [arrSort, setArrSort] = useState([]);

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (itemId === undefined) {
      return;
    }

    // first
    itemId.forEach((element) => {
      const getitem = async () => {
        // info from dataBase
        const itemRef = doc(db, props.items, element);
        const docSnap = await getDoc(itemRef);

        // storage
        const imageRef = ref(storage, `${props.items}/${element}`);
        const itemFromdb = docSnap.data();

        if (docSnap.exists()) {
          listAll(imageRef)
            .then((res) => {
              function item() {
                for (let num = 0; num < res.items.length; num++) {
                  if (res.items[num].fullPath.includes(":0:")) {
                    return res.items[num];
                  }
                }
              }
              const item1 = item();
              getDownloadURL(item1).then((url) => {
                const { name, price, date } = itemFromdb;
                setItems((prev) => [
                  ...prev,
                  { date, name, price, url, element },
                ]);
              });
            })
            .catch((err) => console.log(err));
        } else {
          console.log("No such document!");
        }
      };
      getitem();
    });
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function compareDates(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
      return 0;
    }

    if (items === undefined) {
      setArrSort(undefined);
      return;
    } else {
      items.sort(compareDates);
      setArrSort(items);
    }
  }, [items]);

  
  return (
    <div>
      <div>
        <h2 className="mainItemName">{props.items}</h2>

        <div className="itemsContainer">
          <Container fluid>
            <Row sm={12} md={2} lg={3} xl={4}>
              {arrSort ? (
                arrSort.map((obj) => (
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
                <ErrorPage type="ListOfItems" />
              )}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default ClothingTyleFilter;
