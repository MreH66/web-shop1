import { Link } from "react-router-dom";

import "../../style/Errpage/ErrPage.css";

import imageArrow1 from "../../images/arrow-right-line.png";
import imageArrow2 from "../../images/arrow-left-line.png";
import { useState } from "react";

function ErrorPage(props) {
  const [comp1, setComp1] = useState(<></>);

  setTimeout(() => {
    switch (props.type) {
      case "ListOfItems":
        setComp1(
          <div className="nameOfItem">
            <h2>Lista nije pronadjena</h2>
          </div>
        );
        break;
      case "ItemNotFound":
        setComp1(
          <div className="nameOfItem">
            <h2>Artikl nije pronadjen</h2>
          </div>
        );
        break;
      case "Admin":
        setComp1(
          <div className="nameOfItem">
            <h2>Admin nije pronadjen</h2>
          </div>
        );
        break;
      default:
        setComp1(
          <div className="nameOfItem">
            <h2>Stranica nije pronadjena</h2>
            <img src={imageArrow1} alt="" />
            <Link className="linkErrPage" to="/">
              nazan na glavnu stranicu
            </Link>
            <img src={imageArrow2} alt="" />
          </div>
        );
    }
  }, 250);

  return comp1;
}

export default ErrorPage;