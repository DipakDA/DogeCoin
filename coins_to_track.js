const fs = require('fs');
const readline = require('readline');

const readAllPairs = async function () {
  const data = await fs.promises.readFile('./pairs.json', 'utf8');
  return data;
}

const processPairsData = async function () {
  let pairs_data = await readAllPairs();
  pairs_data = JSON.parse(pairs_data);
  pairs_data = pairs_data['result'];
  // console.log(pairs_data);
  let count_usd = 0;
  let usd_pairs = []
  for(let i=0;i<pairs_data.length; i++) {
    // console.log(pairs_data[i]['base']['symbol']);
    if(pairs_data[i]['symbol'].endsWith('usd') && pairs_data[i]['quote']['symbol'] === 'usd') {
      // console.log(pairs_data[i]);
      count_usd = count_usd + 1;
      usd_pairs.push(pairs_data[i]);
    }
  }
  console.log(pairs_data.length);
  console.log(count_usd);
  return usd_pairs;
}

const coinsToTrack = async function() {
  let processed_pairs_data = await processPairsData();
  // console.log(processed_pairs_data);
  let arrayCoins = []
  const fileStream = await fs.createReadStream('coins_to_track.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    let symbol = line.split('(')[0].toLowerCase();
    arrayCoins.push(symbol);
  }
  console.log(arrayCoins);

  let count_to_track = 0;
  // let final_pairs_list = [];
  let json_1 = {};
  for(let j=0;j<arrayCoins.length;j++) {
    // let flag = false;
    for(let i=0;i<processed_pairs_data.length; i++) {
      if(processed_pairs_data[i]['symbol'] === arrayCoins[j] + 'usd') {
        // console.log(processed_pairs_data[i]);
        // console.log('1');
        // final_pairs_list.push(processed_pairs_data[i]);
        json_1[processed_pairs_data[i]['symbol']] = processed_pairs_data[i];
        count_to_track = count_to_track + 1;
        // flag = true;
        break;
      }
      // else {
      //   console.log('0');
      // }
    }
    // if(flag) {
    //   break;
    // }
  }
  console.log(JSON.stringify(json_1));
  console.log(count_to_track);
  // console.log(final_pairs_list);

}

coinsToTrack();
// console.log(arrayCoins);
