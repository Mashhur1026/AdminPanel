import { TbStatusChange } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { ChangeEvent, useState } from "react";
import { array } from "../../date";
import { useParams } from "react-router-dom";
import "./productEdit.css";

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

  const editingItem = array.filter((item) => item.id === productId);

  const [editedData, setEditedData] = useState<ProductData>(editingItem[0]);

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
    console.log(editingItem);
  };

  const [url, setUrl] = useState(editingItem.map((item) => item.img[0]));
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
                      onClick={() => setIsCheanging(false)}
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
                    <AiOutlineDelete />
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
      <button onClick={() => console.log(editedData)} className="button">
        Yuklash
      </button>
    </section>
  );
}

export default ProductEdit;
