// css
import "../style/windows.css";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ClothingType from "./clothingType";
import ClothingManu from "./clothingManu";

// img
import clothType from "../images/shirt-line.png";

function Window2(props) {

  return (
    <div>
      <Row>
        <Col>
          <div className="clothing-types">
            <Row>
              <Col>
                <ClothingType
                  mainFun={props.fun1}
                  icon={clothType}
                  name="jakna"
                />
              </Col>
              <Col>
                <ClothingType
                  mainFun={props.fun1}
                  icon={clothType}
                  name="jakna"
                />
              </Col>
              <Col>
                <ClothingType
                  mainFun={props.fun1}
                  icon={clothType}
                  name="jakna"
                />
              </Col>
              <Col>
                <ClothingType
                  mainFun={props.fun1}
                  icon={clothType}
                  name="jakna"
                />
              </Col>
              <Col>
                <ClothingManu
                  mainFun={props.fun1}
                  icon={clothType}
                  name="more..."
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Window2;
