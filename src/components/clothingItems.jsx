// css
import "../style/clothingItemBox.css";

function ClothingItem(props) {
  return (
    <div>
      <div className="mainImgDiv">
        <img className="mainImg" src={props.MainPicture} alt="MainPic"></img>
      </div>
      <div className="clothingInfo">
        <p className="PInfoText">{props.name}</p>
        <p className="PInfoText">{props.price} Din</p>
      </div>
    </div>
  );
}

export default ClothingItem;
