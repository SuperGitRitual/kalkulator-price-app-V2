document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  document.getElementById('calculate').addEventListener('click', function() {
    console.log('Calculate button clicked');
    calculatePrice();
  });

  document.getElementById('remove-iva').addEventListener('click', function() {
    console.log('Remove IVA button clicked');
    removeIVA();
  });

  document.getElementById('reset').addEventListener('click', function() {
    console.log('Reset button clicked');
    resetFields();
  });
});

function removeIVA() {
  const price = parseFloat(document.getElementById('price').value.replace(/,/g, ''));
  const errorElement = document.getElementById('error');
  
  if (isNaN(price)) {
    errorElement.textContent = 'Por favor, ingrese un precio válido.';
    return;
  }

  const priceWithoutIVA = price / 1.16;
  document.getElementById('price').value = formatNumber(priceWithoutIVA);
  errorElement.textContent = '';
  console.log('IVA removed, new price:', priceWithoutIVA);
}

function calculatePrice() {
  const price = parseFloat(document.getElementById('price').value.replace(/,/g, ''));
  const margin = parseFloat(document.getElementById('margin').value);
  const discount1 = parseFloat(document.getElementById('discount1').value) || 0;
  const discount2 = parseFloat(document.getElementById('discount2').value) || 0;
  const errorElement = document.getElementById('error');
  const resultContainer = document.getElementById('result-container');
  const resultElement = document.getElementById('result');

  if (isNaN(price) || isNaN(margin)) {
    errorElement.textContent = 'Por favor, ingrese valores válidos.';
    resultContainer.style.display = 'none';
    return;
  }

  const clientPrice = price * ((100 - margin) / 100);
  const priceAfterDiscount1 = clientPrice * (1 - (discount1 / 100));
  const finalPrice = priceAfterDiscount1 * (1 - (discount2 / 100));

  resultElement.textContent = `El precio final es ${formatNumber(finalPrice)} MXN`;
  errorElement.textContent = '';
  resultContainer.style.display = 'block';
  console.log('Final price calculated:', finalPrice);
}

function resetFields() {
  document.getElementById('price').value = '';
  document.getElementById('margin').value = '';
  document.getElementById('discount1').value = '';
  document.getElementById('discount2').value = '';
  document.getElementById('error').textContent = '';
  document.getElementById('result-container').style.display = 'none';
  console.log('Fields reset');
}

function formatNumber(number) {
  return number.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
