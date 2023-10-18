import "../../style/clothingType.css";

import { Link } from "react-router-dom";

function ClothingType(props) {
  return (
    <div
      onClick={() => {
        props.mainFun(props.name);
      }}
      className="comp"
    >
      <Link to={"/lista/" + props.name}>
        <div className="shadowB">
          <p className="centarP">{props.name}</p>
        </div>
      </Link>
    </div>
  );
}

export default ClothingType;
