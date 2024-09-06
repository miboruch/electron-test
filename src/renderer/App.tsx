import React, { useEffect, useState } from 'react';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function Hello() {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer.updateMessage((event, message: string) => {
      console.log(message);
    });
  }, []);

  const executeCsvCommand = async () => {
    if (file) await window.electron.ipcRenderer.csv(file.name, file.path);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  return (
    <div>
      <input type="file" accept="text/csv" onChange={handleFileChange} />
      <button type="button" onClick={executeCsvCommand} disabled={!file}>
        Execute command
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
