import { ChangeEvent, useState } from "react";
import "./addProduct.css";

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...Array.from(files),
      ]);
    }
  };

  const handleUpload = () => {
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setnewProduct((prevProduct) => ({
      ...prevProduct,
      img: [...prevProduct.img, ...imageUrls],
    }));
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setnewProduct(newProductProps[0]);
    setSelectedFiles([]);
    console.log(newProduct);
  };

  return (
    <section id="addProduct">
      <h1>Yangi Tavar Qo'shish</h1>
      <form onSubmit={handleSubmit}>
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

          <div className="addProductText">
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
              <option value="Oyollar Koylaklar">Oyollar Koylaklar</option>
              <option value="Erkaklar Koylaklar">Erkaklar Koylaklar</option>
              <option value="Krasofka">Krasofka</option>
              <option value="Bujiteriya">Bujiteriya</option>
              <option value="Sumka">Sumka</option>
            </select>
            <textarea
              onChange={handleChange}
              rows={5}
              name="des"
              placeholder="Tavar haqda malumot"
              required
            />
          </div>
        </div>
        <div id="btn">
          <button type="submit">Yuklash</button>
        </div>
      </form>
    </section>
  );
}

export default AddProduct;
