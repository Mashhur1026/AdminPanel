import { TbStatusChange } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productEdit.css";
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

function ProductEdit() {
  const { id } = useParams();
  const productId = id ? parseInt(id, 10) : null;
  const [editedData, setEditedData] = useState<ProductData>({
    id: 0,
    img: [],
    category: "",
    cname: "",
    name: "",
    price: 0,
    sizes: [],
    des: "",
  });

  async function getProductData() {
    try {
      const response = await axios.get(`/single?singleId=${productId}`);
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
      setEditedData((prevData) => ({ ...prevData, [name]: newSizes }));
    } else {
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const [url, setUrl] = useState([editedData.img[0]]);
  const [isCheanging, setIsCheanging] = useState(false);

  const handleClick = (smallImgUrl: string) => {
    setUrl([smallImgUrl]);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    if (file) {
      setEditedData((prevData) => {
        const filteredImages = prevData.img.filter((img) => img !== url[0]);
        return {
          ...prevData,
          img: [URL.createObjectURL(file), ...filteredImages],
        };
      });
      setUrl([URL.createObjectURL(file)]);
    }
  };

  const hendleClick = () => {
    setIsCheanging(false);
    Notiflix.Notify.success("Rasm o'zgartrldi");
    setSelectedFile(null);
  };

  const deleteImg = (id: string) => {
    const removerImgs = editedData.img.filter((item) => item !== id);
    editedData.img = removerImgs;
    setUrl(editedData.img);
  };

  const PostProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("category", editedData.category);
      formData.append("price", String(editedData.price));
      formData.append("desc", editedData.des);

      // Make sure size is an array in your code
      const sizes = editedData.sizes;
      sizes.forEach((size) => {
        formData.append("size[]", size);
      });

      // Make sure size is an array in your code
      const images = editedData.img;
      images.forEach((image) => {
        formData.append("images", image);
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
          <div className="single-pro-img" key={editedData.id}>
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
                      onClick={hendleClick}
                      disabled={!selectedFile}
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
                    <AiOutlineDelete onClick={() => deleteImg(url[0])} />
                  </button>
                </div>
              </>
            )}

            <div className="small-img-group">
              {editedData.img.map((img, index) => (
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
      <button
        onClick={() => {
          console.log(editedData);
          PostProduct();
          Notiflix.Notify.success("Mahsulot o'zgartrldi");
        }}
        className="button"
      >
        Yuklash
      </button>
    </section>
  );
}

export default ProductEdit;
