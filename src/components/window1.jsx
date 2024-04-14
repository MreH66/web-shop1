// css
import "../style/windows.css";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ClothingType from "./smallComp/clothingType";

function Window1(props) {
  return (
    <div>
      <Col>
        <div className="clothing-types">
          <Row>
            {props.items.map((item) => {
              return (
                <>
                  <Col>
                    <ClothingType name={item} />
                  </Col>
                </>
              );
            })}
          </Row>
        </div>
      </Col>
    </div>
  );
}

export default Window1;
