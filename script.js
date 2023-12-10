// Get select element and table body
const select = document.getElementById('tickers');
const tbody = document.getElementById('tickers-data');

// Fetch crypto ticker data 
async function getTickers() {

  const response = await fetch('/tickers'); // API endpoint
  return response.json();

}

// Update UI with selected coin
async function updateUI() {

  tbody.innerHTML = ''; // Clear existing rows

  const tickers = await getTickers();  

  const selectedCoin = select.value; // Get selected coin
  
  const coin = tickers.find(t => t.name === selectedCoin);

  const row = `
    <tr>
      <td>${coin.name}</td>
      <td>${coin.last}</td>  
      <td>${coin.buy}</td>
      <td>${coin.sell}</td>
      <td>${coin.volume}</td>
      <td>${coin.base_unit}</td>    
    </tr>
  `;

  tbody.innerHTML += row; // Add new row

}

// Event listener for form submission  
select.addEventListener('change', updateUI);