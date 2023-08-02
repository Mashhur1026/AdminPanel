import { ChangeEvent, useState } from "react";
import "./addProduct.css";

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
    console.log("Selected files:", selectedFiles);
  };

  const latestSelectedFile =
    selectedFiles.length > 0 ? selectedFiles[selectedFiles.length - 1] : null;

  return (
    <section id="addProduct">
      <h1>Yangi Tavar Qo'shish</h1>
      <div className="container">
        <div className="addImgContainer">
          <h2>Suratlarni tanlang</h2>
          <input type="file" multiple onChange={handleFileChange} />
          <button onClick={handleUpload}>Rasmlarn yuklash</button>
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
          {[
            "Tavar kampaniyas",
            "Tavar ism",
            "Tavar narx",
            "Razmerlar vergul blan ajrating",
          ].map((placeholder, index) => (
            <input key={index} type="text" placeholder={placeholder} />
          ))}
          <select>
            <option value="">Categoriyalar</option>
            <option value="">Oyollar Koylaklar</option>
            <option value="">Erkaklar Koylaklar</option>
            <option value="">Krasofka</option>
            <option value="">Bujiteriya</option>
            <option value="">Sumka</option>
          </select>
          <textarea rows={5} placeholder="Tavar haqda malumot" />
        </div>
      </div>
      <button>Yuklash</button>
    </section>
  );
}

export default AddProduct;
