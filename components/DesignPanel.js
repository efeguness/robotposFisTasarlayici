import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Home.module.css';
import DesignOptions from './DesignOptions';
import { generateCustomInfx, downloadXML } from './DesignGenerator';
import dynamic from 'next/dynamic';

const ReceiptViewer = dynamic(() => import('./ReceiptViewer'), { 
  ssr: false,
  loading: () => <div className={styles.loading}>Yükleniyor...</div>
});

const DesignPanel = () => {
  const [options, setOptions] = useState({});
  const [infxContent, setInfxContent] = useState('');
  const [scale, setScale] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // FİŞ TASARIMI OLUŞTURMA FONKSİYONU
  const generateReceipt = useCallback(() => {
    try {
      const infx = generateCustomInfx(options);
      setInfxContent(infx);
      return infx;
    } catch (error) {
      console.error('Fiş tasarımı oluşturma hatası:', error);
      alert('Fiş tasarımı oluşturulurken bir hata oluştu.');
      return null;
    }
  }, [options]);

  // OTOMATİK GÜNCELLE BUTONU KONTROLÜ
  useEffect(() => {
    if (Object.keys(options).length > 0 && autoUpdate) {
      generateReceipt();
    }
  }, [options, generateReceipt, autoUpdate]);

  // İNDİRME FONKSİYONU
  const handleDownloadXML = useCallback(() => {
    if (!infxContent) {
      alert('Önce bir fiş tasarımı oluşturun.');
      return;
    }
    
    downloadXML(infxContent, 'fisTasarimi.infx');
  }, [infxContent]);

  // YAZDIRMA FONKSİYONU
  const handlePrintReceipt = useCallback(() => {
    window.print();
  }, []);

  // YAKINLAŞTIRMA FONKSİYONU
  const handleScaleChange = useCallback((e) => {
    setScale(parseFloat(e.target.value));
  }, []);

  // OTOMATİK GÜNCELLEME FONKSYİONU
  const toggleAutoUpdate = useCallback(() => {
    setAutoUpdate(prev => !prev);
  }, []);

  return (
    <div className={styles.designContainer}>
      <div className={styles.designOptionsContainer}>
        <h3>Fiş Özelliklerini Seçin</h3>
        <DesignOptions onOptionsChange={setOptions} />
        
        <div className={styles.optionsSection + ' ' + styles.actions}>
          <div className={styles.autoUpdateContainer}>
            <label>
              <input 
                type="checkbox" 
                checked={autoUpdate} 
                onChange={toggleAutoUpdate}
              />
              Otomatik Güncelle
            </label>
          </div>
          <button 
            className={styles.primaryBtn}
            onClick={generateReceipt}
            disabled={autoUpdate}
          >
            {autoUpdate ? 'Otomatik Güncelleniyor' : 'Fiş Tasarımını Oluştur'}
          </button>
          <button 
            className={styles.secondaryBtn}
            onClick={handleDownloadXML}
            disabled={!infxContent}
          >
            INFX İndir
          </button>
        </div>
      </div>
      
      <div className={styles.previewContainer}>
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
        
        <div className={styles.receiptViewerContainer}>
          {isClient && (
            <ReceiptViewer fileContent={infxContent} scale={scale} />
          )}
          
          {!isClient && (
            <div className={styles.loading}>
              <p>Yükleniyor...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignPanel; 