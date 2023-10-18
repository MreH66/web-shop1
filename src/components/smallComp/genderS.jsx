import "../../style/genderDiv.css";

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
        <span className="span2">{props.gender}</span>
      </h2>
    </div>
  );
}

export default GenderS;
