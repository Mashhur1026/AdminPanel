import "./banner.css";
import img from "../../../img/b17.jpg";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section id="banner">
      <div className="container">
        <div className="imgContainer">
          <h1>Hozirg Banner Surati</h1>
          <img src={img} alt="banner" />
        </div>
        <div className="bannerText">
          <h1>Hozirg Banner Matnlari</h1>
          <input type="text" disabled placeholder="kchik shior" />
          <input type="text" disabled placeholder="katta shior" />
          <input type="text" disabled placeholder="chegirma elonlar" />
        </div>
      </div>
      <Link to={`/BannerEdit`}>O'zgartrish</Link>
    </section>
  );
}

export default Banner;
