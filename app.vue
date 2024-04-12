<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">

import TronWeb from 'tronweb';
import BigNumber from 'bignumber.js';

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

const getTrxBalance = async (address: string) => {
  try {
    tronWeb.setAddress(address);
    const balance = await tronWeb.trx.getBalance(address);
    console.log('CurrenBalance', balance)
    return balance;
  } catch (err) {
    console.log(`getPairBalance: ${err}`, address);
    return BigNumber(0)
  }
}

await getTrxBalance('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');

</script>
