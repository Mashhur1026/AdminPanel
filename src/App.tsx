import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Products from "./pages/products/Products";
import AddProduct from "./pages/addProduct/AddProduct";
import BothBanner from "./pages/banneredit/BothBanner";
import SingleProduct from "./pages/singleProduct/SingleProduct";

function App() {
  return (
    <>
      <Navbar />
      <BothBanner />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
      <AddProduct />
    </>
  );
}

export default App;
