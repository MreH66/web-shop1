import "../../style/clothingType.css";

import { Link } from "react-router-dom";

function ClothingType(props) {
  return (
    <div className="comp">
      <Link to={"/list/" + props.name}>
        <div className="shadowB">
          <p className="centarP">{props.name}</p>
        </div>
      </Link>
    </div>
  );
}

export default ClothingType;
