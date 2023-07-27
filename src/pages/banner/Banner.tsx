import "./banner.css";
import img from "../../../img/b17.jpg";

interface BannerProps {
  setBanner: (value: boolean) => void;
}

function Banner({ setBanner }: BannerProps) {
  return (
    <section id="banner">
      <div className="container">
        <div className="imgContainer">
          <h1>Hozirg Banner Surat</h1>
          <img src={img} alt="banner" />
        </div>
        <div className="bannerText">
          <h1>Hozirg Banner Matnlar</h1>
          <input type="text" disabled placeholder="kchik shior" />
          <input type="text" disabled placeholder="katta shior" />
          <input type="text" disabled placeholder="chegirma elonlar" />
        </div>
      </div>
      <a onClick={() => setBanner(false)}>O'zgartrish</a>
    </section>
  );
}

export default Banner;
