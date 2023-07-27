import "./products.css";
import pro1 from "../../../img/f1.jpg";
import pro2 from "../../../img/f2.jpg";
import pro3 from "../../../img/f3.jpg";
import pro4 from "../../../img/f4.jpg";
import pro5 from "../../../img/f5.jpg";
import { Link } from "react-router-dom";

export const array = [
  {
    id: 1,
    img: [pro1, pro2, pro3, pro4],
    category: "Oyoq kyimlar",
    cname: "zara",
    name: "Koylak",
    price: 29,
    quantity: 1,
    sizes: ["XL", "XX", "M", "L"],
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odio tenetur sequi culpa nulla, totam cumque corporis illo quasi, exercitationem quia sit fugit libero, laborum et explicabo facere laudantium dolor.",
  },
  {
    id: 2,
    img: [pro2, pro1, pro3, pro4],
    category: "Erkaklar Ko'ylaklar",
    cname: "zara",
    name: "Yupka",
    price: 39,
    quantity: 1,
    sizes: ["XL", "XX", "M", "L"],
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odio tenetur sequi culpa nulla, totam cumque corporis illo quasi, exercitationem quia sit fugit libero, laborum et explicabo facere laudantium dolor.",
  },
  {
    id: 3,
    img: [pro3, pro1, pro2, pro4],
    category: "Ayollar Ko'ylaklar",
    cname: "zara",
    name: "Koylak",
    price: 19,
    quantity: 1,
    sizes: ["XL", "XX", "M", "L"],
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odio tenetur sequi culpa nulla, totam cumque corporis illo quasi, exercitationem quia sit fugit libero, laborum et explicabo facere laudantium dolor.",
  },
  {
    id: 4,
    img: [pro4, pro1, pro2, pro3],
    category: "Sumkalar",
    cname: "zara",
    name: "Kiym",
    price: 69,
    quantity: 1,
    sizes: ["XL", "XX", "M", "L"],
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odio tenetur sequi culpa nulla, totam cumque corporis illo quasi, exercitationem quia sit fugit libero, laborum et explicabo facere laudantium dolor.",
  },
  {
    id: 5,
    img: [pro5, pro1, pro2, pro3, pro4],
    category: "Bijuteriyalar",
    cname: "zara",
    name: "Kofta",
    price: 59,
    quantity: 1,
    sizes: ["XL", "XX", "M", "L"],
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odio tenetur sequi culpa nulla, totam cumque corporis illo quasi, exercitationem quia sit fugit libero, laborum et explicabo facere laudantium dolor.",
  },
];

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
