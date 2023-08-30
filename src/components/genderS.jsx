import "../style/genderDiv.css";

function GenderS(props) {
  return (
    <div
      style={{
        backgroundImage: "url(" + props.picture + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="ganderDiv"
    >
      <h2 className="genderName">
        <span>{props.gender}</span>
      </h2>
    </div>
  );
}

export default GenderS;
