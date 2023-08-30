import ReturnArr from "./clothingItems/clothingArrays";

function Item(props) {
  const Items = ReturnArr(props.clothingType);
  // console.log(Items);

  const mainItem = Items.find((id) => id.id === props.itemId);
  console.log(mainItem);

  return (
    <div>
      <h2>{mainItem.name}</h2>
      <h2>{mainItem.price}</h2>
      <img src={mainItem.pic1} alt="img1"></img>
    </div>
  );
}

export default Item;
