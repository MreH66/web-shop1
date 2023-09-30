import { useState } from "react";
import dress1 from "../../images/dressNum1.jpg";
import dress2 from "../../images/dressNum2.jpeg";

import dress3 from "../../images/imgOfdress10.jpeg";
import dress4 from "../../images/pic4Dress.jpeg";

// firebase
import { db } from "../../sing-in/fireBase/fireBaseUtils";
import { collection, getDocs, doc } from "firebase/firestore";

/* const haljina = [
  {
    id: 10,
    name: "haljina duga",
    price: 1211,
    pic1: dress1,
    pic2: dress3,
    pic3: dress4,
    pic4: dress1,
    pic5: null,
    pic6: null,
    sizeS: true,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    info1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis.",
  },
  {
    id: 11,
    name: "haljina kratka",
    price: 2211,
    pic1: dress2,
    pic2: dress3,
    pic3: dress4,
    pic4: dress1,
    pic5: null,
    pic6: null,
    sizeS: true,
    sizeM: true,
    sizeL: true,
    sizeXL: false,
    info1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis.",
  },
  {
    id: 21,
    name: "haljina srdnja",
    price: 3211,
    pic1: dress1,
    pic2: dress3,
    pic3: dress4,
    pic4: dress1,
    pic5: null,
    pic6: null,
    sizeS: true,
    sizeM: true,
    sizeL: true,
    sizeXL: false,
    info1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis.",
  },
  {
    id: 31,
    name: "haljina srdnja",
    price: 3211,
    pic1: dress1,
    pic2: dress3,
    pic3: dress4,
    pic4: dress1,
    pic5: null,
    pic6: null,
    sizeS: true,
    sizeM: true,
    sizeL: true,
    sizeXL: false,
    info1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis.",
  },
  {
    id: 41,
    name: "haljina srdnja",
    price: 3211,
    pic1: dress1,
    pic2: dress3,
    pic3: dress4,
    pic4: dress1,
    pic5: null,
    pic6: null,
    sizeS: true,
    sizeM: true,
    sizeL: true,
    sizeXL: false,
    info1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis.",
  },
  {
    id: 51,
    name: "haljina srdnja",
    price: 3245,
    pic1: dress1,
    pic2: dress3,
    pic3: dress4,
    pic4: dress1,
    pic5: null,
    pic6: null,
    sizeS: true,
    sizeM: true,
    sizeL: true,
    sizeXL: false,
    info1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis.",
  },
]; */

/* const pantalone = [
  { id: 3, name: "pantalone duga", price: 52 },
  { id: 4, name: "pantalone kratka", price: 62 },
  { id: 5, name: "pantalone srdnja", price: 62 },
]; */

/* const suknja = [
  { id: 6, name: "suknja duga", price: 42 },
  { id: 7, name: "suknja kratka", price: 32 },
  { id: 8, name: "suknja srdnja", price: 12 },
]; */

/* const stikle = []; */

async function ReturnArr(nameOfArr) {
  if (nameOfArr !== "") {
    const itemsNameRef = collection(db, nameOfArr);
    const data = await getDocs(itemsNameRef);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); 

    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }
  /* 
  console.log(nameOfArr);

  switch (nameOfArr) {
    case "haljina":
      if (haljina.length === 0) {
        console.log("arr of items not found");
        return;
      }
      return haljina;

    case "pantalone":
      if (pantalone.length === 0) {
        console.log("arr of items not found");
        return;
      }
      return pantalone;

    case "suknja":
      if (suknja.length === 0) {
        console.log("arr of items not found");
        return;
      }
      return suknja;

    case "stikle":
      if (stikle.length === 0) {
        console.log("arr of items not found");
        return;
      }
      return stikle;

    default:
      console.log("arr of items not found");
      break;
  } */
}

export default ReturnArr;
