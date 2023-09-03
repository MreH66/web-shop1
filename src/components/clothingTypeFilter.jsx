import "../style/clothingTypePage.css";

import ClothingItem from "./clothingItems";
import TypeOftclohingErr from "./errorNotfound/typeOfClothingErr";

import ReturnArr from "./clothingItems/clothingArrays";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function ClothingTyleFilter(props) {
  const returnArrFun = ReturnArr(props.items);

  return (
    <div>
      <h2 className="mainItemName">{props.items}</h2>

      <div className="itemsContainer">
        <Container fluid>
          <Row sm={12} md={2} lg={3} xl={4}>
            {returnArrFun ? (
              returnArrFun.map((obj) => (
                <div className="boxItem" key={Math.random()}>
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
  );
}

export default ClothingTyleFilter;
// link koji ce da me vodi ddo item koji zelim putem id-a
// nakon toga funcija koja mi vraca taj item
// comp koji renderuje taj jedan comp sa svim informacijama
