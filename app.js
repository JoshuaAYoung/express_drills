const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/sum", (req, res) => {
  let a;
  let b;
  if (req.query.a && req.query.b) {
    a = parseFloat(req.query.a);
    b = parseFloat(req.query.b);
  }

  if (!a && !b) {
    return res.status(400).send("Please provide two numbers as your queries");
  } else {
    res.send(`The sum of ${a} and ${b} is ${a + b}`);
  }
});

app.get("/cipher", (req, res) => {
  let text;
  let shift;

  if (req.query.text && req.query.shift) {
    text = req.query.text;
    shift = parseInt(req.query.shift);
  } else {
    return res
      .status(400)
      .send("Please provide a word (text) and a number (shift)");
  }
  let arr = [];
  let lower = text.toUpperCase();
  for (let i = 0; i < lower.length; i++) {
    arr.push(
      lower[i].charCodeAt(0) + shift > 90
        ? lower[i].charCodeAt(0) + shift - 26
        : lower[i].charCodeAt(0) + shift
    );
  }
  const shifted = arr.map(item => String.fromCharCode(item)).join("");
  res.send(shifted);
});

app.get("/lotto", (req, res) => {
  let lotto = [];
  let ticketNumbers = [];
  if (req.query.numbers.length === 6) {
    ticketNumbers = req.query.numbers;
  } else {
    return res.status(400).send("Please send 6 numbers");
  }
  for (let i = 0; i < 6; i++) {
    lotto.push(Math.floor(Math.random() * 20));
  }
  let count = 0;
  for (let i = 0; i < ticketNumbers.length; i++) {
    if (parseInt(ticketNumbers[i])) {
      ticketNumbers[i] = parseInt(ticketNumbers[i]);
    } else {
      return res.status(400).send("Please send a valid number");
    }

    if (lotto.find(number => number === ticketNumbers[i])) {
      count++;
    }
  }
  switch (count) {
    case 0:
    case 1:
    case 2:
    case 3:
      res.send("Sorry, you lose");
      break;
    case 4:
      res.send("Congratulations, you win a free ticket");
      break;
    case 5:
      res.send("Congratulations! You win $100!");
      break;
    case 6:
      res.send("Wow! Unbelievable! You could have won the mega millions!");
      break;
  }
});

app.listen(8080, () => {
  console.log("http://localhost:8080/");
});
