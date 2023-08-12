import { TbStatusChange } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productEdit.css";
import Notiflix from "notiflix";
import axios from "../../api/axios";

interface ProductData {
  _id: number;
  images: string[];
  category: string;
  name: string;
  price: number;
  size: string[];
  desc: string;
  company: string;
}

function ProductEdit() {
  const { id } = useParams();
  const productId = id;
  const [editedData, setEditedData] = useState<ProductData>({
    _id: 0,
    images: [],
    category: "",
    name: "",
    price: 0,
    size: [],
    desc: "",
    company: "",
  });
  const [url, setUrl] = useState([editedData.images[0]]);
  const [isCheanging, setIsCheanging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [postImages, setPostImages] = useState<string[]>([]);

  async function getProductData() {
    try {
      const response = await axios.get(`/single?singleId=${productId}`);
      setUrl([response.data.images[0]]);
      setPostImages(response.data.images);
      setEditedData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "sizes") {
      const newSizes = value ? value.split(",") : [];
      setEditedData((prevData) => ({ ...prevData, size: newSizes }));
    } else if (name === "price") {
      setEditedData((prevData) => ({
        ...prevData,
        price: parseFloat(value),
      }));
    } else {
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleClick = (smallImgUrl: string) => {
    setUrl([smallImgUrl]);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile((prevSelectedFiles) => [...prevSelectedFiles, file]);
      setEditedData((prevData) => ({
        ...prevData,
        images: [URL.createObjectURL(file), ...prevData.images],
      }));
      setUrl([URL.createObjectURL(file)]);
    }
  };

  const hendleClick = () => {
    setIsCheanging(false);
    Notiflix.Notify.success("Rasm o'zgartrldi");
  };

  const deleteImg = (id: string) => {
    const removerImgs = editedData.images.filter((item) => item !== id);
    editedData.images = removerImgs;
    setPostImages(removerImgs);
    setUrl(editedData.images);
  };

  const PostProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("category", editedData.category);
      formData.append("price", String(editedData.price));
      formData.append("desc", editedData.desc);
      formData.append("company", editedData.category);

      const sizes = editedData.size;
      sizes.forEach((size) => {
        formData.append("size[]", size);
      });

      selectedFile.forEach((file) => {
        formData.append("images", file);
      });

      postImages.forEach((img) => {
        formData.append("imageUrls[]", img);
      });

      await axios.put(`/edit?id=${productId}`, formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="productEdit">
      <h1>Tavarn O'zgartrish</h1>
      <div className="container">
        <div className="editImgContainer">
          <h2>Suratlarni Yangilash</h2>
          <div className="single-pro-img" key={editedData._id}>
            {isCheanging ? (
              <div className="changeImg">
                <input type="file" onChange={handleFileChange} />
                <div className="single-pro-img">
                  {selectedFile.map((img) => (
                    <>
                      <h2>Tanlangan Surat</h2>
                      <img
                        width="100%"
                        id="mainImg"
                        src={URL.createObjectURL(img)}
                      />
                    </>
                  ))}

                  <button className="button" onClick={hendleClick}>
                    Yuklash
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img src={url[0]} width="100%" id="mainImg" alt="Main" />
                <div className="icons">
                  <button>
                    <TbStatusChange onClick={() => setIsCheanging(true)} />
                  </button>
                  <button>
                    <AiOutlineDelete onClick={() => deleteImg(url[0])} />
                  </button>
                </div>
              </>
            )}

            <div className="small-img-group">
              {editedData.images.map((img, index) => (
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
        </div>
        <div className="productEditText">
          <h2>Matnlari Yangilash</h2>

          <input
            type="text"
            name="company"
            value={editedData.company}
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
            value={editedData.size.join(",")}
            onChange={handleChange}
          />

          <select
            name="category"
            value={editedData.category}
            onChange={handleChange}
          >
            <option value={editedData.category}>{editedData.category}</option>
            <option value="Oyollar Ko'ylaklari">Oyollar Ko'ylaklari</option>
            <option value="Erkaklar Ko'ylaklari">Erkaklar Ko'ylaklari</option>
            <option value="Oyoq Kiyimlar">Oyoq Kiyimlar</option>
            <option value="Bujiteriyalar">Bujiteriyalar</option>
            <option value="Sumkalar">Sumkalar</option>
          </select>
          <textarea
            rows={5}
            name="desc"
            value={editedData.desc}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        onClick={async () => {
          await PostProduct();
          console.log("date", editedData);
          console.log("img", postImages);
          Notiflix.Notify.success("Mahsulot o'zgartirildi");
        }}
        className="button"
      >
        Yuklash
      </button>
    </section>
  );
}

export default ProductEdit;
