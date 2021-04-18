const fetch = require("node-fetch");
var fs = require('fs').promises;

const BASE_URL = "https://api.cryptowat.ch";

const getAllPairs = async function () {
  const response = await fetch(`${BASE_URL}/pairs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(myJson);
  console.log(JSON.stringify(myJson));
  fs.writeFile("pairs.json", JSON.stringify(myJson), function(err) {
    if(err) {
      console.log(err);
    }
  });
}

const readAllPairs = async function () {
  const data = await fs.readFile('./pairs.json', 'utf8');
  return data;
}

const processPairsData = async function () {
  let pairs_data = await readAllPairs();
  pairs_data = JSON.parse(pairs_data);
  pairs_data = pairs_data['result'];
  // console.log(pairs_data);
  let count_usd = 0;
  for(let i=0;i<pairs_data.length; i++) {
    // console.log(pairs_data[i]['base']['symbol']);
    if(pairs_data[i]['symbol'].endsWith('usd') && pairs_data[i]['quote']['symbol'] === 'usd') {
      // console.log(pairs_data[i]);
      count_usd = count_usd + 1;
      if(pairs_data[i]['symbol'].startsWith('usd')) {
        console.log(pairs_data[i]);
      }
    }
  }
  console.log(pairs_data.length);
  console.log(count_usd);
}

processPairsData()
