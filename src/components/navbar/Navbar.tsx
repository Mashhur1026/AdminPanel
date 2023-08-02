import "./navbar.css";
import logo from "../../../img/logo.png";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="navbar">
      <div className="logo">
        <img src={logo} alt="iroda admin" />
      </div>

      <div>
        <ul id="links" className={isOpen ? "active " : ""}>
          <li>
            <a href="/">Banner</a>
          </li>
          <li>
            <a href="/Products">Mahsulotlar</a>
          </li>
          <li>
            <a href="#addProduct">Mahsulot Qoshish</a>
          </li>
          <a id="close" onClick={() => setIsOpen(false)}>
            <i className="far fa-times"></i>
          </a>
        </ul>
      </div>

      <div className="search">
        <input type="text" placeholder="kerakli tavar ism" />
        <button>Qdruv</button>
        <i
          id="bar"
          className="fas fa-outdent"
          onClick={() => setIsOpen(true)}
        ></i>
      </div>
    </section>
  );
}

export default Navbar;
