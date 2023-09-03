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

// 2 nacina da uradi img i da to moze da skejluje kako tebva
//1. img i unutar njega imam elemente(info) koje zelim

//2. img ce uvek biti kao div koji ga pokazuje

//ovo je za komp gde se prikazuje jedan item ( prikazuje velicine i css njegov )
/* .sizes { 

    background: white;
    border-radius: 0% 0% 0% 0% / 0% 0% 0% 0% ;
    border: 1px solid black;
    opacity: 0.4;
} */

/*
<div className="clothingSizes">
          <p className="sizes">s</p>
          <p className="sizes">m</p>
          <p className="sizes">l</p>
          <p className="sizes">xl</p>
        </div>
*/
