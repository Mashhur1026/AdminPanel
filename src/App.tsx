import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Products from "./pages/products/Products";
import AddProduct from "./pages/addProduct/AddProduct";
import BothBanner from "./pages/banneredit/BothBanner";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import ProductEdit from "./pages/productEdit/ProductEdit";
import Orders from "./pages/orders/Orders";

function App() {
  return (
    <>
      <Navbar />
      <BothBanner />
      <Routes>
        <Route path="/*" element={<Products />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/ProductEdit/:id" element={<ProductEdit />} />
      </Routes>
      <AddProduct />
    </>
  );
}

export default App;
