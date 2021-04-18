const fetch = require("node-fetch");
var player = require('play-sound')(opts = {})

const schedule = require('node-schedule');

const express = require('express');

const app = express()
const port = 3000

const BASE_API = 'https://api.nomics.com/v1';
const API_KEY = 'cca5f3b2326f87e09f4c6a4c9e63b1b5';

const userAction = async () => {
  const response = await fetch(`${BASE_API}+'/currencies/ticker?key=${API_KEY}&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(myJson);
  console.log(myJson['data']['prices'][0]['price']);
  return myJson['data']['prices'][0]['price'];
}

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // let current_rate = await getCurrentUsdInr();
  let doge_price = await userAction();
  let doge_price_old = doge_price;
  let flag = false;
  console.log(dofe)
  // console.log("DOGE: " + doge_price * current_rate + " INR.");
  // schedule.scheduleJob('0 */1 * * * *', async function(){
  //   console.log('The answer to life, the universe, and everything!');
  //   doge_price = await userAction();
  //   if(doge_price > doge_price_old) {
  //     flag = true;
  //   }
  //   else {
  //     flag = false;
  //   }
  //   doge_price_old = doge_price;
  //   if(flag) {
  //     player.play('dogeUpdate.mp3', function(err){
  //     if (err) throw err
  //     });
  //   }
  //   console.log("DOGE: " + doge_price * current_rate + " INR.");
  // });
  //
  // schedule.scheduleJob('0 */10 * * * *', async function(){
    console.log('The answer to life, the universe, and everything!');
    current_rate = await getCurrentUsdInr();
  });
})

const getCurrentUsdInr = async () => {
  const response = await fetch('http://data.fixer.io/api/latest?access_key=6c8f660231195cb2011e5fd9b712582b', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json();
  let rate = myJson['rates']['INR']/myJson['rates']['USD'];
  console.log('INR -> USD: ' + rate);
  return rate;
}

getCurrentUsdInr();
