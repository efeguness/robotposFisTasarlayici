import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const DesignOptions = ({ onOptionsChange }) => {
  const [options, setOptions] = useState({
    // FİŞ BAŞLIĞI
    'restaurant-name': { checked: true, value: 'ISTANBUL RESTORAN' },
    'branch-name': { checked: false, value: 'Kadıköy Şube' },
    'tax-number': { checked: false, value: 'VKN: 1234567890' },

    // MÜŞTERİ BİLGİLERİ
    'customer-name': { checked: false, value: '' },
    'customer-address': { checked: false, value: '' },
    'customer-phone': { checked: false, value: '' },

    // MASA & PERSONEL
    'table-info': { checked: true, value: '' },
    'table-group': { checked: false, value: '' },
    'employee-name': { checked: true, value: '' },
    'terminal-id': { checked: false, value: '' },

    // SİPARİŞ BİLGİLERİ
    'order-datetime': { checked: true, value: new Date().toISOString().split('T')[0] },
    'order-time': { checked: true, value: new Date().toTimeString().slice(0, 5) },
    'order-id': { checked: true, value: Math.floor(Math.random() * 10000).toString() }, // Sipariş No
    'receipt-no': { checked: true, value: Math.floor(Math.random() * 10000).toString() }, // Fiş No

    // ÜRÜN BİLGİLERİ
    'product-list': { checked: true, value: 'quantity-product-price' },

    // ÖDEME BİLGİLERİ
    'total-price': { checked: true, value: '' },
    'discount': { checked: false, value: '' },
    'paid-amount': { checked: false, value: '' },
    'payment-balance': { checked: false, value: '' },
    'payment-method': { checked: false, value: '' },

    // FOOTER BİLGİLERİ
    'thank-you': { checked: true, value: 'TEŞEKKÜR EDERİZ' },
    'not-fiscal': { checked: false, value: '(MALİ DEĞERİ YOKTUR)' },
    'sys-info': { checked: true, value: 'Robotpos fisTasarim ver. 2025' },

    // GARSONİYE
    'waiter-tip': { checked: false, value: '' },
    'waiter-tip-percentage': { checked: false, value: '10' }
  });

  // SEÇENEK KONTROLÜ
  useEffect(() => {
    onOptionsChange(options);
  }, [options, onOptionsChange]);

  const handleCheckboxChange = (featureName) => {
    setOptions({
      ...options,
      [featureName]: {
        ...options[featureName],
        checked: !options[featureName].checked
      }
    });
  };

  const handleValueChange = (featureName, value) => {
    setOptions({
      ...options,
      [featureName]: {
        ...options[featureName],
        value: value
      }
    });
  };

  return (
    <div className={styles.designOptions}>
      {/* Fiş Başlığı */}
      <div className={styles.optionsSection}>
        <h4>Fiş Başlığı</h4>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['restaurant-name'].checked}
              onChange={() => handleCheckboxChange('restaurant-name')}
            /> 
            Restoran Adı
          </label>
          <input 
            type="text" 
            value={options['restaurant-name'].value}
            onChange={(e) => handleValueChange('restaurant-name', e.target.value)}
            disabled={!options['restaurant-name'].checked}
            placeholder="Restoran adı"
          />
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['branch-name'].checked}
              onChange={() => handleCheckboxChange('branch-name')}
            /> 
            Şube Bilgisi
          </label>
          <input 
            type="text" 
            value={options['branch-name'].value}
            onChange={(e) => handleValueChange('branch-name', e.target.value)}
            disabled={!options['branch-name'].checked}
            placeholder="Şube adı"
          />
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['tax-number'].checked}
              onChange={() => handleCheckboxChange('tax-number')}
            /> 
            Vergi Numarası
          </label>
          <input 
            type="text" 
            value={options['tax-number'].value}
            onChange={(e) => handleValueChange('tax-number', e.target.value)}
            disabled={!options['tax-number'].checked}
            placeholder="Vergi no"
          />
        </div>
      </div>
      
      {/* Müşteri Bilgileri */}
      <div className={styles.optionsSection}>
        <h4>Müşteri Bilgileri</h4>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['customer-name'].checked}
              onChange={() => handleCheckboxChange('customer-name')}
            /> 
            Müşteri Adı
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['customer-address'].checked}
              onChange={() => handleCheckboxChange('customer-address')}
            /> 
            Müşteri Adresi
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['customer-phone'].checked}
              onChange={() => handleCheckboxChange('customer-phone')}
            /> 
            Müşteri Telefonu
          </label>
        </div>
      </div>
      
      {/* Masa ve Personel */}
      <div className={styles.optionsSection}>
        <h4>Masa ve Personel Bilgileri</h4>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['table-info'].checked}
              onChange={() => handleCheckboxChange('table-info')}
            /> 
            Masa Numarası
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['table-group'].checked}
              onChange={() => handleCheckboxChange('table-group')}
            /> 
            Masa Grubu/Bölümü
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['employee-name'].checked}
              onChange={() => handleCheckboxChange('employee-name')}
            /> 
            Personel Adı
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['terminal-id'].checked}
              onChange={() => handleCheckboxChange('terminal-id')}
            /> 
            Terminal/Kasa Numarası
          </label>
        </div>
      </div>
      
      {/* Sipariş Bilgileri */}
      <div className={styles.optionsSection}>
        <h4>Sipariş Bilgileri</h4>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['order-datetime'].checked}
              onChange={() => handleCheckboxChange('order-datetime')}
            /> 
            Sipariş Tarihi
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['order-id'].checked}
              onChange={() => handleCheckboxChange('order-id')}
            /> 
            Sipariş No
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['receipt-no'].checked}
              onChange={() => handleCheckboxChange('receipt-no')}
            /> 
            Fiş No
          </label>
        </div>
      </div>
      
      {/* Ürün Bilgileri */}
      <div className={styles.optionsSection}>
        <h4>Ürün Bilgileri</h4>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['product-list'].checked}
              onChange={() => handleCheckboxChange('product-list')}
            /> 
            Ürün Listesi
          </label>
          <select 
            value={options['product-list'].value}
            onChange={(e) => handleValueChange('product-list', e.target.value)}
            disabled={!options['product-list'].checked}
          >
            <option value="quantity-product-price">Miktar, Ürün, Fiyat</option>
            <option value="quantity-product">Sadece Miktar ve Ürün</option>
            <option value="product-price">Sadece Ürün ve Fiyat</option>
          </select>
        </div>
      </div>
      
      {/* Ödeme Bilgileri */}
      <div className={styles.optionsSection}>
        <h4>Ödeme Bilgileri</h4>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['total-price'].checked}
              onChange={() => handleCheckboxChange('total-price')}
            /> 
            Toplam Tutar
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['discount'].checked}
              onChange={() => handleCheckboxChange('discount')}
            /> 
            İndirim
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['paid-amount'].checked}
              onChange={() => handleCheckboxChange('paid-amount')}
            /> 
            Ödenen Tutar
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['payment-balance'].checked}
              onChange={() => handleCheckboxChange('payment-balance')}
            /> 
            Kalan Tutar
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['payment-method'].checked}
              onChange={() => handleCheckboxChange('payment-method')}
            /> 
            Ödeme Yöntemi
          </label>
        </div>
      </div>
      
      {/* Fiş Alt Bilgisi */}
      <div className={styles.optionsSection}>
        <h4>Fiş Alt Bilgisi</h4>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['thank-you'].checked}
              onChange={() => handleCheckboxChange('thank-you')}
            /> 
            Teşekkür Mesajı
          </label>
          <input 
            type="text" 
            value={options['thank-you'].value}
            onChange={(e) => handleValueChange('thank-you', e.target.value)}
            disabled={!options['thank-you'].checked}
            placeholder="Teşekkür mesajı"
          />
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['not-fiscal'].checked}
              onChange={() => handleCheckboxChange('not-fiscal')}
            /> 
            Mali Değer İbaresi
          </label>
          <input 
            type="text" 
            value={options['not-fiscal'].value}
            onChange={(e) => handleValueChange('not-fiscal', e.target.value)}
            disabled={!options['not-fiscal'].checked}
            placeholder="Mali değer ibaresi"
          />
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['sys-info'].checked}
              onChange={() => handleCheckboxChange('sys-info')}
            /> 
            Sistem Bilgisi
          </label>
          <input 
            type="text" 
            value={options['sys-info'].value}
            onChange={(e) => handleValueChange('sys-info', e.target.value)}
            disabled={!options['sys-info'].checked}
            placeholder="Sistem bilgisi"
          />
        </div>
      </div>
      
      {/* Garsoniye Seçenekleri */}
      <div className={styles.optionsSection}>
        <h4>Garsoniye Seçenekleri</h4>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['waiter-tip'].checked}
              onChange={() => handleCheckboxChange('waiter-tip')}
            /> 
            Garsoniye/Bahşiş
          </label>
        </div>
        <div className={styles.optionGroup}>
          <label>
            <input 
              type="checkbox" 
              checked={options['waiter-tip-percentage'].checked}
              onChange={() => handleCheckboxChange('waiter-tip-percentage')}
            /> 
            Garsoniye Yüzde Oranı
          </label>
          <input 
            type="number" 
            value={options['waiter-tip-percentage'].value}
            onChange={(e) => handleValueChange('waiter-tip-percentage', e.target.value)}
            disabled={!options['waiter-tip-percentage'].checked}
            min="1"
            max="25"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignOptions; 