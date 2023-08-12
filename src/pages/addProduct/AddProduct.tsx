import { ChangeEvent, useState } from "react";
import "./addProduct.css";
import Notiflix from "notiflix";
import axios from "../../api/axios";

interface ProductData {
  id: number;
  img: string[];
  category: string;
  cname: string;
  name: string;
  price: number;
  sizes: string[];
  des: string;
}

const newProductProps = [
  {
    id: 0,
    img: [],
    category: "",
    cname: "",
    name: "",
    price: 0,
    sizes: [],
    des: "",
  },
];

function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [diable, setDisable] = useState(true);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.[0];
    if (files) {
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, files]);
    }
  };

  const handleUpload = () => {
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setnewProduct((prevProduct) => ({
      ...prevProduct,
      img: [...prevProduct.img, ...imageUrls],
    }));
    setDisable(false);
    Notiflix.Notify.success("Rasmlar yuklandi");
  };

  const latestSelectedFile =
    selectedFiles.length > 0 ? selectedFiles[selectedFiles.length - 1] : null;

  const [newProduct, setnewProduct] = useState<ProductData>(newProductProps[0]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "sizes") {
      const newSizes = value ? value.split(",") : [];
      setnewProduct((prevData) => ({ ...prevData, [name]: newSizes }));
    } else {
      setnewProduct((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const PostProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("price", String(newProduct.price));
      formData.append("desc", newProduct.des);
      formData.append("company", newProduct.cname);

      const sizes = newProduct.sizes;
      sizes.forEach((size) => {
        formData.append("size[]", size);
      });

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post("/upload", formData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await PostProduct();
      Notiflix.Notify.success("Mahsulot Yuklandi");
      setSelectedFiles([]);
      setnewProduct(newProductProps[0]);
    } catch (err) {
      console.log(err);
      Notiflix.Notify.failure("Xatolik yuz berdi");
    }
  };

  return (
    <section id="addProduct">
      <h1>Yangi Tavar Qo'shish</h1>

      <div className="container">
        <div className="addImgContainer">
          <h2>Suratlarni tanlang</h2>
          <input type="file" multiple onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            style={{ display: selectedFiles.length === 0 ? "none" : "block" }}
          >
            Rasmlarn yuklash
          </button>
          {latestSelectedFile && (
            <div className="single-pro-img">
              <img
                src={URL.createObjectURL(latestSelectedFile)}
                width="100%"
                id="mainImg"
                alt="Main"
              />
              {selectedFiles.length > 1 && (
                <div className="small-img-group">
                  {selectedFiles
                    .slice(0, selectedFiles.length - 1)
                    .map((file, index) => (
                      <div className="small-img-col" key={index}>
                        <img
                          src={URL.createObjectURL(file)}
                          width="100%"
                          className="small-img"
                          alt={`Small ${index + 1}`}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="addProductText">
          <h2>Mantlarni krting</h2>

          <input
            type="text"
            onChange={handleChange}
            name="cname"
            placeholder="Ko'mpaniya"
            required
          />
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Tavar nomi"
            required
          />
          <input
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="Narxi"
            required
          />
          <input
            type="text"
            name="sizes"
            onChange={handleChange}
            placeholder="Razmerlar vergul ( ,) blan ajrating "
            required
          />

          <select name="category" onChange={handleChange} required>
            <option value="">Categoriyalar</option>
            <option value="Oyollar Ko'ylaklari">Oyollar Ko'ylaklari</option>
            <option value="Erkaklar Ko'ylaklari">Erkaklar Ko'ylaklari</option>
            <option value="Oyoq Kiyimlar">Oyoq Kiyimlar</option>
            <option value="Bujiteriyalar">Bujiteriyalar</option>
            <option value="Sumkalar">Sumkalar</option>
          </select>
          <textarea
            onChange={handleChange}
            rows={5}
            name="des"
            placeholder="Tavar haqda malumot"
            required
          />

          <button type="submit" disabled={diable}>
            Yuklash
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddProduct;
