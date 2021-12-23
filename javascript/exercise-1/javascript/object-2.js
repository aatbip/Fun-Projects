var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
];

value = "Apple";
function search(fruits, value) {
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].name === value) {
      return fruits[i];
    }
  }
}

console.log(search(fruits, value));
