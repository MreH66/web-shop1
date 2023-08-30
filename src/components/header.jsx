import "../style/header.css";
import icon1 from "../images/settings-line.png";
import { useState } from "react";
import { Link } from "react-router-dom";

import { singInWithGooglePopup } from "../sing-in/fireBase/fireBaseUtils";

function Header() {
  const logGoogleUser = async () => {
    singInWithGooglePopup()
      .then((result) => {
        console.log(result);
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
        <img className="img1" src="" alt="Logo" />
        <img
          className="displayL"
          src={icon1}
          alt="settings"
          onClick={displayHandler}
        />

        <div className="middle">
          <Link to="/">
            <h1 className="inlineD">Name</h1>
          </Link>
        </div>

        {options ? (
          <>
            <button className="optionsP" onClick={logGoogleUser}>
              <p className="LoginText">Login</p>
            </button>
          </>
        ) : (
          <></>
        )}
      </header>
    </div>
  );
}

export default Header;
