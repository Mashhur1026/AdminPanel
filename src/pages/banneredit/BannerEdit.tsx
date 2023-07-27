import { ChangeEvent, useState } from "react";
import "./bannerEdit.css";

interface Prop {
  setBanner: (value: boolean) => void;
}

function BannerEdit({ setBanner }: Prop) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    console.log("Selected file:", selectedFile);
  };
  return (
    <section id="bannerEdit">
      <div className="container">
        <div className="imgContainer">
          <h1>Yangi Suratn tanlang</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Rasmn yuklash</button>
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
      <button onClick={() => setBanner(true)}>Yuklash</button>
    </section>
  );
}

export default BannerEdit;
