// server.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB 
mongoose.connect('mongodb://localhost/crypto', {useNewUrlParser: true});

const tickerSchema = new mongoose.Schema({}); 

const Ticker = mongoose.model('Ticker', tickerSchema);

// Dynamic import syntax
const fetchTickerData = async () => {

  const fetch = await import('node-fetch');

  const response = await fetch('https://api.wazirx.com/api/v2/tickers');

  const tickers = await response.json();

  const top10 = tickers.slice(0, 10);

  return top10;

}

// Fetch api data
app.get('/fetch', async (req, res) => {

  try {

    const top10Tickers = await fetchTickerData();
    
    await Ticker.insertMany(top10Tickers);

    res.send({message: 'Fetched and saved'});

  } catch (error) {

    console.log(error);
    res.status(500).send('Error fetching data');
  
  }

});

// Get saved data and send back
app.get('/tickers', async (req, res) => {
  
  try {
    const tickers = await Ticker.find({});
    res.json(tickers);

  } catch(error) {
    console.log(error);
    res.status(500).send('Error getting tickers');
  }

});


// Serve static frontend content
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));