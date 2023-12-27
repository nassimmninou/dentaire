import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DocumentUpload = ({ onUpload, pwList }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPwId, setSelectedPwId] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePwChange = (e) => {
    setSelectedPwId(e.target.value);
  };

  const handleUpload = () => {
    if (!selectedPwId || !selectedFile) {
      console.error("Veuillez sélectionner un PW et un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    fetch(`http://localhost:8080/api/v1/pws/${selectedPwId}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then(() => {
        console.log("Document uploadé avec succès");
        onUpload(); // Trigger the parent component's fetchPws function
      })
      .catch((error) => {
        console.error("Erreur lors de l'upload du document", error);
      });
  };

  return (
    <div>
      <select
        value={selectedPwId}
        onChange={handlePwChange}
        className="flex text-gray-700 outline-none border-indigo-300 border py-3 pl-4 rounded-xl focus:ring-1 w-full m-3"
      >
        <option className="text-gray-700" value="" disabled>
          Sélectionner un PW
        </option>
        {pwList.map((pw) => (
          <option key={pw.id} value={pw.id}>
            {pw.title}
          </option>
        ))}
      </select>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf, .doc, .docx"
        className="border rounded-xl text-lg p-5 text-gray-700 rounded-xl w-full bg-white bg-opacity-70"
      />
      
      <div className="flex items-center justify-center mt-4 mb-4">
        <button
          onClick={handleUpload}
          className="py-2 px-8 rounded-xl text-white bg-indigo-500 hover:bg-indigo-600"
        >
          <FontAwesomeIcon icon={faPlus} beat className="mr-4" />
          <p className="text-lg font-semibold">banan</p>
        </button>
      </div>
      chabab
    </div>
  );
};

export default DocumentUpload;
