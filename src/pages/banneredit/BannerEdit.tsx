import { ChangeEvent, useState } from "react";
import "./bannerEdit.css";

function BannerEdit() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
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
          <input type="text" placeholder="yangi kchik shior" />
          <input type="text" placeholder="yangi katta shior" />
          <input type="text" placeholder="yangi chegirma elonlar" />
        </div>
      </div>
      <button>Yuklash</button>
    </section>
  );
}

export default BannerEdit;
