import pro1 from "../../../img/f1.jpg";
import pro2 from "../../../img/f2.jpg";
import pro3 from "../../../img/f3.jpg";
import pro4 from "../../../img/f4.jpg";
import { TbStatusChange } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import "./productEdit.css";
import { ChangeEvent, useState } from "react";

interface ProductData {
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

const array: ProductData[] = [
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
];

function ProductEdit() {
  const [editedData, setEditedData] = useState<ProductData>(array[0]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "sizes") {
      const newSizes = value ? value.split(",") : [];
      setEditedData((prevData) => ({ ...prevData, [name]: newSizes }));
    } else {
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const [url, setUrl] = useState(array.map((item) => item.img[0]));
  const [isCheanging, setIsCheanging] = useState(false);
  const handleClick = (smallImgUrl: string) => {
    setUrl([smallImgUrl]);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <section id="productEdit">
      <h1>Tavarn O'zgartrish</h1>
      <div className="container">
        <div className="editImgContainer">
          <h2>Suratlarni Yangilash</h2>
          {array.map((item) => (
            <div className="single-pro-img" key={item.id}>
              {isCheanging ? (
                <div className="changeImg">
                  <input type="file" onChange={handleFileChange} />

                  {selectedFile && (
                    <div className="newImg">
                      <h2>Tanlangan Surat:</h2>
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                      />
                      <button
                        className="button"
                        onClick={() => setIsCheanging(false)}
                      >
                        Yuklash
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <img src={url[0]} width="100%" id="mainImg" alt="Main" />
                  <div className="icons">
                    <button>
                      <TbStatusChange onClick={() => setIsCheanging(true)} />
                    </button>
                    <button>
                      <AiOutlineDelete />
                    </button>
                  </div>
                </>
              )}

              <div className="small-img-group">
                {item.img.map((img, index) => (
                  <div
                    onClick={() => handleClick(img)}
                    className="small-img-col"
                    key={index}
                  >
                    <img src={img} width="100%" className="small-img" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="productEditText">
          <h2>Matnlari Yangilash</h2>

          <input
            type="text"
            name="cname"
            value={editedData.cname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={editedData.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="sizes"
            value={editedData.sizes}
            onChange={handleChange}
          />

          <select
            name="category"
            value={editedData.category}
            onChange={handleChange}
          >
            <option>{editedData.category}</option>
            <option>Erkaklar Koylag</option>
            <option>Nmadur narsa</option>
            <option>Kerkli narsa</option>
          </select>
          <textarea
            rows={5}
            name="des"
            value={editedData.des}
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={() => console.log(editedData)} className="button">
        Yuklash
      </button>
    </section>
  );
}

export default ProductEdit;
