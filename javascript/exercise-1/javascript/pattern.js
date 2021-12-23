function asterisks(num) {
  let counter = num;
  let string = "";
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < counter; j++) {
      string += "*";
    }
    string += "\n";
    counter = counter - 1;
  }
  console.log(string);
}

asterisks(10);
