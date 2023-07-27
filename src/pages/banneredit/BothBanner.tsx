import { useState } from "react";
import Banner from "../banner/Banner";
import BannerEdit from "./BannerEdit";

const BothBanner = () => {
  const [banner, setBanner] = useState(true);
  return (
    <>
      {banner ? (
        <Banner setBanner={setBanner} />
      ) : (
        <BannerEdit setBanner={setBanner} />
      )}
    </>
  );
};

export default BothBanner;
