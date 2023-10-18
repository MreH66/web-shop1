import "../../style/ItemSize.css";

function ItemSize(props) {
  return (
    <div className="itemSizeDiv">
      {props.sizeValue ? (
        <div>
          <p className="sizeP">{props.sizeName}</p>
        </div>
      ) : (
        <div className="sizeOpaciti">
          <p className="sizeP">{props.sizeName}</p>
        </div>
      )}
    </div>
  );
}

export default ItemSize;
