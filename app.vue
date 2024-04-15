<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">

import TronWeb from 'tronweb';
import BigNumber from 'bignumber.js';

import { Buffer } from 'buffer';
window.Buffer = Buffer

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

const getTrxBalance = async (address: string) => {
  try {
    tronWeb.setAddress(address);
    return  await tronWeb.trx.getBalance(address);
  } catch (err) {
    console.log(`getPairBalance: ${err}`, address);
    return BigNumber(0)
  }
}

const getTRC20Balance = async (tokenAddress:string, userAddress:string) => {
  let decimals = BigNumber(0);
  let formated = BigNumber(0);
  let symbol: string = '';

  tronWeb.setAddress(userAddress);
  const { abi } = await tronWeb.trx.getContract(tokenAddress);


  const contract = tronWeb.contract(abi.entrys, tokenAddress);

  symbol = await contract.methods.symbol().call();
  decimals = await contract.methods.decimals().call();
  const tokensPerUnit = BigNumber(10).pow(decimals);

  const balance = await contract.methods.balanceOf(userAddress).call();

  if (balance) {
    formated = BigNumber(balance.toNumber()).dividedBy(tokensPerUnit);
  }

  return {
    symbol,
    decimals,
    formated: Number.parseFloat(formated.toFixed(4))
  }
};


console.log('Balance', await getTrxBalance('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'))

console.log('', await getTRC20Balance('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', 'TFRCrr4bH9HRhT8TtBFB3LixKrf31DD4qC'))

</script>
