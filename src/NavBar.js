import { StickyNav } from "react-js-stickynav";
import { Link } from "react-router-dom";
import "react-js-stickynav/dist/index.css";
import { Navbar, Card } from "react-bootstrap";
import logo from "./logo.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <StickyNav length="40">
        <Navbar.Brand>
          <img className="logo" src={logo} alt="GrabTheCar" />
          <Link to="/" className="Ti">
            GrabTheCar
          </Link>
        </Navbar.Brand>
      </StickyNav>
    </div>
  );
};

export default NavBar;
