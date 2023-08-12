import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./singleProduct.css";
import Notiflix from "notiflix";
import axios from "../../api/axios";

interface CartItem {
  _id: number;
  images: string[];
  category: string;
  name: string;
  price: number;
  size: string[];
  desc: string;
  company: string;
}

function SingleProduct() {
  const { id } = useParams();
  const productId = id;
  const [singleProductUse, setSingleProductUse] = useState<CartItem>();

  async function getProductData() {
    try {
      const response = await axios.get(`/single?singleId=${productId}`);
      setSingleProductUse(response.data);
      console.log(response.data);
      console.log(productId);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  const hendleRemove = async () => {
    try {
      await axios.delete(`/delete?deleteId=${productId}`);
      console.log(productId);
    } catch (err) {
      console.log(err);
    }
    Notiflix.Notify.success("Tavar O'chrild");
  };

  return (
    <>
      {singleProductUse ? (
        <section id="prodetails" key={singleProductUse._id}>
          <div className="single-pro-img">
            <img
              src={singleProductUse.images[0]}
              width="100%"
              id="mainImg"
              alt={singleProductUse.name}
            />
            <div className="small-img-group">
              {singleProductUse.images.map((img, index) => (
                <div className="small-img-col" key={index}>
                  <img src={img} width="100%" className="small-img" />
                </div>
              ))}
            </div>
          </div>

          <div className="single-pro-details">
            <h6>Categoriya: {singleProductUse.category}</h6>
            <h6>Kampaniya Nomi:{singleProductUse.company}</h6>
            <h4>Nomi: {singleProductUse.name}</h4>
            <h2>Narx: {singleProductUse.price} UZS</h2>
            <select>
              <option value="">Razmerlar:</option>
              {singleProductUse.size.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <h4>Tavar Haqda Malumot</h4>
            <span>{singleProductUse.desc}</span>
          </div>
          <div className="button">
            <button className="delete" onClick={hendleRemove}>
              O'chrish
            </button>
            <Link to={`/ProductEdit/${productId}`}>O'zgartrish</Link>
          </div>
        </section>
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
    </>
  );
}

export default SingleProduct;
