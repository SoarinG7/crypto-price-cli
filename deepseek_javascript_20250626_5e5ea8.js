#!/usr/bin/env node
const axios = require('axios');
const chalk = require('chalk');
const { Table } = require('cli-table3');

const coins = ['bitcoin', 'ethereum', 'solana', 'dogecoin'];

async function main() {
  try {
    const prices = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`
    );

    const table = new Table({
      head: [chalk.cyan('Crypto'), chalk.cyan('Price (USD)')],
      colWidths: [15, 15]
    });

    coins.forEach(coin => {
      table.push([chalk.yellow(coin.toUpperCase()), `$${prices.data[coin].usd}`]);
    });

    console.log(chalk.bold.magenta('\n🪙 Crypto Price Checker\n'));
    console.log(table.toString());
    console.log(chalk.gray('\nAdd more coins by editing index.js!'));
  } catch (error) {
    console.log(chalk.red('\n⚠️  Error: Check your internet connection!'));
  }
}

main();