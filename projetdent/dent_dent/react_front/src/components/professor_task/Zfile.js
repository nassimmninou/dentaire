import React, { useState, useEffect } from "react";
import DocumentUpload from "./ZDocumentUpload";

const App = () => {
  const [pwList, setPwList] = useState([]);
  const [newPw, setNewPw] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPws = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/pws");
      const data = await response.json();
      setPwList(data);
    } catch (error) {
      console.error("Error fetching PWs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPws();
  }, []);

  const handleUpload = () => {
    fetchPws();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNewPwChange = (e) => {
    setNewPw({
      ...newPw,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPw = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/pws", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPw),
      });
      const data = await response.json();
      console.log("Nouveau PW ajouté avec succès", data);
      setNewPw({});
      fetchPws();
    } catch (error) {
      console.error("Error adding PW:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!loading ? (
        <div>
          <DocumentUpload onUpload={handleUpload} pwList={pwList} />
        </div>
      ) : (
        <p>Loading PWs...</p>
      )}
    </div>
  );
};

export default App;
