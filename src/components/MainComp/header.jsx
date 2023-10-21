import "../../style/header.css";
import icon1 from "../../images/settings-line.png";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
  db,
  singInWithGooglePopup,
} from "../../sing-in/fireBase/fireBaseUtils";

import { UserContext } from "../Context/user.contest";

import { getDoc, doc } from "firebase/firestore";

function Header() {
  const { currenUser, setCurrentUser } = useContext(UserContext);

  async function getAdminUser() {
    const itemRef = doc(db, "AdminID", "eMOGiGlPfpb2NcTYXJb5r5aIDAx1"); // od uuid-a moram da napravim hash
    const AdminID = await getDoc(itemRef);
    // console.log(AdminID.id);
    return AdminID.id;
  }

  function isAdminLoggedIn() {
    if (currenUser === true) {
      return (
        <Link to="/CreateItems">
          <h3 className="itemCreateLink">Create Item</h3>
        </Link>
      );
    } else {
      return <></>;
    }
  }

  const logGoogleUser = async () => {
    singInWithGooglePopup()
      .then((result) => {
        const admin = getAdminUser();
        admin.then((item) => {
          if (item === result.user.uid) {
            alert("login successful");
            setOptions(!options);
            setCurrentUser(true);
          } else {
            alert("login only for admin");
          }
        });
      })
      .catch((error1) => {
        console.log("Error popup closed");
        console.log(error1);
      });
  };

  const [options, setOptions] = useState(false);

  function displayHandler() {
    setOptions(!options);
  }

  return (
    <div>
      <header>
        <img
          className="displayL"
          src={icon1}
          alt="settings"
          onClick={displayHandler}
        />

        {options ? (
          <>
            <button onClick={logGoogleUser} className="optionsP">
              <p className="LoginText">Login</p>
            </button>
          </>
        ) : (
          <></>
        )}

        <Link to="/">
          <h1 className="inlineD">Name</h1>
        </Link>
        {isAdminLoggedIn()}
      </header>
    </div>
  );
}

export default Header;