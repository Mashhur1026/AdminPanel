import "./banner.css";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

function Banner() {
  const [banner, setBanner] = useState({
    images: [],
    text_one: "",
    text_two: "",
    text_three: "",
  });

  const getBanner = async () => {
    try {
      const res = await axios.get("/getbanner");
      setBanner(res.data[0]);
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <section id="banner">
      <div className="container">
        <div className="imgContainer">
          <h1>Hozirg Banner Surati</h1>
          {banner.images && banner.images.length > 0 && (
            <img src={banner.images[0]} alt="banner" />
          )}
        </div>
        <div className="bannerText">
          <h1>Hozirg Banner Matnlari</h1>
          <input type="text" disabled placeholder={banner.text_one} />
          <input type="text" disabled placeholder={banner.text_two} />
          <input type="text" disabled placeholder={banner.text_three} />
        </div>
      </div>
      <Link to={`/BannerEdit`}>O'zgartrish</Link>
    </section>
  );
}

export default Banner;
