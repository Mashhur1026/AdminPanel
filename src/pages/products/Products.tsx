import { array } from "../../date";
import "./products.css";
import { Link } from "react-router-dom";

function Products() {
  return (
    <section id="product1">
      <h2>Mahsulotlar</h2>
      <div className="pro-container">
        {array.map((item) => (
          <div key={item.id} className="pro">
            <Link className="underline" to={`/product/${item.id}`}>
              <img src={item.img[0]} alt="prodact" />
              <div className="des">
                <span>{item.cname}</span>
                <h5>{item.name}</h5>
                <h4>${item.price}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
