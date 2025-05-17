// INFX OLUŞTURMA FONKSİYONLARI
// ----------------------------------------------------------------------------------------------------
export const generateCustomInfx = (options) => {
  const columnCount = 40;
  
  let infx = `<?xml version="1.0" ?>
<infReport version="2" columncount="${columnCount}" pagerow="30">`;

  infx += generateHeaderPanel(options);
  
  infx += generateProductListPanel(options);
  
  infx += generateTotalsPanel(options);
  
  infx += generateFooterPanel(options);
  
  if (isFeatureEnabled(options, 'payment-method')) {
    infx += generatePaymentMethodPanel();
  }
  
  infx += `
</infReport>`;
  
  return infx;
};

// ----------------------------------------------------------------------------------------------------
// HEADER PANELİ
const generateHeaderPanel = (options) => {
  let panel = `
	<panels table="header" type="header">`;
  
  let row = 0;
  
  if (isFeatureEnabled(options, 'restaurant-name')) {
    const restaurantName = getFeatureValue(options, 'restaurant-name');
    panel += `
		<bricks font="11" field="AutoID" format="${restaurantName}" left="0" width="40" row="${row}" shownull="false" multiline="false" align="center" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'branch-name')) {
    const branchName = getFeatureValue(options, 'branch-name');
    panel += `
		<bricks font="10" field="AutoID" format="${branchName}" left="0" width="40" row="${row}" shownull="false" multiline="false" align="center" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'tax-number')) {
    const taxNumber = getFeatureValue(options, 'tax-number');
    panel += `
		<bricks font="00" field="AutoID" format="${taxNumber}" left="0" width="40" row="${row}" shownull="false" multiline="false" align="center" />`;
    row++;
  }
  
  panel += `
		<bricks field="AutoID" format="----------------------------------------" left="0" width="40" row="${row}" shownull="false" multiline="false" align="left" />`;
  row++;
  
  if (isFeatureEnabled(options, 'customer-name')) {
    panel += `
		<bricks font="10" field="SpecificCustomerName" format="Müşteri: {0}" left="0" width="40" row="${row}" shownull="false" multiline="true" align="left" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'customer-address')) {
    panel += `
		<bricks field="AddressText" format="{0}" left="0" width="40" row="${row}" shownull="false" multiline="true" align="left" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'customer-phone')) {
    panel += `
		<bricks field="OrderPhone" format="Tel: {0}" left="0" width="40" row="${row}" shownull="false" multiline="false" align="left" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'table-info')) {
    panel += `
		<bricks font="10" field="DineInTableText" format="MASA: {0}" left="0" width="25" row="${row}" shownull="false" multiline="false" align="left" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'table-group')) {
    panel += `
		<bricks font="10" field="TableGroupText" format="GRUP: {0}" left="0" width="25" row="${row}" shownull="false" multiline="false" align="left" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'order-datetime')) {
    panel += `
		<bricks field="OrderDateTime" format="{0:dd.MM.yyyy HH:mm}" left="0" width="25" row="${row}" shownull="false" multiline="false" align="left" />`;
    row++;
  }
  
  panel += `
		<bricks field="AutoID" format="----------------------------------------" left="0" width="40" row="${row}" shownull="false" multiline="false" align="left" />`;
  row++;
  
  if (isFeatureEnabled(options, 'employee-name')) {
    panel += `
		<bricks field="EmployeeName" format="PERSONEL: {0}" left="0" width="25" row="${row}" shownull="false" multiline="false" align="left" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'terminal-id')) {
    panel += `
		<bricks field="StationID" format="TERMİNAL: {0}" left="0" width="15" row="${row}" shownull="false" multiline="false" align="right" />`;
    row++;
  }
  
  panel += `
		<bricks field="AutoID" format="_________________________________________" left="0" width="40" row="${row}" shownull="false" multiline="false" align="none" />`;
  
  panel += `
	</panels>`;
  
  return panel;
};

// ----------------------------------------------------------------------------------------------------
// ÜRÜN LİSTESİ PANELİ
const generateProductListPanel = (options) => {
  if (!isFeatureEnabled(options, 'product-list')) {
    return '';
  }
  
  const productColumnsType = getFeatureValue(options, 'product-list') || 'quantity-product-price';
  
  let panel = `
	<panels table="detail">`;
  
  if (productColumnsType === 'quantity-product-price') {
    panel += `
		<bricks field="Quantity" format="{0}" left="0" width="5" row="0" shownull="false" multiline="false" align="center" />
		<bricks field="MenuItemText" format="{0}" left="5" width="25" row="0" shownull="false" multiline="true" align="left" />
		<bricks field="ExtendedPrice" format="{0:n2}" left="30" width="10" row="0" shownull="false" multiline="true" align="right" />`;
  }
  else if (productColumnsType === 'quantity-product') {
    panel += `
		<bricks field="Quantity" format="{0}" left="0" width="5" row="0" shownull="false" multiline="false" align="center" />
		<bricks field="MenuItemText" format="{0}" left="5" width="35" row="0" shownull="false" multiline="true" align="left" />`;
  }
  else if (productColumnsType === 'product-price') {
    panel += `
		<bricks field="MenuItemText" format="{0}" left="0" width="30" row="0" shownull="false" multiline="true" align="left" />
		<bricks field="ExtendedPrice" format="{0:n2}" left="30" width="10" row="0" shownull="false" multiline="true" align="right" />`;
  }
  
  panel += `
	</panels>`;
  
  return panel;
};

