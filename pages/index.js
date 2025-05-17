import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';

let FileUploader = null;
let ReceiptViewer = null;
let DesignPanel = null;

export default function Home() {
  const [activeTab, setActiveTab] = useState('upload-tab');
  const [fileContent, setFileContent] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const loadComponents = async () => {
      FileUploader = (await import('../components/FileUploader')).default;
      ReceiptViewer = (await import('../components/ReceiptViewer')).default;
      DesignPanel = (await import('../components/DesignPanel')).default;
      setIsClient(true);
    };
    
    loadComponents();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFileUpload = (content) => {
    setFileContent(content);
  };

  return (
    <>
      {/* RobotPOS Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Image 
            src="/robotpos-logo.svg" 
            alt="Robotpos Logo" 
            width={160} 
            height={53} 
          />
        </div>
        <ul className="navbar-menu">
          <li><a href="#">Ürünler</a></li>
          <li><a href="#">Referanslar</a></li>
          <li><a href="#">Müşteri Görüşleri</a></li>
          <li><a href="#">Haberler</a></li>
          <li><a href="#">SSS</a></li>
          <li><a href="#">Kurumsal</a></li>
          <li><a href="#">İletişim</a></li>
        </ul>
        <a href="#" className="cta-button">Sizi Arayalım</a>
      </nav>

      <div className={styles.container}>
        <Head>
          <title>Robotpos Fiş Tasarlayıcı</title>
          <meta name="description" content="INFX formatındaki fiş tasarımlarınızın önizlemesi" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>

        <header className={styles.header}>
          <h1>Robotpos Fiş Tasarlayıcı</h1>
          <p>INFX formatındaki fiş tasarımlarınızın yazıcıdan çıktıktan sonra nasıl görüneceğini görebilirsiniz.</p>
        </header>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'upload-tab' ? styles.active : ''}`}
            onClick={() => handleTabChange('upload-tab')}
          >
            Fiş Önizleme
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'design-tab' ? styles.active : ''}`}
            onClick={() => handleTabChange('design-tab')}
          >
            Kendi Fişini Tasarla
          </button>
        </div>

        {activeTab === 'upload-tab' && (
          <div className={styles.uploadTab}>
            <div className={styles.uploadSection}>
              {isClient && FileUploader && <FileUploader onFileUpload={handleFileUpload} />}
            </div>

            {isClient && ReceiptViewer && <ReceiptViewer fileContent={fileContent} />}
            
            {!isClient && (
              <div className={styles.loading}>
                <p>Bileşenler yükleniyor...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'design-tab' && (
          <div className={styles.designTab}>
            {isClient && DesignPanel ? (
              <DesignPanel />
            ) : (
              <div className={styles.loading}>
                <p>Bileşenler yükleniyor...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-col brand-col">
              <h3>robotPOS</h3>
              <p>robotPOS, café, restoran işletmelerine yönelik yenilikçi yazılım ve donanım çözümleri sunan öncü bir POS ve işletme yönetim sistemidir.</p>
              
              <div className="contact-info">
                <div className="contact-item">
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </span>
                  <a href="mailto:info@robotPOS.com">info@robotPOS.com</a>
                </div>
                <div className="contact-item">
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </span>
                  <a href="tel:08508110456">0850 811 0 456</a>
                </div>
                <div className="contact-item">
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                  <span>Adres: Aydinevler Mah. Durak Sokak No:19 Maltepe/İstanbul</span>
                </div>
              </div>
            </div>
            
            <div className="footer-col">
              <h4>Ürünler</h4>
              <ul className="footer-links">
                <li><a href="#">Satış Noktası (POS)</a></li>
                <li><a href="#">Stok Maliyet Yönetimi</a></li>
                <li><a href="#">Sadakat ve Kazanç Arttırıcı Çözümler</a></li>
                <li><a href="#">İş Verimliliği</a></li>
                <li><a href="#">Zincir Mağaza Yönetimi</a></li>
                <li><a href="#">Entegrasyonlar</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Kurumsal</h4>
              <ul className="footer-links">
                <li><a href="#">Hakkımızda</a></li>
                <li><a href="#">Referanslarımız</a></li>
                <li><a href="#">Müşteri Görüşleri</a></li>
                <li><a href="#">Haberler</a></li>
                <li><a href="#">Kariyer</a></li>
                <li><a href="#">Çözüm Ortaklığı Başvuru</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Destek</h4>
              <ul className="footer-links">
                <li><a href="#">SSS</a></li>
                <li><a href="#">İletişim</a></li>
                <li><a href="#">QR Menü Sipariş</a></li>
                <li><a href="#">Gizlilik Politikası</a></li>
                <li><a href="#">Aydınlatma Metni</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="copyright">
              <p>2025 robotPOS. Tüm hakları saklıdır.</p>
            </div>
            
            <div className="footer-tags">
              <span className="tag">Restoran Programı</span>
              <span className="tag">Adisyon Programı</span>
              <span className="tag">POS Sistemi</span>
              <span className="tag">Restoran Otomasyon</span>
              <span className="tag">Yazarkasa Entegrasyonu</span>
            </div>
            
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.977.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.88-.344 1.857-.047 1.053-.059 1.37-.059 4.04 0 2.67.01 2.988.059 4.04.045.977.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.88.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.977-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.88.344-1.857.047-1.053.059-1.37.059-4.04 0-2.67-.01-2.987-.059-4.04-.045-.977-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.88-.3-1.857-.344-1.053-.047-1.37-.059-4.04-.059zm0 3.063A5.135 5.135 0 1117.135 12 5.135 5.135 0 0112 6.865zm0 8.468A3.333 3.333 0 1115.333 12 3.333 3.333 0 0112 15.333zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.5v-7H9v7zM7.75 9a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM18 17h-2.5v-4c0-1.5-1-2-1.5-2s-1.5.5-1.5 2v4h-2.5v-7h2.5v1.5s.75-1.5 2.5-1.5 3 1 3 3.5v3.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 