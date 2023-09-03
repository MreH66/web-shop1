import "../style/ItemSize.css";

function ItemSize(props) {
  function handleSizeClick(size) {
    // console.log("velicina " + size + " postoji");
    alert("velicina " + size + " ima na stanju");
  }

  function handleSizeClick1(size) {
    // console.log("velicina " + size + " ne postoji");
    alert("velicine " + size + " nema na stanju");
  }

  return (
    <div className="itemSizeDiv">
      {props.sizeValue ? (
        <div
          onClick={() => {
            handleSizeClick(props.sizeName);
          }}
        >
          <p className="sizeP">{props.sizeName}</p>
        </div>
      ) : (
        <div
          onClick={() => {
            handleSizeClick1(props.sizeName);
          }}
          className="sizeOpaciti"
        >
          <p className="sizeP">{props.sizeName}</p>
        </div>
      )}
    </div>
  );
}

export default ItemSize;
