function ClothingManu(props) {
  return (
    <div
      onClick={() => {
        props.mainFun(props.name);
      }}
      className="comp"
    >
      <div className="shadowB">
        <p className="centarP">{props.name}</p>
      </div>
    </div>
  );
}

export default ClothingManu;
