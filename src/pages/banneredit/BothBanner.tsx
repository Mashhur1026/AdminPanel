import { Route, Routes } from "react-router-dom";
import Banner from "../banner/Banner";
import BannerEdit from "./BannerEdit";

const BothBanner = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/BannerEdit" element={<BannerEdit />} />
      </Routes>
    </>
  );
};

export default BothBanner;
