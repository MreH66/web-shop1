import dress1 from "../../images/dressNum1.jpg";
import dress2 from "../../images/dressNum2.jpeg";

const haljina = [
  { id: 10, name: "haljina duga", price: 1211, pic1: dress1 },
  { id: 11, name: "haljina kratka", price: 2211, pic1: dress2 },
  { id: 21, name: "haljina srdnja", price: 3211, pic1: dress1 },
  { id: 31, name: "haljina srdnja", price: 3211, pic1: dress1 },
  { id: 41, name: "haljina srdnja", price: 3211, pic1: dress1 },
  { id: 51, name: "haljina srdnja", price: 3245, pic1: dress1 },
  { id: 61, name: "haljina srdnja", price: 3255, pic1: dress1 },
  { id: 71, name: "haljina srdnja", price: 3298, pic1: dress1 },
];

const pantalone = [
  { id: 3, name: "pantalone duga", price: 52 },
  { id: 4, name: "pantalone kratka", price: 62 },
  { id: 5, name: "pantalone srdnja", price: 62 },
];

const suknja = [
  { id: 6, name: "suknja duga", price: 42 },
  { id: 7, name: "suknja kratka", price: 32 },
  { id: 8, name: "suknja srdnja", price: 12 },
];

function ReturnArr(nameOfArr) {
  // bolje switch da se iskoristi
  if (nameOfArr === "haljina") {
    return haljina;
  } else if (nameOfArr === "pantalone") {
    return pantalone;
  } else if (nameOfArr === "suknja") {
    return suknja;
  } else {
    return console.log("arr of items not found");
  }
}

export default ReturnArr;
