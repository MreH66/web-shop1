import "../../style/header.css";
import icon1 from "../../images/settings-line.png";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  db,
  singInWithGooglePopup,
  onAuthStateChangedListener,
  userSingOut,
  emailID,
} from "../../sing-in/fireBase/fireBaseUtils";

import { UserContext } from "../Context/user.contest";

import { getDoc, doc } from "firebase/firestore";

async function getAdminUser() {
  const itemRef = doc(db, "AdminID", emailID);
  const AdminID = await getDoc(itemRef);
  return AdminID.id;
}

function Header() {
  const { currenUser, setCurrentUser, setLoadingDone } =
    useContext(UserContext);

  function isAdminLoggedIn() {
    if (currenUser === true) {
      return (
        <Link to="/CreateItems">
          <h3 className="itemCreateLink">Create Item</h3>
        </Link>
      );
    } else {
      return null;
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
            setCurrentUser(false);
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

  function handleLogout() {
    userSingOut();
    setCurrentUser(false);
    setLoadingDone(false);
  }

  useEffect(() => {
    console.log("start effect");

    onAuthStateChangedListener((user) => {
      if (user === null) {
        return;
      }

      console.log("start");
      getAdminUser().then((item) => {
        if (item.toString() === user.uid.toString()) {
          setCurrentUser(true);
        } else {
          setCurrentUser(false);
        }
      });
      setLoadingDone(true);
    });
  }, []);

  return (
    <div>
      <header>
        <img
          className="displayL"
          src={icon1}
          alt="settings"
          onClick={displayHandler}
        />

        {currenUser ? (
          options ? (
            <>
              <button onClick={handleLogout} className="optionsP">
                <p className="LoginText">logout</p>
              </button>
            </>
          ) : null
        ) : options ? (
          <>
            <button onClick={logGoogleUser} className="optionsP">
              <p className="LoginText">Login</p>
            </button>
          </>
        ) : null}

        <Link to="/">
          <h1 className="inlineD">Name</h1>
        </Link>
        {isAdminLoggedIn()}
      </header>
    </div>
  );
}

export default Header;
