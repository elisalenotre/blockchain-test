'use strict';

document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fromAddress = document.getElementById('fromAddress').value;
    const toAddress = document.getElementById('toAddress').value;
    const amount = document.getElementById('amount').value;

    myCoin.addTransaction(new Transaction(fromAddress, toAddress, amount));

    document.getElementById('fromAddress').value = '';
    document.getElementById('toAddress').value = '';
    document.getElementById('amount').value = '';

    displayBlockchain();
});

document.getElementById('mineButton').addEventListener('click', function() {
    myCoin.minePendingTransactions();
    displayBlockchain();
});

function displayBlockchain() {
    document.getElementById('blockchain').textContent = JSON.stringify(myCoin, null, 4);
}

// initailize the blockchain
displayBlockchain();

function counter() {
  let seconds = 0;
  setInterval(() => {
    seconds += 1;
    document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

counter();
