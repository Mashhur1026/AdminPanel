import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import "./products.css";

interface Product {
  id: number;
  images: string;
  name: string;
  price: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  async function getProductsData() {
    try {
      const response = await axios.get("/");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductsData();
  }, [products]);

  return (
    <section id="product1">
      <h2>Mahsulotlar</h2>
      {products.length > 0 ? (
        <div className="pro-container">
          {products.map((product) => (
            <div key={product.id} className="pro">
              <Link className="underline" to={`/product/${product.id}`}>
                <img src={product.images} alt="product" />
                <div className="des">
                  <span>Zara</span>
                  <h5>{product.name}</h5>
                  <h4>${product.price}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <section className="loader">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
      )}
    </section>
  );
}

export default Products;
