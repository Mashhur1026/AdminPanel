import { ChangeEvent, useState } from "react";
import "./bannerEdit.css";

interface ProductData {
  id: number;
  img: string;
  textOne: string;
  textTwo: string;
  textThree: string;
}

const banner = {
  id: 0,
  img: "",
  textOne: "",
  textTwo: "",
  textThree: "",
};

function BannerEdit() {
  const [editedData, setEditedData] = useState<ProductData>(banner);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    if (editedData) {
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    if (file) {
      setEditedData((prevData) => ({
        ...prevData,
        img: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <section id="bannerEdit">
      <h1 className="bannerText">Bannerni O'zgartrish</h1>
      <div className="container">
        <div className="imgContainer">
          <h1>Yangi Suratn tanlang</h1>
          <input type="file" onChange={handleFileChange} />
          {selectedFile && (
            <div>
              <h2>Tanlangan Surat:</h2>
              <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
            </div>
          )}
        </div>
        <div className="bannerEditText">
          <h1>Yangi mantlarn krting</h1>
          <input
            type="text"
            placeholder="yangi kchik shior"
            name="textOne"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="yangi katta shior"
            name="textTwo"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="yangi chegirma elonlar"
            name="textThree"
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={() => console.log(editedData)}>Yuklash</button>
    </section>
  );
}

export default BannerEdit;
