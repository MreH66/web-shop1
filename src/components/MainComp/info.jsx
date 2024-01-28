import "../../style/info.css";
import "bootstrap/dist/css/bootstrap.min.css";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InfoText() {
  return (
    <div className="infoBox">
      <h2 className="textInfo">Additional information</h2>
      <div className="styleForBorder">
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              <div className="DivStyle">
                <p>
                  consectetur adipiscing. Mollis aliquam ut porttitor leo a.
                  Adipiscing bibendum est ultricies integer quis auctor elit.
                </p>
              </div>
            </Col>
            <Col>
              <div className="DivStyle">
                <p>
                  consectetur adipiscing. Mollis aliquam ut porttitor leo a.
                  Adipiscing bibendum est ultricies integer quis auctor elit.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default InfoText;
