export const formatDate = (date, format) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return '';
  
  return format
    .replace(/\{0:([^}]+)\}/, (match, dateFormat) => {
      return dateFormat
        .replace('dd', String(d.getDate()).padStart(2, '0'))
        .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
        .replace('yyyy', d.getFullYear())
        .replace('HH', String(d.getHours()).padStart(2, '0'))
        .replace('mm', String(d.getMinutes()).padStart(2, '0'))
        .replace('ss', String(d.getSeconds()).padStart(2, '0'));
    })
    .replace(/\{0\}/, d.toLocaleString());
};

// FİŞ İÇERİĞİ
export const generateReceipt = (xmlDoc, columnCount) => {
  if (!xmlDoc) return '';
  
  columnCount = parseInt(columnCount) || 40;
  let receiptContent = '';
  
  try {
    // HEADER İŞLE
    const headerPanels = xmlDoc.querySelectorAll('panels[type="header"]');
    headerPanels.forEach(panel => {
      receiptContent += processPanel(panel, columnCount);
    });
    
    // DETAY İŞLE
    const detailPanels = xmlDoc.querySelectorAll('panels:not([type])');
    detailPanels.forEach(panel => {
      receiptContent += processPanel(panel, columnCount);
    });
    
    // FOOTER İŞLE
    const footerPanels = xmlDoc.querySelectorAll('panels[type="footer"]');
    footerPanels.forEach(panel => {
      receiptContent += processPanel(panel, columnCount);
    });
    
  } catch (error) {
    console.error('Fiş oluşturma hatası:', error);
    return 'Fiş oluşturulamadı: ' + error.message;
  }
  
  return receiptContent;
};

const processPanel = (panel, columnCount) => {
  let panelContent = '';
  const bricks = panel.querySelectorAll('bricks');
  const rows = {};
  
  bricks.forEach(brick => {
    const row = parseInt(brick.getAttribute('row')) || 0;
    const left = parseInt(brick.getAttribute('left')) || 0;
    const width = parseInt(brick.getAttribute('width')) || 10;
    const align = brick.getAttribute('align') || 'left';
    const format = brick.getAttribute('format') || '';
    const fieldName = brick.getAttribute('field') || '';
    
    if (!rows[row]) {
      rows[row] = Array(columnCount).fill(' ');
    }
    
    let value = sampleData(fieldName, format);
    
    if (format.includes('{0}')) {
      value = format.replace('{0}', value);
    } else if (format.includes('{0:')) {
      value = format;
    } else {
      value = format || value;
    }
    
    placeTextInRow(rows[row], value, left, width, align);
  });
  
  Object.keys(rows).sort((a, b) => parseInt(a) - parseInt(b)).forEach(rowKey => {
    panelContent += rows[rowKey].join('') + '\n';
  });
  
  return panelContent;
};

// HİZALAMA & YERLEŞTİRME İŞLEMLERİ
const placeTextInRow = (rowChars, text, left, width, align) => {
  if (!text) return;
  
  let displayText = text.substring(0, width);
  
  if (align === 'right') {
    const padding = width - displayText.length;
    if (padding > 0) {
      displayText = ' '.repeat(padding) + displayText;
    }
  } else if (align === 'center') {
    const padding = width - displayText.length;
    if (padding > 0) {
      const leftPad = Math.floor(padding / 2);
      displayText = ' '.repeat(leftPad) + displayText + ' '.repeat(padding - leftPad);
    }
  }
  
  for (let i = 0; i < displayText.length; i++) {
    if (left + i < rowChars.length) {
      rowChars[left + i] = displayText[i];
    }
  }
};

// BURADA TASARIMLAR BOŞ KALMASIN DİYE EKLEDİĞİM RANDOM VERİLER BULUNUYOR.
const sampleData = (field, format) => {
  const data = {
    'CustomerName': 'Ahmet Yılmaz',
    'AddressText': 'Atatürk Cad. No:123 Kadıköy/İstanbul',
    'AddressNotes': 'Kapıcıya bırakabilirsiniz',
    'SpecificCustomerName': 'Mehmet Öztürk',
    'DineInTableText': 'MASA 5',
    'TableGroupText': 'A Bölümü',
    'OrderDateTime': new Date(),
    'OrderPhone': '0532 123 4567',
    'EmployeeName': 'Ali Demir',
    'StationID': 'T1',
    'Quantity': '2',
    'MenuItemText': 'Adana Kebap',
    'ExtendedPrice': '120.00',
    'TotalPrice': '350.00',
    'PaidTotal': '350.00',
    'DiscountTotalAmount': '50.00',
    'PaymentBalance': '0.00',
    'OrderID': '12345',
    'ReceiptNo': '67890',
    'PaymentMethodName': 'Nakit',
    'AmountPaid': '350.00',
    'OrderNotes': 'Acılı olsun lütfen',
    'OrderExternalNotes': 'Masayı pencere kenarına kurun',
    'DiscountText': 'Müşteri İndirimi',
    'AutoID': ''
  };
  
  return data[field] || '';
}; 