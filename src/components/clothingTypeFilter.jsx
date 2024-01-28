import "../style/clothingTypePage.css";

// react-dom
import { Link, useParams } from "react-router-dom";

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

// storage
import { getDownloadURL, listAll, ref } from "firebase/storage";

function ClothingTyleFilter() {
  const [itemId, setItemID] = useState();

  const [item1, setItem1] = useState([]);

  const [arrSort, setArrSort] = useState([]);

  const [stateRun1, setStateRun1] = useState();

  // path
  const { routeLink } = useParams();

  const itemCollection = collection(db, routeLink);

  useEffect(() => {
    const getItemID = async () => {
      const data = await getDocs(itemCollection);
      const finalDataID = data.docs.map((doc) => doc.id);
      if (finalDataID.length === 0) {
        setArrSort(undefined);
      }
      setItemID(finalDataID);
    };
    getItemID();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (itemId === undefined) {
      return;
    }

    setStateRun1(itemId.length);

    itemId.forEach((element) => {
      const getitem = async () => {
        const itemRef = doc(db, routeLink, element);
        const docSnap = await getDoc(itemRef);

        const imageRef = ref(storage, `${routeLink}/${element}`);
        const itemFromdb = docSnap.data();

        if (docSnap.exists()) {
          listAll(imageRef)
            .then((res) => {
              getDownloadURL(res.items[0]).then((url) => {
                const { name, price, date } = itemFromdb;
                setItem1((prev) => [
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
    if (stateRun1 === item1.length) {
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

      if (item1 === undefined) {
        setArrSort(undefined);
        return;
      } else {
        item1.sort(compareDates);
        setArrSort(item1);
      }
    }
  }, [item1]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2 className="mainItemName">{routeLink}</h2>
      <div className="itemsContainer">
        <Container fluid>
          <Row sm={12} md={2} lg={3} xl={4}>
            {arrSort ? (
              arrSort.map((obj) => (
                <div className="boxItem" key={v4()}>
                  <Link to={"/" + routeLink + "/" + obj.element}>
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
  );
}

export default ClothingTyleFilter;
