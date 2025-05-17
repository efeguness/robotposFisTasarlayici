import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

let generateReceipt;

const ReceiptViewer = ({ fileContent, scale: externalScale }) => {
  const [receipt, setReceipt] = useState(null);
  const [scale, setScale] = useState(externalScale || 1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadUtils = async () => {
      const utils = await import('./ReceiptUtils');
      generateReceipt = utils.generateReceipt;
      setIsLoaded(true);
    };
    
    loadUtils();
  }, []);

  useEffect(() => {
    if (externalScale) {
      setScale(externalScale);
    }
  }, [externalScale]);

  useEffect(() => {
    if (fileContent && isLoaded) {
      processInfxFile(fileContent);
    }
  }, [fileContent, isLoaded]);

  const processInfxFile = (infxText) => {
    try {
      if (typeof window !== 'undefined') {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(infxText, "text/xml");
        
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          throw new Error("XML ayrıştırma hatası: Geçersiz XML formatı");
        }
        
        const infReport = xmlDoc.getElementsByTagName("infReport")[0];
        if (!infReport) {
          throw new Error("Geçersiz INFX dosyası: infReport etiketi bulunamadı");
        }
        
        const columnCount = infReport.getAttribute("columncount") || 40;
        
        const receiptContent = generateReceipt(xmlDoc, columnCount);
        setReceipt(receiptContent);
        setErrorMessage('');
      }
    } catch (error) {
      console.error("INFX işleme hatası:", error);
      setErrorMessage(`Hata: ${error.message}`);
      setReceipt("Fiş içeriği oluşturulamadı. Hatalı format.");
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };
  
  if (!isLoaded) {
    return <div>Yükleniyor...</div>;
  }

  const showToolbar = !externalScale;
  const showXmlPreview = fileContent && fileContent.length > 0;

  return (
    <div className={styles.previewContainer}>
      {showToolbar && (
        <div className={styles.toolbar}>
          <button onClick={handlePrintReceipt}>Yazdır</button>
          <select 
            value={scale}
            onChange={handleScaleChange}
          >
            <option value="1">%100</option>
            <option value="1.25">%125</option>
            <option value="1.5">%150</option>
            <option value="2">%200</option>
          </select>
        </div>
      )}
      
      {errorMessage && (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
      
      <div className={styles.receiptPreview}>
        <div 
          className={styles.thermalReceipt}
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'top center'
          }}
        >
          {receipt ? (
            <pre style={{ color: '#000', margin: 0 }}>{receipt}</pre>
          ) : (
            <p style={{ color: '#555' }}>Fiş içeriği burada görüntülenecek...</p>
          )}
        </div>
      </div>
      
      {showXmlPreview && (
        <div className={styles.xmlPreview}>
          <h3>XML İçeriği</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default ReceiptViewer; 