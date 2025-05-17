import { useState } from 'react';
import styles from '../styles/Home.module.css';

const FileUploader = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  // UPLOAD FONKSİYONU
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.infx')) {
      readFileContent(file);
    } else {
      alert('Lütfen geçerli bir .infx dosyası seçin');
    }
  };

  // INFX READER FONKSİYONU
  const readFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileUpload(content);
    };
    reader.onerror = () => {
      alert('Dosya okunamadı');
    };
    reader.readAsText(file);
  };

  // SÜRÜKLE BIRAK FONKSİYONU
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.infx')) {
        readFileContent(file);
      } else {
        alert('Lütfen geçerli bir .infx dosyası seçin');
      }
    }
  };

  return (
    <div 
      className={`${styles.fileUpload} ${dragActive ? styles.dragActive : ''}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        id="file-input" 
        accept=".infx" 
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">INFX Dosyası Seçin</label>
      <p className={styles.uploadInfo}>
        Tasarımını görmek istediğiniz .infx uzantılı dosyayı seçin veya buraya sürükleyip bırakın
      </p>
    </div>
  );
};

export default FileUploader; 