<<<<<<< HEAD
/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const Output = [];

  transactions.forEach(x => {
    const index = Output.findIndex(item => item.category === x.category);

    if (index === -1) {
      Output.push({
        category: x.category,
        totalSpent: x.price
      });
    } else {
      Output[index].totalSpent += x.price;
    }
  });

  return Output;
}

module.exports = calculateTotalSpentByCategory;
=======
/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const Output = [];

  transactions.forEach(x => {
    const index = Output.findIndex(item => item.category === x.category);

    if (index === -1) {
      Output.push({
        category: x.category,
        totalSpent: x.price
      });
    } else {
      Output[index].totalSpent += x.price;
    }
  });

  return Output;
}

module.exports = calculateTotalSpentByCategory;
>>>>>>> 0f5c64d (Modified Day1)
