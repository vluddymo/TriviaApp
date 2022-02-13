const game = document.querySelector("#game");
const scoreDisplay = document.querySelector("#score");
let score = 0;

const genres = [
  {
    name: "film",
    id: 11,
  },
  {
    name: "video games",
    id: 15,
  },
  {
    name: "nature",
    id: 17,
  },
  {
    name: "music",
    id: 12,
  },
];

const levels = ["easy", "medium", "hard"];

function addGenre(genre) {
  const column = document.createElement("div");
  column.classList.add("genre-column");
  column.innerHTML = genre.name;
  game.append(column);

  levels.forEach((level) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (level === "easy") {
      card.innerHTML = 100;
    }

    if (level === "medium") {
      card.innerHTML = 200;
    }

    if (level === "hard") {
      card.innerHTML = 300;
    }

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`
    )
      .then((response) => response.json())
      .then((data) => {
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-answer", data.results[0].correct_answer);
        card.setAttribute("data-value", card.getInnerHTML());
        console.log(data);
      })
      .then((done) => card.addEventListener("click", flipCard));
  });
}

genres.forEach((genre) => {
  addGenre(genre);
});

function flipCard() {
  console.log("clicked");
  this.style.fontSize = "15px";
  this.innerHTML = "";
  const textDisplay = document.createElement("div");
  const trueButton = document.createElement("button");
  const falseButton = document.createElement("button");
  trueButton.classList.add("true-button");
  falseButton.classList.add("false-button");
  trueButton.innerHTML = "True";
  falseButton.innerHTML = "False";
  trueButton.addEventListener("click", getResult);
  falseButton.addEventListener("click", getResult);
  textDisplay.innerHTML = this.getAttribute("data-question");

  this.append(textDisplay, trueButton, falseButton);

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
    const parentCard = this.parentElement;
    const result = parentCard.getAttribute("data-answer");
    const answer = this.innerHTML;
    console.log(result);
    console.log(answer);
  
    while (parentCard.firstChild) {
      parentCard.removeChild(parentCard.lastChild);
    }
  
    if (answer === result) {
      parentCard.classList.add("correct-answer");
      parentCard.innerHTML = parentCard.getAttribute("data-Value");
      score = score + parseInt(parentCard.getAttribute("data-Value"));
      scoreDisplay.innerHTML = score;
    } else {
      parentCard.classList.add("wrong-answer");
      parentCard.innerHTML = 0;
    }
  
    parentCard.classList.replace("card", "usedCard");
    const allCards = Array.from(document.querySelectorAll(".card"));
    console.log(allCards.length);
  
    if (allCards.length > 0) {
      allCards.forEach((card) => card.addEventListener("click", flipCard));
      parentCard.removeEventListener("click", flipCard);
    } else {
      setTimeout(() => alert(`Congratulations! your Score is ${score}`), 100);
      setTimeout(refresh, 200);
    }
  }

function refresh() {
    window.location.reload();
  }
  