// ----------------------------------------------------------------------------------------------------
// TOPLAM TUTAR PANELİ
const generateTotalsPanel = (options) => {
  let panel = `
	<panels table="header" type="header">
		<bricks field="AutoID" format="----------------------------------------" left="0" width="40" row="0" shownull="false" multiline="false" align="left" />`;
  
  let row = 1;
  
  if (isFeatureEnabled(options, 'total-price')) {
    panel += `
		<bricks font="10" field="TotalPrice" format="TOPLAM: {0:n2} TL" left="0" width="40" row="${row}" shownull="false" multiline="false" align="right" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'discount')) {
    panel += `
		<bricks field="DiscountTotalAmount" format="İNDİRİM: -{0:n2} TL" left="0" width="40" row="${row}" shownull="false" multiline="false" align="right" />
		<bricks field="DiscountText" format="{0}" left="0" width="40" row="${row+1}" shownull="false" multiline="false" align="right" />`;
    row += 2;
  }
  
  if (isFeatureEnabled(options, 'paid-amount')) {
    panel += `
		<bricks font="10" field="PaidTotal" format="ÖDENEN: {0:n2} TL" left="0" width="40" row="${row}" shownull="false" multiline="false" align="right" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'payment-balance')) {
    panel += `
		<bricks font="11" field="PaymentBalance" format="KALAN: {0:n2} TL" left="0" width="40" row="${row}" shownull="false" multiline="false" align="right" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'waiter-tip')) {
    const tipPercentage = getFeatureValue(options, 'waiter-tip-percentage') || '10';
    panel += `
		<bricks field="AutoID" format="----------------------------------------" left="0" width="40" row="${row}" shownull="false" multiline="false" align="left" />`;
    row++;
    
    panel += `
		<bricks font="10" field="TotalPrice" format="GARSONİYE (%${tipPercentage}): {0:n2} TL" left="0" width="40" row="${row}" shownull="false" multiline="false" align="right" />`;
    row++;
  }
  
  panel += `
		<bricks field="AutoID" format="" left="0" width="40" row="${row}" shownull="false" multiline="false" align="center" />`;
  row++;
  
  if (isFeatureEnabled(options, 'thank-you')) {
    const thankYouText = getFeatureValue(options, 'thank-you');
    panel += `
		<bricks font="10" field="AutoID" format="${thankYouText}" left="0" width="40" row="${row}" shownull="false" multiline="false" align="center" />`;
    row++;
  }

  if (isFeatureEnabled(options, 'not-fiscal')) {
    const notFiscalText = getFeatureValue(options, 'not-fiscal');
    panel += `
		<bricks font="00" field="AutoID" format="${notFiscalText}" left="0" width="40" row="${row}" shownull="false" multiline="false" align="center" />`;
    row++;
  }
  
  panel += `
	</panels>`;
  
  return panel;
};

// ----------------------------------------------------------------------------------------------------
// ALT BİLGİ PANELİ
const generateFooterPanel = (options) => {
  let panel = `
	<panels table="header" type="header">`;
  
  let row = 0;
  
  if (isFeatureEnabled(options, 'order-id')) {
    panel += `
		<bricks field="OrderID" format="SİPARİŞ NO: {0}" left="0" width="20" row="${row}" shownull="false" multiline="false" align="left" />`;
    
    if (isFeatureEnabled(options, 'receipt-no')) {
      panel += `
		<bricks field="ReceiptNo" format="FİŞ NO: {0}" left="20" width="20" row="${row}" shownull="false" multiline="false" align="right" />`;
    }
    
    row++;
  } 
  else if (isFeatureEnabled(options, 'receipt-no')) {
    panel += `
		<bricks field="ReceiptNo" format="FİŞ NO: {0}" left="0" width="40" row="${row}" shownull="false" multiline="false" align="center" />`;
    row++;
  }
  
  if (isFeatureEnabled(options, 'sys-info')) {
    const sysInfoText = getFeatureValue(options, 'sys-info');
    panel += `
		<bricks prefix="--20" suffix="20--" field="AutoID" format="${sysInfoText}" left="0" width="40" row="${row}" shownull="false" multiline="false" align="center" />`;
  }
  
  panel += `
	</panels>`;
  
  return panel;
};

// ----------------------------------------------------------------------------------------------------
// ÖDEME YÖNTEMİ PANELİ
const generatePaymentMethodPanel = () => {
  return `
	<panels table="Payment" type="header">
		<bricks field="PaymentMethodName" format="{0}" left="0" width="20" row="0" shownull="false" multiline="false" align="left" />
		<bricks field="AmountPaid" format="{0:n2}" left="20" width="20" row="0" shownull="false" multiline="false" align="right"/>
	</panels>`;
};

const isFeatureEnabled = (options, featureName) => {
  return options[featureName]?.checked || false;
};

const getFeatureValue = (options, featureName) => {
  return options[featureName]?.value || '';
};

// ----------------------------------------------------------------------------------------------------
// İNDİRME FONKSİYONU BURADA
export const downloadXML = (infxContent, filename) => {
  if (typeof window !== 'undefined') {
    const blob = new Blob([infxContent], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'fisTasarimi.infx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}; 