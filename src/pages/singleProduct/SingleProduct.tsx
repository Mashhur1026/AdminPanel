import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { array } from "../products/Products";
import "./singleProduct.css";

interface CartItem {
  id: number;
  img: string[];
  category: string;
  cname: string;
  name: string;
  price: number;
  quantity: number;
  sizes: string[];
  des: string;
}

function SingleProduct() {
  const { id } = useParams();
  const productId = Number(id);
  const [singleProductUse, setSingleProductUse] = useState<CartItem>();

  const singleProduct = (id: number) => {
    const singleReady = array.filter((item) => item.id === id);
    setSingleProductUse(singleReady[0]);
  };

  useEffect(() => {
    if (productId) {
      singleProduct(productId);
    }
  }, [productId]);

  return (
    <>
      {singleProductUse && (
        <section id="prodetails" key={singleProductUse.id}>
          <div className="single-pro-img">
            <img
              src={singleProductUse.img[0]}
              width="100%"
              id="mainImg"
              alt={singleProductUse.name}
            />
            <div className="small-img-group">
              {singleProductUse.img.map((img, index) => (
                <div className="small-img-col" key={index}>
                  <img src={img} width="100%" className="small-img" />
                </div>
              ))}
            </div>
          </div>

          <div className="single-pro-details">
            <h6>Categoriya: {singleProductUse.category}</h6>
            <h6>Kampaniya Nomi: {singleProductUse.cname}</h6>
            <h4>Nomi: {singleProductUse.name}</h4>
            <h2>Narx: ${singleProductUse.price}</h2>
            <select>
              <option value="">Razmerlar:</option>
              {singleProductUse.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <h4>Tavar Haqda Malumot</h4>
            <span>{singleProductUse.des}</span>
          </div>
          <div className="button">
            <button className="delete">O'chrish</button>
            <Link to={`/ProductEdit/${productId}`}>O'zgartrish</Link>
          </div>
        </section>
      )}
    </>
  );
}

export default SingleProduct;
