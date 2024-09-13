import { Link } from "react-router-dom";
import "./gol.css";

const Test = () => {
  return (
    <div>
      <br />
      <br />
      <center>
        <Link to={"/TestAll"}>
          <button className="All">Review All</button>
        </Link>
        <Link to={"/TestGolang"}>
          <button className="Golnag">Review Golang</button>
        </Link>
        <Link to={"/TestReact"}>
          <button className="React">Review React</button>
        </Link>
      </center>
    </div>
  );
};

export default Test;
