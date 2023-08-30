// css
import "../style/windows.css";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ClothingType from "./clothingType";
import ClothingManu from "./clothingManu";

import clothType from "../images/shirt-line.png";

function Window1(props) {
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
                  name="haljina"
                />
              </Col>
              <Col>
                <ClothingType
                  mainFun={props.fun1}
                  icon={clothType}
                  name="pantalone"
                />
              </Col>
              <Col>
                <ClothingType
                  mainFun={props.fun1}
                  icon={clothType}
                  name="suknja"
                />
              </Col>
              <Col>
                <ClothingType
                  mainFun={props.fun1}
                  icon={clothType}
                  name="stikle"
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

export default Window1;